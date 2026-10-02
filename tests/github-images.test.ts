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
