import { describe, expect, test } from 'bun:test';
import { pageSources } from '../src/lib/sitemap-lastmod';

describe('pageSources', () => {
	test('maps guides to their Markdown file', () => {
		expect(pageSources('/docs/sync/')).toEqual(['src/content/guides/sync.md']);
	});

	test('includes the route file and data the page renders', () => {
		expect(pageSources('/')).toEqual(['src/pages/index.astro', 'src/data/release.ts']);
		expect(pageSources('/downloads/')).toEqual([
			'src/pages/downloads.astro',
			'src/pages/downloads/index.astro',
			'src/data/release.ts',
		]);
	});
});
