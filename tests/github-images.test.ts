import { expect, test } from 'bun:test';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const plugin = new URL('../src/plugins/remark-bundle-github-images.mjs', import.meta.url).href;
const id = '00000000-0000-0000-0000-000000000001';

for (const directory of ['_astro', 'feature-images']) {
	test(`reuses deployed images from ${directory} when GitHub is unavailable`, async () => {
		const fixture = await mkdtemp(join(tmpdir(), 'opentubex-github-images-'));
		try {
			const previous = join(fixture, 'previous-site');
			await mkdir(join(previous, directory), { recursive: true });
			const image = await sharp({
				create: { width: 3, height: 2, channels: 4, background: '#ff0000' },
			}).webp().toBuffer();
			await writeFile(join(previous, directory, `${id}.webp`), image);
			const result = JSON.parse(execFileSync(process.execPath, ['--eval', `
				globalThis.fetch = () => { throw new Error('GitHub must not be contacted for a deployed image'); };
				const { default: bundle, copyReusedGitHubImages } = await import(${JSON.stringify(plugin)});
				const node = { type: 'image', url: 'https://github.com/user-attachments/assets/${id}' };
				await bundle()({ type: 'root', children: [node] }, { path: '/src/content/extra-features.md' });
				const copied = await copyReusedGitHubImages('dist');
				console.log(JSON.stringify({ node, copied }));
			`], {
				cwd: fixture,
				env: { ...process.env, OPENTUBEX_PREVIOUS_SITE: previous },
				encoding: 'utf8',
			}));
			expect(result.node.url).toBe(`/${directory}/${id}.webp`);
			expect(result.node.data.hProperties).toMatchObject({ width: 3, height: 2 });
			expect(result.copied).toBe(1);
			expect(await readFile(join(fixture, 'dist', directory, `${id}.webp`))).toEqual(image);
		} finally {
			await rm(fixture, { recursive: true, force: true });
		}
	});
}

test('bundles GitHub attachments and media assets referenced by raw HTML', async () => {
	const fixture = await mkdtemp(join(tmpdir(), 'opentubex-github-images-'));
	try {
		const dark = '00000000-0000-0000-0000-000000000002';
		const light = '00000000-0000-0000-0000-000000000003';
		const video = '00000000-0000-0000-0000-000000000004';
		const media = '20260101T000000Z-example-0000000000';
		const cache = join(fixture, 'node_modules/.astro/github-images');
		await mkdir(cache, { recursive: true });
		const image = await sharp({
			create: { width: 3, height: 2, channels: 4, background: '#00ff00' },
		}).png().toBuffer();
		const clip = Buffer.from('not a real video');
		await Promise.all([
			...[dark, light].map((name) => writeFile(join(cache, `${name}.png`), image)),
			writeFile(join(cache, `${video}.mp4`), clip),
			writeFile(join(cache, `${media}.webp`), image),
		]);
		const result = JSON.parse(execFileSync(process.execPath, ['--eval', `
			globalThis.fetch = () => { throw new Error('GitHub must not be contacted for a cached image'); };
			const { default: bundle, copyExposedGitHubImages } = await import(${JSON.stringify(plugin)});
			const node = {
				type: 'html',
				value: [
					'<picture>',
					'  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/${dark}">',
					'  <source media="(prefers-color-scheme: light) and (width > 600px)" srcset="https://github.com/user-attachments/assets/${light}">',
					'  <img alt="src=https://github.com/user-attachments/assets/${dark}" src=https://github.com/user-attachments/assets/${dark}>',
					'</picture>',
					'<img src="https://github.com/OpenTubeX/media/releases/download/attachments/${media}.webp">',
					'<video src="https://github.com/user-attachments/assets/${video}"><source src="https://github.com/user-attachments/assets/${video}"></video>',
				].join('\\n'),
			};
			await bundle({ command: 'build' })({ type: 'root', children: [node] }, { path: '/src/content/extra-features.md' });
			const copied = await copyExposedGitHubImages('dist');
			console.log(JSON.stringify({ node, copied }));
		`], { cwd: fixture, encoding: 'utf8' }));
		expect(result.node.value).toContain(`srcset="/feature-images/${dark}.png"`);
		expect(result.node.value).toContain(`srcset="/feature-images/${light}.png"`);
		expect(result.node.value).toContain(` src=/feature-images/${dark}.png>`);
		expect(result.node.value).toContain(`<img src="/feature-images/${media}.webp">`);
		expect(result.node.value).toContain(`<video src="/feature-images/${video}.mp4"><source src="/feature-images/${video}.mp4">`);
		expect(result.node.value).toContain(`alt="src=https://github.com/user-attachments/assets/${dark}"`);
		expect(result.copied).toBe(4);
		expect(await readFile(join(fixture, 'dist/feature-images', `${light}.png`))).toEqual(image);
		expect(await readFile(join(fixture, 'dist/feature-images', `${video}.mp4`))).toEqual(clip);
	} finally {
		await rm(fixture, { recursive: true, force: true });
	}
});
