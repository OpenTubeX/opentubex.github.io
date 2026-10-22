import { expect, test } from 'bun:test';
import { copyFile, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { fromHtml } from 'hast-util-from-html';
import { addJxlSources, generateJpegXl } from '../src/plugins/jpeg-xl.mjs';

const convert = async (url: string) => url.endsWith('.webp') ? `${url}.jxl` : undefined;

function picture(html: string) {
	const tree = fromHtml(html, { fragment: true });
	return tree.children[0] as { children: { tagName: string; properties: Record<string, string> }[] };
}

test('prefers JXL ahead of AVIF while retaining theme and responsive WebP fallbacks', async () => {
	const html = '<picture><source type="image/avif" srcset="/dark.avif" media="(prefers-color-scheme: dark)"><source type="image/webp" data-shot-theme="dark" media="(prefers-color-scheme: dark)" sizes="50vw" srcset="/small.webp 400w, /large.webp 800w"><source type="image/webp" data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/light.webp"><img src="/dark.webp" alt="Screenshot" width="800" loading="lazy"></picture>';
	const output = await addJxlSources(html, convert);
	const children = picture(output).children;
	expect(children.slice(0, 2).map((node) => node.properties.type)).toEqual(['image/jxl', 'image/jxl']);
	expect(children[0].properties).toMatchObject({ dataShotTheme: 'dark', media: '(prefers-color-scheme: dark)', sizes: '50vw', srcSet: '/small.webp.jxl 400w, /large.webp.jxl 800w' });
	expect(children[1].properties.dataShotTheme).toBe('light');
	expect(children.at(-1)?.properties).toMatchObject({ src: '/dark.webp', alt: 'Screenshot', loading: 'lazy' });
	expect(await addJxlSources(output, convert)).toBe(output);
});

test('wraps standalone images and leaves SVG and unavailable variants alone', async () => {
	const output = await addJxlSources('<img src="/shot.webp" width="500"><img src="/logo.svg">', convert);
	expect(output).toContain('style="display: contents"');
	expect(output).toContain('srcset="/shot.webp.jxl"');
	expect(output).toContain('</picture><img src="/logo.svg">');
	const incomplete = await addJxlSources('<picture><source srcset="/shot.webp 1x, /missing.png 2x"><img src="/shot.webp"></picture>', convert);
	expect(incomplete).not.toContain('image/jxl');
});

test('keeps phone screenshot sources ahead of desktop sources', async () => {
	const html = '<picture><source type="image/webp" data-shot-theme="dark" data-shot-viewport="(max-width: 640px)" media="(max-width: 640px) and (prefers-color-scheme: dark)" srcset="/phone.webp"><source type="image/webp" data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/laptop.webp"><img src="/laptop.webp" alt="Screenshot"></picture>';
	const children = picture(await addJxlSources(html, convert)).children;
	expect(children[0].properties).toMatchObject({ dataShotViewport: '(max-width: 640px)', srcSet: '/phone.webp.jxl' });
	expect(children[1].properties.dataShotViewport).toBeUndefined();
});

test('generated progressive JXL preserves screenshot detail and keeps WebP fallback', async () => {
	const directory = await mkdtemp(join(tmpdir(), 'jxl-test-'));
	try {
		const input = join(directory, 'shot.webp');
		await copyFile('src/assets/screenshots/opentubex-1-dark.webp', input);
		await writeFile(join(directory, 'index.html'), '<img src="/shot.webp" alt="Test">');
		const result = await generateJpegXl(directory, join(directory, 'cache'));
		expect(result.count).toBe(1);
		execFileSync('djxl', [input + '.jxl', join(directory, 'decoded.png'), '--quiet']);
		const decoded = await sharp(join(directory, 'decoded.png')).removeAlpha().raw().toBuffer();
		const original = await sharp(input).removeAlpha().raw().toBuffer();
		expect(decoded.length).toBe(original.length);
		const mse = decoded.reduce((sum, value, index) => sum + (value - original[index]) ** 2, 0) / decoded.length;
		const psnr = 10 * Math.log10(255 ** 2 / mse);
		expect(psnr).toBeGreaterThan(39);
		expect(await readFile(join(directory, 'index.html'), 'utf8')).toContain('src="/shot.webp"');
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
});

test('prefers progressive JXL even when the WebP is smaller', async () => {
	const directory = await mkdtemp(join(tmpdir(), 'jxl-size-test-'));
	try {
		await sharp({ create: { width: 100, height: 100, channels: 4, background: '#12345680' } })
			.webp({ lossless: true }).toFile(join(directory, 'tiny.webp'));
		await writeFile(join(directory, 'index.html'), '<img src="/tiny.webp">');
		const result = await generateJpegXl(directory, join(directory, 'cache'));
		expect(result.count).toBe(1);
		expect(result.savedBytes).toBeLessThan(0);
		expect(await readFile(join(directory, 'index.html'), 'utf8')).toContain('type="image/jxl"');
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
});
