import { visit } from 'unist-util-visit';

/**
 * Open `<details>` by default and keep remote GitHub images from raw HTML tags cached.
 */
export default function rehypeChangelogTweaks() {
	return (tree) => {
		visit(tree, 'element', (node) => {
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
