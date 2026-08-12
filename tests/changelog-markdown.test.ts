import { describe, expect, test } from 'bun:test';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import { renderChangelogBodies } from '../src/lib/changelog-markdown';
import rehypeChangelogTweaks from '../src/plugins/rehype-changelog-tweaks.mjs';

describe('renderChangelogBodies', () => {
	test('uses permanently cached GitHub reference types', async () => {
		const [html] = await renderChangelogBodies(['Shipped in #619']);

		expect(html).toContain('href="https://github.com/OpenTubeX/OpenTubeX/pull/619"');
	});

	test('embeds bare GitHub attachment video links', async () => {
		const attachment =
			'https://github.com/user-attachments/assets/0df65773-8f13-4c5e-90d6-2db9106dea98';
		const tree = fromHtml(`<p><a href="${attachment}">${attachment}</a></p>`, { fragment: true });
		rehypeChangelogTweaks()(tree);
		const html = toHtml(tree);

		expect(html).toContain(`<video src="${attachment}" controls playsinline preload="metadata">`);
		expect(html).not.toContain(`<a href="${attachment}"`);
	});

	test('leaves attachment links in sentences as links', async () => {
		const attachment =
			'https://github.com/user-attachments/assets/0df65773-8f13-4c5e-90d6-2db9106dea98';
		const [html] = await renderChangelogBodies([`Download ${attachment} here.`]);

		expect(html).not.toContain('<video');
		expect(html).toContain(`<a href="${attachment}"`);
	});
});
