import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import rehypeObfuscateEmail from '../src/plugins/rehype-obfuscate-email.mjs';

test('email links reveal no readable address without JavaScript', async () => {
	const processor = await createMarkdownProcessor({ rehypePlugins: [rehypeObfuscateEmail] });
	const { code } = await processor.render(readFileSync('src/content/privacy.md', 'utf8'));

	expect(code).not.toContain('privacy@opentubex.org');
	expect(code).not.toContain('privacy [at]');
	expect(code).not.toContain('opentubex [dot] org');
	expect(code.match(/data-email=/g)).toHaveLength(2);
	expect(code.match(/Enable JavaScript to view email address/g)).toHaveLength(2);
});
