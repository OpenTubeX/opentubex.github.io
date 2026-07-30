import { mkdir, readdir, rename, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';

const attachmentPattern =
	/^https:\/\/github\.com\/user-attachments\/assets\/([a-f0-9-]+)$/;
const cacheDirectory = resolve('node_modules/.astro/github-images');
const downloads = new Map();

const extensions = new Map([
	['image/gif', '.gif'],
	['image/jpeg', '.jpg'],
	['image/png', '.png'],
	['image/webp', '.webp'],
]);

async function downloadImage(url, id, cachedFiles) {
	const cachedFile = cachedFiles.find((file) => file.startsWith(`${id}.`));
	if (cachedFile) return resolve(cacheDirectory, cachedFile);

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
		return path;
	})();

	downloads.set(id, download);
	return download;
}

function collectImages(node, images) {
	if (node.type === 'image' && typeof node.url === 'string') {
		const match = node.url.match(attachmentPattern);
		if (match) images.push({ node, url: node.url, id: match[1] });
	}

	if (Array.isArray(node.children)) {
		for (const child of node.children) collectImages(child, images);
	}
}

export default function remarkBundleGitHubImages() {
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
					const cachedPath = await downloadImage(image.url, image.id, cachedFiles);
					image.node.url = relative(sourceDirectory, cachedPath).split(sep).join('/');
				}),
			);
		}
	};
}
