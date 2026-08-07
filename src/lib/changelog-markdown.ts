import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { fromHtml } from 'hast-util-from-html';
import { sanitize, defaultSchema } from 'hast-util-sanitize';
import { toHtml } from 'hast-util-to-html';
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

/** Sanitize after Markdown→HTML so opaque raw nodes cannot bypass the rehype pass. */
function sanitizeChangelogHtml(html: string): string {
	if (!html.trim()) return '';
	const tree = fromHtml(html, { fragment: true });
	return toHtml(sanitize(tree, changelogSanitizeSchema));
}

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
			return sanitizeChangelogHtml(await cacheImagesInHtml(code));
		}),
	);
}
