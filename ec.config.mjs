import { loadShikiTheme } from 'astro-expressive-code';

/** Vitesse's editor colors with our own token colors: one bright hue per token kind, in every language. */
async function vibrant(baseTheme, name, palette) {
	const theme = await loadShikiTheme(baseTheme);
	theme.name = name;
	const rules = {
		muted: ['comment', 'punctuation'],
		function: ['entity.name.function', 'support.function', 'entity.name.command'],
		keyword: ['keyword', 'storage', 'constant.other.option'],
		string: ['string', 'punctuation.definition.string'],
		number: ['constant', 'variable', 'punctuation.definition.variable', 'support.constant'],
		operator: ['keyword.operator', 'constant.character.escape'],
		name: [
			'entity.name.tag',
			'entity.name.type',
			'entity.other.attribute-name',
			'support.type',
			'support.class',
			'variable.other.property',
			'string.unquoted.argument',
		],
	};
	theme.settings = [
		{ settings: { foreground: theme.fg, background: theme.bg } },
		...Object.entries(rules).map(([key, scope]) => ({ scope, settings: { foreground: palette[key] } })),
	];
	return theme;
}

/** Shiki reads the command after `sudo` as an argument, so give it the command color. */
const sudoCommand = {
	name: 'sudo-command',
	tokens(lines) {
		for (const line of lines) {
			const words = line.filter((token) => token.content.trim());
			words.forEach((token, index) => {
				const next = words[index + 1];
				if (token.content === 'sudo' && next && !next.content.startsWith('-')) next.color = token.color;
			});
		}
	},
};

// Frame colors come from the site theme in signal.css.
export default {
	themes: [
		await vibrant('vitesse-dark', 'opentubex-dark', {
			muted: '#8a8a8a',
			function: '#ff8478',
			keyword: '#d3b5ff',
			string: '#b5dda9',
			number: '#ffc093',
			operator: '#f2a8bd',
			name: '#91c4ff',
		}),
		await vibrant('vitesse-light', 'opentubex-light', {
			muted: '#767676',
			function: '#c0392b',
			keyword: '#7445c2',
			string: '#3b7a2a',
			number: '#a85400',
			operator: '#b02a62',
			name: '#1f63c4',
		}),
	],
	shiki: { transformers: [sudoCommand] },
	cascadeLayer: 'vendor',
	// Give every code block the window header with traffic light dots.
	defaultProps: { frame: 'terminal' },
	themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
	styleOverrides: {
		borderRadius: '0.35rem',
		borderWidth: '1px',
		codePaddingBlock: '0.75rem',
		codePaddingInline: '1rem',
		codeFontFamily: 'var(--font-mono)',
		codeFontSize: '0.85rem',
		codeLineHeight: '1.55',
		uiFontFamily: 'var(--font-body)',
		textMarkers: {
			lineDiffIndicatorMarginLeft: '0.25rem',
			defaultChroma: '45',
			backgroundOpacity: '60%',
		},
	},
};
