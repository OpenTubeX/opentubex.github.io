import { createHash, randomUUID } from 'node:crypto';
import { copyFile, mkdir, open, readdir, rename, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import sharp from 'sharp';
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

// Raster formats only — remote SVGs stay on their origin so active content
// never becomes a same-origin navigable asset on the site.
const SUPPORTED_TYPES = new Set(['image/gif', 'image/jpeg', 'image/png', 'image/webp']);
const OPTIMIZED_SUFFIX = '.optimized.webp';
const VIDEO_TYPES = new Map([
	['video/mp4', '.mp4'],
	['video/webm', '.webm'],
	['video/quicktime', '.mov'],
]);
const MAX_CONCURRENT_DOWNLOADS = 3;
const MAX_DOWNLOAD_ATTEMPTS = 3;
const MAX_ASSET_BYTES = 100 * 1024 * 1024;

const cacheDirectory = resolve('.cache/changelog-images');
const publicDirectory = resolve('public/changelog-images');
const previousImagesDirectory = process.env.OPENTUBEX_PREVIOUS_SITE
	? resolve(process.env.OPENTUBEX_PREVIOUS_SITE, 'changelog-images')
	: undefined;
const downloads = new Map();
let activeDownloads = 0;
const downloadWaiters = [];

async function withDownloadSlot(job) {
	while (activeDownloads >= MAX_CONCURRENT_DOWNLOADS) {
		await new Promise((resolveWaiter) => downloadWaiters.push(resolveWaiter));
	}
	activeDownloads += 1;
	try {
		return await job();
	} finally {
		activeDownloads -= 1;
		downloadWaiters.shift()?.();
	}
}

function isAllowedUrl(value, hosts = ALLOWED_HOSTS) {
	try {
		const url = new URL(value);
		return url.protocol === 'https:' && hosts.has(url.hostname);
	} catch {
		return false;
	}
}

function isCacheableUrl(value) {
	if (!isAllowedUrl(value)) return false;
	return !new URL(value).pathname.toLowerCase().endsWith('.svg');
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

function requestHeaders(accept) {
	const headers = {
		Accept: accept,
		'User-Agent': 'opentubex.github.io-changelog',
	};
	const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
}

async function fetchAsset(url, accept) {
	return withDownloadSlot(async () => {
		let lastError;
		for (let attempt = 1; attempt <= MAX_DOWNLOAD_ATTEMPTS; attempt += 1) {
			const temporaryPath = resolve(cacheDirectory, `.download-${randomUUID()}.tmp`);
			try {
				const response = await fetch(url, {
					headers: requestHeaders(accept),
					redirect: 'follow',
					signal: AbortSignal.timeout(30_000),
				});
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				if (!isAllowedUrl(response.url, ALLOWED_DOWNLOAD_HOSTS)) {
					throw new Error(`Blocked asset host after redirect: ${response.url}`);
				}
				const contentLength = Number(response.headers.get('content-length'));
				if (Number.isFinite(contentLength) && contentLength > MAX_ASSET_BYTES) {
					throw new Error(`Asset exceeds ${MAX_ASSET_BYTES} byte limit`);
				}
				if (!response.body) throw new Error('Asset response has no body');

				const file = await open(temporaryPath, 'wx');
				let receivedBytes = 0;
				try {
					for await (const chunk of response.body) {
						receivedBytes += chunk.byteLength;
						if (receivedBytes > MAX_ASSET_BYTES) {
							throw new Error(`Asset exceeds ${MAX_ASSET_BYTES} byte limit`);
						}
						let offset = 0;
						while (offset < chunk.byteLength) {
							const { bytesWritten } = await file.write(
								chunk,
								offset,
								chunk.byteLength - offset,
							);
							if (bytesWritten === 0) throw new Error('Could not write asset download');
							offset += bytesWritten;
						}
					}
				} finally {
					await file.close();
				}
				return {
					temporaryPath,
					contentType: response.headers.get('content-type')?.split(';')[0]?.trim(),
				};
			} catch (error) {
				await rm(temporaryPath, { force: true });
				lastError = error;
				if (attempt < MAX_DOWNLOAD_ATTEMPTS) await delay(250 * 2 ** (attempt - 1));
			}
		}
		throw lastError;
	});
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
		const cached = cachedFiles.find((file) => file === `${id}${OPTIMIZED_SUFFIX}`);
		if (cached) {
			const publicFiles = await readdir(publicDirectory).catch(() => []);
			if (!publicFiles.includes(cached)) {
				await copyFile(resolve(cacheDirectory, cached), resolve(publicDirectory, cached));
			}
			const metadata = await sharp(resolve(cacheDirectory, cached), {
				animated: true,
				limitInputPixels: false,
			}).metadata();
			return {
				src: `/changelog-images/${cached}`,
				width: metadata.width,
				height: metadata.pageHeight ?? metadata.height,
			};
		}

		const previousPath = previousImagesDirectory
			? resolve(previousImagesDirectory, `${id}${OPTIMIZED_SUFFIX}`)
			: undefined;
		if (previousPath) {
			const previousFiles = await readdir(previousImagesDirectory).catch((error) => {
				if (error?.code === 'ENOENT') return [];
				throw error;
			});
			const filename = `${id}${OPTIMIZED_SUFFIX}`;
			if (previousFiles.includes(filename)) {
				const cachePath = resolve(cacheDirectory, filename);
				await copyFile(previousPath, cachePath);
				await copyFile(previousPath, resolve(publicDirectory, filename));
				const metadata = await sharp(cachePath, {
					animated: true,
					limitInputPixels: false,
				}).metadata();
				return {
					src: `/changelog-images/${filename}`,
					width: metadata.width,
					height: metadata.pageHeight ?? metadata.height,
				};
			}
		}

		const asset = await fetchAsset(url, 'image/*');
		try {
			if (!asset.contentType || !SUPPORTED_TYPES.has(asset.contentType)) {
				throw new Error(`Unsupported image type: ${asset.contentType ?? 'unknown'}`);
			}

			const filename = `${id}${OPTIMIZED_SUFFIX}`;
			const cachePath = resolve(cacheDirectory, filename);
			const publicPath = resolve(publicDirectory, filename);
			const temporaryPath = `${cachePath}.tmp`;
			const info = asset.contentType === 'image/webp'
				? await sharp(asset.temporaryPath, {
						animated: true,
						limitInputPixels: false,
					}).metadata()
				: await sharp(asset.temporaryPath, { animated: true, autoOrient: true })
						.webp()
						.toFile(temporaryPath);
			if (asset.contentType === 'image/webp') {
				await copyFile(asset.temporaryPath, temporaryPath);
			}
			await rename(temporaryPath, cachePath);
			await copyFile(cachePath, publicPath);
			return {
				src: `/changelog-images/${filename}`,
				width: info.width,
				height: info.pageHeight ?? info.height,
			};
		} finally {
			await rm(asset.temporaryPath, { force: true });
		}
	})();

	downloads.set(id, job);
	try {
		return await job;
	} catch (error) {
		if (downloads.get(id) === job) downloads.delete(id);
		throw error;
	}
}

async function downloadVideo(url) {
	if (!isAllowedUrl(url)) return null;
	const id = cacheKey(url);
	const key = `video:${id}`;
	const existing = downloads.get(key);
	if (existing) return existing;

	const job = (async () => {
		await mkdir(cacheDirectory, { recursive: true });
		await mkdir(publicDirectory, { recursive: true });
		const cachedFiles = await readdir(cacheDirectory);
		const cached = cachedFiles.find((file) =>
			[...VIDEO_TYPES.values()].some((extension) => file === `${id}${extension}`),
		);
		if (cached) {
			await copyFile(resolve(cacheDirectory, cached), resolve(publicDirectory, cached));
			return `/changelog-images/${cached}`;
		}

		if (previousImagesDirectory) {
			const previousFiles = await readdir(previousImagesDirectory).catch(() => []);
			const previous = previousFiles.find((file) =>
				[...VIDEO_TYPES.values()].some((extension) => file === `${id}${extension}`),
			);
			if (previous) {
				await copyFile(resolve(previousImagesDirectory, previous), resolve(cacheDirectory, previous));
				await copyFile(resolve(previousImagesDirectory, previous), resolve(publicDirectory, previous));
				return `/changelog-images/${previous}`;
			}
		}

		const asset = await fetchAsset(url, 'video/*');
		try {
			const extension = asset.contentType ? VIDEO_TYPES.get(asset.contentType) : undefined;
			if (!extension) return null;
			const filename = `${id}${extension}`;
			await rename(asset.temporaryPath, resolve(cacheDirectory, filename));
			await copyFile(resolve(cacheDirectory, filename), resolve(publicDirectory, filename));
			return `/changelog-images/${filename}`;
		} finally {
			await rm(asset.temporaryPath, { force: true });
		}
	})();

	downloads.set(key, job);
	try {
		return await job;
	} catch (error) {
		if (downloads.get(key) === job) downloads.delete(key);
		throw error;
	}
}

function collectMarkdownImages(node, images) {
	if (node.type === 'image' && typeof node.url === 'string' && isCacheableUrl(node.url)) {
		images.push(node);
	}

	if (Array.isArray(node.children)) {
		for (const child of node.children) collectMarkdownImages(child, images);
	}
}

async function rewriteBatch(items, getUrl, setUrl, download = downloadImage) {
	for (let index = 0; index < items.length; index += 8) {
		await Promise.all(
			items.slice(index, index + 8).map(async (item) => {
				const url = getUrl(item);
				try {
					setUrl(item, await download(url));
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
			(image, asset) => {
				image.url = asset.src;
				image.data ??= {};
				image.data.hProperties = {
					...image.data.hProperties,
					width: asset.width,
					height: asset.height,
					loading: 'lazy',
					decoding: 'async',
				};
			},
		);
	};
}

function addImageProperties(properties, asset) {
	if (properties.width == null && properties.height == null) {
		properties.width = asset.width;
		properties.height = asset.height;
	} else if (typeof properties.width === 'number' && properties.height == null) {
		properties.height = Math.round((properties.width * asset.height) / asset.width);
	} else if (typeof properties.height === 'number' && properties.width == null) {
		properties.width = Math.round((properties.height * asset.width) / asset.height);
	}

	properties.loading = 'lazy';
	properties.decoding = 'async';
}

/** Rehype: cache raw HTML <img src> from release notes. */
export function rehypeCacheChangelogImages() {
	return async (tree) => {
		const images = [];
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'img') return;
			const src = node.properties?.src;
			if (typeof src === 'string' && isCacheableUrl(src)) images.push(node);
		});
		if (!images.length) return;
		await rewriteBatch(
			images,
			(node) => node.properties.src,
			(node, asset) => {
				node.properties.src = asset.src;
				addImageProperties(node.properties, asset);
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
	const files = await readdir(cacheDirectory).catch((error) => {
		if (error?.code === 'ENOENT') return [];
		throw error;
	});
	const images = files.filter(
		(file) => file.endsWith(OPTIMIZED_SUFFIX) || [...VIDEO_TYPES.values()].some((type) => file.endsWith(type)),
	);
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
	const tree = fromHtml(html, { fragment: true });
	await rehypeCacheChangelogImages()(tree);
	const videos = [];
	visit(tree, 'element', (node, index, parent) => {
		if (
			node.tagName === 'video' &&
			typeof node.properties?.src === 'string' &&
			typeof index === 'number' &&
			parent
		) {
			videos.push({ node, index, parent });
		}
	});
	await rewriteBatch(
		videos,
		({ node }) => node.properties.src,
		({ node, index, parent }, src) => {
			if (src) {
				node.properties.src = src;
				return;
			}
			const href = node.properties.src;
			parent.children[index] = {
				type: 'element',
				tagName: 'a',
				properties: { href, rel: ['noopener', 'noreferrer'] },
				children: [{ type: 'text', value: href }],
			};
		},
		downloadVideo,
	);
	return toHtml(tree);
}
