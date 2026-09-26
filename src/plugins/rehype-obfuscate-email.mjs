/** Hide Markdown mailto links from crawlers that only read the HTML. */
export default function rehypeObfuscateEmail() {
	return (tree) => {
		function visit(node) {
			if (node.type === 'element' && node.tagName === 'a') {
				const href = node.properties?.href;
				if (typeof href === 'string' && href.toLowerCase().startsWith('mailto:')) {
					const address = href.slice('mailto:'.length).split('?')[0];
					if (address) {
						delete node.properties.href;
						node.properties.dataEmail = Buffer.from(href).toString('base64');
						node.children = [{ type: 'text', value: 'Enable JavaScript to view email address' }];
					}
				}
			}
			for (const child of node.children ?? []) visit(child);
		}
		visit(tree);
	};
}
