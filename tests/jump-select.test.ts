import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = new Bun.Transpiler({ loader: 'ts', target: 'browser' }).transformSync(
	readFileSync('src/scripts/jump-select.ts', 'utf8').replace('export {};', ''),
);

function picker(href: string, linkHref?: string) {
	let change = () => {};
	let clicks = 0;
	let focused = false;
	const location = { origin: 'https://opentubex.org', hash: '' };
	const target = {
		tabIndex: 0,
		focus(options: FocusOptions) {
			focused = options.preventScroll === true;
		},
	};
	const links = linkHref === undefined ? [] : [{
		origin: new URL(linkHref, location.origin).origin,
		getAttribute: () => linkHref,
		click: () => { clicks++; },
	}];
	const select = {
		value: href,
		closest: () => ({ querySelectorAll: () => links }),
		addEventListener: (_event: string, listener: () => void) => { change = listener; },
	};
	runInNewContext(script, {
		document: {
			querySelectorAll: () => [select],
			getElementById: (id: string) => id === 'section name' ? target : null,
		},
		window: { location },
	});
	change();
	return { clicks, focused, location, target };
}

test('the picker follows the matching same-origin index link', () => {
	expect(picker('/docs/installing/', '/docs/installing/').clicks).toBe(1);
});

test('the picker ignores destinations absent from its navigation links', () => {
	expect(picker('/unlisted/', '/docs/installing/').clicks).toBe(0);
});

test('the picker rejects external and non-path destinations', () => {
	for (const href of ['//example.org/', '/\\example.org/', 'https://example.org/', 'data:text/plain,hello', '']) {
		expect(picker(href, href).clicks).toBe(0);
	}
});

test('fragment navigation decodes the target and focuses it without another scroll', () => {
	const result = picker('#section%20name');
	expect(result.location.hash).toBe('#section%20name');
	expect(result.target.tabIndex).toBe(-1);
	expect(result.focused).toBe(true);
});

test('missing fragment targets leave navigation unchanged', () => {
	const result = picker('#missing');
	expect(result.location.hash).toBe('');
	expect(result.focused).toBe(false);
});
