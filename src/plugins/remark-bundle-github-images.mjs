import { access, copyFile, mkdir, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, relative, resolve, sep } from 'node:path';
import sharp from 'sharp';

// Attachments uploaded to GitHub issues and pull requests, and release assets of the media repository.
const mediaUrlSource = String.raw`https://github\.com/(?:user-attachments/assets/([a-f0-9-]+)|OpenTubeX/media/releases/download/[\w.-]+/([\w-]+)\.(?:gif|jpe?g|png|webp|mp4|webm|mov))`;
const attachmentPattern = new RegExp(`^${mediaUrlSource}$`, 'i');
const attachmentUrlPattern = new RegExp(mediaUrlSource, 'gi');
const mediaTagPattern = /<(img|source|video)\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
const attributePattern = /(\s([^\s"'>/=]+)\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
const cacheDirectory = resolve('node_modules/.astro/github-images');
const optimizedDirectory = resolve(cacheDirectory, 'webp');
const publicDirectory = resolve('public/feature-images');
const previousSiteDirectory = process.env.OPENTUBEX_PREVIOUS_SITE
	? resolve(process.env.OPENTUBEX_PREVIOUS_SITE)
	: undefined;
const downloads = new Map();
const reusedAssets = new Map();
const exposedAssets = new Map();
const optimizedImages = new Map();

const extensions = new Map([
	['image/gif', '.gif'],
	['image/jpeg', '.jpg'],
	['image/png', '.png'],
	['image/webp', '.webp'],
	['video/mp4', '.mp4'],
	['video/webm', '.webm'],
	['video/quicktime', '.mov'],
]);
const imageFilePattern = /\.(?:gif|jpe?g|png|webp)$/i;
const videoFilePattern = /\.(?:mp4|webm|mov)$/i;

/** Release assets download as `application/octet-stream`, so fall back to the URL's extension. */
function mediaExtension(url, contentType) {
	const extension = contentType && extensions.get(contentType);
	if (extension) return extension;
	const urlExtension = extname(new URL(url).pathname).toLowerCase().replace('.jpeg', '.jpg');
	return [...extensions.values()].includes(urlExtension) ? urlExtension : undefined;
}

async function imageSize(path) {
	if (videoFilePattern.test(path)) return {};
	const metadata = await sharp(path).metadata();
	return { width: metadata.width, height: metadata.pageHeight ?? metadata.height, pages: metadata.pages };
}

/**
 * Animated images get an MP4 sibling with the same name after the build, so only
 * files of the referenced kind may stand in for the original.
 */
async function downloadImage(url, id, cachedFiles, kind) {
	const filePattern = kind === 'video' ? videoFilePattern : imageFilePattern;
	const matches = (file) => file.startsWith(`${id}.`) && filePattern.test(file);
	const cachedFile = cachedFiles.find(matches);
	if (cachedFile) return { path: resolve(cacheDirectory, cachedFile) };

	for (const directory of previousSiteDirectory ? ['_astro', 'feature-images'] : []) {
		const previousAssetsDirectory = resolve(previousSiteDirectory, directory);
		const previousFiles = await readdir(previousAssetsDirectory).catch((error) => {
			if (error?.code === 'ENOENT') return [];
			throw error;
		});
		const previousFile = previousFiles.find(matches);
		if (previousFile) {
			const previousPath = resolve(previousAssetsDirectory, previousFile);
			// Deployments before WebP conversion exposed originals, so convert those like a fresh download.
			if (directory === 'feature-images' && !/\.(?:webp|mp4|webm|mov)$/i.test(previousFile)) {
				const path = resolve(cacheDirectory, previousFile);
				await copyFile(previousPath, path);
				return { path };
			}
			const outputPath = `${directory}/${previousFile}`;
			reusedAssets.set(outputPath, previousPath);
			return { url: `/${outputPath}`, ...(await imageSize(previousPath)) };
		}
	}

	const existingDownload = downloads.get(`${kind}:${id}`);
	if (existingDownload) return existingDownload;

	const download = (async () => {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to download ${url}: ${response.status}`);
		}

		const contentType = response.headers.get('content-type')?.split(';')[0];
		const extension = mediaExtension(url, contentType);
		if (!extension) {
			throw new Error(`Unsupported media type for ${url}: ${contentType ?? 'unknown'}`);
		}

		const path = resolve(cacheDirectory, `${id}${extension}`);
		const temporaryPath = `${path}.tmp`;
		await writeFile(temporaryPath, Buffer.from(await response.arrayBuffer()));
		await rename(temporaryPath, path);
		return { path };
	})();

	downloads.set(`${kind}:${id}`, download);
	return download;
}

/** Encode like changelog images; animated WebP still becomes MP4 after the build when that is smaller. */
function optimizeImage(path) {
	if (videoFilePattern.test(path) || path.endsWith('.webp')) return path;
	if (!optimizedImages.has(path)) {
		optimizedImages.set(path, (async () => {
			const output = resolve(optimizedDirectory, `${basename(path, extname(path))}.webp`);
			if (await access(output).then(() => true, () => false)) return output;
			await mkdir(optimizedDirectory, { recursive: true });
			const temporaryPath = `${output}.tmp`;
			await sharp(path, { animated: true, autoOrient: true }).webp().toFile(temporaryPath);
			await rename(temporaryPath, output);
			return output;
		})());
	}
	return optimizedImages.get(path);
}

async function exposeCachedImage(asset) {
	if (!asset.path) return asset;

	await mkdir(publicDirectory, { recursive: true });
	const path = await optimizeImage(asset.path);
	const filename = basename(path);
	await copyFile(path, resolve(publicDirectory, filename));
	exposedAssets.set(filename, path);
	return { url: `/feature-images/${filename}`, ...(await imageSize(path)) };
}

/** Remove exposed copies before Astro serves or bundles public files. */
export async function clearExposedGitHubImages() {
	exposedAssets.clear();
	await rm(publicDirectory, { recursive: true, force: true });
}

/** Map media URLs in raw HTML: image `src` and `srcset`, and video and `<source>` `src`. */
function mapImageSources(html, map) {
	return html.replace(mediaTagPattern, (tag, tagName) =>
		tag.replace(attributePattern, (attribute, prefix, name, double, single, bare) => {
			const attributeName = name.toLowerCase();
			if (attributeName !== 'srcset' && attributeName !== 'src') return attribute;
			// `<source src>` belongs to video and audio, `<source srcset>` to pictures.
			const element = tagName.toLowerCase();
			const kind = element === 'video' || (element === 'source' && attributeName === 'src') ? 'video' : 'image';
			const quote = double != null ? '"' : single != null ? "'" : '';
			return `${prefix}${quote}${map(double ?? single ?? bare, kind)}${quote}`;
		}),
	);
}

function collectImages(node, images) {
	if (node.type === 'image' && typeof node.url === 'string') {
		const match = node.url.match(attachmentPattern);
		if (match) images.push({ node, url: node.url, id: match[1] ?? match[2], kind: 'image' });
	} else if (node.type === 'html' && typeof node.value === 'string') {
		mapImageSources(node.value, (value, kind) => {
			for (const [url, attachmentId, mediaId] of value.matchAll(attachmentUrlPattern)) {
				if (!images.some((image) => image.node === node && image.url === url && image.kind === kind)) {
					images.push({ node, url, id: attachmentId ?? mediaId, kind });
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
					const downloaded = await downloadImage(image.url, image.id, cachedFiles, image.kind);
					const metadata = downloaded.path ? await imageSize(downloaded.path) : undefined;
					// Astro only resolves relative paths for Markdown images, so raw HTML needs a public URL.
					const asset =
						image.node.type === 'html' ||
						options.command === 'dev' ||
						(downloaded.pages ?? metadata?.pages ?? 1) > 1
							? await exposeCachedImage(downloaded)
							: downloaded;
					if (image.node.type === 'html') {
						image.node.value = mapImageSources(image.node.value, (value, kind) =>
							kind === image.kind ? value.replaceAll(image.url, asset.url) : value,
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

/** Copy animated and raw HTML feature images, which bypass Astro's image pipeline. */
export async function copyExposedGitHubImages(distDirectory) {
	if (exposedAssets.size === 0) return 0;

	const outputDirectory = resolve(distDirectory, 'feature-images');
	await mkdir(outputDirectory, { recursive: true });
	await Promise.all(
		[...exposedAssets].map(([file, source]) => copyFile(source, resolve(outputDirectory, file))),
	);
	return exposedAssets.size;
}
