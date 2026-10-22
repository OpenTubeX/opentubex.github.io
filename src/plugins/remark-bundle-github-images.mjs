import { copyFile, mkdir, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import sharp from 'sharp';

const attachmentPattern =
	/^https:\/\/github\.com\/user-attachments\/assets\/([a-f0-9-]+)$/;
const attachmentUrlPattern = /https:\/\/github\.com\/user-attachments\/assets\/([a-f0-9-]+)/g;
const imageTagPattern = /<(img|source)\b[^>]*>/gi;
const imageAttributePattern = /\s(src|srcset)\s*=\s*(["'])(.*?)\2/gis;
const cacheDirectory = resolve('node_modules/.astro/github-images');
const publicDirectory = resolve('public/feature-images');
const previousSiteDirectory = process.env.OPENTUBEX_PREVIOUS_SITE
	? resolve(process.env.OPENTUBEX_PREVIOUS_SITE)
	: undefined;
const downloads = new Map();
const reusedAssets = new Map();
const exposedAssets = new Map();

const extensions = new Map([
	['image/gif', '.gif'],
	['image/jpeg', '.jpg'],
	['image/png', '.png'],
	['image/webp', '.webp'],
]);

async function downloadImage(url, id, cachedFiles) {
	const cachedFile = cachedFiles.find((file) => file.startsWith(`${id}.`));
	if (cachedFile) return { path: resolve(cacheDirectory, cachedFile) };

	for (const directory of previousSiteDirectory ? ['_astro', 'feature-images'] : []) {
		const previousAssetsDirectory = resolve(previousSiteDirectory, directory);
		const previousFiles = await readdir(previousAssetsDirectory).catch((error) => {
			if (error?.code === 'ENOENT') return [];
			throw error;
		});
		const previousFile = previousFiles.find(
			(file) => file.startsWith(`${id}.`) && /\.(?:gif|jpe?g|png|webp)$/i.test(file),
		);
		if (previousFile) {
			const previousPath = resolve(previousAssetsDirectory, previousFile);
			const metadata = await sharp(previousPath).metadata();
			const outputPath = `${directory}/${previousFile}`;
			reusedAssets.set(outputPath, previousPath);
			return {
				url: `/${outputPath}`,
				width: metadata.width,
				height: metadata.pageHeight ?? metadata.height,
				pages: metadata.pages,
			};
		}
	}

	const existingDownload = downloads.get(id);
	if (existingDownload) return existingDownload;

	const download = (async () => {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to download ${url}: ${response.status}`);
		}

		const contentType = response.headers.get('content-type')?.split(';')[0];
		const extension = contentType && extensions.get(contentType);
		if (!extension) {
			throw new Error(`Unsupported image type for ${url}: ${contentType ?? 'unknown'}`);
		}

		const path = resolve(cacheDirectory, `${id}${extension}`);
		const temporaryPath = `${path}.tmp`;
		await writeFile(temporaryPath, Buffer.from(await response.arrayBuffer()));
		await rename(temporaryPath, path);
		return { path };
	})();

	downloads.set(id, download);
	return download;
}

async function exposeCachedImage(asset) {
	if (!asset.path) return asset;

	await mkdir(publicDirectory, { recursive: true });
	const filename = basename(asset.path);
	await copyFile(asset.path, resolve(publicDirectory, filename));
	exposedAssets.set(filename, asset.path);
	const metadata = await sharp(asset.path).metadata();
	return {
		url: `/feature-images/${filename}`,
		width: metadata.width,
		height: metadata.pageHeight ?? metadata.height,
	};
}

/** Remove exposed copies before Astro serves or bundles public files. */
export async function clearExposedGitHubImages() {
	exposedAssets.clear();
	await rm(publicDirectory, { recursive: true, force: true });
}

/** Map image URLs in raw HTML; `<source src>` belongs to audio and video, not pictures. */
function mapImageSources(html, map) {
	return html.replace(imageTagPattern, (tag, tagName) =>
		tag.replace(imageAttributePattern, (attribute, name, quote, value) =>
			tagName.toLowerCase() === 'source' && name.toLowerCase() === 'src'
				? attribute
				: `${attribute.slice(0, -value.length - 1)}${map(value)}${quote}`,
		),
	);
}

function collectImages(node, images) {
	if (node.type === 'image' && typeof node.url === 'string') {
		const match = node.url.match(attachmentPattern);
		if (match) images.push({ node, url: node.url, id: match[1] });
	} else if (node.type === 'html' && typeof node.value === 'string') {
		mapImageSources(node.value, (value) => {
			for (const [url, id] of value.matchAll(attachmentUrlPattern)) {
				if (!images.some((image) => image.node === node && image.url === url)) {
					images.push({ node, url, id });
				}
			}
			return value;
		});
	}

	if (Array.isArray(node.children)) {
		for (const child of node.children) collectImages(child, images);
	}
}

export default function remarkBundleGitHubImages(options = {}) {
	return async (tree, file) => {
		const images = [];
		collectImages(tree, images);
		if (images.length === 0) return;

		await mkdir(cacheDirectory, { recursive: true });
		const cachedFiles = await readdir(cacheDirectory);
		const sourceDirectory = dirname(file.path);

		for (let index = 0; index < images.length; index += 8) {
			await Promise.all(
				images.slice(index, index + 8).map(async (image) => {
					const downloaded = await downloadImage(image.url, image.id, cachedFiles);
					const metadata = downloaded.path ? await sharp(downloaded.path).metadata() : undefined;
					// Astro only resolves relative paths for Markdown images, so raw HTML needs a public URL.
					const asset =
						image.node.type === 'html' ||
						options.command === 'dev' ||
						(downloaded.pages ?? metadata?.pages ?? 1) > 1
							? await exposeCachedImage(downloaded)
							: downloaded;
					if (image.node.type === 'html') {
						image.node.value = mapImageSources(image.node.value, (value) =>
							value.replaceAll(image.url, asset.url),
						);
						return;
					}
					image.node.url = asset.url ?? relative(sourceDirectory, asset.path).split(sep).join('/');
					if (asset.url) {
						image.node.data ??= {};
						image.node.data.hProperties = {
							...image.node.data.hProperties,
							width: asset.width,
							height: asset.height,
							loading: 'lazy',
							decoding: 'async',
						};
					}
				}),
			);
		}
	};
}

/** Copy feature images reused from the previous deployment into the new output. */
export async function copyReusedGitHubImages(distDirectory) {
	if (reusedAssets.size === 0) return 0;

	await Promise.all(
		[...reusedAssets].map(async ([file, source]) => {
			const outputPath = resolve(distDirectory, file);
			await mkdir(dirname(outputPath), { recursive: true });
			await copyFile(source, outputPath);
		}),
	);
	return reusedAssets.size;
}

/** Copy animated and raw HTML feature images that bypass Astro's image processing. */
export async function copyExposedGitHubImages(distDirectory) {
	if (exposedAssets.size === 0) return 0;

	const outputDirectory = resolve(distDirectory, 'feature-images');
	await mkdir(outputDirectory, { recursive: true });
	await Promise.all(
		[...exposedAssets].map(([file, source]) => copyFile(source, resolve(outputDirectory, file))),
	);
	return exposedAssets.size;
}
