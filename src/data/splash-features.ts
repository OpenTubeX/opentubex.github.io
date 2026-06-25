/** Extra features surfaced as easter-egg hotspots on the splash page background. */
export const splashFeatures = [
	{
		id: 'playback-speed',
		title: 'Per-channel playback speed',
		description: 'Remember playback speed per channel — auto-save or save manually under the player.',
		icon: 'speed',
		x: 8,
		y: 22,
	},
	{
		id: 'video-quality',
		title: 'Per-channel video quality',
		description: 'Keep your preferred quality for each channel, with the same workflow as playback speed.',
		icon: 'quality',
		x: 92,
		y: 24,
	},
	{
		id: 'seek-intervals',
		title: 'Optional seek-interval behavior',
		description: 'Choose whether arrow keys and J/L seek distances scale with playback rate.',
		icon: 'seek',
		x: 6,
		y: 52,
	},
	{
		id: 'timestamps',
		title: 'Playback-rate adjusted timestamps',
		description: 'Optionally show timestamps that account for the current playback speed.',
		icon: 'clock',
		x: 94,
		y: 50,
	},
	{
		id: 'chapter-tooltips',
		title: 'Chapter tooltips on seekbar',
		description: 'See chapter names directly on the seekbar while scrubbing.',
		icon: 'chapters',
		x: 14,
		y: 78,
	},
	{
		id: 'no-translations',
		title: 'Prevent YouTube translations',
		description: 'Keep original titles and descriptions instead of YouTube auto-translations.',
		icon: 'translate',
		x: 86,
		y: 76,
	},
	{
		id: 'quick-search',
		title: 'Quick search focus',
		description: 'Press / to jump to the search bar, in addition to Ctrl+L or Cmd+L.',
		icon: 'search',
		x: 22,
		y: 19,
	},
	{
		id: 'sponsor-toggle',
		title: 'SponsorBlock auto-skip toggle',
		description: 'Quickly turn SponsorBlock auto-skip on or off right under the player.',
		icon: 'sponsor',
		x: 78,
		y: 17,
	},
	{
		id: 'sponsor-tooltips',
		title: 'SponsorBlock tooltips',
		description: 'Unskip, reskip, or get prompted before a segment is skipped.',
		icon: 'sponsor',
		x: 4,
		y: 36,
	},
	{
		id: 'sponsor-chapters',
		title: 'SponsorBlock community chapters',
		description: 'Display community-contributed chapters from SponsorBlock in the player.',
		icon: 'community',
		x: 96,
		y: 38,
	},
	{
		id: 'sponsor-submit',
		title: 'SponsorBlock submission',
		description: 'Submit SponsorBlock segments directly from the player (experimental).',
		icon: 'sponsor',
		x: 10,
		y: 64,
	},
	{
		id: 'tabs',
		title: 'Tab support',
		description: 'Browse with multiple tabs, similar to a web browser.',
		icon: 'tabs',
		x: 90,
		y: 62,
	},
	{
		id: 'ip-recovery',
		title: 'IP block recovery script',
		description: 'Run a custom script when YouTube blocks your IP, then reload the video.',
		icon: 'script',
		x: 18,
		y: 88,
	},
	{
		id: 'auto-pip',
		title: 'Auto Picture-in-Picture',
		description: 'Enter PiP automatically when you switch tabs or scroll away from a video.',
		icon: 'pip',
		x: 82,
		y: 88,
	},
	{
		id: 'context-menu',
		title: 'Loop & copy link',
		description: 'Toggle loop or copy the video link from the player context menu.',
		icon: 'menu',
		x: 30,
		y: 15,
	},
	{
		id: 'speed-bar',
		title: 'Quick Playback Speed Bar',
		description: 'Optional speed bar in the player for faster adjustments.',
		icon: 'bar',
		x: 70,
		y: 13,
	},
	{
		id: 'return-dislike',
		title: 'Return YouTube Dislike',
		description: 'Show dislike counts using Return YouTube Dislike.',
		icon: 'dislike',
		x: 50,
		y: 11,
	},
	{
		id: 'remember-volume',
		title: 'Remember volume',
		description: 'Keep your player volume between sessions (enabled by default).',
		icon: 'volume',
		x: 36,
		y: 92,
	},
	{
		id: 'speed-shortcut',
		title: 'Playback speed toggle',
		description: 'Press G to toggle between 1× and your last used playback speed.',
		icon: 'keyboard',
		x: 64,
		y: 92,
	},
] as const;

export type SplashFeatureIcon =
	| 'speed'
	| 'quality'
	| 'seek'
	| 'clock'
	| 'chapters'
	| 'translate'
	| 'search'
	| 'sponsor'
	| 'tabs'
	| 'pip'
	| 'script'
	| 'menu'
	| 'bar'
	| 'dislike'
	| 'volume'
	| 'keyboard'
	| 'community';

export type SplashFeature = (typeof splashFeatures)[number];
