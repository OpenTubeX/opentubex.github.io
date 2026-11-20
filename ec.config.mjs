import { loadShikiTheme } from 'astro-expressive-code';

/**
 * Vitesse with brighter, distinct colors for shell code, matching the package repository pages.
 * Shell scopes only, so other languages keep plain Vitesse.
 */
async function withShellColors(baseTheme, name, palette) {
	const theme = await loadShikiTheme(baseTheme);
	theme.name = name;
	const rules = {
		command: ['entity.name.command.shell', 'support.function.builtin.shell'],
		option: ['source.shell constant.other.option'],
		string: ['string.quoted.single.shell', 'string.quoted.double.shell', 'punctuation.definition.string.begin.shell', 'punctuation.definition.string.end.shell'],
		operator: ['keyword.operator.pipe.shell', 'keyword.operator.redirect.shell', 'keyword.operator.logical.shell', 'constant.character.escape.line-continuation.shell'],
		argument: ['string.unquoted.argument.shell'],
	};
	for (const [key, scope] of Object.entries(rules)) {
		theme.settings.push({ scope, settings: { foreground: palette[key] } });
	}
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
		await withShellColors('vitesse-dark', 'opentubex-dark', {
			command: '#ff8478',
			option: '#d3b5ff',
			string: '#b5dda9',
			operator: '#f2a8bd',
			argument: '#91c4ff',
		}),
		await withShellColors('vitesse-light', 'opentubex-light', {
			command: '#c0392b',
			option: '#7445c2',
			string: '#3b7a2a',
			operator: '#b02a62',
			argument: '#1f63c4',
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
