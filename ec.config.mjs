// Match the code blocks previously configured through Starlight.
export default {
	themes: ['night-owl', 'vitesse-light'],
	cascadeLayer: 'vendor',
	themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
	customizeTheme: (theme) => {
		if (theme.type === 'dark') {
			theme.colors['titleBar.border'] = theme.colors['tab.activeBackground'];
			theme.colors['editorGroupHeader.tabsBorder'] = theme.colors['tab.activeBackground'];
			for (const setting of theme.settings) {
				if (setting.name?.includes('Link')) setting.settings.fontStyle = 'underline';
			}
			theme.settings.push({
				name: 'Shell commands',
				scope: 'entity.name.function.call.shell',
				settings: { fontStyle: '' },
			});
		}
		return theme;
	},
	styleOverrides: {
		borderRadius: '0px',
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
