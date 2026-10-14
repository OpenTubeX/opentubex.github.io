import { icons } from '@iconify-json/lucide';
import { fromHtml } from 'hast-util-from-html';

/** Keep Markdown email links encoded until a visitor reveals them. */
export default function rehypeObfuscateEmail() {
	return (tree) => {
		function visit(node) {
			if (node.type === 'element' && node.tagName === 'a') {
				const href = node.properties?.href;
				if (typeof href === 'string' && href.toLowerCase().startsWith('mailto:')) {
					const address = href.slice('mailto:'.length).split('?')[0];
					if (address) {
						node.tagName = 'span';
						node.properties = {};
						node.children = [
							{
								type: 'element', tagName: 'button',
								properties: {
									type: 'button', hidden: true, className: ['email-reveal'],
									dataEmailReveal: href.split('').map(char => char.charCodeAt(0).toString(19)).join('.'),
								},
								children: [
									...fromHtml(`<svg viewBox="0 0 24 24" aria-hidden="true">${icons.icons.mail.body}</svg>`, { fragment: true }).children,
									{ type: 'text', value: 'Show email address' },
								],
							},
							{
								type: 'element', tagName: 'noscript', properties: {},
								children: [{ type: 'text', value: 'Enable JavaScript to view email address' }],
							},
						];
					}
				}
			}
			for (const child of node.children ?? []) visit(child);
		}
		visit(tree);
	};
}
