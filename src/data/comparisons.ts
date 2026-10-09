export type Support = 'yes' | 'partial' | 'no';

type Cell = ({ status: Support; label?: string } | { status?: never; label: string }) & {
	note: string | (string | { text: string; href: string })[];
	source?: string;
};

interface Row {
	name: string;
	icon?: string;
	image?: string;
	cells: [Cell, Cell, Cell, Cell, Cell, Cell, Cell];
}

export const clients = [
	{ name: 'OpenTubeX', icon: '/favicon.svg', url: '/downloads/', source: 'https://github.com/OpenTubeX/OpenTubeX' },
	{ name: 'FreeTube', icon: '/compare-icons/freetube.svg', url: 'https://freetubeapp.io/', source: 'https://github.com/FreeTubeApp/FreeTube' },
	{ name: 'Grayjay', icon: '/compare-icons/grayjay.png', url: 'https://grayjay.app/desktop/', source: 'https://grayjay.app/desktop/' },
	{ name: 'NewPipe', icon: '/compare-icons/newpipe.svg', url: 'https://newpipe.net/', source: 'https://newpipe.net/' },
	{ name: 'LibreTube', icon: '/compare-icons/libretube.svg', url: 'https://libretube.dev/', source: 'https://github.com/libre-tube/LibreTube' },
	{ name: 'Flow', icon: '/compare-icons/flow.svg', url: 'https://flow-tube.org/', source: 'https://github.com/A-EDev/Flow/tree/v2.2.1' },
	{ name: 'YouTube', icon: '/compare-icons/youtube.svg', url: 'https://www.youtube.com/', source: 'https://support.google.com/youtube/' },
] as const;

export const support = {
	yes: { path: 'M6 12 L10 16 L18 8', text: 'Supported' },
	partial: { path: 'M7 12 H17', text: 'Limited / paid / preview' },
	no: { path: 'M8 8 L16 16 M16 8 L8 16', text: 'Not supported' },
} as const;

const otxMobile = 'https://github.com/OpenTubeX/OpenTubeX#download-links';
const otxSync = 'https://opentubex.org/extra-features/#encrypted-sync';
const ltPrivacy = 'https://github.com/libre-tube/LibreTube/blob/v32.1/PRIVACY_POLICY.md';
const gjSync = 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/states/StateSync.kt';
const flowRelease = 'https://github.com/A-EDev/Flow/tree/v2.2.1';
const flowCode = `${flowRelease}/app/src/main/java/io/github/aedev/flow`;
const flowDesktop = 'https://github.com/Flow-Tube/Flow-Desktop/tree/v0.1.0-beta2';
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
				{ status: 'partial', label: 'Desktop beta', note: 'Flow Desktop is a separate companion for Windows, macOS, and Linux. Version 0.1.0-beta2 is available; it has not reached a stable release.', source: `${flowDesktop}#downloads-and-supported-systems` },
				{ status: 'partial', label: 'Web app', note: 'Use YouTube in a desktop browser, including installation as a web app where the browser supports it. This is not a separate desktop player.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Android app', icon: 'simple-icons:android', cells: [
				{ status: 'yes', note: 'Available for Android phones and tablets; some desktop features differ.', source: otxMobile },
				{ status: 'partial', label: 'Unofficial fork', note: 'FreeTubeAndroid is a separately maintained, unofficial port. FreeTube itself does not publish an Android app.', source: 'https://github.com/MarmadileManteater/FreeTubeAndroid' },
				{ status: 'yes', note: 'Dedicated Android app, alongside separate desktop releases.' },
				{ status: 'yes', note: 'Built for Android. The project still labels its releases beta.' },
				{ status: 'yes', note: 'Built for Android with a Material Design interface.' },
				{ status: 'yes', note: 'Native Android app for Android 8.0 and later.', source: `${flowRelease}#requirements` },
				{ status: 'yes', note: 'Official Android app available from Google Play.', source: 'https://support.google.com/youtube/answer/3227660?hl=en' },
			] },
			{ name: 'iOS app', icon: 'simple-icons:apple', cells: [
				{ status: 'partial', label: 'Experimental', note: 'An unsigned IPA is available for iOS/iPadOS 17.4+. Requires sideloading and periodic signing refreshes; several features are unavailable.', source: 'https://opentubex.org/docs/installing/#ios--ipados-experimental' },
				{ status: 'no', note: 'Official FreeTube releases are desktop-only.' },
				{ status: 'no', note: 'Grayjay offers Android and desktop apps, but no official iOS app.', source: 'https://grayjay.app/desktop/' },
				{ status: 'no', note: 'NewPipe is an Android app; there is no official iOS release.' },
				{ status: 'no', note: 'LibreTube is an Android app; there is no official iOS release.' },
				{ status: 'no', note: 'Flow offers Android and a separate desktop companion, but no official iOS app.', source: 'https://github.com/Flow-Tube#projects' },
				{ status: 'yes', note: 'Official YouTube app for iPhone and iPad.', source: 'https://support.google.com/youtube/answer/3227660?co=GENIE.Platform%3DiOS&hl=en' },
			] },
			{ name: 'Native mobile interface', icon: 'lucide:smartphone', cells: [
				{ status: 'no', label: 'Web-based', note: 'The Android and experimental iOS/iPadOS apps use Capacitor with a shared web interface and native integrations. The interface is web-based on both platforms.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/package.json' },
				{ status: 'no', label: 'Web-based fork', note: 'Official FreeTube releases are desktop-only. The unofficial FreeTubeAndroid port uses Cordova with a web-based mobile interface.', source: 'https://github.com/MarmadileManteater/FreeTubeAndroid' },
				{ status: 'yes', note: 'Native mobile interface on Android only, implemented in its dedicated Android codebase.', source: 'https://github.com/futo-org/grayjay-android' },
				{ status: 'yes', note: 'Native mobile interface built with Android UI components. Available on Android only.', source: 'https://github.com/TeamNewPipe/NewPipe' },
				{ status: 'yes', note: 'Native mobile interface with Material Design. Available on Android only.' },
				{ status: 'yes', note: 'Native Android interface built with Jetpack Compose and Material 3. No iOS app.', source: flowRelease },
				{ status: 'yes', note: 'Native mobile interfaces in the official Android and iOS apps, designed for phones and tablets.', source: 'https://support.google.com/youtube/answer/3227660?hl=en' },
			] },
			{ name: 'Services beyond YouTube', icon: 'lucide:layers', cells: [
				{ status: 'partial', label: 'Limited', note: ['Paste an individual media URL from a ', { text: 'yt-dlp-supported service', href: 'https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md' }, ' to play it. Browsing, search, subscriptions, and feeds for other services are not supported.'], source: 'https://github.com/OpenTubeX/OpenTubeX/pull/1514' },
				{ status: 'no', note: 'Focuses on YouTube.' },
				{ status: 'yes', note: 'Source plugins cover services such as Twitch, PeerTube, and SoundCloud. Availability depends on each plugin.', source: 'https://plugins.grayjay.app/' },
				{ status: 'yes', note: 'Also supports SoundCloud, Bandcamp, PeerTube, and media.ccc.de.' },
				{ status: 'no', note: 'Focuses on YouTube.' },
				{ status: 'no', note: 'Focuses on YouTube and YouTube Music, rather than services such as Twitch, PeerTube, or SoundCloud.', source: `${flowRelease}#features` },
				{ status: 'no', note: 'The official app plays YouTube content, not feeds from Twitch, PeerTube, or SoundCloud.' },
			] },
		],
	},
	{
		name: 'Watching & listening',
		rows: [
			{ name: 'Downloads', icon: 'lucide:download', cells: [
				{ status: 'yes', note: 'Download videos, audio, playlists, and subtitles for offline use.', source: 'https://opentubex.org/extra-features/#download-support' },
				{ status: 'no', label: 'Removed in 0.24', note: 'FreeTube removed its built-in downloader in 0.24.0. External download tools are separate from the app.', source: 'https://github.com/FreeTubeApp/FreeTube/releases/tag/v0.24.0-beta' },
				{ status: 'yes', note: 'Download videos and playlists for offline viewing on supported sources.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Download video, audio, or captions; choose formats and quality.' },
				{ status: 'yes', note: 'Includes downloads for offline playback.' },
				{ status: 'yes', note: 'Android supports video and audio downloads with quality and codec selection, including VP9 and AV1.', source: `${flowRelease}#video` },
				{ status: 'partial', label: 'Plan / region limits', note: ['Premium offers in-app offline downloads; ', { text: 'Premium Lite', href: 'https://support.google.com/youtube/answer/15968883?hl=en' }, ' includes eligible non-music videos, excluding Shorts. Some regions allow selected videos without a paid plan. Downloads stay within YouTube, rather than becoming freely exportable media files.'], source: 'https://support.google.com/youtube/answer/7381437?hl=en' },
			] },
			{ name: 'Per-channel playback settings', icon: 'lucide:sliders-horizontal', cells: [
				{ status: 'yes', note: 'Save and automatically apply playback speed, quality, subtitles, and volume separately for each channel.', source: 'https://opentubex.org/extra-features/#per-channel-playback-settings' },
				{ status: 'no', note: 'Global player preferences are available, but no per-channel playback presets are documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/static/locales/en-US.yaml' },
				{ status: 'no', note: 'Default playback speed is an app-wide preference. No per-channel playback presets are documented.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'no', note: 'Playback speed and pitch can be adjusted, but these are not saved as separate channel presets.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/java/org/schabi/newpipe/player/helper/PlaybackParameterDialog.java' },
				{ status: 'no', note: 'The playback panel saves general speed preferences, not separate settings for individual channels.', source: 'https://github.com/libre-tube/LibreTube/blob/master/app/src/main/java/com/github/libretube/ui/sheets/PlaybackOptionsSheet.kt' },
				{ status: 'no', note: 'General playback speed, quality, and audio preferences are available, but no separate per-channel playback presets are documented.', source: `${flowCode}/data/local/PlayerPreferences.kt` },
				{ status: 'no', note: 'YouTube documents video playback and general quality controls, not user-defined playback presets for each channel.', source: 'https://support.google.com/youtube/answer/7509567?hl=en' },
			] },
			{ name: 'Skip silence', icon: 'lucide:skip-forward', cells: [
				{ status: 'yes', note: 'Automatically jump over detected silent portions of a video.', source: 'https://opentubex.org/extra-features/#skip-silence' },
				{ status: 'no', note: 'No built-in automatic silence-skipping control is documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/static/locales/en-US.yaml' },
				{ status: 'no', note: 'Playback-speed controls are available, but no built-in silence-skipping setting is documented.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'yes', note: 'The playback dialog includes fast-forwarding during silence.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/java/org/schabi/newpipe/player/helper/PlaybackParameterDialog.java' },
				{ status: 'yes', note: 'The playback options include a Skip silence toggle.', source: 'https://github.com/libre-tube/LibreTube/blob/master/app/src/main/java/com/github/libretube/ui/sheets/PlaybackOptionsSheet.kt' },
				{ status: 'yes', label: 'Android', note: ['Android uses ExoPlayer silence skipping. The ', { text: 'desktop beta setting', href: `${flowDesktop}/src/lib/settings/schema.ts` }, ' is disabled because silence analysis is not yet implemented.'], source: `${flowCode}/player/audio/AudioFeaturesManager.kt` },
				{ status: 'no', note: 'No dedicated silence-skipping control is documented. Premium Auto speed adjusts pacing on eligible Android videos; it is a different feature.', source: 'https://support.google.com/youtube/answer/6308116?hl=en' },
			] },
			{ name: 'SponsorBlock', image: '/compare-icons/sponsorblock.png', cells: [
				{ status: 'yes', label: 'Extended controls', note: 'Category skipping, mute segments, full-video labels, channel whitelisting, and in-player submissions.', source: 'https://opentubex.org/extra-features/#sponsorblock-submission' },
				{ status: 'partial', label: 'Segment skipping', note: 'Supports SponsorBlock segment skipping and category controls. In-player submissions, mute segments, and full-video labels are not documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/src/renderer/helpers/sponsorblock.js' },
				{ status: 'partial', label: 'YouTube plugin', note: 'Enable SponsorBlock in the YouTube source settings for category-based manual or automatic skipping. In-player submissions, mute segments, and full-video labels are not documented.', source: 'https://plugins.grayjay.app/Youtube/YoutubeConfig.json' },
				{ status: 'partial', label: 'Unofficial forks', note: 'The official NewPipe app does not include SponsorBlock. Unofficial forks add support for it.', source: 'https://newpipe.net/blog/pinned/newpipe-and-online-advertising/' },
				{ status: 'partial', label: 'Limited controls', note: 'Includes segment skipping, voting, submissions, and full-video labels. Released version 32.1 does not offer mute-segment or full-video-label submission controls.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/dialogs/SubmitSegmentDialog.kt' },
				{ status: 'partial', label: 'Segment controls', note: ['Android supports category-based skipping and muting, plus ', { text: 'in-player segment submissions', href: `${flowCode}/ui/screens/player/dialogs/SbSubmitSegmentDialog.kt` }, '. Full-video labels and channel whitelisting are not documented.'], source: `${flowCode}/player/sponsorblock/SponsorBlockHandler.kt` },
				{ status: 'partial', label: 'Web extension', note: 'SponsorBlock works on the YouTube website through a browser extension. It is not built into YouTube and does not add SponsorBlock to the official Android or iOS app.', source: 'https://sponsor.ajay.app/' },
			] },
			{ name: 'Auto picture-in-picture', icon: 'lucide:picture-in-picture-2', cells: [
				{ status: 'yes', note: 'Automatically enter picture-in-picture when switching tabs or windows, or minimizing the app.', source: 'https://opentubex.org/extra-features/#auto-picture-in-picture' },
				{ status: 'no', note: 'Picture-in-picture can be activated manually. Automatic entry when switching away is not documented.', source: 'https://docs.freetubeapp.io/usage/keyboard-shortcuts/' },
				{ status: 'yes', note: 'On Android, choose Player Overlay under Background Behavior to enter picture-in-picture when leaving the app.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'yes', note: 'Set Minimize on app switch to the popup player. This uses a floating overlay and requires permission to display over other apps.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Enters picture-in-picture when leaving the player while playback is active, with PiP enabled.', source: 'https://github.com/libre-tube/LibreTube/blob/master/app/src/main/java/com/github/libretube/ui/fragments/PlayerFragment.kt' },
				{ status: 'yes', label: 'Android', note: 'With Auto PiP enabled, Android enters picture-in-picture when leaving the app during video playback. The desktop companion supports PiP, but automatic entry is not documented.', source: `${flowCode}/MainActivity.kt` },
				{ status: 'partial', label: 'Content limits', note: 'Leaving the Android or iOS app starts picture-in-picture when enabled. Non-music videos and Shorts support PiP without a paid plan; music content requires Premium.', source: 'https://support.google.com/youtube/answer/7552722?hl=en' },
			] },
			{ name: 'Tabs', icon: 'lucide:panels-top-left', cells: [
				{ status: 'yes', note: 'Keep separate videos and channels open in tabs within the app.', source: 'https://opentubex.org/extra-features/#tab-support' },
				{ status: 'no', note: 'FreeTube supports separate windows, but does not provide browser-style tabs.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/333' },
				{ status: 'no', note: 'Navigation tabs organize app sections. No browser-style tabs for keeping separate videos or channels open are documented.', source: 'https://grayjay.app/faq.html' },
				{ status: 'no', note: 'Home-page tabs organize feeds and app sections, rather than separate open videos or channels.' },
				{ status: 'no', note: 'Navigation sections are available, but no browser-style tabs for separate open videos or channels are documented.' },
				{ status: 'no', note: 'Navigation tabs organize app sections. No browser-style tabs for keeping separate videos or channels open are documented.', source: `${flowRelease}#features` },
				{ status: 'partial', label: 'Browser tabs', note: 'The website can be opened in multiple browser tabs. The mobile app does not provide tabs for keeping separate videos or channels open.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Background audio', icon: 'lucide:headphones', cells: [
				{ status: 'yes', note: 'Continue listening while using other apps or with the screen off.', source: 'https://opentubex.org/extra-features/#mobile-app-support' },
				{ status: 'yes', note: 'Background audio playback is supported.', source: 'https://docs.freetubeapp.io/usage/video-formats/' },
				{ status: 'yes', note: 'Android supports background playback.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Background player supports audio playback while using other apps.' },
				{ status: 'yes', note: 'Background playback is included.' },
				{ status: 'yes', note: 'Android supports background audio playback while using other apps or with the screen off.', source: `${flowRelease}#video` },
				{ status: 'partial', label: 'Premium', note: 'Mobile background playback requires a paid plan. Premium Lite includes eligible non-music videos, excluding Shorts; full Premium covers music too. Desktop browser audio can continue in another tab.', source: 'https://support.google.com/youtube/answer/15968883?hl=en' },
			] },
			{ name: 'Recommendation engine', icon: 'lucide:sparkles', cells: [
				{ status: 'partial', label: 'Local ranking', note: ['Optional Home recommendations learn from viewing activity, saved videos, and feedback, with Familiar, Balanced, and Explore discovery modes. Discovery ranks a limited candidate pool from related videos, selected channels, and searches. See the ', { text: 'candidate collection', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/src/renderer/helpers/recommendationCandidates.js' }, '.'], source: 'https://opentubex.org/extra-features/#customizable-home-page' },
				{ status: 'no', note: 'Shows related videos supplied by YouTube or Invidious and regional trending feeds. No built-in personalized recommendation engine that learns from local viewing activity is documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/src/renderer/views/Watch/Watch.js' },
				{ status: 'partial', label: 'Source feeds', note: 'Home aggregates recommendations supplied by its source platforms. Signing into a supported source can provide personalized recommendations; Grayjay does not provide its own independent recommendation engine.', source: 'https://github.com/futo-org/grayjay-android#feed' },
				{ status: 'no', note: 'Related videos and trending feeds are available, but a personalized feed learned from local viewing activity remains a feature request.', source: 'https://github.com/TeamNewPipe/NewPipe/issues/13362' },
				{ status: 'no', note: 'Released version 32.1 offers trending, subscription, and related-video feeds. No built-in personalized recommendation engine that learns from local viewing activity is documented.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/fragments/HomeFragment.kt' },
				{ status: 'yes', label: 'On-device', note: 'FlowNeuro learns from watches, skips, likes, dislikes, searches, and viewing duration. It ranks recommendations locally, including time-of-day preferences and topic diversity, without a Google account or a recommendation server.', source: `${flowRelease}#recommendations-flowneuro-engine` },
				{ status: 'yes', label: 'Server-side', note: 'YouTube personalizes Home, Shorts, and other surfaces using viewing and search history, subscriptions, likes, dislikes, and feedback. Processing happens on its servers; Home recommendations depend primarily on watch history.', source: 'https://support.google.com/youtube/answer/16089387?hl=en' },
			] },
			{ name: 'Distraction-free toggles', icon: 'lucide:list-filter', cells: [
				{ status: 'yes', note: 'Hide Shorts, recommendations, comments, counts, and navigation sections. Filter subscription feeds by videos, Shorts, live streams, and posts; hide watched content or block channels and title keywords.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/static/locales/en-US.yaml' },
				{ status: 'yes', note: 'Hide recommendations, comments, counts, and channel tabs such as Shorts. Filter subscription feeds by content type, hide watched videos, and block channels or title keywords.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/static/locales/en-US.yaml' },
				{ status: 'partial', label: 'Limited controls', note: 'Android can hide the recommendations tab and customize visible navigation tabs. These are narrower controls than a full set of Shorts, comments, and subscription-content hiding toggles.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'partial', label: 'Player / home controls', note: 'Hide related videos, comments, and metadata boxes; choose the tabs on the home page and disable automatic queueing. A global toggle to hide Shorts is not documented.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/res/values/strings.xml' },
				{ status: 'partial', label: 'Feed / player controls', note: ['Released version 32.1 filters feeds by videos, Shorts, and live streams, and can hide watched or upcoming videos. ', { text: 'App settings', href: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/xml/general_settings.xml' }, ' can also hide related videos and search suggestions. These controls do not hide Shorts everywhere.'], source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/FilterSortBottomSheet.kt' },
				{ status: 'yes', note: 'Android can hide Shorts across the app, related videos, comments, watched feed items, and navigation sections. Recommendation controls can also block topics and channels.', source: `${flowCode}/ui/screens/settings/ContentSettingsScreen.kt` },
				{ status: 'partial', label: 'Recommendation controls', note: 'Show fewer Shorts and mark recommendations as Not interested or Don\'t recommend channel. Removing and disabling watch history can remove Home recommendations; there is no equivalent general set of interface-hiding toggles.', source: 'https://support.google.com/youtube/answer/6342839?hl=en' },
			] },
			{ name: 'Watch queue', icon: 'lucide:list-video', cells: [
				{ status: 'yes', note: 'Add videos to the watch queue or play them next, then remove or reorder items in the side panel.', source: 'https://opentubex.org/extra-features/#watch-queue' },
				{ status: 'no', note: 'Playlists and autoplay are available, but a separate watch queue remains an open feature request.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/547' },
				{ status: 'yes', note: 'Add videos to a playback queue. Android includes a queue editor for managing the upcoming videos.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/views/overlays/QueueEditorOverlay.kt' },
				{ status: 'yes', note: 'Enqueue videos, choose a video to play next, and manage the player queue. Automatic addition of related videos is optional.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Released version 32.1 includes Add to queue and queue controls, with optional insertion of related videos.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Android includes a video queue with removal and reordering controls, alongside its separate music queue. The desktop beta also supports playback queues.', source: `${flowCode}/ui/components/FlowPlaylistQueueBottomSheet.kt` },
				{ status: 'partial', label: 'Mobile requires Premium', note: 'Queue videos for free on desktop and the web. Queueing on phones and tablets requires YouTube Premium; a browser queue is lost when the browser closes unless saved as a playlist.', source: 'https://support.google.com/youtube/answer/9546304?hl=en' },
			] },
			{ name: 'Sleep timer', icon: 'lucide:timer', cells: [
				{ status: 'yes', note: 'Stop playback after a chosen duration, when the current chapter ends, or when the current video ends.', source: 'https://opentubex.org/extra-features/#sleep-timer' },
				{ status: 'no', note: 'No built-in sleep timer is documented in the player or settings.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/static/locales/en-US.yaml' },
				{ status: 'no', note: 'No built-in sleep timer is documented. Using a separate system or media timer is an external workflow.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'No built-in sleep timer is documented in the official app. Separate Android sleep-timer apps are an external workflow.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Released version 32.1 includes a sleep timer with a custom duration and quick choices of 10, 20, 30, 45, or 60 minutes.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/SleepTimerSheet.kt' },
				{ status: 'yes', label: 'Android', note: 'A shared sleep timer stops video or music playback after a chosen duration, with an optional action to close the app.', source: `${flowCode}/player/SleepTimerManager.kt` },
				{ status: 'yes', note: 'Use the player\'s Sleep timer setting to pause the video automatically after a chosen duration.', source: 'https://support.google.com/youtube/answer/15397997?hl=en' },
			] },
			{ name: 'Cast to a TV', icon: 'lucide:cast', cells: [
				{ status: 'yes', label: 'Chromecast & DLNA', note: 'Chromecast and DLNA casting are supported on Android and desktop.', source: 'https://opentubex.org/extra-features/#cast-to-chromecast-and-dlna-devices' },
				{ status: 'no', note: 'No built-in TV casting. DLNA and UPnP support remains an open feature request; casting through an external player is a separate workflow.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/437' },
				{ status: 'yes', label: 'Multiple protocols', note: 'Supports FCast, Chromecast, and AirPlay. FCast is recommended; Chromecast may need the phone to proxy separate audio and video streams, while AirPlay does not support those separated streams.', source: 'https://grayjay.app/faq.html' },
				{ status: 'partial', label: 'Kodi via Kore', note: 'The Play with Kodi option sends playback to a Kodi media center through the separate Kore remote app. This is not built-in Chromecast or AirPlay casting.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'Released version 32.1 has no built-in TV casting. Opening a video in a separate casting-capable player is an external workflow.', source: 'https://github.com/libre-tube/LibreTube/discussions/3493' },
				{ status: 'yes', label: 'Android DLNA', note: 'Android casts to compatible DLNA/UPnP devices without Google Play Services. This is not Chromecast or AirPlay support.', source: `${flowCode}/player/dlna/DlnaCastManager.kt` },
				{ status: 'yes', note: 'Cast from the mobile app or a supported desktop browser to compatible TVs and streaming devices. The mobile app can also link to the TV app using a TV code.', source: 'https://support.google.com/youtube/answer/7640706?hl=en' },
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
				{ status: 'yes', note: 'Subscriptions are stored locally without a Google account. The desktop beta also supports local subscriptions.', source: `${flowRelease}#library` },
				{ status: 'no', label: 'Account required', note: 'Watching many videos is possible while signed out, but subscribing to channels requires a Google account.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Sync between devices', icon: 'lucide:refresh-cw', cells: [
				{ status: 'yes', label: 'End-to-end encrypted', note: 'Optional sync covers subscriptions, playlists, history, channel settings, profiles, tabs, and settings.', source: otxSync },
				{ status: 'no', label: 'Local data', note: 'No built-in account sync. Copying database files or using an external file-sync tool is a separate workflow.', source: localOnly },
				{ status: 'yes', label: 'Device pairing', note: 'Paired-device sync includes subscriptions, playlists, watch later, subscription groups, and history. Devices need a working connection to each other.', source: gjSync },
				{ status: 'no', label: 'Manual backup', note: 'Import and export transfer your data manually; they are not automatic device sync.', source: 'https://github.com/TeamNewPipe/NewPipe#installation-and-updates' },
				{ status: 'partial', label: 'Piped account', note: 'Released version 32.1 supports Piped account sync for subscriptions and playlists. Watch history and settings stay local; the new LibreTube sync server is not included in this release.', source: ltPrivacy },
				{ status: 'yes', label: 'Device pairing', note: 'Optional paired-device sync exchanges playlists, history, likes, subscriptions and groups, selected settings, and the recommendation profile. Supports Android and the desktop beta; devices need a direct connection.', source: `${flowCode}/ui/screens/sync/SyncCollections.kt` },
				{ status: 'yes', label: 'Google account', note: 'Subscriptions and playlists follow your signed-in Google account across devices. This does not mean every device-specific preference is synced.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Sync watch history', icon: 'lucide:history', cells: [
				{ status: 'yes', note: 'History is one of the optional sync categories.', source: otxSync },
				{ status: 'no', note: 'History is stored in a local database, without built-in sync.', source: localOnly },
				{ status: 'yes', note: 'The device-sync implementation exchanges recent history.', source: gjSync },
				{ status: 'no', note: 'History can be included in manual database backups, not automatically synced between devices.', source: 'https://github.com/TeamNewPipe/NewPipe#installation-and-updates' },
				{ status: 'no', note: 'In released version 32.1, Piped account sync does not include watch history or timestamps; these remain local.', source: ltPrivacy },
				{ status: 'yes', note: 'Watch history is a selectable collection in paired-device sync, including sync with the desktop beta.', source: `${flowCode}/ui/screens/sync/SyncCollections.kt` },
				{ status: 'yes', label: 'History enabled', note: 'Signed-in watch history is saved to your Google account when enabled. You can pause or delete it.', source: 'https://support.google.com/youtube/answer/95725?hl=en' },
			] },
			{ name: 'Watch statistics', icon: 'lucide:chart-column', cells: [
				{ status: 'yes', note: 'Daily and weekly watch-time charts show your viewing activity.', source: 'https://opentubex.org/extra-features/#watch-time-statistics' },
				{ status: 'no', note: 'Watch history is available, but no personal watch-time dashboard is documented. Video playback statistics describe the current stream, not your viewing habits.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/static/locales/en-US.yaml' },
				{ status: 'yes', note: 'Watch metrics show watch time and views for each creator in the Creators tab.', source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/res/values/strings.xml' },
				{ status: 'partial', label: 'Most played', note: 'The Most Played view summarizes frequently played videos. It is not a daily or weekly watch-time dashboard.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/dev/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'Watch history and playback positions are available, but no personal watch-time dashboard is documented.', source: 'https://github.com/libre-tube/LibreTube/blob/master/app/src/main/res/values/strings.xml' },
				{ status: 'partial', label: 'Taste dashboard', note: 'The local recommendation dashboard shows topic interests, time-of-day patterns, and learning activity. It is not a daily or weekly watch-time dashboard.', source: `${flowCode}/ui/screens/personality/FlowPersonalityScreen.kt` },
				{ status: 'yes', label: 'Account required', note: 'Time watched shows daily average, today, yesterday, and the past seven days for signed-in users with watch history enabled. Excludes deleted history, private viewing, YouTube Music, and YouTube TV. YouTube reports a known error in desktop watch-time totals.', source: 'https://support.google.com/youtube/answer/9052667?hl=en' },
			] },
		],
	},
	{
		name: 'Privacy',
		rows: [
			{ name: 'Local-first', icon: 'lucide:hard-drive', cells: [
				{ status: 'yes', note: 'Subscriptions, playlists, history, and settings are stored on your device. An account is only needed if you choose to sync.', source: 'https://opentubex.org/privacy/#desktop-and-mobile-apps' },
				{ status: 'yes', note: 'Subscriptions, playlists, history, and settings are stored locally, without an account.', source: localOnly },
				{ status: 'yes', note: 'Subscriptions, playlists, and history are stored on your device. Platform sign-in and paired-device sync are optional.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Subscriptions, playlists, and history are stored on your device, without an account.', source: 'https://newpipe.net/' },
				{ status: 'yes', note: 'Library data stays on your device when signed out. Optional Piped accounts store subscriptions and playlists on the selected instance; history stays local.', source: ltPrivacy },
				{ status: 'yes', note: 'History, subscriptions, playlists, preferences, and recommendation data stay on the device by default. Device sync is optional.', source: 'https://github.com/Flow-Tube#privacy-policy-and-disclaimer' },
				{ status: 'no', label: 'Cloud account', note: 'Subscriptions and playlists depend on a Google account. Signed-in watch history is stored in that account when enabled.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'No telemetry', icon: 'lucide:eye-off', cells: [
				{ status: 'yes', note: 'Viewing statistics and history stay local by default. Optional sync sends selected data to your chosen server; playback and optional services still expose network metadata.', source: 'https://opentubex.org/privacy/#desktop-and-mobile-apps' },
				{ status: 'yes', note: 'Viewing data stays local. YouTube and optional services can still see requests and your IP address; this is not anonymity.', source: 'https://docs.freetubeapp.io/usage/privacy/' },
				{ status: 'partial', label: 'Startup telemetry', note: ['Android and desktop send startup telemetry with a persistent random identifier and app/platform information. Android also includes device details and enabled source IDs. These payloads exclude watched videos and searches. See the ', { text: 'desktop implementation', href: 'https://github.com/futo-org/Grayjay.Desktop/blob/master/Grayjay.ClientServer/States/StateTelemetry.cs' }, '.'], source: 'https://github.com/futo-org/grayjay-android/blob/master/app/src/main/java/com/futo/platformplayer/states/StateTelemetry.kt' },
				{ status: 'yes', note: 'No automatic usage reporting. Bug reports are sent only when you choose to submit them. Media services still receive playback requests.', source: 'https://newpipe.net/legal/privacy/' },
				{ status: 'yes', note: 'Its privacy policy states that it does not gather app-usage data or use tracking libraries. Direct playback and optional Piped services still receive requests.', source: ltPrivacy },
				{ status: 'yes', note: 'Recommendations are computed locally without app-usage reporting. YouTube and optional services such as SponsorBlock and DeArrow still receive network requests.', source: `${flowDesktop}#privacy-and-security` },
				{ status: 'no', label: 'Activity collection', note: 'Google collects activity such as videos watched, searches, and interactions. History and personalization controls affect storage and use; Premium does not remove this data collection.', source: 'https://policies.google.com/privacy?hl=en' },
			] },
			{ name: 'No proprietary libraries', icon: 'lucide:package-check', cells: [
				{ status: 'yes', note: ['No proprietary runtime SDK is declared in the checked app dependencies. Android explicitly excludes the unused proprietary ML Kit barcode scanner and uses ZXing for pairing. See the ', { text: 'Android dependencies', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/android/app/build.gradle' }, '. Operating-system components and remote YouTube services are outside this comparison.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/package.json' },
				{ status: 'yes', note: 'The official desktop app declares open-source dependencies, including Electron and its playback and extraction libraries. No proprietary runtime SDK is declared. This does not cover unofficial mobile forks, operating-system components, or remote YouTube services.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/package.json' },
				{ status: 'no', label: 'Android payments', note: ['Android declares Stripe Android 22.0.0. Its ', { text: 'payment module', href: 'https://github.com/stripe/stripe-android/blob/v22.0.0/payments-core/build.gradle' }, ' depends on Google\'s proprietary Play services Wallet client library. Stripe itself is open source. This payment dependency does not establish that ordinary video playback requires Play services; the separate desktop app has a different dependency stack.'], source: 'https://github.com/futo-org/grayjay-android/blob/master/app/build.gradle' },
				{ status: 'yes', note: 'NewPipe explicitly avoids proprietary libraries and frameworks such as Google Play services. Playback still contacts the selected media service; this is not a claim that YouTube itself is open source.', source: 'https://github.com/TeamNewPipe/NewPipe#description' },
				{ status: 'yes', note: 'Released version 32.1 declares open-source app libraries, without a Google Play services or other proprietary runtime SDK dependency. YouTube is still a proprietary network service; operating-system components are outside this comparison.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/build.gradle.kts' },
				{ status: 'yes', note: ['Android 2.2.1 declares open-source runtime libraries and implements DLNA casting without Google Play services. The ', { text: 'desktop beta', href: `${flowDesktop}/src-tauri/Cargo.toml` }, ' also uses open-source app libraries. The GitHub flavor adds an updater and Discord integration, rather than a proprietary Discord SDK. System WebViews and remote services are outside this comparison.'], source: `${flowRelease}/app/build.gradle.kts` },
				{ status: 'no', label: 'Proprietary client', note: 'The official apps and web client use proprietary YouTube software and do not provide an auditable, fully open-source client stack. Their complete library inventory is not public. Browser playback does not require Android Google Play services.', source: 'https://www.youtube.com/static?template=terms' },
			] },
			{ name: 'License', icon: 'lucide:scale', cells: [
				{ label: 'AGPLv3', note: 'Open-source app licensed under the GNU Affero General Public License version 3.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/LICENSE' },
				{ label: 'AGPLv3', note: 'Open-source app licensed under the GNU Affero General Public License version 3.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/development/LICENSE' },
				{ label: 'Source First 1.1', note: ['Source-available under FUTO\'s Source First License 1.1, with restrictions on commercial use and redistribution. Both Android and ', { text: 'desktop', href: 'https://github.com/futo-org/Grayjay.Desktop/blob/master/LICENSE.md' }, ' use this license.'], source: 'https://github.com/futo-org/grayjay-android/blob/master/LICENSE.md' },
				{ label: 'GPLv3', note: 'Open-source app licensed under the GNU General Public License version 3 or later.', source: 'https://github.com/TeamNewPipe/NewPipe' },
				{ label: 'GPLv3', note: 'Open-source app licensed under the GNU General Public License version 3 or later.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/README.md' },
				{ label: 'GPLv3', note: 'The Android app and desktop companion are open source under the GNU General Public License version 3.', source: `${flowRelease}/License` },
				{ label: 'Proprietary', note: 'The official YouTube service and apps are proprietary and governed by YouTube\'s Terms of Service; they are not published under an open-source app license.', source: 'https://www.youtube.com/static?template=terms' },
			] },
		],
	},
];
