// Frame colors come from the site theme in signal.css.
export default {
	themes: ['vitesse-dark', 'vitesse-light'],
	cascadeLayer: 'vendor',
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
