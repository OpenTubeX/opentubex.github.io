import { findAndReplace } from 'mdast-util-find-and-replace';

const REPO = 'OpenTubeX/OpenTubeX';
const ISSUE_OR_PR = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/(?:issues|pull)\/(\d+)\/?(?:[?#].*)?$/i;

/**
 * @param {{ refTypes?: Map<number, 'issue' | 'pull'> }} [options]
 */
export default function remarkGithubReferences(options = {}) {
	const refTypes = options.refTypes ?? new Map();

	const hrefFor = (number) => {
		const kind = refTypes.get(Number(number)) ?? 'issue';
		const path = kind === 'pull' ? 'pull' : 'issues';
		return `https://github.com/${REPO}/${path}/${number}`;
	};

	return (tree) => {
		findAndReplace(
			tree,
			[
				[
					/(?<=^|[^\w/])#(\d+)\b/g,
					(value, issueNumber) => ({
						type: 'link',
						url: hrefFor(issueNumber),
						children: [{ type: 'text', value }],
					}),
				],
				[
					/(?<=^|[^\w/])([0-9a-f]{40})\b/gi,
					(value, commitHash) => ({
						type: 'link',
						url: `https://github.com/${REPO}/commit/${commitHash}`,
						children: [
							{
								type: 'inlineCode',
								value: commitHash.slice(0, 7),
							},
						],
					}),
				],
			],
			{ ignore: ['link', 'linkReference'] },
		);

		normalizeGithubLinks(tree, hrefFor);
	};
}

function normalizeGithubLinks(node, hrefFor) {
	if (node.type === 'link' && typeof node.url === 'string') {
		const match = ISSUE_OR_PR.exec(node.url);
		if (match) {
			const [, owner, repository, number] = match;
			const full = `${owner}/${repository}`.toLowerCase();
			let label = `${owner}/${repository}#${number}`;
			if (full === REPO.toLowerCase()) {
				label = `#${number}`;
				node.url = hrefFor(number);
			} else if (full === 'freetubeapp/freetube') {
				label = `${owner}#${number}`;
			}

			const text = node.children?.length === 1 && node.children[0].type === 'text'
				? node.children[0].value
				: null;
			if (!text || text === node.url || /^(?:[\w.-]+\/[\w.-]+)?#\d+$/i.test(text) || text === `#${number}`) {
				node.children = [{ type: 'text', value: label }];
			}
		}
	}

	if (Array.isArray(node.children)) {
		for (const child of node.children) normalizeGithubLinks(child, hrefFor);
	}
}
