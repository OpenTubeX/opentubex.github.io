import { describe, expect, test } from 'bun:test';
import { createHash } from 'node:crypto';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { renderChangelogBodies } from '../src/lib/changelog-markdown';
import rehypeChangelogTweaks from '../src/plugins/rehype-changelog-tweaks.mjs';
import { cacheImagesInHtml } from '../src/plugins/remark-cache-changelog-images.mjs';

describe('renderChangelogBodies', () => {
	test('uses permanently cached GitHub reference types', async () => {
		const [html] = await renderChangelogBodies(['Shipped in #619']);

		expect(html).toContain('href="https://github.com/OpenTubeX/OpenTubeX/pull/619"');
	});

	test('embeds bare GitHub attachment video links', async () => {
		const attachment =
			'https://github.com/user-attachments/assets/0df65773-8f13-4c5e-90d6-2db9106dea98';
		const tree = fromHtml(`<p><a href="${attachment}">${attachment}</a></p>`, { fragment: true });
		rehypeChangelogTweaks()(tree);
		const html = toHtml(tree);

		expect(html).toContain(`<video src="${attachment}" controls playsinline preload="metadata">`);
		expect(html).not.toContain(`<a href="${attachment}"`);
	});

	test('leaves attachment links in sentences as links', async () => {
		const attachment =
			'https://github.com/user-attachments/assets/0df65773-8f13-4c5e-90d6-2db9106dea98';
		const [html] = await renderChangelogBodies([`Download ${attachment} here.`]);

		expect(html).not.toContain('<video');
		expect(html).toContain(`<a href="${attachment}"`);
	});

	test('caches GitHub release theme pictures and marks their variants', async () => {
		const dark =
			'https://github.com/OpenTubeX/media/releases/download/attachments/test-settings-dark.png';
		const light =
			'https://github.com/OpenTubeX/media/releases/download/attachments/test-settings-light.png';
		const cacheFilename = (url: string) =>
			`${createHash('sha1').update(url).digest('hex').slice(0, 20)}.optimized.webp`;
		const cachedFiles = [dark, light].map(cacheFilename);
		const png = Buffer.from(
			'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
			'base64',
		);
		const originalFetch = globalThis.fetch;
		let fetchCount = 0;
		globalThis.fetch = async () => {
			fetchCount += 1;
			const response = new Response(png, {
				headers: {
					'content-length': String(png.byteLength),
					'content-type': 'application/octet-stream',
				},
			});
			Object.defineProperty(response, 'url', {
				value: `https://release-assets.githubusercontent.com/test-${fetchCount}`,
			});
			return response;
		};

		try {
			const [html] = await renderChangelogBodies([
				`<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="${dark}">\n  <source media="(prefers-color-scheme: light)" srcset="${light}">\n  <img alt="Settings" src="${dark}">\n</picture>`,
			]);

			expect(fetchCount).toBe(2);
			expect(html).toContain(
				`<source media="(prefers-color-scheme: dark)" srcset="/changelog-images/${cachedFiles[0]}" data-changelog-theme="dark">`,
			);
			expect(html).toContain(
				`<source media="(prefers-color-scheme: light)" srcset="/changelog-images/${cachedFiles[1]}" data-changelog-theme="light">`,
			);
			expect(html).toContain(
				`<img alt="Settings" src="/changelog-images/${cachedFiles[0]}" width="1" height="1"`,
			);
		} finally {
			globalThis.fetch = originalFetch;
			await Promise.all(
				cachedFiles.flatMap((file) => [
					rm(resolve('.cache/changelog-images', file), { force: true }),
					rm(resolve('public/changelog-images', file), { force: true }),
				]),
			);
		}
	});

	test('restores standalone non-video attachments as links', async () => {
		const attachment =
			'https://github.com/user-attachments/assets/00000000-0000-4000-8000-000000000000';
		const originalFetch = globalThis.fetch;
		globalThis.fetch = async () => {
			const response = new Response(new Uint8Array([1, 2, 3]), {
				headers: { 'content-length': '3', 'content-type': 'image/png' },
			});
			Object.defineProperty(response, 'url', { value: attachment });
			return response;
		};

		try {
			const html = await cacheImagesInHtml(
				`<p><video src="${attachment}" controls></video></p>`,
			);
			expect(html).not.toContain('<video');
			expect(html).toContain(`<a href="${attachment}"`);
		} finally {
			globalThis.fetch = originalFetch;
		}
	});

	test('restores attachment links when video downloads fail', async () => {
		const attachment =
			'https://github.com/user-attachments/assets/00000000-0000-4000-8000-000000000001';
		const originalFetch = globalThis.fetch;
		const originalWarn = console.warn;
		globalThis.fetch = async () => {
			throw new Error('network unavailable');
		};
		console.warn = () => {};

		try {
			const html = await cacheImagesInHtml(
				`<p><video src="${attachment}" controls></video></p>`,
			);
			expect(html).not.toContain('<video');
			expect(html).toContain(`<a href="${attachment}"`);
		} finally {
			globalThis.fetch = originalFetch;
			console.warn = originalWarn;
		}
	});
});
