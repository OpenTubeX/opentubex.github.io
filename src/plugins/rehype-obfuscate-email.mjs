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
						if (node.children.length === 1 && node.children[0].type === 'text' && node.children[0].value === address) {
							node.children[0].value = address.replace('@', ' [at] ').replaceAll('.', ' [dot] ');
						}
					}
				}
			}
			for (const child of node.children ?? []) visit(child);
		}
		visit(tree);
	};
}
