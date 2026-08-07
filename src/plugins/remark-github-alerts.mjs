/**
 * Turns GitHub alert blockquotes (`> [!NOTE]`) into `<blockquote data-alert="note">`.
 * Inspired by OpenTubeX's in-app changelog renderer; remark-native for Astro.
 */
export default function remarkGithubAlerts() {
	return (tree) => {
		const children = tree.children;
		if (!Array.isArray(children)) return;

		for (let index = 0; index < children.length; index++) {
			const node = children[index];
			if (node.type !== 'blockquote' || !Array.isArray(node.children) || node.children.length === 0) {
				continue;
			}

			const first = node.children[0];
			if (first?.type !== 'paragraph' || !Array.isArray(first.children) || first.children.length === 0) {
				continue;
			}

			const firstChild = first.children[0];
			if (firstChild?.type !== 'text' || typeof firstChild.value !== 'string') continue;

			const match = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*([^\n]*)(?:\n|$)/i.exec(firstChild.value);
			if (!match) continue;

			const alertType = match[1].toLowerCase();
			const remainder = match[2] ?? '';
			firstChild.value = firstChild.value.slice(match[0].length);

			if (!firstChild.value && remainder) {
				firstChild.value = remainder;
			} else if (remainder && firstChild.value) {
				firstChild.value = `${remainder}\n${firstChild.value}`;
			}

			if (!firstChild.value.trim()) {
				first.children.shift();
			}

			if (first.children.length === 0) {
				node.children.shift();
			}

			node.data ??= {};
			node.data.hName = 'blockquote';
			node.data.hProperties = {
				...(node.data.hProperties ?? {}),
				'data-alert': alertType,
			};
		}
	};
}
