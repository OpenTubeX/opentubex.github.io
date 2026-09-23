import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { getCollection } from 'astro:content';
import { fromHtml } from 'hast-util-from-html';
import type { APIRoute } from 'astro';

type SearchNode = {
	type: string;
	tagName?: string;
	value?: string;
	properties?: { id?: string; alt?: string };
	children?: SearchNode[];
};

function textOf(node: SearchNode): string {
	if (node.type === 'text') return node.value ?? '';
	if (node.tagName === 'img') return node.properties?.alt ?? '';
	if (node.tagName === 'script' || node.tagName === 'style') return '';
	return (node.children ?? []).map(textOf).join(' ');
}

export const GET: APIRoute = async () => {
	const processor = await createMarkdownProcessor({ syntaxHighlight: false });
	const guides = (await getCollection('guides')).sort((a, b) => a.data.order - b.data.order);
	const entries = [];

	for (const guide of guides) {
		const { code } = await processor.render(guide.body ?? '');
		const root = fromHtml(code, { fragment: true }) as SearchNode;
		const href = `/docs/${guide.id}/`;
		let section = {
			pageTitle: guide.data.title,
			title: guide.data.title,
			description: guide.data.description,
			href,
			text: '',
		};
		entries.push(section);

		for (const node of root.children ?? []) {
			if (/^h[2-6]$/.test(node.tagName ?? '') && node.properties?.id) {
				section = {
					pageTitle: guide.data.title,
					title: textOf(node).trim(),
					description: guide.data.description,
					href: `${href}#${node.properties.id}`,
					text: '',
				};
				entries.push(section);
			} else {
				section.text += ` ${textOf(node)}`;
			}
		}
	}
	for (const entry of entries) entry.text = entry.text.replace(/\s+/g, ' ').trim();

	return new Response(JSON.stringify(entries), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};
