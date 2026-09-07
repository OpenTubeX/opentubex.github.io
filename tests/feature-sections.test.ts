import { describe, expect, test } from 'bun:test';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import rehypeFeatureSections from '../src/plugins/rehype-feature-sections.mjs';

describe('feature sections', () => {
	test('keeps each description and its media with the correct feature', () => {
		const tree = fromHtml('<h2 id="playback">Playback</h2><h3 id="captions">Captions</h3><p>Translate captions.</p><img src="captions.webp" alt="Captions"><h3 id="speed">Speed</h3><p>Adjust speed.</p><h2 id="appearance">Appearance</h2><h3 id="themes">Themes</h3><video src="theme.webm" controls></video>', { fragment: true });
		rehypeFeatureSections()(tree, { path: '/src/content/extra-features.md' });
		expect(toHtml(tree)).toBe('<div class="feature-category"><h2 id="playback" hidden>Playback</h2><section class="feature-entry"><h3 id="captions">Captions</h3><p>Translate captions.</p><img src="captions.webp" alt="Captions"></section><section class="feature-entry"><h3 id="speed">Speed</h3><p>Adjust speed.</p></section></div><div class="feature-category"><h2 id="appearance" hidden>Appearance</h2><section class="feature-entry"><h3 id="themes">Themes</h3><video src="theme.webm" controls></video></section></div>');
	});

	test('does not restructure other Markdown pages', () => {
		const tree = fromHtml('<h2>Privacy</h2><h3>Storage</h3><p>Your settings.</p>', { fragment: true });
		const original = toHtml(tree);
		rehypeFeatureSections()(tree, { path: '/src/content/privacy.md' });
		expect(toHtml(tree)).toBe(original);
	});
});
