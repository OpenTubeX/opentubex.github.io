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
const gjYoutube = 'https://gitlab.futo.org/videostreaming/plugins/youtube/-/blob/447cf876d50909546a3f77fbb2b908df26bdc1ea';
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
const morpheInstall = 'https://github.com/MorpheApp/morphe-manager/blob/6bd844d99ef9a13fcae08b68742662ff5bd19f83/docs/installers.md#root-mount-in-detail';

export const groups: { name: string; rows: Row[] }[] = [
	{
		name: 'Devices & services',
		rows: [
			{ name: 'Desktop app', icon: 'lucide:monitor', cells: [
				{ status: 'yes', note: 'Windows, macOS, and Linux.' },
				{ status: 'yes', note: 'Windows, macOS, and Linux.' },
				{ status: 'yes', note: 'Windows, macOS, and Linux.' },
				{ status: 'no', note: 'Android only.' },
				{ status: 'no', note: 'Android only.' },
				{ status: 'partial', label: 'Desktop beta', note: 'Flow Desktop is a separate app for Windows, macOS, and Linux, still in beta.', source: `${flowDesktop}#downloads-and-supported-systems` },
				{ status: 'no', note: 'Android only.', source: ntReadme },
				{ status: 'no', note: 'Morphe Desktop patches APKs on a computer. It doesn\'t play videos.', source: 'https://github.com/MorpheApp/morphe-desktop/tree/v2.1.1' },
				{ status: 'partial', label: 'Web app', note: 'The website works in desktop browsers and can be installed as a web app. There is no desktop app.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Android app', icon: 'simple-icons:android', cells: [
				{ status: 'yes', note: 'For phones and tablets. A few desktop features are missing.', source: otxMobile },
				{ status: 'partial', label: 'Unofficial fork', note: 'FreeTubeAndroid is an unofficial port. FreeTube itself has no Android app.', source: 'https://github.com/MarmadileManteater/FreeTubeAndroid' },
				{ status: 'yes', note: 'Separate Android and desktop apps.' },
				{ status: 'yes', note: 'Built for Android. Releases are still labeled beta.' },
				{ status: 'yes', note: 'Built for Android.' },
				{ status: 'yes', note: 'Android 8.0 and later.', source: `${flowRelease}#requirements` },
				{ status: 'yes', note: 'Android 7.0 and later, released as APKs on GitHub, not on Google Play.', source: `${ntReadme}#download` },
				{ status: 'yes', label: 'Patched YouTube', note: 'Patches the official YouTube app on the phone with Morphe Manager or on a computer with Morphe Desktop. Without root, the patched app installs next to YouTube and needs MicroG-RE for Google sign-in.', source: morpheInstall },
				{ status: 'yes', note: 'Available on Google Play.', source: 'https://support.google.com/youtube/answer/3227660?hl=en' },
			] },
			{ name: 'iOS app', icon: 'simple-icons:apple', cells: [
				{ status: 'partial', label: 'Experimental', note: 'An unsigned IPA for iOS and iPadOS 17.4 and later. You sideload it and re-sign it periodically, and some features are missing.', source: 'https://opentubex.org/docs/installing/#ios--ipados-experimental' },
				{ status: 'no', note: 'Desktop only.' },
				{ status: 'no', note: 'Android and desktop only.', source: 'https://grayjay.app/desktop/' },
				{ status: 'no', note: 'Android only.' },
				{ status: 'no', note: 'Android only.' },
				{ status: 'no', note: 'Android and desktop only.', source: 'https://github.com/Flow-Tube#projects' },
				{ status: 'no', note: 'Android only.', source: ntReadme },
				{ status: 'no', note: 'Morphe only patches Android apps.', source: `${morpheFaq}#106-is-morphe-available-on-ios-or-tv` },
				{ status: 'yes', note: 'Official app for iPhone and iPad.', source: 'https://support.google.com/youtube/answer/3227660?co=GENIE.Platform%3DiOS&hl=en' },
			] },
			{ name: 'Web app', icon: 'lucide:globe', cells: [
				{ status: 'yes', note: 'Runs in the browser and keeps the library there. Videos load through Invidious or your own Yattee server. Downloads and the built-in extractor need the installed app.', source: 'https://opentubex.org/demo/' },
				{ status: 'partial', label: 'Self-build only', note: 'The source includes a web build you can build and host yourself. FreeTube doesn\'t publish one.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/package.json' },
				{ status: 'no', note: 'Android and desktop only.', source: 'https://grayjay.app/desktop/' },
				{ status: 'no', note: 'Android only.' },
				{ status: 'no', note: 'Android only.' },
				{ status: 'no', note: 'The browser extension sends videos to the desktop app instead of playing them in the browser.', source: 'https://github.com/Flow-Tube#projects' },
				{ status: 'no', note: 'Android only.', source: ntReadme },
				{ status: 'no', note: 'Morphe only patches Android apps.', source: `${morpheFaq}#100-what-is-morphe` },
				{ status: 'yes', note: 'The website works in desktop and mobile browsers.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Native mobile interface', icon: 'lucide:smartphone', cells: [
				{ status: 'no', label: 'Web-based', note: 'The Android and iOS apps use Capacitor to show a web interface, with native integrations.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/package.json' },
				{ status: 'no', label: 'Web-based fork', note: 'The unofficial FreeTubeAndroid port shows FreeTube\'s web interface in an Android WebView.', source: 'https://github.com/MarmadileManteater/FreeTubeAndroid/tree/0.25.3.1/android/app/src/main/java/io/freetubeapp/freetube' },
				{ status: 'yes', note: 'Native Android interface.', source: 'https://github.com/futo-org/grayjay-android/tree/396' },
				{ status: 'yes', note: 'Built with Android UI components.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3' },
				{ status: 'yes', note: 'Native Android interface with Material Design.' },
				{ status: 'yes', note: 'Built with Jetpack Compose and Material 3.', source: flowRelease },
				{ status: 'yes', note: 'Native Material Design interface, built on SmartTube\'s engine.', source: `${ntReadme}#newtube-and-smarttube` },
				{ status: 'yes', note: 'Keeps the official app\'s interface. A patch can switch to the phone, tablet, or automotive layout.', source: `${morphePatches}/layout/formfactor/ChangeFormFactorPatch.kt` },
				{ status: 'yes', note: 'Native Android and iOS apps for phones and tablets.', source: 'https://support.google.com/youtube/answer/3227660?hl=en' },
			] },
			{ name: 'Services beyond YouTube', icon: 'lucide:layers', cells: [
				{ status: 'yes', note: ['Follows channels on Twitch, SoundCloud, PeerTube, Rumble, and Odysee without an account. Their uploads and live streams appear in a Platforms tab and the New feed, their channels and playlists open in the app, search covers them, and Twitch channels can notify you when they go live. RSS feeds and links from any ', { text: 'yt-dlp-supported service', href: 'https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md' }, ' also play in the app and keep their place in the ', { text: 'watch history', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/externalMediaHistory.js' }, '. The web app and Android Lite ship without yt-dlp and stay YouTube-only.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/platformFeed.js' },
				{ status: 'no', note: 'YouTube only.' },
				{ status: 'yes', note: 'Source plugins add services such as Twitch, PeerTube, and SoundCloud. What works depends on each plugin.', source: 'https://plugins.grayjay.app/' },
				{ status: 'yes', note: 'Also supports SoundCloud, Bandcamp, PeerTube, and media.ccc.de.' },
				{ status: 'no', note: 'YouTube only.' },
				{ status: 'no', note: 'YouTube and YouTube Music only.', source: `${flowRelease}#features` },
				{ status: 'no', note: 'YouTube only.', source: ntReadme },
				{ status: 'no', note: 'The patched app only plays YouTube. Morphe patches YouTube Music and Reddit as separate apps.', source: morpheReadme },
				{ status: 'no', note: 'YouTube only.' },
			] },
		],
	},
	{
		name: 'Watching & listening',
		rows: [
			{ name: 'Downloads', icon: 'lucide:download', cells: [
				{ status: 'yes', note: 'Downloads videos, audio, playlists, and subtitles.', source: 'https://opentubex.org/extra-features/#download-support' },
				{ status: 'no', label: 'Removed in 0.24', note: 'FreeTube removed its built-in downloader in 0.24.0.', source: 'https://github.com/FreeTubeApp/FreeTube/releases/tag/v0.24.0-beta' },
				{ status: 'yes', note: 'Downloads videos and playlists from sources that allow it.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Downloads video, audio, or captions in the format and quality you pick.' },
				{ status: 'yes', note: 'Downloads videos for offline playback.' },
				{ status: 'yes', note: 'Downloads video and audio with a choice of quality and codec, including VP9 and AV1.', source: `${flowRelease}#video` },
				{ status: 'yes', note: 'Saves videos up to 1080p, or audio only. Files go to the Movies or Music folder and show up in the gallery.', source: `${ntCode}/downloads/DownloadStorage.java` },
				{ status: 'yes', note: 'Saves videos in the app without Premium, or sends videos, Shorts, and playlists to a downloader such as YTDLnis. Saved videos can be exported to storage.', source: `${morphePatches}/interaction/downloads/DownloadsPatch.kt#L129-L132` },
				{ status: 'partial', label: 'Premium', note: ['Offline downloads need Premium. ', { text: 'Premium Lite', href: 'https://support.google.com/youtube/answer/15968883?hl=en' }, ' covers most non-music videos except Shorts. Some regions allow downloading selected videos for free. Downloaded videos only play inside YouTube.'], source: 'https://support.google.com/youtube/answer/7381437?hl=en' },
			] },
			{ name: 'Per-channel playback settings', icon: 'lucide:sliders-horizontal', cells: [
				{ status: 'yes', note: ['Saves speed, quality, subtitles, and volume for each channel and applies them automatically, also for ', { text: 'channels on other platforms', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/channel-preferences.js' }, '.'], source: 'https://opentubex.org/extra-features/#per-channel-playback-settings' },
				{ status: 'no', note: 'Player settings apply to every channel.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'no', note: 'The default speed applies to every channel.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'no', note: 'Speed and pitch apply to every channel.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/java/org/schabi/newpipe/player/helper/PlaybackParameterDialog.java' },
				{ status: 'no', note: 'Speed settings apply to every channel.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/PlaybackOptionsSheet.kt' },
				{ status: 'partial', label: 'Speed only', note: 'An optional setting remembers the last speed you chose for each channel. Quality, subtitles, and volume are global.', source: `${flowCode}/data/local/PlayerPreferences.kt` },
				{ status: 'partial', label: 'Speed and captions', note: ['Remembers speed per channel, and ', { text: 'captions', href: `${ntSettings}#L214-L215` }, ' you turn on can come back for that channel only. Quality and volume are global.'], source: `${ntSettings}#L166-L171` },
				{ status: 'partial', label: 'Speed whitelist', note: 'A whitelist plays selected channels at 1.0x. Other settings are global.', source: `${morpheStrings}/youtube/strings.xml#L1709-L1712` },
				{ status: 'no', note: 'Playback settings apply to every channel.', source: 'https://support.google.com/youtube/answer/7509567?hl=en' },
			] },
			{ name: 'Skip silence', icon: 'lucide:skip-forward', cells: [
				{ status: 'yes', note: 'Skips silent parts of a video automatically.', source: 'https://opentubex.org/extra-features/#skip-silence' },
				{ status: 'no', note: 'No silence skipping.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'no', note: 'No silence skipping.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'yes', note: 'The playback dialog can fast-forward during silence.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/java/org/schabi/newpipe/player/helper/PlaybackParameterDialog.java' },
				{ status: 'yes', note: 'The playback options have a Skip silence toggle.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/PlaybackOptionsSheet.kt' },
				{ status: 'yes', label: 'Android', note: ['Uses ExoPlayer\'s silence skipping. The ', { text: 'desktop beta setting', href: `${flowDesktop}/src/lib/settings/schema.ts` }, ' stays disabled until silence detection is implemented.'], source: `${flowCode}/player/audio/AudioFeaturesManager.kt` },
				{ status: 'no', note: 'No silence skipping.', source: `${ntSettings}#L166-L177` },
				{ status: 'yes', note: 'Adds an option to skip silent pauses automatically.', source: `${morphePatches}/video/audio/SkipSilencePatch.kt` },
				{ status: 'no', note: 'No silence skipping. Premium\'s Auto speed changes the pace of some Android videos, which is a different feature.', source: 'https://support.google.com/youtube/answer/6308116?hl=en' },
			] },
			{ name: 'Auto picture-in-picture', icon: 'lucide:picture-in-picture-2', cells: [
				{ status: 'yes', note: 'Enters picture-in-picture when you switch tabs or windows, or minimize the app.', source: 'https://opentubex.org/extra-features/#auto-picture-in-picture' },
				{ status: 'no', note: 'Picture-in-picture is manual only.', source: 'https://docs.freetubeapp.io/usage/keyboard-shortcuts/' },
				{ status: 'yes', note: 'With Background Behavior set to Player Overlay, leaving the app enters picture-in-picture.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'yes', note: 'With Minimize on app switch set to the popup player, leaving the app opens a floating overlay. It needs permission to draw over other apps.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Enters picture-in-picture when you leave the player during playback, if PiP is on.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/fragments/PlayerFragment.kt' },
				{ status: 'yes', label: 'Android', note: 'With Auto PiP on, leaving the app during a video enters picture-in-picture. The desktop beta only has manual PiP.', source: `${flowCode}/MainActivity.kt` },
				{ status: 'yes', note: 'Leaving the app during playback enters picture-in-picture on Android 8 and later, unless When you leave the app is set to Only audio.', source: `${ntCode}/ui/playback/BackgroundModePolicy.java` },
				{ status: 'yes', note: 'Keeps the official app\'s automatic picture-in-picture and lifts YouTube\'s limits on which videos can use it.', source: `${morpheExtension}/patches/BackgroundPlaybackPatch.java` },
				{ status: 'partial', label: 'Premium for music', note: 'Leaving the app starts picture-in-picture when enabled. Music needs Premium.', source: 'https://support.google.com/youtube/answer/7552722?hl=en' },
			] },
			{ name: 'Tabs', icon: 'lucide:panels-top-left', cells: [
				{ status: 'yes', note: 'Keeps videos and channels open in tabs.', source: 'https://opentubex.org/extra-features/#tab-support' },
				{ status: 'no', note: 'Separate windows, but no tabs.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/333' },
				{ status: 'no', note: 'Navigation tabs only switch app sections.', source: 'https://grayjay.app/faq.html' },
				{ status: 'no', note: 'Home tabs only switch feeds and sections.' },
				{ status: 'no', note: 'Navigation tabs only switch app sections.' },
				{ status: 'partial', label: 'Desktop beta', note: 'The desktop beta has optional browser-style tabs, each with its own video. Android tabs only switch app sections.', source: `${flowDesktop}/src/lib/tabs/tabPlayback.ts` },
				{ status: 'no', note: 'The bottom bar only switches app sections.', source: `${ntSettings}#L67-L71` },
				{ status: 'no', note: 'Uses the official app\'s navigation, without tabs.', source: morpheReadme },
				{ status: 'partial', label: 'Browser tabs', note: 'The website works in several browser tabs. The apps have no tabs.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'Background audio', icon: 'lucide:headphones', cells: [
				{ status: 'yes', note: 'Keeps playing while you use other apps or the screen is off.', source: 'https://opentubex.org/extra-features/#mobile-app-support' },
				{ status: 'yes', note: 'Plays audio in the background.', source: 'https://docs.freetubeapp.io/usage/video-formats/' },
				{ status: 'yes', note: 'Plays in the background on Android.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'The background player keeps playing while you use other apps.' },
				{ status: 'yes', note: 'Plays in the background.' },
				{ status: 'yes', note: 'Keeps playing while you use other apps or the screen is off.', source: `${flowRelease}#video` },
				{ status: 'yes', note: 'Keeps playing with the screen off, with lock-screen and headset controls, without a paid plan.', source: `${ntReadme}#features` },
				{ status: 'yes', note: 'Removes YouTube\'s background playback limits without Premium, including for kids videos. Background play for Shorts can be turned off separately.', source: `${morphePatches}/misc/backgroundplayback/BackgroundPlaybackPatch.kt` },
				{ status: 'partial', label: 'Premium', note: 'Background playback in the apps needs a paid plan. Premium Lite covers most non-music videos except Shorts, and full Premium also covers music. In a desktop browser, audio keeps playing in another tab.', source: 'https://support.google.com/youtube/answer/15968883?hl=en' },
			] },
			{ name: 'Recommendation engine', icon: 'lucide:sparkles', cells: [
				{ status: 'partial', label: 'On-device', note: ['Optional Home recommendations learn from your history, saved videos, and feedback, with Familiar, Balanced, and Explore modes. They pick from a smaller pool than YouTube, built from ', { text: 'related videos, chosen channels, and searches', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/recommendationCandidates.js' }, '. Signed in, Home can also show ', { text: 'YouTube\'s recommendations', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/views/Home/HomeYouTubeRecommendations.vue' }, '.'], source: 'https://opentubex.org/extra-features/#customizable-home-page' },
				{ status: 'no', note: 'Shows related videos from YouTube or Invidious and trending feeds, but no personalized recommendations.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/views/Watch/Watch.js' },
				{ status: 'partial', label: 'Source feeds', note: 'Home combines recommendations from its sources, personalized when you sign in to one. Grayjay has no engine of its own.', source: 'https://github.com/futo-org/grayjay-android/blob/396/README.md#feed' },
				{ status: 'no', note: 'Related videos and trending only. Personalized recommendations are a feature request.', source: 'https://github.com/TeamNewPipe/NewPipe/issues/13362' },
				{ status: 'no', note: 'Trending, subscriptions, and related videos only, with no personalized recommendations.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/fragments/HomeFragment.kt' },
				{ status: 'yes', label: 'On-device', note: 'FlowNeuro learns from watches, skips, likes, dislikes, searches, and watch time, and ranks recommendations on your device, with time-of-day preferences and topic variety. It needs no Google account or server.', source: `${flowRelease}#recommendations-flowneuro-engine` },
				{ status: 'yes', label: 'Server-side', note: 'Home shows YouTube\'s recommendations for your account. Signed out, YouTube still personalizes Home from what you watch.', source: `${ntReadme}#features` },
				{ status: 'yes', label: 'Server-side', note: 'Uses YouTube\'s recommendations, personalized on Google\'s servers. Patches can hide recommendation sections.', source: morpheReadme },
				{ status: 'yes', label: 'Server-side', note: 'Google\'s servers personalize Home, Shorts, and other sections from your watch and search history, subscriptions, likes, and feedback. Home relies mostly on watch history.', source: 'https://support.google.com/youtube/answer/16089387?hl=en' },
			] },
			{ name: 'Distraction-free toggles', icon: 'lucide:list-filter', cells: [
				{ status: 'yes', note: 'Hides Shorts, recommendations, comments, counts, and navigation sections. Subscription feeds filter by videos, Shorts, live streams, and posts, and you can hide watched videos or block channels and title keywords.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/static/locales/en-US.yaml' },
				{ status: 'yes', note: 'Hides recommendations, comments, counts, and channel tabs such as Shorts. Subscription feeds filter by type, and you can hide watched videos or block channels and title keywords.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'partial', label: 'Limited', note: 'Can hide the recommendations tab and choose which navigation tabs show. There are no toggles for Shorts, comments, or feed content.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/Settings.kt' },
				{ status: 'partial', label: 'Limited', note: 'Hides related videos, comments, and description boxes, lets you pick the home tabs, and turns off auto-queueing. No toggle hides Shorts everywhere.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'partial', label: 'Limited', note: ['Feeds filter by videos, Shorts, and live streams, and can hide watched or upcoming videos. ', { text: 'App settings', href: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/xml/general_settings.xml' }, ' can hide related videos and search suggestions. Shorts still appear elsewhere.'], source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/FilterSortBottomSheet.kt' },
				{ status: 'yes', note: 'Hides Shorts across the app, related videos, comments, watched feed items, and navigation sections. Recommendation settings can block topics and channels.', source: `${flowCode}/ui/screens/settings/content/ContentSettingsScreen.kt` },
				{ status: 'yes', note: ['Shorts never appear in feeds, search, channels, or Up next. Settings hide Up next, watched videos, upcoming premieres, and live streams, and pick the bottom-bar tabs. The ', { text: 'video menu', href: `${ntCode}/ui/settings/AppPages.java#L357` }, ' can block channels.'], source: `${ntCode}/ui/common/ShortsFilter.java` },
				{ status: 'yes', note: 'Hides Shorts, related videos, end-screen suggestions, comments, and navigation buttons. Keyword filters hide matching videos in feeds and search.', source: `${morpheStrings}/youtube/strings.xml` },
				{ status: 'partial', label: 'Feedback only', note: 'You can show fewer Shorts and mark videos as Not interested or Don\'t recommend channel. Turning off watch history removes Home recommendations. There are no toggles to hide parts of the interface.', source: 'https://support.google.com/youtube/answer/6342839?hl=en' },
			] },
			{ name: 'Watch queue', icon: 'lucide:list-video', cells: [
				{ status: 'yes', note: 'Adds videos to a queue or plays them next. The side panel reorders and removes them.', source: 'https://opentubex.org/extra-features/#watch-queue' },
				{ status: 'no', note: 'Playlists and autoplay only. A queue is an open feature request.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/547' },
				{ status: 'yes', note: 'Adds videos to a queue, with a queue editor on Android.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/views/overlays/QueueEditorOverlay.kt' },
				{ status: 'yes', note: 'Enqueues videos or plays them next, with a queue editor. Adding related videos automatically is optional.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Add to queue and queue controls, with optional related videos.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'A video queue with reordering and removal, separate from the music queue. The desktop beta has queues too.', source: `${flowCode}/ui/components/videoplayer/sheet/FlowPlaylistQueueBottomSheet.kt` },
				{ status: 'yes', note: 'Adds videos to the queue or plays them next from the video menu. The player opens the queue.', source: `${ntCode}/ui/settings/AppPages.java#L333-L335` },
				{ status: 'yes', note: 'Adds videos to a queue from the feed menu, using Morphe\'s own queue or one built on YouTube\'s playlists.', source: `${morphePatches}/layout/flyout/AddToQueuePatch.kt` },
				{ status: 'partial', label: 'Premium on mobile', note: 'Free on desktop and the web, but the phone and tablet apps need Premium. A browser queue is lost when you close the browser unless you save it as a playlist.', source: 'https://support.google.com/youtube/answer/9546304?hl=en' },
			] },
			{ name: 'Live chat', icon: 'lucide:messages-square', cells: [
				{ status: 'yes', label: 'With replay', note: ['Shows chat during live streams and premieres and ', { text: 'replays chat', href: 'https://opentubex.org/extra-features/#live-streams-premieres-and-chat-replay' }, ' on past streams in sync with the video. Chat can dock in fullscreen. Needs a direct connection to YouTube, not Invidious.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/components/WatchVideoLiveChat/WatchVideoLiveChat.vue' },
				{ status: 'partial', label: 'Live only', note: 'Shows chat during live streams and premieres, with no replay for past streams. Needs a direct connection to YouTube, not Invidious.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/views/Watch/Watch.js#L736-L740' },
				{ status: 'yes', label: 'With replay', note: 'Shows live chat and replays it on past streams.', source: `${gjYoutube}/YoutubeScript.js#L2746-L2829` },
				{ status: 'no', note: 'Live streams play without chat.' },
				{ status: 'no', note: 'Live streams play without chat.' },
				{ status: 'partial', label: 'Desktop replay', note: ['Android shows live chat, including in a fullscreen side panel, but doesn\'t replay it. The ', { text: 'desktop beta', href: `${flowDesktop}/src/lib/useChatReplay.ts` }, ' replays chat on past streams in sync with the video.'], source: `${flowCode}/ui/components/videoplayer/sheet/FlowLiveChatBottomSheet.kt` },
				{ status: 'partial', label: 'Live only', note: 'Shows chat during live streams, but not on past streams.', source: `${ntCode}/ui/playback/LiveChatSheet.java#L23-L29` },
				{ status: 'yes', label: 'With replay', note: 'Keeps YouTube\'s live chat and replay. A patch can show chat as Niconico-style comments scrolling across the video.', source: `${morphePatches}/layout/niconicocomments/NiconicoCommentsPatch.kt` },
				{ status: 'yes', label: 'With replay', note: 'Chat runs during live streams and premieres. Past streams replay chat unless the creator turned replay off or edited the stream.', source: 'https://support.google.com/youtube/answer/15268877?hl=en' },
			] },
			{ name: 'Sleep timer', icon: 'lucide:timer', cells: [
				{ status: 'yes', note: 'Stops playback after a set time, at the end of the chapter, or at the end of the video.', source: 'https://opentubex.org/extra-features/#sleep-timer' },
				{ status: 'no', note: 'No sleep timer.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'no', note: 'No sleep timer.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'No sleep timer.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'A sleep timer with a custom duration or quick picks from 10 to 60 minutes.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/sheets/SleepTimerSheet.kt' },
				{ status: 'yes', label: 'Android', note: 'Stops video or music after a set time and can close the app.', source: `${flowCode}/player/SleepTimerManager.kt` },
				{ status: 'yes', note: 'Pauses playback a set time after you open a video.', source: `${ntSettings}#L178-L179` },
				{ status: 'yes', note: 'Uses the official app\'s sleep timer.', source: 'https://support.google.com/youtube/answer/15397997?hl=en' },
				{ status: 'yes', note: 'The player\'s Sleep timer pauses the video after a set time.', source: 'https://support.google.com/youtube/answer/15397997?hl=en' },
			] },
			{ name: 'Cast to a TV', icon: 'lucide:cast', cells: [
				{ status: 'yes', label: 'Google Cast, FCast & DLNA', note: 'Google Cast and FCast on Android and desktop. DLNA on Android, desktop, and iOS.', source: 'https://opentubex.org/extra-features/#cast-to-google-cast-fcast-and-dlna-devices' },
				{ status: 'no', note: 'No casting. DLNA support is an open feature request.', source: 'https://github.com/FreeTubeApp/FreeTube/issues/437' },
				{ status: 'yes', label: 'FCast & Google Cast', note: 'Casts with FCast and Google Cast on Android and desktop. FCast works best, since Google Cast may need the device to proxy separate audio and video streams. The FAQ still lists AirPlay, but the apps no longer connect to it.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/casting/StateCasting.kt' },
				{ status: 'partial', label: 'Kodi via Kore', note: 'Play with Kodi sends videos to a Kodi media center through the Kore remote app. No Google Cast or AirPlay.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'No casting.', source: 'https://github.com/libre-tube/LibreTube/discussions/3493' },
				{ status: 'yes', label: 'Android DLNA', note: 'Casts to DLNA and UPnP devices without Google Play services. No Google Cast or AirPlay.', source: `${flowCode}/player/dlna/DlnaCastManager.kt` },
				{ status: 'yes', label: 'Google Cast & TV code', note: ['Casts to Google Cast devices without Google Play services, but without live streams or subtitles. A ', { text: 'TV code', href: `${ntStrings}#L308-L322` }, ' links the YouTube or SmartTube TV app, which plays both.'], source: `${ntRelease}/docs/mobile-port/CASTING.md` },
				{ status: 'yes', label: 'Google Cast', note: ['Keeps YouTube\'s casting to TVs and speakers. Root mount installs use Google Play services, and other installs need ', { text: 'MicroG-RE 7.3.0', href: 'https://github.com/MorpheApp/MicroG-RE/releases/tag/7.3.0' }, ' or later.'], source: `${morpheRelease}/CHANGELOG.md#L215` },
				{ status: 'yes', note: 'Casts from the app or a supported desktop browser to TVs and streaming devices. The app can also link to the TV app with a TV code.', source: 'https://support.google.com/youtube/answer/7640706?hl=en' },
			] },
		],
	},
	{
		name: 'Library & sync',
		rows: [
			{ name: 'Posts', icon: 'lucide:message-square-text', cells: [
				{ status: 'yes', note: 'Channel posts show in a Posts tab of the subscriptions feed and on channel pages.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/components/SubscriptionPosts/SubscriptionsPosts.vue' },
				{ status: 'yes', note: 'Channel posts show in a Posts tab of the subscriptions feed and on channel pages.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/components/SubscriptionPosts/SubscriptionsPosts.vue' },
				{ status: 'no', note: 'The YouTube plugin only loads videos, live streams, and Shorts, so posts don\'t show.', source: `${gjYoutube}/YoutubeScript.js#L3241-L3246` },
				{ status: 'no', note: 'Posts don\'t show in feeds or on channel pages.' },
				{ status: 'no', note: 'Posts don\'t show in feeds or on channel pages.' },
				{ status: 'partial', label: 'Channel pages', note: 'Channel pages have a Posts tab with comments, but the subscriptions feed doesn\'t include posts.', source: `${flowCode}/ui/components/channel/ChannelCommunityPosts.kt` },
				{ status: 'no', note: 'Posts don\'t show in feeds or on channel pages.', source: ntReadme },
				{ status: 'yes', note: 'Keeps YouTube\'s posts and adds options to translate them and download their images.', source: `${morphePatches}/interaction/posttranslate/PostTranslatePatch.kt` },
				{ status: 'yes', note: 'Posts show on channel pages and can appear on Home and in Subscriptions.', source: 'https://support.google.com/youtube/answer/9409631?hl=en' },
			] },
			{ name: 'Notifications', icon: 'lucide:bell-ring', cells: [
				{ status: 'yes', label: 'Desktop and Android', note: ['Reminds you of ', { text: 'scheduled live streams and premieres', href: 'https://opentubex.org/extra-features/#upload-live-stream-and-premiere-notifications' }, ', alerts you to new uploads from chosen channels and feed types, and ', { text: 'tells you when a followed Twitch channel goes live', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/platformFeed.js#L670-L688' }, '. New-upload alerts aren\'t available on iOS.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/uploadNotifications.js' },
				{ status: 'no', note: 'No system notifications.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'yes', label: 'Android', note: 'Reminds you of scheduled content and notifies you of new content from followed channels. Depends on the source plugin and background updates.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/states/StateNotifications.kt' },
				{ status: 'partial', label: 'Feed updates', note: 'Checks chosen subscriptions periodically and notifies you of new items. No reminders for scheduled streams or premieres.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/java/org/schabi/newpipe/local/feed/notifications/NotificationWorker.kt' },
				{ status: 'partial', label: 'New uploads', note: 'Checks subscriptions for new uploads periodically, with per-channel controls. Upcoming videos are left out, and there are no start-time reminders.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/workers/NotificationWorker.kt' },
				{ status: 'yes', label: 'Android', note: ['Alerts you to new uploads from chosen subscriptions and ', { text: 'reminds you of upcoming live streams and premieres', href: `${flowCode}/notification/UpcomingVideoReminderWorker.kt` }, '. Timing depends on Android\'s background scheduling.'], source: `${flowCode}/notification/SubscriptionCheckWorker.kt` },
				{ status: 'partial', label: 'In-app list', note: 'Signed in, you can open your YouTube notifications in the app. No system alerts for uploads, streams, or premieres.', source: `${ntStrings}#L228` },
				{ status: 'yes', label: 'Account required', note: 'Keeps YouTube\'s upload, live stream, and premiere notifications. Without root, push notifications go through MicroG-RE.', source: `${morpheFaq}#32-youtube-push-notifications-do-not-work` },
				{ status: 'yes', label: 'Account required', note: ['Alerts you to uploads and live streams, plus ', { text: 'premiere reminders', href: 'https://support.google.com/youtube/answer/9080341?hl=en' }, '. Needs sign-in and notifications turned on, and not every upload triggers one.'], source: 'https://support.google.com/youtube/answer/3382248?hl=en' },
			] },
			{ name: 'Google account sign-in', icon: 'simple-icons:google', cells: [
				{ status: 'yes', label: 'TV-style code', note: ['Optional sign-in with a code, the way a TV signs in, on desktop, Android, and iOS. Adds likes, comments and replies you can edit or delete, YouTube recommendations on Home, and optional watch-history reporting. ', { text: 'Subscriptions and playlists', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/youtube-sync.js' }, ', including Watch later and Liked videos, can sync with the account in both directions. Not available in the web app.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/api/youtube-account.js' },
				{ status: 'no', note: 'No Google sign-in.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/README.md#L53' },
				{ status: 'partial', label: 'Import / Home', note: ['The YouTube plugin signs in through Google\'s web page. It imports subscriptions, playlists, and history, personalizes Home, and can ', { text: 'use the account', href: `${gjYoutube}/YoutubeConfig.json#L71-L97` }, ' for members-only and age-restricted videos and to report what you watch. It can\'t like, comment, or subscribe on YouTube.'], source: `${gjYoutube}/YoutubeConfig.json#L419-L432` },
				{ status: 'no', note: 'NewPipe won\'t add Google sign-in, to avoid anything that could track you.', source: 'https://github.com/TeamNewPipe/website/blob/abbaf19b37ee61930f41a11ee5c03c5db0c0e77d/_faq/bugs-google-login.html' },
				{ status: 'no', note: 'No Google sign-in. LibreTube aims to stay independent from Google.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/README.md#L49' },
				{ status: 'no', note: 'No Google sign-in.', source: 'https://github.com/Flow-Tube/Flow/blob/v3.0.0/README.md#L93' },
				{ status: 'yes', label: 'TV-style code', note: 'Optional sign-in with a code, the way a TV signs in, without microG or root. Subscriptions, history, playlists, Watch later, and recommendations load from the account, and you can like, subscribe, and comment. Supports several accounts.', source: `${ntReadme}#how-sign-in-works` },
				{ status: 'yes', label: 'Root or MicroG', note: 'Keeps every account feature of the official app. Without root, sign-in goes through MicroG-RE, and managed accounts such as Google Workspace may not work.', source: `${morpheFaq}#22-microg-google-login-does-not-work` },
				{ status: 'yes', note: 'A Google account adds likes, comments, subscriptions, playlists, watch history, and personalized recommendations across devices.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Data import/export', icon: 'lucide:arrow-left-right', cells: [
				{ status: 'yes', note: ['Imports subscriptions, watch and search history, and playlists from a YouTube Takeout ZIP or a FreeTube database. Subscriptions also import from NewPipe and LibreTube, and watch history from LibreTube. ', { text: 'Exports', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/components/Settings/Data/DataSettings.vue#L1148-L1319' }, ' subscriptions in OpenTubeX, YouTube, or NewPipe format, history and search history in OpenTubeX or YouTube format, and everything as a backup ZIP.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/static/locales/en-US.yaml#L2023-L2026' },
				{ status: 'yes', note: ['Imports subscriptions from YouTube Takeout and NewPipe, and watch and search history from YouTube Takeout. Playlists only import from FreeTube files. ', { text: 'Exports', href: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/components/DataSettings/DataSettings.vue#L605-L760' }, ' subscriptions in FreeTube, YouTube, or NewPipe format, and history and search history in FreeTube or YouTube format.'], source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/components/DataSettings/DataSettings.vue#L238-L248' },
				{ status: 'partial', label: 'Own backups', note: 'Imports Grayjay backups and NewPipe subscriptions, but not YouTube Takeout or history and playlists from other apps. Signed in to a source such as YouTube, it can pull that account\'s subscriptions and playlists. Exports only a Grayjay backup ZIP, which other apps can\'t read.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/states/StateBackup.kt#L588-L607' },
				{ status: 'partial', label: 'Subscriptions', note: 'Imports YouTube subscriptions from Google Takeout and SoundCloud followings from a profile. Exports subscriptions as a NewPipe file. History and playlists only move through a NewPipe database export.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml#L211-L216' },
				{ status: 'yes', note: 'Imports subscriptions from YouTube, NewPipe, and FreeTube, playlists from YouTube, Piped, FreeTube, or a list of links, and watch history from YouTube Takeout. Exports subscriptions in NewPipe or FreeTube format, playlists in Piped or FreeTube format, and everything as a LibreTube backup.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/preferences/BackupRestoreSettings.kt#L226-L245' },
				{ status: 'yes', note: 'Imports a full Google Takeout, including likes and the YouTube Music library. It also reads NewPipe and LibreTube backups, FreeTube history, and Metrolist music playlists. Exports a Flow backup and the recommendation profiles.', source: 'https://github.com/Flow-Tube/Flow/blob/v3.0.0/app/src/main/res/values/strings.xml#L1657-L1700' },
				{ status: 'partial', label: 'Takeout export', note: ['No import. Your library lives in your Google account, which Google Takeout can export. NewTube\'s own ', { text: 'backup file', href: `${ntSettings}#L144-L152` }, ' only covers its settings.'], source: 'https://support.google.com/accounts/answer/3024190?hl=en' },
				{ status: 'partial', label: 'Takeout export', note: 'No import. Your library lives in your Google account, which Google Takeout can export. Morphe\'s Import / Export only covers its settings.', source: `${morpheFaq}#113-how-do-i-backup-my-youtube-morphe-settings` },
				{ status: 'partial', label: 'Takeout export', note: 'Google Takeout exports subscriptions, playlists, and history. Nothing can be imported from files or other apps.', source: 'https://support.google.com/accounts/answer/3024190?hl=en' },
			] },
			{ name: 'Sync between devices', icon: 'lucide:refresh-cw', cells: [
				{ status: 'yes', label: 'End-to-end encrypted', note: ['Optional sync covers subscriptions, playlists, history, channel settings, profiles, tabs, and settings. Signed in to YouTube, ', { text: 'subscriptions and playlists', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/youtube-sync.js' }, ' can also sync with your YouTube account, which Google stores without this encryption.'], source: otxSync },
				{ status: 'no', note: 'No sync. You can copy the data files yourself or use a file-sync tool.', source: localOnly },
				{ status: 'yes', label: 'Device pairing', note: 'Paired devices sync subscriptions, playlists, Watch later, subscription groups, and history. The devices have to reach each other.', source: gjSync },
				{ status: 'no', note: 'No sync. Import and export move data by hand.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3#installation-and-updates' },
				{ status: 'partial', label: 'Piped account', note: 'A Piped account syncs subscriptions and playlists. History and settings stay local.', source: ltPrivacy },
				{ status: 'yes', label: 'Device pairing', note: 'Paired devices sync playlists, history, likes, subscriptions and groups, notes, chosen settings, and the video and music recommendation profiles, including with the desktop beta. The devices need a direct connection.', source: `${flowCode}/ui/screens/sync/SyncCollections.kt` },
				{ status: 'yes', label: 'Google account', note: ['Subscriptions, playlists, history, and Watch later come from your Google account. NewTube\'s own settings move through a ', { text: 'backup file', href: `${ntSettings}#L144-L152` }, '.'], source: `${ntReadme}#features` },
				{ status: 'yes', label: 'Google account', note: 'Subscriptions and playlists follow your Google account. Morphe\'s settings move by hand through Import / Export.', source: `${morpheFaq}#113-how-do-i-backup-my-youtube-morphe-settings` },
				{ status: 'yes', label: 'Google account', note: 'Subscriptions and playlists follow your Google account across devices.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Sync watch history', icon: 'lucide:history', cells: [
				{ status: 'yes', note: 'History is one of the optional sync categories.', source: otxSync },
				{ status: 'no', note: 'History stays on the device.', source: localOnly },
				{ status: 'yes', note: 'Paired devices exchange recent history.', source: gjSync },
				{ status: 'no', note: 'History only moves through manual backups.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3#installation-and-updates' },
				{ status: 'no', note: 'A Piped account doesn\'t sync history or playback positions.', source: ltPrivacy },
				{ status: 'yes', note: 'History is one of the collections paired devices can sync, including the desktop beta.', source: `${flowCode}/ui/screens/sync/SyncCollections.kt` },
				{ status: 'yes', label: 'History enabled', note: 'Saved to your Google account when the account keeps history. Settings can save it, stop sending it, or clear it.', source: `${ntSettings}#L126-L136` },
				{ status: 'yes', label: 'History enabled', note: 'Saved to your Google account when history is on. Morphe warns when a DNS blocker stops history from saving.', source: `${morphePatches}/misc/dns/CheckWatchHistoryDomainNameResolutionPatch.kt` },
				{ status: 'yes', label: 'History enabled', note: 'Saved to your Google account when history is on. You can pause or delete it.', source: 'https://support.google.com/youtube/answer/95725?hl=en' },
			] },
			{ name: 'Watch statistics', icon: 'lucide:chart-column', cells: [
				{ status: 'yes', note: 'Daily and weekly watch-time charts.', source: 'https://opentubex.org/extra-features/#watch-time-statistics' },
				{ status: 'no', note: 'No watch-time statistics.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'yes', note: 'Watch metrics in the Creators tab show watch time and views per creator.', source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/res/values/strings.xml' },
				{ status: 'partial', label: 'Most played', note: 'A Most Played list, but no watch-time charts.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'No watch-time statistics.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: ['Flow Recap charts watch time per day for a month and per month for a year, broken down by weekday, time of day, and top channels. The ', { text: 'Wellbeing page', href: `${flowCode}/ui/screens/settings/wellbeing/WatchTimeCard.kt` }, ' shows daily watch time for the past week.'], source: `${flowCode}/ui/screens/recap/RecapOverviewCards.kt` },
				{ status: 'no', note: 'No watch-time statistics.', source: `${ntStrings}#L48` },
				{ status: 'yes', label: 'Account required', note: 'Uses YouTube\'s Time watched page, which needs sign-in and watch history. Morphe adds no statistics of its own.', source: 'https://support.google.com/youtube/answer/9052667?hl=en' },
				{ status: 'yes', label: 'Account required', note: 'Time watched shows the daily average, today, yesterday, and the past seven days if you\'re signed in with history on. It leaves out deleted history, private viewing, YouTube Music, and YouTube TV.', source: 'https://support.google.com/youtube/answer/9052667?hl=en' },
			] },
		],
	},
	{
		name: 'Add-ons',
		rows: [
			{ name: 'SponsorBlock', url: 'https://sponsor.ajay.app/', image: '/compare-icons/sponsorblock.png', cells: [
				{ status: 'yes', label: 'Full', note: 'Category skipping, mute segments, full-video labels, channel whitelisting, and submitting segments from the player.', source: 'https://opentubex.org/extra-features/#sponsorblock-submission' },
				{ status: 'partial', label: 'Skipping only', note: 'Skips segments by category and can exclude channels. No submissions, mute segments, or full-video labels.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/src/renderer/helpers/sponsorblock.js' },
				{ status: 'partial', label: 'YouTube plugin', note: 'The YouTube plugin skips segments by category, manually or automatically. No submissions, mute segments, or full-video labels.', source: `${gjYoutube}/YoutubeConfig.json#L178-L262` },
				{ status: 'partial', label: 'Forks only', note: 'NewPipe doesn\'t include SponsorBlock. Unofficial forks add it.', source: 'https://newpipe.net/blog/pinned/newpipe-and-online-advertising/' },
				{ status: 'partial', label: 'Limited', note: 'Skips segments, votes, submits segments, and shows full-video labels. You can\'t submit mute segments or full-video labels.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/java/com/github/libretube/ui/dialogs/SubmitSegmentDialog.kt' },
				{ status: 'partial', label: 'Skip and mute', note: ['Skips or mutes segments by category, and you can ', { text: 'submit segments from the player', href: `${flowCode}/ui/screens/player/dialogs/SbSubmitSegmentDialog.kt` }, '. No full-video labels or channel whitelist.'], source: `${flowCode}/player/sponsorblock/SponsorBlockHandler.kt` },
				{ status: 'partial', label: 'Skipping only', note: ['Skips segments by category, marks them on the seek bar, and can ', { text: 'exclude channels', href: `${ntCode}/ui/settings/AppPages.java#L358` }, ' from the video menu. No submissions, mute segments, or full-video labels.'], source: `${ntCode}/ui/settings/PlayerPages.java#L447-L467` },
				{ status: 'partial', label: 'No mute segments', note: 'Skips by category, shows highlights, and supports voting, submitting from the player, and channel whitelisting. No mute segments or full-video labels.', source: `${morpheStrings}/sponsorblock/strings.xml` },
				{ status: 'partial', label: 'Web extension', note: 'Works on the website through a browser extension. The apps don\'t support it.', source: 'https://sponsor.ajay.app/' },
			] },
			{ name: 'DeArrow', url: 'https://dearrow.ajay.app/', image: '/compare-icons/dearrow.svg', cells: [
				{ status: 'yes', note: 'Optionally replaces titles and thumbnails with community alternatives.', source: 'https://opentubex.org/docs/sponsorblock/#other-add-ons' },
				{ status: 'yes', note: 'Optional DeArrow titles and thumbnails.', source: 'https://docs.freetubeapp.io/usage/privacy/' },
				{ status: 'yes', label: 'YouTube plugin', note: 'The YouTube plugin has DeArrow titles and thumbnails, with separate settings for video lists.', source: `${gjYoutube}/YoutubeConfig.json#L263-L307` },
				{ status: 'no', note: 'Not included.', source: 'https://github.com/TeamNewPipe/NewPipe/blob/v0.29.3/app/src/main/res/values/strings.xml' },
				{ status: 'yes', note: 'Optional DeArrow titles and thumbnails, plus a submission dialog.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', label: 'Android', note: 'Loads community titles and thumbnails from DeArrow and caches them.', source: `${flowCode}/data/repository/DeArrowRepository.kt` },
				{ status: 'yes', note: 'Optional DeArrow titles and thumbnails, each with its own toggle.', source: `${ntSettings}#L236-L241` },
				{ status: 'yes', note: 'Adds DeArrow titles and thumbnails, with per-feed settings and a choice of thumbnail styles.', source: `${morpheStrings}/youtube/strings.xml#L1564-L1601` },
				{ status: 'partial', label: 'Web extension', note: 'Works on the website through a browser extension. The apps don\'t support it.', source: 'https://dearrow.ajay.app/' },
			] },
			{ name: 'Return YouTube Dislike', url: 'https://returnyoutubedislike.com/', image: '/compare-icons/return-youtube-dislike.svg', cells: [
				{ status: 'yes', note: 'Optionally shows estimated dislike counts.', source: 'https://opentubex.org/extra-features/#return-youtube-dislike-support' },
				{ status: 'no', note: 'Not included.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'yes', label: 'YouTube plugin', note: 'An option in the YouTube plugin shows estimated dislike counts.', source: `${gjYoutube}/YoutubeConfig.json#L165-L176` },
				{ status: 'partial', label: 'Forks only', note: 'NewPipe doesn\'t include it. Forks such as PipePipe add it.', source: 'https://github.com/InfinityLoop1308/PipePipe#beyond-newpipe' },
				{ status: 'yes', note: 'Shows estimated dislike counts.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'yes', label: 'Android', note: 'Shows estimated dislike counts.', source: `${flowRelease}#features` },
				{ status: 'yes', note: 'Optionally shows estimated dislike counts. Off by default.', source: `${ntSettings}#L190-L191` },
				{ status: 'yes', note: 'Shows estimated dislike counts and can add like counts and ratios to feed thumbnails.', source: `${morphePatches}/layout/returnyoutubedislike/ReturnYouTubeDislikePatch.kt` },
				{ status: 'partial', label: 'Web extension', note: 'Works on the website through a browser extension. The apps don\'t support it.', source: 'https://returnyoutubedislike.com/' },
			] },
			{ name: 'AiSList', url: 'https://github.com/Override92/AiSList', icon: 'lucide:bot-off', cells: [
				{ status: 'yes', note: 'Optionally filters out channels on AiSList\'s community lists of AI-generated content.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/src/renderer/helpers/aiSlopList.js' },
				{ status: 'no', note: 'Not included.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/static/locales/en-US.yaml' },
				{ status: 'no', note: 'Not included.', source: `${gjYoutube}/YoutubeConfig.json` },
				{ status: 'no', note: 'Not included.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3' },
				{ status: 'no', note: 'Not included.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/src/main/res/values/strings.xml' },
				{ status: 'no', note: 'Not included.', source: `${flowRelease}#features` },
				{ status: 'no', note: 'Not included.', source: ntReadme },
				{ status: 'yes', note: 'Optionally hides channels flagged by AiSList in Home and search, and reports AI channels from the video menu. Filtering runs on your device.', source: `${morpheStrings}/youtube/strings.xml#L375-L388` },
				{ status: 'partial', label: 'Web extension', note: 'The AiBlock browser extension filters channels on the website with AiSList. The apps don\'t support it.', source: 'https://aisloplist.com/' },
			] },
		],
	},
	{
		name: 'Privacy',
		rows: [
			{ name: 'Local-first', icon: 'lucide:hard-drive', cells: [
				{ status: 'yes', note: 'Subscriptions, playlists, history, and settings stay on your device. Sync and YouTube sign-in are optional.', source: 'https://opentubex.org/privacy/#desktop-and-mobile-apps' },
				{ status: 'yes', note: 'Subscriptions, playlists, history, and settings stay on your device, without an account.', source: localOnly },
				{ status: 'yes', note: 'Subscriptions, playlists, and history stay on your device. Signing in to a source and device pairing are optional.', source: 'https://grayjay.app/' },
				{ status: 'yes', note: 'Subscriptions, playlists, and history stay on your device, without an account.', source: 'https://newpipe.net/' },
				{ status: 'yes', note: 'Library data stays on your device. An optional Piped account stores subscriptions and playlists on the Piped instance, while history stays local.', source: ltPrivacy },
				{ status: 'yes', note: 'History, subscriptions, playlists, settings, and recommendation data stay on your device. Device sync is optional.', source: 'https://github.com/Flow-Tube#privacy-policy-and-disclaimer' },
				{ status: 'no', label: 'Cloud account', note: 'Subscriptions, playlists, and history come from your Google account, so signed out you have no subscriptions. Settings and search history stay on the device.', source: `${ntSettings}#L152` },
				{ status: 'no', label: 'Cloud account', note: 'Your library lives in your Google account, as in the official app. Only Morphe\'s settings stay on the device.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
				{ status: 'no', label: 'Cloud account', note: 'Subscriptions, playlists, and watch history live in your Google account.', source: 'https://support.google.com/youtube/answer/69961?hl=en' },
			] },
			{ name: 'Alternative backends', icon: 'lucide:server', cells: [
				{ status: 'yes', label: 'Invidious, Yattee', note: 'Loads video and channel data from an Invidious instance or your own Yattee server. Streams and direct fallback have their own settings.', source: 'https://opentubex.org/docs/providers/' },
				{ status: 'yes', label: 'Invidious', note: 'Can use an Invidious instance instead of the built-in extractor. Proxy and fallback settings decide which requests still go straight to YouTube.', source: 'https://docs.freetubeapp.io/usage/privacy/' },
				{ status: 'no', note: 'The YouTube plugin only connects to YouTube.', source: `${gjYoutube}/YoutubeConfig.json` },
				{ status: 'no', note: 'Connects to YouTube directly through NewPipeExtractor.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3' },
				{ status: 'yes', label: 'Piped', note: 'Can load YouTube data through a Piped instance, or straight from YouTube in Full Local Mode.', source: ltPrivacy },
				{ status: 'no', note: 'Connects to YouTube directly through its own InnerTube client.', source: flowRelease },
				{ status: 'no', note: 'Connects to YouTube directly through SmartTube\'s engine. An HTTP or SOCKS proxy is available.', source: `${ntSettings}#L275-L276` },
				{ status: 'no', note: 'Uses the official app and YouTube\'s servers.', source: morpheReadme },
				{ status: 'no', note: 'Uses YouTube\'s servers only.', source: 'https://www.youtube.com/' },
			] },
			{ name: 'No telemetry', icon: 'lucide:eye-off', cells: [
				{ status: 'yes', note: 'No analytics or crash reporting. Optional sync only sends the categories you pick to your sync server. YouTube or your Invidious instance still sees what you load, and update checks contact GitHub.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/package.json' },
				{ status: 'yes', note: 'Viewing data stays on your device. YouTube and optional services still see your requests and IP address.', source: 'https://docs.freetubeapp.io/usage/privacy/' },
				{ status: 'partial', label: 'Startup telemetry', note: ['Android and desktop send startup telemetry with a persistent random ID and app and platform details. Android adds device details and the enabled sources. Watched videos and searches are left out. See the ', { text: 'desktop implementation', href: 'https://github.com/futo-org/Grayjay.Desktop/blob/20/Grayjay.ClientServer/States/StateTelemetry.cs' }, '.'], source: 'https://github.com/futo-org/grayjay-android/blob/396/app/src/main/java/com/futo/platformplayer/states/StateTelemetry.kt' },
				{ status: 'yes', note: 'No usage reporting. Bug reports are sent only when you submit one.', source: 'https://newpipe.net/legal/privacy/' },
				{ status: 'yes', note: 'Its privacy policy says it collects no usage data and uses no tracking libraries.', source: ltPrivacy },
				{ status: 'yes', note: 'No usage reporting. YouTube and optional services such as SponsorBlock and DeArrow still receive requests.', source: `${flowDesktop}#privacy-and-security` },
				{ status: 'yes', note: 'No analytics, crash reporting, or ad SDKs. YouTube still sees what you watch, optional services such as SponsorBlock receive video IDs, and update checks contact GitHub.', source: ntPrivacy },
				{ status: 'no', label: 'Google tracking', note: 'Morphe adds no analytics, but the YouTube app still sends Google its usual activity data. Features such as SponsorBlock and Return YouTube Dislike contact their own services.', source: `${morpheFaq}#120-what-is-morphes-privacy-policy` },
				{ status: 'no', label: 'Google tracking', note: 'Google collects what you watch, search, and interact with. History settings change how it\'s stored and used, and Premium doesn\'t stop the collection.', source: 'https://policies.google.com/privacy?hl=en' },
			] },
			{ name: 'No proprietary libraries', icon: 'lucide:package-check', cells: [
				{ status: 'yes', note: ['No proprietary SDKs in the desktop or ', { text: 'Android dependencies', href: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/android/app/build.gradle' }, '.'], source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/package.json' },
				{ status: 'yes', note: 'The desktop app only uses open-source dependencies, including Electron.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/package.json' },
				{ status: 'no', label: 'Stripe on Android', note: ['The Android app includes Stripe, whose ', { text: 'payment module', href: 'https://github.com/stripe/stripe-android/blob/v22.0.0/payments-core/build.gradle' }, ' depends on Google\'s proprietary Play services Wallet library.'], source: 'https://github.com/futo-org/grayjay-android/blob/396/app/build.gradle' },
				{ status: 'yes', note: 'Avoids proprietary libraries and frameworks such as Google Play services.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3#description' },
				{ status: 'yes', note: 'Only open-source libraries, without Google Play services.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/app/build.gradle.kts' },
				{ status: 'yes', note: ['Only open-source libraries, and DLNA casting works without Google Play services. The ', { text: 'desktop beta', href: `${flowDesktop}/src-tauri/Cargo.toml` }, ' also uses open-source libraries only.'], source: `${flowRelease}/app/build.gradle.kts` },
				{ status: 'yes', note: 'Open-source libraries such as Media3 and an embedded Cronet, without Google Play services. Casting uses its own Cast protocol code.', source: `${ntRelease}/smarttubetv/build.gradle` },
				{ status: 'no', label: 'Proprietary base app', note: ['Morphe modifies the proprietary YouTube app. Without root, the open-source ', { text: 'MicroG-RE', href: 'https://github.com/MorpheApp/MicroG-RE' }, ' replaces Google Play services. Root mount installs keep Play services.'], source: morpheInstall },
				{ status: 'no', label: 'Closed source', note: 'The apps and website are closed source.', source: 'https://www.youtube.com/static?template=terms' },
			] },
			{ name: 'License', icon: 'lucide:scale', cells: [
				{ label: 'AGPLv3', note: 'GNU Affero General Public License v3.0.', source: 'https://github.com/OpenTubeX/OpenTubeX/blob/v0.38.0-beta/LICENSE' },
				{ label: 'AGPLv3', note: 'GNU Affero General Public License v3.0.', source: 'https://github.com/FreeTubeApp/FreeTube/blob/v0.26.0-beta/LICENSE' },
				{ label: 'Source First 1.1', note: ['Source-available under FUTO\'s Source First License 1.1, which restricts commercial use and redistribution. The ', { text: 'desktop app', href: 'https://github.com/futo-org/Grayjay.Desktop/blob/20/LICENSE.md' }, ' uses the same license.'], source: 'https://github.com/futo-org/grayjay-android/blob/396/LICENSE.md' },
				{ label: 'GPLv3', note: 'GNU General Public License v3.0 or later.', source: 'https://github.com/TeamNewPipe/NewPipe/tree/v0.29.3' },
				{ label: 'GPLv3', note: 'GNU General Public License v3.0 or later.', source: 'https://github.com/libre-tube/LibreTube/blob/v32.1/README.md' },
				{ label: 'GPLv3', note: 'The Android app and desktop beta use the GNU General Public License v3.0.', source: `${flowRelease}/License` },
				{ label: 'MIT', note: 'MIT License, like SmartTube.', source: `${ntRelease}/LICENSE` },
				{ label: 'GPLv3 patches', note: 'Morphe Manager and the patches use GPLv3 with extra attribution and branding terms. The patched YouTube app stays proprietary.', source: `${morpheReadme}#-license` },
				{ label: 'Proprietary', note: 'Closed source, governed by YouTube\'s Terms of Service.', source: 'https://www.youtube.com/static?template=terms' },
			] },
		],
	},
];
