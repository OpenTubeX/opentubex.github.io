import { execFile, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, rename, stat, writeFile } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { promisify } from 'node:util';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import sharp from 'sharp';

const run = promisify(execFile);
const ENCODER_VERSION = 'h264-crf23-v1';
const THEMES = ['dark', 'light'];

function sourceTheme(properties) {
	if (THEMES.includes(properties.dataChangelogTheme)) return properties.dataChangelogTheme;
	return THEMES.find((theme) => properties.media === `(prefers-color-scheme: ${theme})`);
}

function videoNode(src, img, theme) {
	const { className = [], width, height, alt, style } = img.properties;
	return {
		type: 'element',
		tagName: 'video',
		children: [],
		properties: {
			className: [...className, 'animation'],
			src: src.url,
			width,
			height,
			// Even-sized encodes can lose a pixel row; keep the box at the source ratio.
			style: [style, `aspect-ratio: ${src.width} / ${src.height}`].filter(Boolean).join('; '),
			ariaLabel: alt || undefined,
			dataAnimationTheme: theme,
			dataFullWidth: src.width,
			dataFullHeight: src.height,
			muted: true,
			loop: true,
			playsInline: true,
			controls: true,
			preload: 'none',
		},
	};
}

/** Replace animated images with lazily played videos, keeping themed variants. */
export async function replaceAnimatedImages(html, convert) {
	const tree = fromHtml(html);
	let changed = false;

	async function replacement(node) {
		if (node.tagName === 'img') {
			const src = typeof node.properties.src === 'string' && await convert(node.properties.src);
			return src && [videoNode(src, node)];
		}
		const img = node.children.find((child) => child.tagName === 'img');
		const sources = node.children.filter((child) => child.tagName === 'source');
		if (!img || typeof img.properties.src !== 'string') return;
		if (sources.length === 0) {
			const src = await convert(img.properties.src);
			return src && [videoNode(src, img)];
		}
		// Only theme pairs translate to videos; responsive candidates would need a player-side choice.
		const themed = new Map();
		for (const source of sources) {
			const theme = sourceTheme(source.properties);
			const srcset = source.properties.srcSet;
			if (!theme || themed.has(theme) || typeof srcset !== 'string' || /[\s,]/.test(srcset.trim())) return;
			themed.set(theme, srcset.trim());
		}
		const missing = THEMES.filter((theme) => !themed.has(theme));
		if (missing.length > 1) return;
		if (missing.length === 1) themed.set(missing[0], img.properties.src);
		const videos = [];
		for (const [theme, url] of themed) {
			const src = await convert(url);
			if (!src) return;
			videos.push(videoNode(src, img, theme));
		}
		return videos;
	}

	async function visit(parent) {
		for (let index = 0; index < (parent.children?.length ?? 0); index++) {
			const node = parent.children[index];
			if (node.tagName === 'picture' || node.tagName === 'img') {
				const videos = await replacement(node);
				if (!videos) continue;
				parent.children.splice(index, 1, ...videos);
				index += videos.length - 1;
				changed = true;
			} else {
				await visit(node);
			}
		}
	}

	await visit(tree);
	return changed ? toHtml(tree) : html;
}

async function encode(input, output) {
	const options = { animated: true, limitInputPixels: false };
	const { pages = 1, pageHeight, delay = [] } = await sharp(input, options).metadata();
	if (pages < 2) return false;
	const { data, info } = await sharp(input, options).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	// H.264 has no alpha channel, so transparent animations stay images.
	for (let index = 3; index < data.length; index += 4) if (data[index] < 255) return false;

	// Browsers treat tiny GIF/WebP frame delays as 100 ms.
	const delays = Array.from({ length: pages }, (_, index) => (delay[index] > 10 ? delay[index] : 100));
	const fps = Math.min(60, Math.max(1, Math.round(1000 / Math.min(...delays))));
	const ffmpeg = spawn('ffmpeg', [
		'-hide_banner', '-loglevel', 'error', '-y',
		'-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${info.width}x${pageHeight}`, '-r', String(fps), '-i', 'pipe:0',
		'-vf', 'crop=trunc(iw/2)*2:trunc(ih/2)*2,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
		'-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-tune', 'animation',
		'-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
		'-movflags', '+faststart', '-an', '-f', 'mp4', output,
	], { stdio: ['pipe', 'ignore', 'inherit'] });
	const done = new Promise((resolveExit, reject) => {
		ffmpeg.on('error', reject);
		ffmpeg.on('close', (code) => (code === 0 ? resolveExit() : reject(new Error(`ffmpeg exited with ${code} for ${input}`))));
	});
	// An early exit surfaces through `done`; without these, writes fail with EPIPE or wait forever for drain.
	done.catch(() => {});
	ffmpeg.stdin.on('error', () => {});
	const frameBytes = info.width * pageHeight * 4;
	for (let page = 0; page < pages; page++) {
		const frame = data.subarray(page * frameBytes, (page + 1) * frameBytes);
		for (let repeat = Math.max(1, Math.round((delays[page] * fps) / 1000)); repeat > 0; repeat--) {
			if (!ffmpeg.stdin.write(frame)) await Promise.race([new Promise((resolveDrain) => ffmpeg.stdin.once('drain', resolveDrain)), done]);
		}
	}
	ffmpeg.stdin.end();
	await done;
	return true;
}

/** Encode animated GIF/WebP images as MP4 when that is smaller. */
export async function convertAnimatedImages(distDirectory, cacheDirectory = resolve('.cache/animated-video')) {
	const { stdout: encoders } = await run('ffmpeg', ['-hide_banner', '-encoders']);
	if (!/\blibx264\b/.test(encoders)) throw new Error('ffmpeg was built without libx264 support');
	// The changelog plugin sizes videos with ffprobe and would otherwise silently skip it.
	await run('ffprobe', ['-version']);
	await mkdir(cacheDirectory, { recursive: true });
	const converted = new Map();
	let count = 0;
	let savedBytes = 0;

	async function convertUncached(url) {
		if (!url.startsWith('/') || url.startsWith('//') || !/\.(?:gif|webp)$/.test(url)) return;
		const input = resolve(distDirectory, `.${decodeURIComponent(url)}`);
		if (!input.startsWith(resolve(distDirectory) + sep)) return;
		const bytes = await readFile(input);
		const key = createHash('sha256').update(ENCODER_VERSION).update(bytes).digest('hex');
		const cached = join(cacheDirectory, `${key}.mp4`);
		const skipped = join(cacheDirectory, `${key}.skip`);
		if (await stat(skipped).then(() => true, () => false)) return;
		if (!(await stat(cached).then(() => true, () => false))) {
			const encoded = `${cached}.tmp`;
			if (!(await encode(input, encoded))) {
				await writeFile(skipped, '');
				return;
			}
			await rename(encoded, cached);
		}
		const size = (await stat(cached)).size;
		if (size >= bytes.length) return;
		const output = url.replace(/\.(?:gif|webp)$/, '.mp4');
		await copyFile(cached, resolve(distDirectory, `.${decodeURIComponent(output)}`));
		const { width, pageHeight } = await sharp(bytes, { animated: true, limitInputPixels: false }).metadata();
		count++;
		savedBytes += bytes.length - size;
		return { url: output, width, height: pageHeight };
	}

	function convert(url) {
		if (!converted.has(url)) converted.set(url, convertUncached(url));
		return converted.get(url);
	}

	async function walk(directory) {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			const path = join(directory, entry.name);
			if (entry.isDirectory()) await walk(path);
			else if (entry.name.endsWith('.html')) {
				const html = await readFile(path, 'utf8');
				const output = await replaceAnimatedImages(html, convert);
				if (output !== html) await writeFile(path, output);
			}
		}
	}
	await walk(distDirectory);
	return { count, savedBytes };
}
