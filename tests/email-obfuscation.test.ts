import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import rehypeObfuscateEmail from '../src/plugins/rehype-obfuscate-email.mjs';

test('privacy contact details stay encoded in checked-in content and tests', () => {
	const content = readFileSync('src/content/privacy.md', 'utf8');
	expect(content).not.toMatch(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
	expect(content.match(/protected-email:/g)).toHaveLength(2);
	const encoded = content.match(/protected-email:([\da-i.]+)/)?.[1];
	expect(encoded).toBeDefined();
	const address = String.fromCharCode(...encoded!.split('.').map(value => parseInt(value, 19))).slice('mailto:'.length);
	for (const directory of ['src', 'tests']) {
		for (const file of new Bun.Glob('**/*').scanSync({ cwd: directory, onlyFiles: true })) {
			expect(readFileSync(`${directory}/${file}`, 'utf8')).not.toContain(address);
		}
	}
});

test('email links reveal no readable address without JavaScript', async () => {
	const processor = await createMarkdownProcessor({ rehypePlugins: [rehypeObfuscateEmail] });
	const { code } = await processor.render(readFileSync('src/content/privacy.md', 'utf8'));

	expect(code).not.toMatch(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i);
	expect(code).not.toContain('protected-email:');
	expect(code.match(/<button[^>]*data-email-reveal=/g)).toHaveLength(2);
	expect(code.match(/<button[^>]*hidden/g)).toHaveLength(2);
	expect(code.match(/aria-hidden="true"/g)).toHaveLength(2);
	expect(code.match(/Show email address/g)).toHaveLength(2);
	expect(code.match(/<noscript>/g)).toHaveLength(2);
	expect(code.match(/Enable JavaScript to view email address/g)).toHaveLength(2);
});

test('email protection preserves the full destination and leaves other links unchanged', async () => {
	const processor = await createMarkdownProcessor({ rehypePlugins: [rehypeObfuscateEmail] });
	const href = 'mailto:hello@example.org?subject=Grüße%20👋';
	const encodedHref = href.split('').map(char => char.charCodeAt(0).toString(19)).join('.');
	const { code } = await processor.render(`[Email](protected-email:${encodedHref}) [Website](https://example.org) [Empty](mailto:)`);
	const encoded = code.match(/data-email-reveal="([^"]+)"/)?.[1];
	expect(encoded).toBeDefined();
	expect(decodeURI(String.fromCharCode(...encoded!.split('.').map(value => parseInt(value, 19))))).toBe(decodeURI(href));
	expect(code).toContain('<a href="https://example.org">Website</a>');
	expect(code).toContain('<a href="mailto:">Empty</a>');
});

test('page load keeps addresses encoded and activation reveals only the selected link with focus', async () => {
	const processor = await createMarkdownProcessor({ rehypePlugins: [rehypeObfuscateEmail] });
	const href = 'mailto:hello@example.org?subject=Feedback';
	const encodedHref = href.split('').map(char => char.charCodeAt(0).toString(19)).join('.');
	const { code } = await processor.render(`[Email](protected-email:${encodedHref}) [Other](mailto:other@example.org)`);
	const buttons = [...code.matchAll(/data-email-reveal="([^"]+)"/g)].map((match) => {
		let click = () => {};
		let replacement: typeof link | undefined;
		const button = {
			hidden: true,
			dataset: { emailReveal: match[1] },
			addEventListener(event: string, listener: () => void, options: AddEventListenerOptions) {
				expect(event).toBe('click');
				expect(options.once).toBe(true);
				click = listener;
			},
			replaceWith(value: typeof link) { replacement = value; },
		};
		return { button, click: () => click(), get replacement() { return replacement; } };
	});
	const link = { href: '', textContent: '', focused: false, focus() { this.focused = true; } };
	let created = 0;
	const script = new Bun.Transpiler({ loader: 'ts', target: 'browser' }).transformSync(
		readFileSync('src/scripts/email-reveal.ts', 'utf8').replace('export {};', ''),
	);
	runInNewContext(script, {
		document: {
			querySelectorAll: () => buttons.map(({ button }) => button),
			createElement: () => { created++; return link; },
		},
	});
	expect(created).toBe(0);
	expect(buttons.every(({ button, replacement }) => !button.hidden && !replacement)).toBe(true);
	buttons[0].click();
	expect(link.href).toBe(href);
	expect(link.textContent).toBe('hello@example.org');
	expect(link.focused).toBe(true);
	expect(buttons[0].replacement).toBe(link);
	expect(buttons[1].replacement).toBeUndefined();
});
