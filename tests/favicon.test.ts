import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

test('the conventional favicon URL serves an ICO asset instead of an HTML redirect', () => {
	const config = readFileSync('astro.config.mjs', 'utf8');
	expect(config).not.toMatch(/['"]\/favicon\.ico['"]\s*:/);

	const icon = readFileSync('public/favicon.ico');
	expect(icon.subarray(0, 4)).toEqual(Buffer.from([0, 0, 1, 0]));
	const count = icon.readUInt16LE(4);
	expect(count).toBeGreaterThan(0);
	const sizes: number[] = [];
	for (let index = 0; index < count; index++) {
		const entry = 6 + index * 16;
		const width = icon[entry] || 256;
		const height = icon[entry + 1] || 256;
		expect(width).toBe(height);
		const length = icon.readUInt32LE(entry + 8);
		const offset = icon.readUInt32LE(entry + 12);
		expect(offset).toBeGreaterThanOrEqual(6 + count * 16);
		expect(offset + length).toBeLessThanOrEqual(icon.length);
		const png = icon.subarray(offset, offset + length);
		expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
		expect(png.readUInt32BE(16)).toBe(width);
		expect(png.readUInt32BE(20)).toBe(height);
		sizes.push(width);
	}
	expect(sizes).toEqual(expect.arrayContaining([16, 32, 48]));
});

test('the shared layout advertises an ICO fallback and the SVG favicon', () => {
	const layout = readFileSync('src/layouts/SignalLayout.astro', 'utf8');
	const icons = [...layout.matchAll(/<link\b[^>]*\brel="icon"[^>]*>/g)].map(([tag]) => tag);
	expect(icons.some((tag) => tag.includes('href="/favicon.ico"') && tag.includes('type="image/x-icon"'))).toBe(true);
	expect(icons.some((tag) => tag.includes('href="/favicon.svg"') && tag.includes('type="image/svg+xml"'))).toBe(true);
});
