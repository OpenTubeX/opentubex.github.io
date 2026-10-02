import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

test('theme changes switch logo media without copying URLs from DOM attributes', () => {
	const sources = ['dark', 'dark'].map((theme) => ({
		media: '(prefers-color-scheme: dark)',
		srcset: `/assets/${theme}.svg`,
		getAttribute: () => theme,
	}));
	const storage = new Map<string, string>();
	const window: {
		matchMedia: () => { matches: boolean; addEventListener: () => void };
		otxTheme?: { apply: (preference: string) => void };
	} = { matchMedia: () => ({ matches: true, addEventListener() {} }) };
	runInNewContext(readFileSync('public/signal/theme.js', 'utf8'), {
		window,
		localStorage: {
			getItem: (key: string) => storage.get(key) ?? null,
			setItem: (key: string, value: string) => storage.set(key, value),
			removeItem: (key: string) => storage.delete(key),
		},
		document: {
			documentElement: { dataset: {} },
			getElementById: () => null,
			querySelectorAll: (selector: string) => selector === 'picture source[data-logo-theme]' ? sources : [],
			addEventListener() {},
		},
	});
	for (const [preference, media] of [['light', 'not all'], ['dark', 'all'], ['auto', 'all']]) {
		window.otxTheme!.apply(preference);
		expect(sources.map((source) => source.media)).toEqual([media, media]);
		expect(sources.map((source) => source.srcset)).toEqual(['/assets/dark.svg', '/assets/dark.svg']);
	}
});
