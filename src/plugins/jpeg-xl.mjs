import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { promisify } from 'node:util';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import sharp from 'sharp';

const run = promisify(execFile);

/** Add native format selection without changing responsive or theme selection. */
export async function addJxlSources(html, convert) {
	const tree = fromHtml(html);
	async function source(properties) {
		const srcset = properties.srcSet || properties.src;
		if (typeof srcset !== 'string') return;
		const candidates = [];
		for (const candidate of srcset.split(',')) {
			const [url, ...descriptor] = candidate.trim().split(/\s+/);
			const converted = await convert(url);
			if (!converted) return;
			candidates.push([converted, ...descriptor].join(' '));
		}
		return {
			type: 'element', tagName: 'source', children: [],
			properties: {
				...Object.fromEntries(Object.entries(properties).filter(([key]) =>
					['media', 'sizes', 'dataShotTheme', 'dataShotViewport'].includes(key))),
				type: 'image/jxl', srcSet: candidates.join(', '),
			},
		};
	}
	async function visit(parent) {
		for (let index = 0; index < (parent.children?.length ?? 0); index++) {
			const node = parent.children[index];
			if (node.tagName === 'picture') {
				if (node.children.some((child) => child.properties?.type === 'image/jxl')) continue;
				const sources = node.children.filter((child) => child.tagName === 'source');
				const additions = [];
				for (const child of sources) {
					const addition = await source(child.properties);
					if (addition) additions.push(addition);
				}
				// A catch-all fallback must stay after every art-directed source.
				if (sources.length === 0) {
					const img = node.children.find((child) => child.tagName === 'img');
					const addition = img && await source(img.properties);
					if (addition) additions.push(addition);
				}
				node.children.unshift(...additions);
			} else if (node.tagName === 'img') {
				const addition = await source(node.properties);
				if (addition) parent.children[index] = {
					type: 'element', tagName: 'picture', properties: { style: 'display: contents' },
					children: [addition, node],
				};
			} else {
				await visit(node);
			}
		}
	}
	await visit(tree);
	return toHtml(tree);
}

/** Encode high-quality alternatives with progressive decoding. */
export async function generateJpegXl(distDirectory, cacheDirectory = resolve('.cache/jpeg-xl')) {
	await run('cjxl', ['--version']);
	await mkdir(cacheDirectory, { recursive: true });
	const scratch = await mkdtemp(join(tmpdir(), 'opentubex-jxl-'));
	const converted = new Map();
	let count = 0;
	let savedBytes = 0;
	async function convert(url) {
		if (!url.startsWith('/') || url.startsWith('//') || !url.endsWith('.webp')) return;
		if (converted.has(url)) return converted.get(url);
		converted.set(url, undefined);
		const input = resolve(distDirectory, `.${decodeURIComponent(url)}`);
		if (!input.startsWith(resolve(distDirectory) + sep)) return;
		const metadata = await sharp(input).metadata();
		if ((metadata.pages ?? 1) > 1) return;
		const bytes = await readFile(input);
		const key = createHash('sha256').update('distance-0.5-progressive-e7-v1').update(bytes).digest('hex');
		const cached = join(cacheDirectory, `${key}.jxl`);
		try {
			await stat(cached);
		} catch (error) {
			if (error.code !== 'ENOENT') throw error;
			const png = join(scratch, 'input.png');
			await sharp(bytes).png().toFile(png);
			const encoded = join(scratch, 'output.jxl');
			await run('cjxl', [png, encoded, '-d', '0.5', '-e', '7', '--progressive', '--num_threads=2', '--quiet']);
			await rename(encoded, cached);
		}
		const size = (await stat(cached)).size;
		await copyFile(cached, `${input}.jxl`);
		count++;
		savedBytes += bytes.length - size;
		converted.set(url, `${url}.jxl`);
		return `${url}.jxl`;
	}
	async function walk(directory) {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			const path = join(directory, entry.name);
			if (entry.isDirectory()) await walk(path);
			else if (entry.name.endsWith('.html')) {
				await writeFile(path, await addJxlSources(await readFile(path, 'utf8'), convert));
			}
		}
	}
	try {
		await walk(distDirectory);
	} finally {
		await rm(scratch, { recursive: true, force: true });
	}
	return { count, savedBytes };
}
