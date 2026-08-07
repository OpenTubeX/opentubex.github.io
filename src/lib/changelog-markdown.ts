import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import remarkGithubAlerts from '../plugins/remark-github-alerts.mjs';
import remarkGithubReferences from '../plugins/remark-github-references.mjs';
import {
	cacheImagesInHtml,
	rehypeCacheChangelogImages,
	remarkCacheChangelogImages,
} from '../plugins/remark-cache-changelog-images.mjs';
import rehypeChangelogTweaks from '../plugins/rehype-changelog-tweaks.mjs';
import { resolveGithubRefTypes, type GithubRefKind } from './github-ref-types';

async function createProcessor(refTypes: Map<number, GithubRefKind>) {
	return createMarkdownProcessor({
		syntaxHighlight: 'shiki',
		shikiConfig: {
			themes: {
				light: 'vitesse-light',
				dark: 'github-dark',
			},
			defaultColor: false,
		},
		remarkPlugins: [
			remarkGithubAlerts,
			[remarkGithubReferences, { refTypes }],
			remarkCacheChangelogImages,
		],
		rehypePlugins: [rehypeCacheChangelogImages, rehypeChangelogTweaks],
	});
}

/** Render release bodies with shared issue/PR type resolution across the page. */
export async function renderChangelogBodies(bodies: string[]): Promise<string[]> {
	const refTypes = await resolveGithubRefTypes(bodies);
	const processor = await createProcessor(refTypes);

	return Promise.all(
		bodies.map(async (markdown) => {
			if (!markdown.trim()) return '';
			const { code } = await processor.render(markdown);
			return cacheImagesInHtml(code);
		}),
	);
}
