import { visit } from 'unist-util-visit';

const alertTypes = new Set(['note', 'tip', 'important', 'warning', 'caution']);

/**
 * Apply final markup tweaks to rendered changelog content.
 */
export default function rehypeChangelogTweaks() {
	return (tree) => {
		visit(tree, 'element', (node) => {
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
