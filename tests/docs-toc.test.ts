import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = new Bun.Transpiler({ loader: 'ts', target: 'browser' }).transformSync(
	readFileSync('src/scripts/docs-toc.ts', 'utf8').replace('export {};', ''),
);

function setup(initialScroll = 0, ids = ['first', 'second', 'last']) {
	const listeners = new Map<string, () => void>();
	const frames: (() => void)[] = [];
	const window = {
		scrollY: initialScroll,
		innerHeight: 800,
		addEventListener: (event: string, listener: () => void) => { listeners.set(event, listener); },
	};
	const links = ids.map((id) => {
		const classes = new Set<string>();
		const attributes = new Map<string, string>();
		return {
			hash: `#${id}`,
			classList: { toggle: (name: string, on: boolean) => { on ? classes.add(name) : classes.delete(name); } },
			setAttribute: (name: string, value: string) => { attributes.set(name, value); },
			removeAttribute: (name: string) => { attributes.delete(name); },
			get active() { return classes.has('is-active'); },
			get current() { return attributes.get('aria-current'); },
		};
	});
	const guide = { active: true, current: 'page' };
	const select = { value: '/docs/installing/' };
	const headings = ['first', 'second', 'last'].map((id, index) => ({
		id,
		getBoundingClientRect: () => ({ top: [300, 1300, 2800][index] - window.scrollY }),
	}));
	const toc = {
		querySelectorAll: (selector: string) => selector === 'a[href^="#"]' ? links : [guide, ...links],
		querySelector: () => select,
	};
	const document = {
		documentElement: { scrollHeight: 3200 },
		querySelector: () => toc,
		getElementById: (id: string) => headings.find((heading) => heading.id === id) ?? null,
	};
	const style = { scrollMarginTop: '92px' };
	runInNewContext(script, {
		document,
		window,
		getComputedStyle: () => style,
		requestAnimationFrame: (callback: () => void) => { frames.push(callback); },
	});

	function flush() { frames.splice(0).forEach((callback) => callback()); }
	function scroll(top: number) {
		window.scrollY = top;
		listeners.get('scroll')?.();
		flush();
	}
	flush();
	return { links, guide, select, style, listeners, frames, flush, scroll };
}

test('the current section is highlighted on load without clearing the current guide', () => {
	const { links, guide, select } = setup();
	expect(links.map((link) => link.active)).toEqual([true, false, false]);
	expect(links[0].current).toBe('location');
	expect(guide).toEqual({ active: true, current: 'page' });
	expect(select.value).toBe('#first');
});

test('scrolling updates the section and keeps it active between headings', () => {
	const { links, select, scroll } = setup();
	scroll(1250);
	expect(links.map((link) => link.active)).toEqual([false, true, false]);
	expect(links[0].current).toBeUndefined();
	expect(links[1].current).toBe('location');
	expect(select.value).toBe('#second');
	scroll(2000);
	expect(links[1].active).toBe(true);
	scroll(500);
	expect(links.map((link) => link.active)).toEqual([true, false, false]);
});

test('a restored scroll position highlights the section on initialization', () => {
	expect(setup(1500).links[1].active).toBe(true);
});

test('the last section becomes active at the bottom even if its heading cannot reach the top', () => {
	const { links, scroll } = setup();
	scroll(2400);
	expect(links.map((link) => link.active)).toEqual([false, false, true]);
});

test('resizing reevaluates the heading offset and scroll events share one animation frame', () => {
	const { links, style, listeners, frames, flush } = setup(1150);
	expect(links[0].active).toBe(true);
	style.scrollMarginTop = '160px';
	listeners.get('resize')?.();
	listeners.get('scroll')?.();
	listeners.get('scroll')?.();
	expect(frames).toHaveLength(1);
	flush();
	expect(links[1].active).toBe(true);
});

test('pages with no section targets keep their guide selection and add no listeners', () => {
	const { select, listeners } = setup(0, ['missing']);
	expect(select.value).toBe('/docs/installing/');
	expect(listeners.size).toBe(0);
});
