import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { visit } from 'unist-util-visit';

const ALLOWED_HOSTS = new Set([
	'github.com',
	'private-user-images.githubusercontent.com',
	'raw.githubusercontent.com',
	'user-images.githubusercontent.com',
]);

const ALLOWED_DOWNLOAD_HOSTS = new Set([
	...ALLOWED_HOSTS,
	'github-production-user-asset-6210df.s3.amazonaws.com',
]);

const EXTENSIONS = new Map([
	['image/gif', '.gif'],
	['image/jpeg', '.jpg'],
	['image/png', '.png'],
	['image/svg+xml', '.svg'],
	['image/webp', '.webp'],
]);

const REMOTE_IMAGE_SRC =
	/https:\/\/(?:github\.com\/user-attachments\/assets\/[a-f0-9-]+|user-images\.githubusercontent\.com\/[^\s"'<>]+|raw\.githubusercontent\.com\/[^\s"'<>]+|private-user-images\.githubusercontent\.com\/[^\s"'<>]+)/gi;

const cacheDirectory = resolve('.cache/changelog-images');
const publicDirectory = resolve('public/changelog-images');
const downloads = new Map();

function isAllowedUrl(value, hosts = ALLOWED_HOSTS) {
	try {
		const url = new URL(value);
		return url.protocol === 'https:' && hosts.has(url.hostname);
	} catch {
		return false;
	}
}

function cacheKey(url) {
	const attachment = url.match(/\/user-attachments\/assets\/([a-f0-9-]+)/i);
	if (attachment) return attachment[1];
	return createHash('sha1').update(url).digest('hex').slice(0, 20);
}

function formatDownloadError(url, error) {
	const message = error instanceof Error ? error.message : String(error);
	const cause =
		error instanceof Error && error.cause != null
			? ` (${error.cause instanceof Error ? error.cause.message : error.cause})`
			: '';
	return `Failed to download ${url}: ${message}${cause}`;
}

async function downloadImage(url) {
	if (!isAllowedUrl(url)) return url;

	const id = cacheKey(url);
	const existing = downloads.get(id);
	if (existing) return existing;

	const job = (async () => {
		await mkdir(cacheDirectory, { recursive: true });
		await mkdir(publicDirectory, { recursive: true });

		const cachedFiles = await readdir(cacheDirectory);
		const cached = cachedFiles.find((file) => file.startsWith(`${id}.`) && !file.endsWith('.tmp'));
		if (cached) {
			const publicFiles = await readdir(publicDirectory).catch(() => []);
			if (!publicFiles.includes(cached)) {
				await copyFile(resolve(cacheDirectory, cached), resolve(publicDirectory, cached));
			}
			return `/changelog-images/${cached}`;
		}

		const response = await fetch(url, {
			headers: {
				Accept: 'image/*',
				'User-Agent': 'opentubex.github.io-changelog',
			},
			redirect: 'follow',
			signal: AbortSignal.timeout(30_000),
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		if (!isAllowedUrl(response.url, ALLOWED_DOWNLOAD_HOSTS)) {
			throw new Error(`Blocked image host after redirect: ${response.url}`);
		}

		const contentType = response.headers.get('content-type')?.split(';')[0]?.trim();
		const extension = contentType && EXTENSIONS.get(contentType);
		if (!extension) {
			throw new Error(`Unsupported image type: ${contentType ?? 'unknown'}`);
		}

		const filename = `${id}${extension}`;
		const cachePath = resolve(cacheDirectory, filename);
		const publicPath = resolve(publicDirectory, filename);
		const temporaryPath = `${cachePath}.tmp`;
		const bytes = Buffer.from(await response.arrayBuffer());
		await writeFile(temporaryPath, bytes);
		await rename(temporaryPath, cachePath);
		await writeFile(publicPath, bytes);
		return `/changelog-images/${filename}`;
	})();

	downloads.set(id, job);
	return job;
}

function collectMarkdownImages(node, images) {
	if (node.type === 'image' && typeof node.url === 'string' && isAllowedUrl(node.url)) {
		images.push(node);
	}

	if (Array.isArray(node.children)) {
		for (const child of node.children) collectMarkdownImages(child, images);
	}
}

async function rewriteBatch(items, getUrl, setUrl) {
	for (let index = 0; index < items.length; index += 8) {
		await Promise.all(
			items.slice(index, index + 8).map(async (item) => {
				const url = getUrl(item);
				try {
					setUrl(item, await downloadImage(url));
				} catch (error) {
					console.warn(`[changelog] ${formatDownloadError(url, error)}`);
				}
			}),
		);
	}
}

/** Remark: cache markdown image URLs. */
export function remarkCacheChangelogImages() {
	return async (tree) => {
		const images = [];
		collectMarkdownImages(tree, images);
		if (!images.length) return;
		await rewriteBatch(
			images,
			(image) => image.url,
			(image, next) => {
				image.url = next;
			},
		);
	};
}

/** Rehype: cache raw HTML <img src> from release notes. */
export function rehypeCacheChangelogImages() {
	return async (tree) => {
		const images = [];
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'img') return;
			const src = node.properties?.src;
			if (typeof src === 'string' && isAllowedUrl(src)) images.push(node);
		});
		if (!images.length) return;
		await rewriteBatch(
			images,
			(node) => node.properties.src,
			(node, next) => {
				node.properties.src = next;
			},
		);
	};
}

export default remarkCacheChangelogImages;

/**
 * Astro copies `public/` before pages render, so images downloaded during changelog
 * rendering never make it into `dist/` unless we copy the cache after the build.
 */
export async function copyCachedChangelogImages(distDirectory) {
	const files = await readdir(cacheDirectory).catch(() => []);
	const images = files.filter((file) => !file.endsWith('.tmp'));
	if (!images.length) return 0;

	const outputDirectory = resolve(distDirectory, 'changelog-images');
	await mkdir(outputDirectory, { recursive: true });

	await Promise.all(
		images.map((file) => copyFile(resolve(cacheDirectory, file), resolve(outputDirectory, file))),
	);
	return images.length;
}

/** Final HTML pass for raw <img> tags that never entered the hast tree. */
export async function cacheImagesInHtml(html) {
	const urls = [...new Set(html.match(REMOTE_IMAGE_SRC) ?? [])];
	if (!urls.length) return html;

	const replacements = new Map();
	for (let index = 0; index < urls.length; index += 8) {
		await Promise.all(
			urls.slice(index, index + 8).map(async (url) => {
				try {
					replacements.set(url, await downloadImage(url));
				} catch (error) {
					console.warn(`[changelog] ${formatDownloadError(url, error)}`);
				}
			}),
		);
	}

	let next = html;
	for (const [remote, local] of replacements) {
		next = next.split(remote).join(local);
	}
	return next;
}
