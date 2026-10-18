import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

function attributes(values: Record<string, string>) {
	return {
		getAttribute: (name: string) => values[name] ?? null,
		setAttribute: (name: string, value: string) => { values[name] = value; },
	};
}

test('theme changes keep phone screenshots limited to phone viewports', () => {
	let mobile = true;
	let viewportChanged = () => {};
	const sources = [
		{ media: '', ...attributes({ 'data-shot-theme': 'dark', 'data-shot-viewport': '(max-width: 640px)' }) },
		{ media: '', ...attributes({ 'data-shot-theme': 'dark' }) },
		{ media: '', ...attributes({ 'data-shot-theme': 'light', 'data-shot-viewport': '(max-width: 640px)' }) },
	];
	const imageValues: Record<string, string> = {
		'data-full-src-dark': '/laptop-dark.webp',
		'data-full-src-light': '/laptop-light.webp',
		'data-full-src-mobile-dark': '/phone-dark.webp',
		'data-full-src-mobile-light': '/phone-light.webp',
		'data-full-size': '1710x1026',
		'data-full-size-mobile': '1080x2340',
	};
	const window: { matchMedia: (query: string) => object; otxTheme?: { apply: (preference: string) => void } } = {
		matchMedia: (query) => query === '(max-width: 640px)'
			? { get matches() { return mobile; }, addEventListener: (_: string, listener: () => void) => { viewportChanged = listener; } }
			: { matches: true, addEventListener() {} },
	};
	runInNewContext(readFileSync('public/signal/theme.js', 'utf8'), {
		window,
		localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
		document: {
			documentElement: { dataset: {} },
			getElementById: () => null,
			querySelectorAll: (selector: string) => selector === 'source[data-shot-theme]'
				? sources
				: selector === 'img[data-shot]' ? [attributes(imageValues)] : [],
			addEventListener() {},
		},
	});

	window.otxTheme!.apply('dark');
	expect(sources.map((source) => source.media)).toEqual(['(max-width: 640px)', 'all', 'not all']);
	expect(imageValues).toMatchObject({ 'data-full-src': '/phone-dark.webp', 'data-full-width': '1080', 'data-full-height': '2340' });

	mobile = false;
	viewportChanged();
	expect(imageValues).toMatchObject({ 'data-full-src': '/laptop-dark.webp', 'data-full-width': '1710', 'data-full-height': '1026' });
});
