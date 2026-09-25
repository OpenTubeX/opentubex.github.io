export type Support = 'yes' | 'partial' | 'no';

interface Cell {
	status: Support;
	label?: string;
	note: string;
	source?: string;
}

interface Row {
	name: string;
	icon?: string;
	image?: string;
	cells: [Cell, Cell, Cell, Cell, Cell, Cell];
}

export const clients = [
	{ name: 'OpenTubeX', icon: '/favicon.svg', url: '/downloads/', source: 'https://github.com/OpenTubeX/OpenTubeX' },
	{ name: 'FreeTube', icon: '/compare-icons/freetube.svg', url: 'https://freetubeapp.io/', source: 'https://github.com/FreeTubeApp/FreeTube' },
	{ name: 'Grayjay', icon: '/compare-icons/grayjay.png', url: 'https://grayjay.app/desktop/', source: 'https://grayjay.app/desktop/' },
	{ name: 'NewPipe', icon: '/compare-icons/newpipe.svg', url: 'https://newpipe.net/', source: 'https://newpipe.net/' },
	{ name: 'LibreTube', icon: '/compare-icons/libretube.svg', url: 'https://libretube.dev/', source: 'https://github.com/libre-tube/LibreTube' },
	{ name: 'YouTube', icon: '/compare-icons/youtube.svg', url: 'https://www.youtube.com/', source: 'https://support.google.com/youtube/' },
] as const;

export const support = {
	yes: { path: 'M6 12 L10 16 L18 8', text: 'Supported' },
	partial: { path: 'M7 12 H17', text: 'Limited / paid / preview' },
	no: { path: 'M8 8 L16 16 M16 8 L8 16', text: 'Not supported' },
} as const;

const otxMobile = 'https://github.com/OpenTubeX/OpenTubeX#download-links';
const otxSync = 'https://opentubex.org/extra-features/#encrypted-sync';
const ltPrivacy = 'https://github.com/libre-tube/LibreTube/blob/master/PRIVACY_POLICY.md';
const gjSync = 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/states/StateSync.kt';
const localOnly = 'https://docs.freetubeapp.io/usage/data-location/';

export const groups: { name: string; rows: Row[] }[] = [
	{
		name: 'Devices & services',
		rows: [
			{ name: 'Desktop app', icon: 'lucide:monitor', cells: [
				{ status: 'yes', note: 'Windows, macOS, and Linux.' },
				{ status: 'yes', note: 'Windows, macOS, and Linux.' },
				{ status: 'yes', note: 'Windows, macOS, and Linux.' },
				{ status: 'no', note: 'An Android app. No official desktop client.' },
				{ status: 'no', note: 'An Android app. No official desktop client.' },
				{ status: 'partial', label: 'Web app', note: 'Use YouTube in a desktop browser, including installation as a web app where the browser supports it. This is not a separate desktop player.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Android app', icon: 'simple-icons:android', cells: [
				{ status: 'yes', note: 'Available for Android phones and tablets; some desktop features differ.', source: otxMobile },
				{ status: 'partial', label: 'Unofficial fork', note: 'FreeTubeAndroid is a separately maintained, unofficial port. FreeTube itself does not publish an Android app.', source: 'https://github.com/MarmadileManteater/FreeTubeAndroid' },
				{ status: 'yes', note: 'Dedicated Android app, alongside separate desktop releases.' },
				{ status: 'yes', note: 'Built for Android. The project still labels its releases beta.' },
				{ status: 'yes', note: 'Built for Android with a Material Design interface.' },
				{ status: 'yes', note: 'Official Android app available from Google Play.', source: 'https://support.google.com/youtube/answer/3227660?hl=en' },
			] },
			{ name: 'iOS app', icon: 'simple-icons:apple', cells: [
				{ status: 'no', label: 'Planned', note: 'iOS support is planned, but there is no released iOS app yet. Planned work is not counted as available support.', source: 'https://github.com/OpenTubeX/OpenTubeX#download-links' },
				{ status: 'no', note: 'Official FreeTube releases are desktop-only.' },
				{ status: 'no', note: 'Grayjay offers Android and desktop apps, but no official iOS app.', source: 'https://grayjay.app/desktop/' },
				{ status: 'no', note: 'NewPipe is an Android app; there is no official iOS release.' },
				{ status: 'no', note: 'LibreTube is an Android app; there is no official iOS release.' },
				{ status: 'yes', note: 'Official YouTube app for iPhone and iPad.', source: 'https://support.google.com/youtube/answer/3227660?co=GENIE.Platform%3DiOS&hl=en' },
			] },
			{ name: 'Native Android interface', icon: 'lucide:smartphone', cells: [
				{ status: 'no', label: 'Web-based', note: 'Uses Capacitor with a shared web interface and native integrations. It is an installable Android app, but not a native Android UI.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/package.json' },
				{ status: 'no', label: 'Web-based fork', note: 'The unofficial FreeTubeAndroid port uses Cordova and a web interface, not a native Android UI.', source: 'https://github.com/MarmadileManteater/FreeTubeAndroid' },
				{ status: 'yes', note: 'Android interface implemented in its dedicated Android codebase.', source: 'https://github.com/futo-org/grayjay-android' },
				{ status: 'yes', note: 'Uses Android UI components, rather than a desktop web interface.', source: 'https://github.com/TeamNewPipe/NewPipe' },
				{ status: 'yes', note: 'Native Android app with Material Design.' },
				{ status: 'yes', note: 'Dedicated official Android app, with an interface designed for phones and tablets.', source: 'https://support.google.com/youtube/answer/3227660?hl=en' },
			] },
			{ name: 'Services beyond YouTube', icon: 'lucide:layers', cells: [
				{ status: 'partial', label: 'Limited', note: 'Paste an individual media URL from a yt-dlp-supported service to play it. Browsing, search, subscriptions, and feeds for other services are not supported.', source: 'https://github.com/OpenTubeX/OpenTubeX/pull/1514' },
				{ status: 'no', note: 'Focuses on YouTube.' },
				{ status: 'yes', note: 'Source plugins cover services such as Twitch, PeerTube, and SoundCloud. Availability depends on each plugin.', source: 'https://plugins.grayjay.app/' },
				{ status: 'yes', note: 'Also supports SoundCloud, Bandcamp, PeerTube, and media.ccc.de.' },
				{ status: 'no', note: 'Focuses on YouTube.' },
				{ status: 'no', note: 'The official app plays YouTube content, not feeds from Twitch, PeerTube, or SoundCloud.' },
			] },
		],
	},
	{
		name: 'Watching & listening',
		rows: [
			{ name: 'Per-channel playback settings', icon: 'lucide:sliders-horizontal', cells: [
				{ status: 'yes', note: 'Save and automatically apply playback speed, quality, subtitles, and volume separately for each channel.', source: 'https://opentubex.org/extra-features/#per-channel-playback-settings' },
				{ status: 'no', note: 'Global player preferences are available, but no per-channel playback presets are documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/static/locales/en-US.yaml' },
				{ status: 'no', note: 'Default playback speed is an app-wide preference. No per-channel playback presets are documented.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'no', note: 'Playback speed and pitch can be adjusted, but these are not saved as separate channel presets.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/java/org/schabi/newpipe/player/helper/PlaybackParameterDialog.java' },
				{ status: 'no', note: 'The playback panel saves general speed preferences, not separate settings for individual channels.', source: 'https://github.com/libre-tube/LibreTube/blob/master/app/src/main/java/com/github/libretube/ui/sheets/PlaybackOptionsSheet.kt' },
				{ status: 'no', note: 'YouTube documents video playback and general quality controls, not user-defined playback presets for each channel.', source: 'https://support.google.com/youtube/answer/7509567?hl=en' },
			] },
			{ name: 'Skip silence', icon: 'lucide:skip-forward', cells: [
				{ status: 'yes', note: 'Automatically jump over detected silent portions of a video.', source: 'https://opentubex.org/extra-features/#skip-silence' },
				{ status: 'no', note: 'No built-in automatic silence-skipping control is documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/static/locales/en-US.yaml' },
				{ status: 'no', note: 'Playback-speed controls are available, but no built-in silence-skipping setting is documented.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'yes', note: 'The playback dialog includes fast-forwarding during silence.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/java/org/schabi/newpipe/player/helper/PlaybackParameterDialog.java' },
				{ status: 'yes', note: 'The playback options include a Skip silence toggle.', source: 'https://github.com/libre-tube/LibreTube/blob/master/app/src/main/java/com/github/libretube/ui/sheets/PlaybackOptionsSheet.kt' },
				{ status: 'no', note: 'No dedicated silence-skipping control is documented. Premium Auto speed adjusts pacing on eligible Android videos; it is a different feature.', source: 'https://support.google.com/youtube/answer/6308116?hl=en' },
			] },
			{ name: 'SponsorBlock', image: '/compare-icons/sponsorblock.png', cells: [
				{ status: 'yes', label: 'Extended controls', note: 'Category skipping, mute segments, full-video labels, channel whitelisting, and in-player submissions.', source: 'https://opentubex.org/extra-features/#sponsorblock-submission' },
				{ status: 'partial', label: 'Segment skipping', note: 'Supports segment skipping and category controls. It does not provide the broader mute-segment, full-video-label, and submission workflow described for OpenTubeX.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/src/renderer/helpers/sponsorblock.js' },
				{ status: 'yes', label: 'YouTube plugin', note: 'Enable SponsorBlock in the YouTube source settings; manual and automatic skipping are available.', source: 'https://plugins.grayjay.app/Youtube/YoutubeConfig.json' },
				{ status: 'partial', label: 'Unofficial forks', note: 'The official NewPipe app does not include SponsorBlock. Unofficial forks add support for it.', source: 'https://newpipe.net/blog/pinned/newpipe-and-online-advertising/' },
				{ status: 'yes', note: 'SponsorBlock is included.' },
				{ status: 'partial', label: 'Web extension', note: 'SponsorBlock works on the YouTube website through a browser extension. It is not built into YouTube and does not add SponsorBlock to the official Android or iOS app.', source: 'https://sponsor.ajay.app/' },
			] },
			{ name: 'Auto picture-in-picture', icon: 'lucide:picture-in-picture-2', cells: [
				{ status: 'yes', note: 'Automatically enter picture-in-picture when switching tabs or windows, or minimizing the app.', source: 'https://opentubex.org/extra-features/#auto-picture-in-picture' },
				{ status: 'no', note: 'Picture-in-picture can be activated manually. Automatic entry when switching away is not documented.', source: 'https://docs.freetubeapp.io/usage/keyboard-shortcuts/' },
				{ status: 'yes', note: 'On Android, choose picture-in-picture as the background behavior to enter it when leaving the app.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'yes', note: 'Set Minimize on app switch to the popup player. This uses a floating overlay and requires permission to display over other apps.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Enters picture-in-picture when leaving the player while playback is active, with PiP enabled.', source: 'https://github.com/libre-tube/LibreTube/blob/master/app/src/main/java/com/github/libretube/ui/fragments/PlayerFragment.kt' },
				{ status: 'partial', label: 'Content limits', note: 'Leaving the mobile app starts picture-in-picture when enabled. Non-music PiP is rolling out globally; music content requires Premium.', source: 'https://support.google.com/youtube/thread/425771437' },
			] },
			{ name: 'Tabs', icon: 'lucide:panels-top-left', cells: [
				{ status: 'yes', note: 'Keep separate videos and channels open in tabs within the app.', source: 'https://opentubex.org/extra-features/#tab-support' },
				{ status: 'no', note: 'FreeTube supports separate windows, but does not provide browser-style tabs.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/333' },
				{ status: 'no', note: 'Navigation tabs organize app sections. No browser-style tabs for keeping separate videos or channels open are documented.', source: 'https://grayjay.app/faq.html' },
				{ status: 'no', note: 'Home-page tabs organize feeds and app sections, rather than separate open videos or channels.' },
				{ status: 'no', note: 'Navigation sections are available, but no browser-style tabs for separate open videos or channels are documented.' },
				{ status: 'partial', label: 'Browser tabs', note: 'The website can be opened in multiple browser tabs. The mobile app does not provide tabs for keeping separate videos or channels open.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Background audio', icon: 'lucide:headphones', cells: [
				{ status: 'yes', note: 'Continue listening while using other apps or with the screen off.', source: 'https://opentubex.org/extra-features/#android-app-support' },
				{ status: 'yes', note: 'Background audio playback is supported.', source: 'https://docs.freetubeapp.io/usage/video-formats/' },
				{ status: 'yes', note: 'Android supports background playback.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Background player supports audio playback while using other apps.' },
				{ status: 'yes', note: 'Background playback is included.' },
				{ status: 'partial', label: 'Premium', note: 'Mobile background playback requires a paid plan. Premium Lite includes eligible non-music videos where available; full Premium covers music too. Desktop browser audio can continue in another tab.', source: 'https://support.google.com/youtube/thread/414266287/launching-background-play-downloads-for-premium-lite?hl=en' },
			] },
			{ name: 'Downloads', icon: 'lucide:download', cells: [
				{ status: 'yes', note: 'Download videos, audio, playlists, and subtitles for offline use.', source: 'https://opentubex.org/extra-features/#download-support' },
				{ status: 'no', label: 'Removed in 0.24', note: 'FreeTube removed its built-in downloader in 0.24.0. External download tools are separate from the app.', source: 'https://github.com/FreeTubeApp/FreeTube/releases/tag/v0.24.0-beta' },
				{ status: 'yes', note: 'Download videos and playlists for offline viewing on supported sources.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Download video, audio, or captions; choose formats and quality.' },
				{ status: 'yes', note: 'Includes downloads for offline playback.' },
				{ status: 'partial', label: 'Plan / region limits', note: 'Premium offers in-app offline downloads; some regions allow selected videos without Premium. Downloads stay within YouTube, rather than becoming freely exportable media files.', source: 'https://support.google.com/youtube/answer/7381437?hl=en' },
			] },
		],
	},
	{
		name: 'Library & sync',
		rows: [
			{ name: 'Follow channels without Google login', icon: 'lucide:rss', cells: [
				{ status: 'yes', note: 'Subscriptions can stay on your device without a Google account.' },
				{ status: 'yes', note: 'Local subscriptions do not require a Google account.' },
				{ status: 'yes', note: 'Local subscriptions are available. Signing into a source is optional for its account features.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Subscriptions are stored locally; no Google account needed.' },
				{ status: 'yes', note: 'Local subscriptions or optional Piped accounts; Google login is not required.' },
				{ status: 'no', label: 'Account required', note: 'Watching many videos is possible while signed out, but subscribing to channels requires a Google account.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Sync between devices', icon: 'lucide:refresh-cw', cells: [
				{ status: 'yes', label: 'End-to-end encrypted', note: 'Optional sync covers subscriptions, playlists, history, channel settings, profiles, tabs, and settings.', source: otxSync },
				{ status: 'no', label: 'Local data', note: 'No built-in account sync. Copying database files or using an external file-sync tool is a separate workflow.', source: localOnly },
				{ status: 'yes', label: 'Device pairing', note: 'Paired-device sync includes subscriptions, playlists, watch later, subscription groups, and history. Devices need a working connection to each other.', source: gjSync },
				{ status: 'no', label: 'Manual backup', note: 'Import and export transfer your data manually; they are not automatic device sync.', source: 'https://github.com/TeamNewPipe/NewPipe#installation-and-updates' },
				{ status: 'partial', label: 'Piped account', note: 'Published documentation describes Piped account sync for subscriptions and playlists. Watch history and settings stay local; this is not whole-library sync.', source: ltPrivacy },
				{ status: 'yes', label: 'Google account', note: 'Subscriptions and playlists follow your signed-in Google account across devices. This does not mean every device-specific preference is synced.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Watch statistics', icon: 'lucide:chart-column', cells: [
				{ status: 'yes', note: 'Daily and weekly watch-time charts show your viewing activity.', source: 'https://opentubex.org/extra-features/#watch-time-statistics' },
				{ status: 'no', note: 'Watch history is available, but no personal watch-time dashboard is documented. Video playback statistics describe the current stream, not your viewing habits.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/static/locales/en-US.yaml' },
				{ status: 'yes', note: 'Watch metrics show watch time and views for each creator in the Creators tab.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/res/values/strings.xml' },
				{ status: 'partial', label: 'Most played', note: 'The Most Played view summarizes frequently played videos. It is not a daily or weekly watch-time dashboard.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'Watch history and playback positions are available, but no personal watch-time dashboard is documented.', source: 'https://github.com/libre-tube/LibreTube/blob/master/app/src/main/res/values/strings.xml' },
				{ status: 'yes', label: 'Account required', note: 'Time watched shows daily average, today, yesterday, and the past seven days. Requires sign-in and enabled watch history; deleted history and private viewing are excluded.', source: 'https://support.google.com/youtube/answer/9052667?hl=en' },
			] },
			{ name: 'Sync watch history', icon: 'lucide:history', cells: [
				{ status: 'yes', note: 'History is one of the optional sync categories.', source: otxSync },
				{ status: 'no', note: 'History is stored in a local database, without built-in sync.', source: localOnly },
				{ status: 'yes', note: 'The device-sync implementation exchanges recent history.', source: gjSync },
				{ status: 'no', note: 'History can be included in manual database backups, not automatically synced between devices.', source: 'https://github.com/TeamNewPipe/NewPipe#installation-and-updates' },
				{ status: 'no', note: 'The documented Piped account sync does not include watch history or timestamps; these remain local.', source: ltPrivacy },
				{ status: 'yes', label: 'History enabled', note: 'Signed-in watch history is saved to your Google account when enabled. You can pause or delete it.', source: 'https://support.google.com/youtube/answer/95725?hl=en' },
			] },
		],
	},
	{
		name: 'Privacy',
		rows: [
			{ name: 'No telemetry', icon: 'lucide:eye-off', cells: [
				{ status: 'yes', note: 'Viewing statistics and history stay local by default. Optional sync sends selected data to your chosen server; playback and optional services still expose network metadata.', source: 'https://opentubex.org/privacy/#desktop-app' },
				{ status: 'yes', note: 'Viewing data stays local. YouTube and optional services can still see requests and your IP address; this is not anonymity.', source: 'https://docs.freetubeapp.io/usage/privacy/' },
				{ status: 'partial', label: 'Startup telemetry', note: 'Sends startup telemetry with a random identifier, device details, and enabled source IDs. This payload does not include watched videos or searches; watch history stays local unless synced. This is narrower than YouTube activity collection.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/states/StateTelemetry.kt' },
				{ status: 'yes', note: 'No automatic usage reporting. Bug reports are sent only when you choose to submit them. Media services still receive playback requests.', source: 'https://newpipe.net/legal/privacy/' },
				{ status: 'yes', note: 'Its privacy policy states that it does not gather app-usage data or use tracking libraries. Direct playback and optional Piped services still receive requests.', source: 'https://github.com/libre-tube/LibreTube/blob/master/PRIVACY_POLICY.md' },
				{ status: 'no', label: 'Activity collection', note: 'Google collects activity such as videos watched, searches, and interactions. History and personalization controls affect storage and use; Premium does not remove this data collection.', source: 'https://policies.google.com/privacy?hl=en' },
			] },
		],
	},
];
