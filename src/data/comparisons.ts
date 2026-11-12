export type Support = 'yes' | 'partial' | 'no';

type Cell = ({ status: Support; label?: string } | { status?: never; label: string }) & {
	note: string | (string | { text: string; href: string })[];
	source?: string;
};

interface Row {
	name: string;
	url?: string;
	icon?: string;
	image?: string;
	cells: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
}

export const clients = [
	{ name: 'OpenTubeX', icon: '/favicon.svg', url: '/downloads/', source: 'https://github.com/OpenTubeX/OpenTubeX' },
	{ name: 'FreeTube', icon: '/compare-icons/freetube.svg', url: 'https://freetubeapp.io/', source: 'https://github.com/FreeTubeApp/FreeTube' },
	{ name: 'Grayjay', icon: '/compare-icons/grayjay.png', url: 'https://grayjay.app/desktop/', source: 'https://grayjay.app/desktop/' },
	{ name: 'NewPipe', icon: '/compare-icons/newpipe.svg', url: 'https://newpipe.net/', source: 'https://newpipe.net/' },
	{ name: 'LibreTube', icon: '/compare-icons/libretube.svg', url: 'https://libretube.dev/', source: 'https://github.com/libre-tube/LibreTube' },
	{ name: 'Flow', icon: '/compare-icons/flow.svg', url: 'https://flow-tube.org/', source: 'https://github.com/Flow-Tube/Flow/tree/v3.0.0' },
	{ name: 'NewTube', icon: '/compare-icons/newtube.svg', url: 'https://newtube.org/', source: 'https://github.com/aleixrodriala/newtube/tree/v1.17.1' },
	{ name: 'Morphe', icon: '/compare-icons/morphe.svg', url: 'https://morphe.software/', source: 'https://github.com/MorpheApp/morphe-patches/tree/v2.2.0' },
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
const gjSync = 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/states/StateSync.kt';
const flowRelease = 'https://github.com/Flow-Tube/Flow/tree/v3.0.0';
const flowCode = `${flowRelease}/app/src/main/java/io/github/aedev/flow`;
const flowDesktop = 'https://github.com/Flow-Tube/Flow-Desktop/tree/v0.1.0-beta3';
const localOnly = 'https://docs.freetubeapp.io/usage/data-location/';
const ntRelease = 'https://github.com/aleixrodriala/newtube/blob/v1.17.1';
const ntReadme = `${ntRelease}/README.md`;
const ntPrivacy = `${ntRelease}/PRIVACY.md`;
const ntMobile = `${ntRelease}/smarttubetv/src/stmobile`;
const ntCode = `${ntMobile}/java/com/newtube/mobile`;
const ntSettings = `${ntMobile}/res/values/strings_settings.xml`;
const ntStrings = `${ntMobile}/res/values/strings_mobile.xml`;
const morpheRelease = 'https://github.com/MorpheApp/morphe-patches/blob/v2.2.0';
const morpheReadme = `${morpheRelease}/README.md`;
const morphePatches = `${morpheRelease}/patches/src/main/kotlin/app/morphe/patches/youtube`;
const morpheExtension = `${morpheRelease}/extensions/youtube/src/main/java/app/morphe/extension/youtube`;
const morpheStrings = `${morpheRelease}/patches/src/main/resources/addresources/values`;
const morpheFaq = 'https://github.com/MorpheApp/morphe-documentation/blob/533356050d990de5d681888ee79d376b0b6b02b1/docs/morphe-resources/troubleshooting_questions.md';
const morpheInstall = 'https://github.com/MorpheApp/morphe-manager/blob/main/docs/installers.md#root-mount-in-detail';

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
				{ status: 'partial', label: 'Desktop beta', note: 'Flow Desktop is a separate companion for Windows, macOS, and Linux. Version 0.1.0-beta3 is available; it has not reached a stable release.', source: `${flowDesktop}#downloads-and-supported-systems` },
				{ status: 'no', note: 'An Android app for phones and tablets. No desktop client.', source: ntReadme },
				{ status: 'no', note: 'Morphe patches Android apps. Morphe Desktop patches APK files on a computer; it is not a desktop video player.', source: 'https://github.com/MorpheApp/morphe-desktop' },
				{ status: 'partial', label: 'Web app', note: 'Use YouTube in a desktop browser, including installation as a web app where the browser supports it. This is not a separate desktop player.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Android app', icon: 'simple-icons:android', cells: [
				{ status: 'yes', note: 'Available for Android phones and tablets; some desktop features differ.', source: otxMobile },
				{ status: 'partial', label: 'Unofficial fork', note: 'FreeTubeAndroid is a separately maintained, unofficial port. FreeTube itself does not publish an Android app.', source: 'https://github.com/MarmadileManteater/FreeTubeAndroid' },
				{ status: 'yes', note: 'Dedicated Android app, alongside separate desktop releases.' },
				{ status: 'yes', note: 'Built for Android. The project still labels its releases beta.' },
				{ status: 'yes', note: 'Built for Android with a Material Design interface.' },
				{ status: 'yes', note: 'Native Android app for Android 8.0 and later.', source: `${flowRelease}#requirements` },
				{ status: 'yes', note: 'Built for Android 7.0 and later on phones and tablets. Released as APKs on GitHub, not on Google Play.', source: `${ntReadme}#download` },
				{ status: 'yes', label: 'Patched YouTube', note: 'Patches the official YouTube Android app on the phone with Morphe Manager or on a computer with Morphe Desktop. Without root, the patched app installs separately and needs MicroG-RE for Google sign-in.', source: morpheInstall },
				{ status: 'yes', note: 'Official Android app available from Google Play.', source: 'https://support.google.com/youtube/answer/3227660?hl=en' },
			] },
			{ name: 'iOS app', icon: 'simple-icons:apple', cells: [
				{ status: 'partial', label: 'Experimental', note: 'An unsigned IPA is available for iOS/iPadOS 17.4+. Requires sideloading and periodic signing refreshes; several features are unavailable.', source: 'https://opentubex.org/docs/installing/#ios--ipados-experimental' },
				{ status: 'no', note: 'Official FreeTube releases are desktop-only.' },
				{ status: 'no', note: 'Grayjay offers Android and desktop apps, but no official iOS app.', source: 'https://grayjay.app/desktop/' },
				{ status: 'no', note: 'NewPipe is an Android app; there is no official iOS release.' },
				{ status: 'no', note: 'LibreTube is an Android app; there is no official iOS release.' },
				{ status: 'no', note: 'Flow offers Android and a separate desktop companion, but no official iOS app.', source: 'https://github.com/Flow-Tube#projects' },
				{ status: 'no', note: 'NewTube is an Android app; there is no iOS release.', source: ntReadme },
				{ status: 'no', note: 'Morphe is a patcher for Android apps and is not available on iOS.', source: `${morpheFaq}#106-is-morphe-available-on-ios-or-tv` },
				{ status: 'yes', note: 'Official YouTube app for iPhone and iPad.', source: 'https://support.google.com/youtube/answer/3227660?co=GENIE.Platform%3DiOS&hl=en' },
			] },
			{ name: 'Web app', icon: 'lucide:globe', cells: [
				{ status: 'yes', note: 'Runs in the browser without installing anything, with the library saved in the browser. Videos load through Invidious or your own Yattee server; downloads and the built-in extractor need the installed app.', source: 'https://opentubex.org/demo/' },
				{ status: 'partial', label: 'Self-build only', note: 'The source includes a web build that you can build and host yourself. FreeTube does not publish or host a web version.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/package.json' },
				{ status: 'no', note: 'Grayjay offers Android and desktop apps, but no web version.', source: 'https://grayjay.app/desktop/' },
				{ status: 'no', note: 'NewPipe is an Android app; there is no web version.' },
				{ status: 'no', note: 'LibreTube is an Android app; there is no web version.' },
				{ status: 'no', note: 'Flow offers Android and a separate desktop companion. Its browser extension sends videos to the desktop app, rather than playing them in the browser.', source: 'https://github.com/Flow-Tube#projects' },
				{ status: 'no', note: 'NewTube is an Android app; there is no web version.', source: ntReadme },
				{ status: 'no', note: 'Morphe patches Android apps; there is no web version.', source: `${morpheFaq}#100-what-is-morphe` },
				{ status: 'yes', note: 'The YouTube website works in desktop and mobile browsers.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Native mobile interface', icon: 'lucide:smartphone', cells: [
				{ status: 'no', label: 'Web-based', note: 'The Android and experimental iOS/iPadOS apps use Capacitor with a shared web interface and native integrations. The interface is web-based on both platforms.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.37.4-beta/package.json' },
				{ status: 'no', label: 'Web-based fork', note: 'Official FreeTube releases are desktop-only. The unofficial FreeTubeAndroid port loads FreeTube\'s web interface in a native Android WebView.', source: 'https://github.com/MarmadileManteater/FreeTubeAndroid/tree/0.25.3.1/android/app/src/main/java/io/freetubeapp/freetube' },
				{ status: 'yes', note: 'Native mobile interface on Android only, implemented in its dedicated Android codebase.', source: 'https://github.com/futo-org/grayjay-android' },
				{ status: 'yes', note: 'Native mobile interface built with Android UI components. Available on Android only.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3' },
				{ status: 'yes', note: 'Native mobile interface with Material Design. Available on Android only.' },
				{ status: 'yes', note: 'Native Android interface built with Jetpack Compose and Material 3. No iOS app.', source: flowRelease },
				{ status: 'yes', note: 'Native Android touch interface with Material Design, built on SmartTube\'s engine. Android only.', source: `${ntReadme}#newtube-and-smarttube` },
				{ status: 'yes', note: 'Keeps the native interface of the official YouTube Android app. A patch can switch the layout to the phone, tablet, or automotive version.', source: `${morphePatches}/layout/formfactor/ChangeFormFactorPatch.kt` },
				{ status: 'yes', note: 'Native mobile interfaces in the official Android and iOS apps, designed for phones and tablets.', source: 'https://support.google.com/youtube/answer/3227660?hl=en' },
			] },
			{ name: 'Services beyond YouTube', icon: 'lucide:layers', cells: [
				{ status: 'partial', label: 'RSS feeds / playback', note: ['Follow creators on other platforms, such as Twitch through RSSHub, with RSS or Atom feeds in an RSS tab of the subscriptions feed. Feed items and media URLs from a ', { text: 'yt-dlp-supported service', href: 'https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md' }, ', pasted or shared to the Android app, play in the app and keep their watch progress. Browsing and search for other services are not supported.'], source: 'https://github.com/OpenTubeX/OpenTubeX/pull/2574' },
				{ status: 'no', note: 'Focuses on YouTube.' },
				{ status: 'yes', note: 'Source plugins cover services such as Twitch, PeerTube, and SoundCloud. Availability depends on each plugin.', source: 'https://plugins.grayjay.app/' },
				{ status: 'yes', note: 'Also supports SoundCloud, Bandcamp, PeerTube, and media.ccc.de.' },
				{ status: 'no', note: 'Focuses on YouTube.' },
				{ status: 'no', note: 'Focuses on YouTube and YouTube Music, rather than services such as Twitch, PeerTube, or SoundCloud.', source: `${flowRelease}#features` },
				{ status: 'no', note: 'Focuses on YouTube through SmartTube\'s YouTube engine.', source: ntReadme },
				{ status: 'no', note: 'The patched YouTube app plays YouTube content only. Morphe also patches YouTube Music and Reddit, but as separate apps.', source: morpheReadme },
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
				{ status: 'yes', note: 'Save videos up to 1080p, or audio only, for offline playback. Saved files go to the Movies or Music folder and show up in the gallery.', source: `${ntCode}/downloads/DownloadStorage.java` },
				{ status: 'yes', note: 'Save videos in the app without Premium, or send videos, Shorts, and playlists to an external downloader such as YTDLnis. Saved videos can be exported to device storage.', source: `${morphePatches}/interaction/downloads/DownloadsPatch.kt#L129-L132` },
				{ status: 'partial', label: 'Plan / region limits', note: ['Premium offers in-app offline downloads; ', { text: 'Premium Lite', href: 'https://support.google.com/youtube/answer/15968883?hl=en' }, ' includes eligible non-music videos, excluding Shorts. Some regions allow selected videos without a paid plan. Downloads stay within YouTube, rather than becoming freely exportable media files.'], source: 'https://support.google.com/youtube/answer/7381437?hl=en' },
			] },
			{ name: 'Per-channel playback settings', icon: 'lucide:sliders-horizontal', cells: [
				{ status: 'yes', note: 'Save and automatically apply playback speed, quality, subtitles, and volume separately for each channel.', source: 'https://opentubex.org/extra-features/#per-channel-playback-settings' },
				{ status: 'no', note: 'Global player preferences are available, but no per-channel playback presets are documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'no', note: 'Default playback speed is an app-wide preference. No per-channel playback presets are documented.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'no', note: 'Playback speed and pitch can be adjusted, but these are not saved as separate channel presets.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/java/org/schabi/newpipe/player/helper/PlaybackParameterDialog.java' },
				{ status: 'no', note: 'The playback panel saves general speed preferences, not separate settings for individual channels.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/PlaybackOptionsSheet.kt' },
				{ status: 'partial', label: 'Speed only', note: 'An optional Remember speed per channel setting starts each channel at the speed you last chose. Per-channel quality, subtitle, or volume presets are not documented.', source: `${flowCode}/data/local/PlayerPreferences.kt` },
				{ status: 'partial', label: 'Speed / captions', note: ['Playback speed can be remembered for each channel, and ', { text: 'captions', href: `${ntSettings}#L214-L215` }, ' you turn on can come back for that channel only. Per-channel quality or volume presets are not documented.'], source: `${ntSettings}#L166-L171` },
				{ status: 'partial', label: 'Speed whitelist', note: 'A channel speed whitelist always plays selected channels at 1.0x. Per-channel quality, subtitle, or volume presets are not documented.', source: `${morpheStrings}/youtube/strings.xml#L1709-L1712` },
				{ status: 'no', note: 'YouTube documents video playback and general quality controls, not user-defined playback presets for each channel.', source: 'https://support.google.com/youtube/answer/7509567?hl=en' },
			] },
			{ name: 'Skip silence', icon: 'lucide:skip-forward', cells: [
				{ status: 'yes', note: 'Automatically jump over detected silent portions of a video.', source: 'https://opentubex.org/extra-features/#skip-silence' },
				{ status: 'no', note: 'No built-in automatic silence-skipping control is documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'no', note: 'Playback-speed controls are available, but no built-in silence-skipping setting is documented.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'yes', note: 'The playback dialog includes fast-forwarding during silence.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/java/org/schabi/newpipe/player/helper/PlaybackParameterDialog.java' },
				{ status: 'yes', note: 'The playback options include a Skip silence toggle.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/PlaybackOptionsSheet.kt' },
				{ status: 'yes', label: 'Android', note: ['Android uses ExoPlayer silence skipping. The ', { text: 'desktop beta setting', href: `${flowDesktop}/src/lib/settings/schema.ts` }, ' is disabled because silence analysis is not yet implemented.'], source: `${flowCode}/player/audio/AudioFeaturesManager.kt` },
				{ status: 'no', note: 'Playback speed and pitch settings are available, but no silence-skipping setting is documented.', source: `${ntSettings}#L166-L177` },
				{ status: 'yes', note: 'Adds an option to automatically skip silent pauses in audio playback.', source: `${morphePatches}/video/audio/SkipSilencePatch.kt` },
				{ status: 'no', note: 'No dedicated silence-skipping control is documented. Premium Auto speed adjusts pacing on eligible Android videos; it is a different feature.', source: 'https://support.google.com/youtube/answer/6308116?hl=en' },
			] },
			{ name: 'Auto picture-in-picture', icon: 'lucide:picture-in-picture-2', cells: [
				{ status: 'yes', note: 'Automatically enter picture-in-picture when switching tabs or windows, or minimizing the app.', source: 'https://opentubex.org/extra-features/#auto-picture-in-picture' },
				{ status: 'no', note: 'Picture-in-picture can be activated manually. Automatic entry when switching away is not documented.', source: 'https://docs.freetubeapp.io/usage/keyboard-shortcuts/' },
				{ status: 'yes', note: 'On Android, choose Player Overlay under Background Behavior to enter picture-in-picture when leaving the app.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'yes', note: 'Set Minimize on app switch to the popup player. This uses a floating overlay and requires permission to display over other apps.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Enters picture-in-picture when leaving the player while playback is active, with PiP enabled.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/fragments/PlayerFragment.kt' },
				{ status: 'yes', label: 'Android', note: 'With Auto PiP enabled, Android enters picture-in-picture when leaving the app during video playback. The desktop companion supports PiP, but automatic entry is not documented.', source: `${flowCode}/MainActivity.kt` },
				{ status: 'yes', note: 'Leaving the app during playback enters picture-in-picture on Android 8 and later, unless When you leave the app is set to Only audio.', source: `${ntCode}/ui/playback/BackgroundModePolicy.java` },
				{ status: 'yes', note: 'Keeps the YouTube app\'s automatic picture-in-picture when leaving the app. Removing background playback restrictions also allows it for videos that YouTube would otherwise limit.', source: `${morpheExtension}/patches/BackgroundPlaybackPatch.java` },
				{ status: 'partial', label: 'Content limits', note: 'Leaving the Android or iOS app starts picture-in-picture when enabled. Non-music content supports PiP without a paid plan; music content requires Premium.', source: 'https://support.google.com/youtube/answer/7552722?hl=en' },
			] },
			{ name: 'Tabs', icon: 'lucide:panels-top-left', cells: [
				{ status: 'yes', note: 'Keep separate videos and channels open in tabs within the app.', source: 'https://opentubex.org/extra-features/#tab-support' },
				{ status: 'no', note: 'FreeTube supports separate windows, but does not provide browser-style tabs.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/333' },
				{ status: 'no', note: 'Navigation tabs organize app sections. No browser-style tabs for keeping separate videos or channels open are documented.', source: 'https://grayjay.app/faq.html' },
				{ status: 'no', note: 'Home-page tabs organize feeds and app sections, rather than separate open videos or channels.' },
				{ status: 'no', note: 'Navigation sections are available, but no browser-style tabs for separate open videos or channels are documented.' },
				{ status: 'partial', label: 'Desktop beta', note: 'The desktop beta can open pages in optional browser-style tabs, each keeping its own video. Android navigation tabs organize app sections only.', source: `${flowDesktop}/src/lib/tabs/tabPlayback.ts` },
				{ status: 'no', note: 'The bottom bar organizes app sections. No browser-style tabs for keeping separate videos or channels open are documented.', source: `${ntSettings}#L67-L71` },
				{ status: 'no', note: 'Uses the YouTube app\'s navigation. No browser-style tabs for keeping separate videos or channels open are documented.', source: morpheReadme },
				{ status: 'partial', label: 'Browser tabs', note: 'The website can be opened in multiple browser tabs. The mobile app does not provide tabs for keeping separate videos or channels open.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Background audio', icon: 'lucide:headphones', cells: [
				{ status: 'yes', note: 'Continue listening while using other apps or with the screen off.', source: 'https://opentubex.org/extra-features/#mobile-app-support' },
				{ status: 'yes', note: 'Background audio playback is supported.', source: 'https://docs.freetubeapp.io/usage/video-formats/' },
				{ status: 'yes', note: 'Android supports background playback.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Background player supports audio playback while using other apps.' },
				{ status: 'yes', note: 'Background playback is included.' },
				{ status: 'yes', note: 'Android supports background audio playback while using other apps or with the screen off.', source: `${flowRelease}#video` },
				{ status: 'yes', note: 'Keeps playing in the background with the screen off, with lock-screen and headset controls, without a paid plan.', source: `${ntReadme}#features` },
				{ status: 'yes', note: 'Removes background playback restrictions without Premium, including for kids videos. Background play for Shorts can be turned off separately.', source: `${morphePatches}/misc/backgroundplayback/BackgroundPlaybackPatch.kt` },
				{ status: 'partial', label: 'Premium', note: 'Mobile background playback requires a paid plan. Premium Lite includes eligible non-music videos, excluding Shorts; full Premium covers music too. Desktop browser audio can continue in another tab.', source: 'https://support.google.com/youtube/answer/15968883?hl=en' },
			] },
			{ name: 'Recommendation engine', icon: 'lucide:sparkles', cells: [
				{ status: 'partial', label: 'Local ranking', note: ['Optional Home recommendations learn from viewing activity, saved videos, and feedback, with Familiar, Balanced, and Explore discovery modes. Discovery ranks a limited candidate pool from related videos, selected channels, and searches. See the ', { text: 'candidate collection', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.37.4-beta/src/renderer/helpers/recommendationCandidates.js' }, '.'], source: 'https://opentubex.org/extra-features/#customizable-home-page' },
				{ status: 'no', note: 'Shows related videos supplied by YouTube or Invidious and regional trending feeds. No built-in personalized recommendation engine that learns from local viewing activity is documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/views/Watch/Watch.js' },
				{ status: 'partial', label: 'Source feeds', note: 'Home aggregates recommendations supplied by its source platforms. Signing into a supported source can provide personalized recommendations; Grayjay does not provide its own independent recommendation engine.', source: 'https://github.com/futo-org/grayjay-android#feed' },
				{ status: 'no', note: 'Related videos and trending feeds are available, but a personalized feed learned from local viewing activity remains a feature request.', source: 'https://github.com/TeamNewPipe/NewPipe/issues/13362' },
				{ status: 'no', note: 'Released version 32.1 offers trending, subscription, and related-video feeds. No built-in personalized recommendation engine that learns from local viewing activity is documented.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/fragments/HomeFragment.kt' },
				{ status: 'yes', label: 'On-device', note: 'FlowNeuro learns from watches, skips, likes, dislikes, searches, and viewing duration. It ranks recommendations locally, including time-of-day preferences and topic diversity, without a Google account or a recommendation server.', source: `${flowRelease}#recommendations-flowneuro-engine` },
				{ status: 'yes', label: 'Server-side', note: 'Home shows YouTube\'s recommendations for your signed-in account. Signed out, YouTube still personalizes Home from what you watch. NewTube does not add an on-device engine.', source: `${ntReadme}#features` },
				{ status: 'yes', label: 'Server-side', note: 'Uses YouTube\'s recommendations, which Google personalizes on its servers from your account activity. Patches can hide recommendation surfaces but do not add an on-device engine.', source: morpheReadme },
				{ status: 'yes', label: 'Server-side', note: 'YouTube personalizes Home, Shorts, and other surfaces using viewing and search history, subscriptions, likes, dislikes, and feedback. Processing happens on its servers; Home recommendations depend primarily on watch history.', source: 'https://support.google.com/youtube/answer/16089387?hl=en' },
			] },
			{ name: 'Distraction-free toggles', icon: 'lucide:list-filter', cells: [
				{ status: 'yes', note: 'Hide Shorts, recommendations, comments, counts, and navigation sections. Filter subscription feeds by videos, Shorts, live streams, and posts; hide watched content or block channels and title keywords.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.37.4-beta/static/locales/en-US.yaml' },
				{ status: 'yes', note: 'Hide recommendations, comments, counts, and channel tabs such as Shorts. Filter subscription feeds by content type, hide watched videos, and block channels or title keywords.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'partial', label: 'Limited controls', note: 'Android can hide the recommendations tab and customize visible navigation tabs. These are narrower controls than a full set of Shorts, comments, and subscription-content hiding toggles.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'partial', label: 'Player / home controls', note: 'Hide related videos, comments, and metadata boxes; choose the tabs on the home page and disable automatic queueing. A global toggle to hide Shorts is not documented.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'partial', label: 'Feed / player controls', note: ['Released version 32.1 filters feeds by videos, Shorts, and live streams, and can hide watched or upcoming videos. ', { text: 'App settings', href: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/xml/general_settings.xml' }, ' can also hide related videos and search suggestions. These controls do not hide Shorts everywhere.'], source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/FilterSortBottomSheet.kt' },
				{ status: 'yes', note: 'Android can hide Shorts across the app, related videos, comments, watched feed items, and navigation sections. Recommendation controls can also block topics and channels.', source: `${flowCode}/ui/screens/settings/content/ContentSettingsScreen.kt` },
				{ status: 'yes', note: ['Shorts never appear in feeds, search, channels, or Up next. Settings can hide Up next, watched videos, upcoming premieres, and live streams, and choose the bottom-bar tabs. The ', { text: 'video menu', href: `${ntCode}/ui/settings/AppPages.java#L357` }, ' can block channels.'], source: `${ntCode}/ui/common/ShortsFilter.java` },
				{ status: 'yes', note: 'Hide Shorts, related videos, end-screen suggestions, comments, and navigation bar buttons. Keyword filters hide matching videos in feeds and search.', source: `${morpheStrings}/youtube/strings.xml` },
				{ status: 'partial', label: 'Recommendation controls', note: 'Show fewer Shorts and mark recommendations as Not interested or Don\'t recommend channel. Removing and disabling watch history can remove Home recommendations; there is no equivalent general set of interface-hiding toggles.', source: 'https://support.google.com/youtube/answer/6342839?hl=en' },
			] },
			{ name: 'Watch queue', icon: 'lucide:list-video', cells: [
				{ status: 'yes', note: 'Add videos to the watch queue or play them next, then remove or reorder items in the side panel.', source: 'https://opentubex.org/extra-features/#watch-queue' },
				{ status: 'no', note: 'Playlists and autoplay are available, but a separate watch queue remains an open feature request.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/547' },
				{ status: 'yes', note: 'Add videos to a playback queue. Android includes a queue editor for managing the upcoming videos.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/views/overlays/QueueEditorOverlay.kt' },
				{ status: 'yes', note: 'Enqueue videos, choose a video to play next, and manage the player queue. Automatic addition of related videos is optional.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Released version 32.1 includes Add to queue and queue controls, with optional insertion of related videos.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Android includes a video queue with removal and reordering controls, alongside its separate music queue. The desktop beta also supports playback queues.', source: `${flowCode}/ui/components/videoplayer/sheet/FlowPlaylistQueueBottomSheet.kt` },
				{ status: 'yes', note: 'Add videos to the queue or play them next from the video menu, then open the playback queue from the player.', source: `${ntCode}/ui/settings/AppPages.java#L333-L335` },
				{ status: 'yes', note: 'Add videos to a queue from the feed menu, using either Morphe\'s queue or a native queue built on YouTube\'s playlist interface.', source: `${morphePatches}/layout/flyout/AddToQueuePatch.kt` },
				{ status: 'partial', label: 'Mobile requires Premium', note: 'Queue videos for free on desktop and the web. Queueing on phones and tablets requires YouTube Premium; a browser queue is lost when the browser closes unless saved as a playlist.', source: 'https://support.google.com/youtube/answer/9546304?hl=en' },
			] },
			{ name: 'Live chat', icon: 'lucide:messages-square', cells: [
				{ status: 'yes', label: 'With replay', note: ['Shows chat during live streams and premieres, and ', { text: 'replays chat', href: 'https://opentubex.org/extra-features/#live-streams-premieres-and-chat-replay' }, ' on past streams in sync with playback. Chat can also be docked in fullscreen. Requires a direct connection to YouTube rather than Invidious.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.37.4-beta/src/renderer/components/WatchVideoLiveChat/WatchVideoLiveChat.vue' },
				{ status: 'partial', label: 'Live only', note: 'Shows chat during live streams and upcoming premieres. There is no chat replay for past streams, and it requires a direct connection to YouTube rather than Invidious.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/views/Watch/Watch.js#L736-L740' },
				{ status: 'yes', label: 'With replay', note: 'The YouTube plugin provides live chat, and Android and desktop replay chat on past streams.', source: 'https://gitlab.futo.org/videostreaming/plugins/youtube/-/blob/447cf876d50909546a3f77fbb2b908df26bdc1ea/YoutubeScript.js#L2746-L2829' },
				{ status: 'no', note: 'Live streams play without their chat.' },
				{ status: 'no', note: 'Released version 32.1 plays live streams without their chat.' },
				{ status: 'partial', label: 'Desktop replay', note: ['Android shows chat during live streams, including in a fullscreen side panel, without replay for past streams. The ', { text: 'desktop beta', href: `${flowDesktop}/src/lib/useChatReplay.ts` }, ' also replays chat on finished streams in sync with playback.'], source: `${flowCode}/ui/components/videoplayer/sheet/FlowLiveChatBottomSheet.kt` },
				{ status: 'partial', label: 'Live only', note: 'Shows a live chat panel during live streams. The chat entry is not shown on past streams, so there is no chat replay.', source: `${ntCode}/ui/playback/LiveChatSheet.java#L23-L29` },
				{ status: 'yes', label: 'With replay', note: 'Keeps YouTube\'s live chat and chat replay. A patch can also show chat as Niconico-style comments that scroll across the video.', source: `${morphePatches}/layout/niconicocomments/NiconicoCommentsPatch.kt` },
				{ status: 'yes', label: 'With replay', note: 'Live chat runs during live streams and premieres. Archived streams can replay chat alongside the video unless the creator turns replay off or edits the stream.', source: 'https://support.google.com/youtube/answer/15268877?hl=en' },
			] },
			{ name: 'Sleep timer', icon: 'lucide:timer', cells: [
				{ status: 'yes', note: 'Stop playback after a chosen duration, when the current chapter ends, or when the current video ends.', source: 'https://opentubex.org/extra-features/#sleep-timer' },
				{ status: 'no', note: 'No built-in sleep timer is documented in the player or settings.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'no', note: 'No built-in sleep timer is documented. Using a separate system or media timer is an external workflow.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'No built-in sleep timer is documented in the official app. Separate Android sleep-timer apps are an external workflow.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Released version 32.1 includes a sleep timer with a custom duration and quick choices of 10, 20, 30, 45, or 60 minutes.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/SleepTimerSheet.kt' },
				{ status: 'yes', label: 'Android', note: 'A shared sleep timer stops video or music playback after a chosen duration, with an optional action to close the app.', source: `${flowCode}/player/SleepTimerManager.kt` },
				{ status: 'yes', note: 'A Sleep timer setting pauses playback a chosen time after you open a video.', source: `${ntSettings}#L178-L179` },
				{ status: 'yes', note: 'Uses the sleep timer built into the YouTube app; Morphe does not add a separate one.', source: 'https://support.google.com/youtube/answer/15397997?hl=en' },
				{ status: 'yes', note: 'Use the player\'s Sleep timer setting to pause the video automatically after a chosen duration.', source: 'https://support.google.com/youtube/answer/15397997?hl=en' },
			] },
			{ name: 'Cast to a TV', icon: 'lucide:cast', cells: [
				{ status: 'yes', label: 'Google Cast, FCast & DLNA', note: 'Google Cast and FCast casting are supported on Android and desktop. DLNA casting is supported on Android, desktop and iOS/iPadOS.', source: 'https://opentubex.org/extra-features/#cast-to-google-cast-fcast-and-dlna-devices' },
				{ status: 'no', note: 'No built-in TV casting. DLNA and UPnP support remains an open feature request; casting through an external player is a separate workflow.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/437' },
				{ status: 'yes', label: 'FCast & Google Cast', note: 'Supports FCast and Google Cast on Android and desktop. FCast is recommended; Google Cast may need the device to proxy separate audio and video streams. The FAQ still lists AirPlay, but the current apps no longer connect to AirPlay devices.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/casting/StateCasting.kt' },
				{ status: 'partial', label: 'Kodi via Kore', note: 'The Play with Kodi option sends playback to a Kodi media center through the separate Kore remote app. This is not built-in Google Cast or AirPlay casting.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'Released version 32.1 has no built-in TV casting. Opening a video in a separate casting-capable player is an external workflow.', source: 'https://github.com/libre-tube/LibreTube/discussions/3493' },
				{ status: 'yes', label: 'Android DLNA', note: 'Android casts to compatible DLNA/UPnP devices without Google Play Services. This is not Google Cast or AirPlay support.', source: `${flowCode}/player/dlna/DlnaCastManager.kt` },
				{ status: 'yes', label: 'Google Cast & TV code', note: ['Casts directly to Google Cast devices without Google Play services, but without live streams or subtitles. A ', { text: 'TV code', href: `${ntStrings}#L308-L322` }, ' links the YouTube or SmartTube TV app, which also plays live streams and subtitles.'], source: `${ntRelease}/docs/mobile-port/CASTING.md` },
				{ status: 'yes', label: 'Google Cast', note: ['Keeps YouTube\'s Google Cast casting to TVs and speakers. Root mount installs use Google Play services; non-root installs need ', { text: 'MicroG-RE 7.3.0', href: 'https://github.com/MorpheApp/MicroG-RE/releases/tag/7.3.0' }, ' or later.'], source: 'https://github.com/MorpheApp/morphe-patches/releases/tag/v2.1.0' },
				{ status: 'yes', note: 'Cast from the mobile app or a supported desktop browser to compatible TVs and streaming devices. The mobile app can also link to the TV app using a TV code.', source: 'https://support.google.com/youtube/answer/7640706?hl=en' },
			] },
		],
	},
	{
		name: 'Library & sync',
		rows: [
			{ name: 'Posts', icon: 'lucide:message-square-text', cells: [
				{ status: 'yes', note: 'Channel posts appear in a Posts tab of the subscriptions feed and in the Posts tab on channel pages.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.37.4-beta/src/renderer/components/SubscriptionPosts/SubscriptionsPosts.vue' },
				{ status: 'yes', note: 'Channel posts appear in a Posts tab of the subscriptions feed and in the Posts tab on channel pages.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/components/SubscriptionPosts/SubscriptionsPosts.vue' },
				{ status: 'no', note: 'The YouTube plugin only provides videos, live streams, and Shorts, so YouTube channel posts are not shown in the subscriptions feed or on channel pages.', source: 'https://gitlab.futo.org/videostreaming/plugins/youtube/-/blob/447cf876d50909546a3f77fbb2b908df26bdc1ea/YoutubeScript.js#L3241-L3246' },
				{ status: 'no', note: 'YouTube channel posts are not shown in the subscriptions feed or on channel pages.' },
				{ status: 'no', note: 'Released version 32.1 does not show YouTube channel posts in the subscriptions feed or on channel pages.' },
				{ status: 'partial', label: 'Channel pages', note: 'Channel pages have a posts tab with comments, but the subscriptions feed does not include posts.', source: `${flowCode}/ui/components/channel/ChannelCommunityPosts.kt` },
				{ status: 'no', note: 'YouTube channel posts are not shown in the subscriptions feed or on channel pages.', source: ntReadme },
				{ status: 'yes', note: 'Keeps YouTube\'s channel posts and adds options to translate posts and download their images.', source: `${morphePatches}/interaction/posttranslate/PostTranslatePatch.kt` },
				{ status: 'yes', note: 'Posts appear on the channel page and may also show up on the home page and in the Subscriptions feed.', source: 'https://support.google.com/youtube/answer/9409631?hl=en' },
			] },
			{ name: 'Notifications', icon: 'lucide:bell-ring', cells: [
				{ status: 'yes', label: 'Desktop / Android', note: ['Get reminders for ', { text: 'scheduled live streams and premieres', href: 'https://opentubex.org/extra-features/#upload-live-stream-and-premiere-notifications' }, ', plus new-upload alerts for selected channels and feed types on desktop and Android. New-upload alerts are unavailable on experimental iOS.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.37.4-beta/src/renderer/helpers/uploadNotifications.js' },
				{ status: 'no', note: 'No built-in system notifications for scheduled live streams, premieres, or new uploads are documented. Subscription feeds can be refreshed in the app.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'yes', label: 'Android', note: 'Android supports scheduled-content reminders and new-content notifications for followed channels. Availability depends on the source plugin and background-update settings.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/states/StateNotifications.kt' },
				{ status: 'partial', label: 'Feed updates', note: 'Periodically checks selected subscriptions and notifies about new feed entries. No separate start-time reminders for scheduled live streams or premieres are documented.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/java/org/schabi/newpipe/local/feed/notifications/NotificationWorker.kt' },
				{ status: 'partial', label: 'New uploads', note: 'Periodically checks subscriptions for new uploads, with per-channel controls. Released version 32.1 excludes upcoming videos from these alerts and has no separate scheduled-start reminders.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/workers/NotificationWorker.kt' },
				{ status: 'yes', label: 'Android', note: ['Android supports new-upload alerts for selected subscriptions and ', { text: 'reminders for upcoming live streams and premieres', href: `${flowCode}/notification/UpcomingVideoReminderWorker.kt` }, '. Delivery depends on Android background-work scheduling.'], source: `${flowCode}/notification/SubscriptionCheckWorker.kt` },
				{ status: 'partial', label: 'In-app list', note: 'Signed-in users can open their YouTube notifications in the app. No system alerts for new uploads, live streams, or premieres are documented.', source: `${ntStrings}#L228` },
				{ status: 'yes', label: 'Account required', note: 'Keeps YouTube\'s upload, live-stream, and premiere notifications. Without root, push notifications go through MicroG-RE.', source: `${morpheFaq}#32-youtube-push-notifications-do-not-work` },
				{ status: 'yes', label: 'Account required', note: ['Supports channel upload and live-stream alerts, plus ', { text: 'premiere reminders', href: 'https://support.google.com/youtube/answer/9080341?hl=en' }, '. Sign in and allow notifications; not every upload results in an alert.'], source: 'https://support.google.com/youtube/answer/3382248?hl=en' },
			] },
			{ name: 'Sync between devices', icon: 'lucide:refresh-cw', cells: [
				{ status: 'yes', label: 'End-to-end encrypted', note: 'Optional sync covers subscriptions, playlists, history, channel settings, profiles, tabs, and settings.', source: otxSync },
				{ status: 'no', label: 'Local data', note: 'No built-in account sync. Copying database files or using an external file-sync tool is a separate workflow.', source: localOnly },
				{ status: 'yes', label: 'Device pairing', note: 'Paired-device sync includes subscriptions, playlists, watch later, subscription groups, and history. Devices need a working connection to each other.', source: gjSync },
				{ status: 'no', label: 'Manual backup', note: 'Import and export transfer your data manually; they are not automatic device sync.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3#installation-and-updates' },
				{ status: 'partial', label: 'Piped account', note: 'Released version 32.1 supports Piped account sync for subscriptions and playlists. Watch history and settings stay local; the new LibreTube sync server is not included in this release.', source: ltPrivacy },
				{ status: 'yes', label: 'Device pairing', note: 'Optional paired-device sync exchanges playlists, history, likes, subscriptions and groups, notes, selected settings, and the video and music recommendation profiles. Supports Android and the desktop beta; devices need a direct connection.', source: `${flowCode}/ui/screens/sync/SyncCollections.kt` },
				{ status: 'yes', label: 'Google account', note: ['Subscriptions, playlists, history, and Watch later come from your signed-in Google account. NewTube\'s own settings stay on the device and move through a ', { text: 'backup file', href: `${ntSettings}#L144-L152` }, '.'], source: `${ntReadme}#features` },
				{ status: 'yes', label: 'Google account', note: 'Subscriptions and playlists follow your signed-in Google account, as in the official app. Morphe settings stay on the device and are copied manually through Import / Export.', source: `${morpheFaq}#113-how-do-i-backup-my-youtube-morphe-settings` },
				{ status: 'yes', label: 'Google account', note: 'Subscriptions and playlists follow your signed-in Google account across devices. This does not mean every device-specific preference is synced.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Sync watch history', icon: 'lucide:history', cells: [
				{ status: 'yes', note: 'History is one of the optional sync categories.', source: otxSync },
				{ status: 'no', note: 'History is stored in a local database, without built-in sync.', source: localOnly },
				{ status: 'yes', note: 'The device-sync implementation exchanges recent history.', source: gjSync },
				{ status: 'no', note: 'History can be included in manual database backups, not automatically synced between devices.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3#installation-and-updates' },
				{ status: 'no', note: 'In released version 32.1, Piped account sync does not include watch history or timestamps; these remain local.', source: ltPrivacy },
				{ status: 'yes', note: 'Watch history is a selectable collection in paired-device sync, including sync with the desktop beta.', source: `${flowCode}/ui/screens/sync/SyncCollections.kt` },
				{ status: 'yes', label: 'History enabled', note: 'Watch history is saved to your Google account when your account keeps history. Settings can always save it, stop sending it, or clear it.', source: `${ntSettings}#L126-L136` },
				{ status: 'yes', label: 'History enabled', note: 'Watch history is saved to your Google account when enabled. Morphe warns when a DNS blocker stops history from being saved.', source: `${morphePatches}/misc/dns/CheckWatchHistoryDomainNameResolutionPatch.kt` },
				{ status: 'yes', label: 'History enabled', note: 'Signed-in watch history is saved to your Google account when enabled. You can pause or delete it.', source: 'https://support.google.com/youtube/answer/95725?hl=en' },
			] },
			{ name: 'Watch statistics', icon: 'lucide:chart-column', cells: [
				{ status: 'yes', note: 'Daily and weekly watch-time charts show your viewing activity.', source: 'https://opentubex.org/extra-features/#watch-time-statistics' },
				{ status: 'no', note: 'Watch history is available, but no personal watch-time dashboard is documented. Video playback statistics describe the current stream, not your viewing habits.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'yes', note: 'Watch metrics show watch time and views for each creator in the Creators tab.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/res/values/strings.xml' },
				{ status: 'partial', label: 'Most played', note: 'The Most Played view summarizes frequently played videos. It is not a daily or weekly watch-time dashboard.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'Watch history and playback positions are available, but no personal watch-time dashboard is documented.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: ['Flow Recap charts time per day for a month and per month for a year, with weekday, time-of-day, and top-channel breakdowns. The ', { text: 'Wellbeing page', href: `${flowCode}/ui/screens/settings/wellbeing/WatchTimeCard.kt` }, ' shows daily watch time for the past week.'], source: `${flowCode}/ui/screens/recap/RecapOverviewCards.kt` },
				{ status: 'no', note: 'Watch history is available, but no personal watch-time dashboard is documented. Stats for nerds describes the current stream, not your viewing habits.', source: `${ntStrings}#L48` },
				{ status: 'yes', label: 'Account required', note: 'Uses YouTube\'s Time watched page for signed-in users with watch history enabled. Morphe does not add its own statistics.', source: 'https://support.google.com/youtube/answer/9052667?hl=en' },
				{ status: 'yes', label: 'Account required', note: 'Time watched shows daily average, today, yesterday, and the past seven days for signed-in users with watch history enabled. Excludes deleted history, private viewing, YouTube Music, and YouTube TV. YouTube reports a known error in desktop watch-time totals.', source: 'https://support.google.com/youtube/answer/9052667?hl=en' },
			] },
		],
	},
	{
		name: 'Add-ons',
		rows: [
			{ name: 'SponsorBlock', url: 'https://sponsor.ajay.app/', image: '/compare-icons/sponsorblock.png', cells: [
				{ status: 'yes', label: 'Extended controls', note: 'Category skipping, mute segments, full-video labels, channel whitelisting, and in-player submissions.', source: 'https://opentubex.org/extra-features/#sponsorblock-submission' },
				{ status: 'partial', label: 'Segment skipping', note: 'Supports SponsorBlock segment skipping, category controls, and a list of channels to exclude. In-player submissions, mute segments, and full-video labels are not documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/helpers/sponsorblock.js' },
				{ status: 'partial', label: 'YouTube plugin', note: 'Enable SponsorBlock in the YouTube source settings for category-based manual or automatic skipping. In-player submissions, mute segments, and full-video labels are not documented.', source: 'https://plugins.grayjay.app/Youtube/YoutubeConfig.json' },
				{ status: 'partial', label: 'Unofficial forks', note: 'The official NewPipe app does not include SponsorBlock. Unofficial forks add support for it.', source: 'https://newpipe.net/blog/pinned/newpipe-and-online-advertising/' },
				{ status: 'partial', label: 'Limited controls', note: 'Includes segment skipping, voting, submissions, and full-video labels. Released version 32.1 does not offer mute-segment or full-video-label submission controls.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/dialogs/SubmitSegmentDialog.kt' },
				{ status: 'partial', label: 'Segment controls', note: ['Android supports category-based skipping and muting, plus ', { text: 'in-player segment submissions', href: `${flowCode}/ui/screens/player/dialogs/SbSubmitSegmentDialog.kt` }, '. Full-video labels and channel whitelisting are not documented.'], source: `${flowCode}/player/sponsorblock/SponsorBlockHandler.kt` },
				{ status: 'partial', label: 'Segment skipping', note: ['Supports category-based skipping, seek-bar marks, and ', { text: 'excluding channels', href: `${ntCode}/ui/settings/AppPages.java#L358` }, ' from the video menu. In-player submissions, mute segments, and full-video labels are not documented.'], source: `${ntCode}/ui/settings/PlayerPages.java#L447-L467` },
				{ status: 'partial', label: 'Segment controls', note: 'Supports category-based skipping, highlights, voting, in-player segment submissions, and channel whitelisting. Mute segments and full-video labels are not documented.', source: `${morpheStrings}/sponsorblock/strings.xml` },
				{ status: 'partial', label: 'Web extension', note: 'SponsorBlock works on the YouTube website through a browser extension. It is not built into YouTube and does not add SponsorBlock to the official Android or iOS app.', source: 'https://sponsor.ajay.app/' },
			] },
			{ name: 'DeArrow', url: 'https://dearrow.ajay.app/', image: '/compare-icons/dearrow.svg', cells: [
				{ status: 'yes', note: 'Optional DeArrow titles and thumbnails replace the originals with community alternatives.', source: 'https://opentubex.org/docs/sponsorblock/#other-add-ons' },
				{ status: 'yes', note: 'Enable DeArrow in settings for alternative video titles and thumbnails.', source: 'https://docs.freetubeapp.io/usage/privacy/' },
				{ status: 'yes', label: 'YouTube plugin', note: 'The official YouTube plugin includes DeArrow titles and thumbnails, with separate controls for video lists.', source: 'https://plugins.grayjay.app/Youtube/YoutubeConfig.json' },
				{ status: 'no', note: 'The official NewPipe app does not include DeArrow title or thumbnail replacement.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Released version 32.1 includes optional DeArrow titles and thumbnails, plus a submission dialog.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', label: 'Android', note: 'Android fetches community titles and thumbnails from DeArrow and caches the results.', source: `${flowCode}/data/repository/DeArrowRepository.kt` },
				{ status: 'yes', note: 'Optional DeArrow titles and thumbnails, which can be turned on separately.', source: `${ntSettings}#L236-L241` },
				{ status: 'yes', note: 'Adds DeArrow titles and thumbnails, with controls for individual feeds and a choice of thumbnail styles.', source: `${morpheStrings}/youtube/strings.xml#L1564-L1601` },
				{ status: 'partial', label: 'Web extension', note: 'DeArrow is available through a browser extension on the YouTube website. It is not built into the official mobile apps.', source: 'https://dearrow.ajay.app/' },
			] },
			{ name: 'Return YouTube Dislike', url: 'https://returnyoutubedislike.com/', image: '/compare-icons/return-youtube-dislike.svg', cells: [
				{ status: 'yes', note: 'Optionally show estimated dislike counts from Return YouTube Dislike.', source: 'https://opentubex.org/extra-features/#return-youtube-dislike-support' },
				{ status: 'no', note: 'No built-in Return YouTube Dislike integration is documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'yes', label: 'YouTube plugin', note: 'Enable Return YouTube Dislike in the YouTube source settings to show estimated dislike counts.', source: 'https://plugins.grayjay.app/Youtube/YoutubeConfig.json' },
				{ status: 'partial', label: 'Unofficial forks', note: 'The official NewPipe app does not include Return YouTube Dislike. Separate forks such as PipePipe add it.', source: 'https://github.com/InfinityLoop1308/PipePipe#beyond-newpipe' },
				{ status: 'yes', note: 'Can fetch estimated dislike counts directly from Return YouTube Dislike.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', label: 'Android', note: 'Includes Return YouTube Dislike for estimated dislike counts.', source: `${flowRelease}#features` },
				{ status: 'yes', note: 'Optionally show estimated dislike counts from Return YouTube Dislike. Off by default.', source: `${ntSettings}#L190-L191` },
				{ status: 'yes', note: 'Shows estimated dislike counts from Return YouTube Dislike, and can add like counts and like ratios to feed thumbnails.', source: `${morphePatches}/layout/returnyoutubedislike/ReturnYouTubeDislikePatch.kt` },
				{ status: 'partial', label: 'Web extension', note: 'Return YouTube Dislike adds estimated dislike counts to the YouTube website through a browser extension. It is not built into the official apps.', source: 'https://returnyoutubedislike.com/' },
			] },
			{ name: 'AiSList', url: 'https://github.com/Override92/AiSList', icon: 'lucide:bot-off', cells: [
				{ status: 'yes', note: 'Optionally filter channels using AiSList\'s community-maintained lists of AI-generated content.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.37.4-beta/src/renderer/helpers/aiSlopList.js' },
				{ status: 'no', note: 'No built-in AiSList channel filtering is documented.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'no', note: 'No built-in AiSList channel filtering is documented in the app or its YouTube source settings.', source: 'https://plugins.grayjay.app/Youtube/YoutubeConfig.json' },
				{ status: 'no', note: 'No built-in AiSList channel filtering is documented in the official app.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3' },
				{ status: 'no', note: 'No built-in AiSList channel filtering is documented in released version 32.1.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'No built-in AiSList channel filtering is documented in Android 3.0.0.', source: `${flowRelease}#features` },
				{ status: 'no', note: 'No built-in AiSList channel filtering is documented in version 1.17.1.', source: ntReadme },
				{ status: 'yes', note: 'Optionally hide videos from channels flagged by AiSList in Home and search results, and report AI channels from the video menu. Filtering happens on your device.', source: `${morpheStrings}/youtube/strings.xml#L375-L388` },
				{ status: 'partial', label: 'Web extension', note: 'The AiBlock browser extension uses AiSList to filter channels on the YouTube website. It is not built into the official apps.', source: 'https://aisloplist.com/' },
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
				{ status: 'no', label: 'Cloud account', note: 'Subscriptions, playlists, and history come from your Google account; signed out, there are no subscriptions. Settings and search history stay on the device.', source: `${ntSettings}#L152` },
				{ status: 'no', label: 'Cloud account', note: 'Subscriptions, playlists, and history depend on your Google account, as in the official app. Only Morphe\'s own settings are stored on the device.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
				{ status: 'no', label: 'Cloud account', note: 'Subscriptions and playlists depend on a Google account. Signed-in watch history is stored in that account when enabled.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Alternative backends', icon: 'lucide:server', cells: [
				{ status: 'yes', label: 'Invidious / Yattee', note: 'Choose an Invidious instance or your own Yattee server to retrieve video and channel information. Stream delivery and direct fallback have separate settings.', source: 'https://opentubex.org/docs/providers/' },
				{ status: 'yes', label: 'Invidious', note: 'Choose an Invidious instance as an alternative to the built-in Local API. Video proxying and fallback settings determine which requests still connect directly to YouTube.', source: 'https://docs.freetubeapp.io/usage/privacy/' },
				{ status: 'no', note: 'The official YouTube plugin connects to YouTube. It does not offer an Invidious, Piped, or Yattee backend selector.', source: 'https://plugins.grayjay.app/Youtube/YoutubeConfig.json' },
				{ status: 'no', note: 'Retrieves YouTube data with NewPipeExtractor. No Invidious, Piped, or Yattee backend option is documented in the official app.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3' },
				{ status: 'yes', label: 'Piped', note: 'Released version 32.1 can retrieve YouTube data through a selected Piped instance. Full Local Mode instead retrieves data directly from YouTube.', source: ltPrivacy },
				{ status: 'no', note: 'Android 3.0.0 retrieves YouTube data through its own InnerTube client. No Invidious, Piped, or Yattee backend option is documented.', source: flowRelease },
				{ status: 'no', note: 'Connects directly to YouTube through SmartTube\'s engine. An HTTP or SOCKS proxy is available, but no Invidious, Piped, or Yattee backend option.', source: `${ntSettings}#L275-L276` },
				{ status: 'no', note: 'Uses the official YouTube app and its backend. The patches do not add an Invidious, Piped, or Yattee backend option.', source: morpheReadme },
				{ status: 'no', note: 'The official apps and website use YouTube services and do not offer alternative backends.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'No telemetry', icon: 'lucide:eye-off', cells: [
				{ status: 'yes', note: 'Viewing statistics and history stay local by default. Optional sync sends selected data to your chosen server; playback and optional services still expose network metadata.', source: 'https://opentubex.org/privacy/#desktop-and-mobile-apps' },
				{ status: 'yes', note: 'Viewing data stays local. YouTube and optional services can still see requests and your IP address; this is not anonymity.', source: 'https://docs.freetubeapp.io/usage/privacy/' },
				{ status: 'partial', label: 'Startup telemetry', note: ['Android and desktop send startup telemetry with a persistent random identifier and app/platform information. Android also includes device details and enabled source IDs. These payloads exclude watched videos and searches. See the ', { text: 'desktop implementation', href: 'https://github.com/futo-org/Grayjay.Desktop/blob/20/Grayjay.ClientServer/States/StateTelemetry.cs' }, '.'], source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/states/StateTelemetry.kt' },
				{ status: 'yes', note: 'No automatic usage reporting. Bug reports are sent only when you choose to submit them. Media services still receive playback requests.', source: 'https://newpipe.net/legal/privacy/' },
				{ status: 'yes', note: 'Its privacy policy states that it does not gather app-usage data or use tracking libraries. Direct playback and optional Piped services still receive requests.', source: ltPrivacy },
				{ status: 'yes', note: 'Recommendations are computed locally without app-usage reporting. YouTube and optional services such as SponsorBlock and DeArrow still receive network requests.', source: `${flowDesktop}#privacy-and-security` },
				{ status: 'yes', note: 'No analytics, crash reporting, or ad SDKs. YouTube still sees what you watch, optional services such as SponsorBlock receive video IDs, and update checks contact GitHub.', source: ntPrivacy },
				{ status: 'no', label: 'Google collection', note: 'Morphe adds no analytics to patched apps, but the YouTube app still sends Google its usual activity data. SponsorBlock, Return YouTube Dislike, and similar features contact their own services.', source: `${morpheFaq}#120-what-is-morphes-privacy-policy` },
				{ status: 'no', label: 'Activity collection', note: 'Google collects activity such as videos watched, searches, and interactions. History and personalization controls affect storage and use; Premium does not remove this data collection.', source: 'https://policies.google.com/privacy?hl=en' },
			] },
			{ name: 'No proprietary libraries', icon: 'lucide:package-check', cells: [
				{ status: 'yes', note: ['No proprietary runtime SDK is declared in the checked app dependencies. See the ', { text: 'Android dependencies', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/android/app/build.gradle' }, '. Operating-system components and remote YouTube services are outside this comparison.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/development/package.json' },
				{ status: 'yes', note: 'The official desktop app declares open-source dependencies, including Electron and its playback and extraction libraries. No proprietary runtime SDK is declared. This does not cover unofficial mobile forks, operating-system components, or remote YouTube services.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/package.json' },
				{ status: 'no', label: 'Android payments', note: ['Android declares Stripe Android 22.0.0. Its ', { text: 'payment module', href: 'https://github.com/stripe/stripe-android/blob/v22.0.0/payments-core/build.gradle' }, ' depends on Google\'s proprietary Play services Wallet client library. Stripe itself is open source. This payment dependency does not establish that ordinary video playback requires Play services; the separate desktop app has a different dependency stack.'], source: 'https://github.com/futo-org/grayjay-android/blob/396/app/build.gradle' },
				{ status: 'yes', note: 'NewPipe explicitly avoids proprietary libraries and frameworks such as Google Play services. Playback still contacts the selected media service; this is not a claim that YouTube itself is open source.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3#description' },
				{ status: 'yes', note: 'Released version 32.1 declares open-source app libraries, without a Google Play services or other proprietary runtime SDK dependency. YouTube is still a proprietary network service; operating-system components are outside this comparison.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/build.gradle.kts' },
				{ status: 'yes', note: ['Android 3.0.0 declares open-source runtime libraries and implements DLNA casting without Google Play services. The ', { text: 'desktop beta', href: `${flowDesktop}/src-tauri/Cargo.toml` }, ' also uses open-source app libraries. The GitHub flavor adds an updater and Discord integration, rather than a proprietary Discord SDK. System WebViews and remote services are outside this comparison.'], source: `${flowRelease}/app/build.gradle.kts` },
				{ status: 'yes', note: 'Declares open-source app libraries, including Media3 and an embedded Cronet, without Google Play services. Casting uses its own Cast protocol code. YouTube itself remains a proprietary service.', source: `${ntRelease}/smarttubetv/build.gradle` },
				{ status: 'no', label: 'Proprietary base app', note: ['Morphe modifies the proprietary YouTube app. Without root, the open-source ', { text: 'MicroG-RE', href: 'https://github.com/MorpheApp/MicroG-RE' }, ' replaces Google Play services; root mount installs keep Play services.'], source: morpheInstall },
				{ status: 'no', label: 'Proprietary client', note: 'The official apps and web client use proprietary YouTube software and do not provide an auditable, fully open-source client stack. Their complete library inventory is not public. Browser playback does not require Android Google Play services.', source: 'https://www.youtube.com/static?template=terms' },
			] },
			{ name: 'License', icon: 'lucide:scale', cells: [
				{ label: 'AGPLv3', note: 'Open-source app licensed under the GNU Affero General Public License version 3.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.37.4-beta/LICENSE' },
				{ label: 'AGPLv3', note: 'Open-source app licensed under the GNU Affero General Public License version 3.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/LICENSE' },
				{ label: 'Source First 1.1', note: ['Source-available under FUTO\'s Source First License 1.1, with restrictions on commercial use and redistribution. Both Android and ', { text: 'desktop', href: 'https://github.com/futo-org/Grayjay.Desktop/blob/20/LICENSE.md' }, ' use this license.'], source: 'https://github.com/futo-org/grayjay-android/blob/396/LICENSE.md' },
				{ label: 'GPLv3', note: 'Open-source app licensed under the GNU General Public License version 3 or later.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3' },
				{ label: 'GPLv3', note: 'Open-source app licensed under the GNU General Public License version 3 or later.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/README.md' },
				{ label: 'GPLv3', note: 'The Android app and desktop companion are open source under the GNU General Public License version 3.', source: `${flowRelease}/License` },
				{ label: 'MIT', note: 'Open-source app licensed under the MIT License, like SmartTube.', source: `${ntRelease}/LICENSE` },
				{ label: 'GPLv3 patches', note: 'Morphe Manager and the patches are licensed under GPLv3, with additional Section 7 terms on attribution and branding. The patched YouTube app remains proprietary.', source: `${morpheReadme}#-license` },
				{ label: 'Proprietary', note: 'The official YouTube service and apps are proprietary and governed by YouTube\'s Terms of Service; they are not published under an open-source app license.', source: 'https://www.youtube.com/static?template=terms' },
			] },
		],
	},
];
