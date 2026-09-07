import { basename } from 'node:path';

/** Keep each feature's description and media together when filtering the page. */
export default function rehypeFeatureSections() {
	return (tree, file) => {
		if (basename(file.path ?? '') !== 'extra-features.md') return;
		const children = [];
		let category;
		let feature;
		for (const node of tree.children) {
			if (node.type === 'element' && node.tagName === 'h2') {
				// Astro also uses these headings for getHeadings(), which powers the sidebar.
				node.properties.hidden = true;
				category = { type: 'element', tagName: 'div', properties: { className: ['feature-category'] }, children: [node] };
				children.push(category);
				feature = undefined;
			} else if (category && node.type === 'element' && node.tagName === 'h3') {
				feature = { type: 'element', tagName: 'section', properties: { className: ['feature-entry'] }, children: [node] };
				category.children.push(feature);
			} else {
				(feature?.children ?? category?.children ?? children).push(node);
			}
		}
		tree.children = children;
	};
}
