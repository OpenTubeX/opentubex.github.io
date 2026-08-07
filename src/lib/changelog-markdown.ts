import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGithubAlerts from '../plugins/remark-github-alerts.mjs';
import remarkGithubReferences from '../plugins/remark-github-references.mjs';
import {
	cacheImagesInHtml,
	rehypeCacheChangelogImages,
	remarkCacheChangelogImages,
} from '../plugins/remark-cache-changelog-images.mjs';
import rehypeChangelogTweaks from '../plugins/rehype-changelog-tweaks.mjs';
import { resolveGithubRefTypes, type GithubRefKind } from './github-ref-types';

const changelogSanitizeSchema = {
	...defaultSchema,
	tagNames: [...(defaultSchema.tagNames ?? []), 'details', 'summary', 'video', 'source'],
	attributes: {
		...defaultSchema.attributes,
		details: [...(defaultSchema.attributes?.details ?? []), 'open'],
		img: [...(defaultSchema.attributes?.img ?? []), 'src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
		a: [...(defaultSchema.attributes?.a ?? []), 'href', 'rel', 'target'],
		code: [...(defaultSchema.attributes?.code ?? []), 'className'],
		pre: [...(defaultSchema.attributes?.pre ?? []), 'className'],
		span: [...(defaultSchema.attributes?.span ?? []), 'className', 'style'],
		div: [...(defaultSchema.attributes?.div ?? []), 'className'],
		video: ['src', 'controls', 'muted', 'playsInline', 'poster', 'width', 'height'],
		source: ['src', 'type'],
	},
};

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
		rehypePlugins: [
			rehypeCacheChangelogImages,
			rehypeChangelogTweaks,
			[rehypeSanitize, changelogSanitizeSchema],
		],
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
