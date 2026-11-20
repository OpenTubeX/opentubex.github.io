/** Minimal Caddyfile grammar, since Shiki doesn't bundle one. */
export default {
	name: 'caddyfile',
	scopeName: 'source.caddyfile',
	aliases: ['caddy'],
	patterns: [
		{ match: '(?:^|\\s)(#.*)$', captures: { 1: { name: 'comment.line.number-sign.caddyfile' } } },
		{ begin: '"', end: '"', name: 'string.quoted.double.caddyfile', patterns: [{ match: '\\\\.', name: 'constant.character.escape.caddyfile' }] },
		{ begin: '`', end: '`', name: 'string.quoted.other.caddyfile' },
		{ match: '\\{[\\w.\\-]+\\}', name: 'variable.other.placeholder.caddyfile' },
		{ match: '(?:^|(?<=\\s))@[\\w\\-]+', name: 'variable.other.matcher.caddyfile' },
		// A site address or snippet name at the start of a line, followed by its block.
		{ match: '^(\\S[^{#]*?)\\s*(?=\\{)', captures: { 1: { name: 'entity.name.tag.site.caddyfile' } } },
		{ match: '^\\s+([a-z_][\\w\\-]*)', captures: { 1: { name: 'keyword.other.directive.caddyfile' } } },
		{ match: '\\b\\d+(?:\\.\\d+)?(?:ms|[smhd])?\\b', name: 'constant.numeric.caddyfile' },
		{ match: '[{}]', name: 'punctuation.section.block.caddyfile' },
	],
};
