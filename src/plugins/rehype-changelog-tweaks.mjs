import { visit } from 'unist-util-visit';

const alertTypes = new Set(['note', 'tip', 'important', 'warning', 'caution']);
const githubAttachment =
	/^https:\/\/github\.com\/user-attachments\/assets\/[a-f0-9-]+\/?(?:[?#].*)?$/i;

/**
 * Apply final markup tweaks to rendered changelog content.
 */
export default function rehypeChangelogTweaks() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'p' && node.children?.length === 1) {
				const link = node.children[0];
				const href = link.tagName === 'a' ? link.properties?.href : undefined;
				if (typeof href === 'string' && githubAttachment.test(href)) {
					node.children = [
						{
							type: 'element',
							tagName: 'video',
							properties: { src: href, controls: true, playsInline: true, preload: 'metadata' },
							children: [],
						},
					];
				}
			}

			const alertType = node.properties?.dataAlert ?? node.properties?.['data-alert'];
			if (node.tagName === 'blockquote' && typeof alertType === 'string' && alertTypes.has(alertType)) {
				node.children.unshift({
					type: 'element',
					tagName: 'span',
					properties: { className: ['changelog-alert-title'] },
					children: [{ type: 'text', value: alertType }],
				});
			}

			if (node.tagName === 'details') {
				node.properties ??= {};
				node.properties.open = true;
			}

			if (node.tagName === 'a') {
				node.properties ??= {};
				node.properties.rel = 'noopener noreferrer';
			}
		});
	};
}
