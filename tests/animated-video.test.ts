import { expect, test } from 'bun:test';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { fromHtml } from 'hast-util-from-html';
import { convertAnimatedImages, replaceAnimatedImages } from '../src/plugins/animated-video.mjs';

type Node = { tagName?: string; properties?: Record<string, unknown>; children?: Node[] };

const convert = async (url: string) =>
	url.includes('animated') ? { url: url.replace(/\.webp$/, '.mp4'), width: 800, height: 600 } : undefined;

function elements(html: string, tagName: string) {
	const found: Node[] = [];
	const visit = (node: Node) => {
		if (node.tagName === tagName) found.push(node);
		node.children?.forEach(visit);
	};
	visit(fromHtml(html, { fragment: true }) as Node);
	return found;
}

test('replaces themed animated pictures with one lazily played video per theme', async () => {
	const html = '<p><picture><source media="(prefers-color-scheme: dark)" srcset="/animated-dark.webp" data-changelog-theme="dark"><source media="(prefers-color-scheme: light)" srcset="/animated-light.webp" data-changelog-theme="light"><img src="/animated-dark.webp" alt="Swipe demo" width="139" height="300" loading="lazy"></picture></p>';
	const videos = elements(await replaceAnimatedImages(html, convert), 'video');
	expect(videos.map((video) => video.properties)).toEqual([
		expect.objectContaining({ src: '/animated-dark.mp4', dataAnimationTheme: 'dark', ariaLabel: 'Swipe demo', width: 139, height: 300, preload: 'none', muted: true, loop: true, playsInline: true, className: ['animation'] }),
		expect.objectContaining({ src: '/animated-light.mp4', dataAnimationTheme: 'light', dataFullWidth: '800', dataFullHeight: '600' }),
	]);
});

test('uses the fallback image for a theme without its own source', async () => {
	const html = '<picture><source media="(prefers-color-scheme: dark)" srcset="/animated-dark.webp"><img src="/animated-light.webp" alt=""></picture>';
	const videos = elements(await replaceAnimatedImages(html, convert), 'video');
	expect(videos.map((video) => [video.properties?.dataAnimationTheme, video.properties?.src])).toEqual([
		['dark', '/animated-dark.mp4'],
		['light', '/animated-light.mp4'],
	]);
	expect(videos[0].properties?.ariaLabel).toBeUndefined();
});

test('leaves static, partially animated and responsive images alone', async () => {
	const html = [
		'<img src="/static.webp" alt="Static">',
		'<picture><source media="(prefers-color-scheme: dark)" srcset="/animated-dark.webp"><img src="/static.webp"></picture>',
		'<picture><source type="image/avif" srcset="/animated-small.webp 400w, /animated-large.webp 800w"><img src="/animated.webp"></picture>',
	].join('');
	expect(await replaceAnimatedImages(html, convert)).toBe(html);
	expect(await replaceAnimatedImages('<p><img class="shot" src="/animated.webp" alt="Demo"></p>', convert)).toContain('<video class="shot animation" src="/animated.mp4"');
});

test('encodes opaque animations as smaller MP4 and keeps transparent or static images', async () => {
	const directory = await mkdtemp(join(tmpdir(), 'animated-video-test-'));
	try {
		// Static texture with a moving square: costly for lossless WebP, cheap for inter-frame video.
		let seed = 1;
		const texture = Buffer.from(Array.from({ length: 320 * 180 * 3 }, () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) >> 23));
		const frames = (alpha: number) => Promise.all(Array.from({ length: 24 }, (_, index) =>
			sharp(texture, { raw: { width: 320, height: 180, channels: 3 } })
				.composite([{ input: { create: { width: 40, height: 40, channels: 3, background: '#fff' } }, left: index * 10, top: 70 }])
				.removeAlpha()
				.ensureAlpha(alpha)
				.png()
				.toBuffer()));
		const animate = async (alpha: number, file: string) =>
			sharp(await frames(alpha), { join: { animated: true } }).webp({ lossless: true, delay: Array(24).fill(40) }).toFile(join(directory, file));
		await animate(1, 'opaque.webp');
		await animate(0.5, 'transparent.webp');
		await sharp({ create: { width: 100, height: 100, channels: 3, background: '#123456' } }).webp().toFile(join(directory, 'static.webp'));
		await writeFile(join(directory, 'index.html'), '<img src="/opaque.webp" alt="Opaque" width="320" height="180"><img src="/transparent.webp" alt="Transparent"><img src="/static.webp" alt="Static">');

		const result = await convertAnimatedImages(directory, join(directory, 'cache'));
		expect(result.count).toBe(1);
		expect(result.savedBytes).toBeGreaterThan(0);
		expect((await stat(join(directory, 'opaque.mp4'))).size).toBeLessThan((await stat(join(directory, 'opaque.webp'))).size);
		const html = await readFile(join(directory, 'index.html'), 'utf8');
		expect(html).toContain('<video class="animation" src="/opaque.mp4" width="320" height="180" style="aspect-ratio: 320 / 180" aria-label="Opaque"');
		expect(html).toContain('<img src="/transparent.webp"');
		expect(html).toContain('<img src="/static.webp"');
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
}, 30_000);
