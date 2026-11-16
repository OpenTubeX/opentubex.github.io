Last updated: November 16, 2026

This policy explains how the OpenTubeX website, desktop app, and mobile app handle data. It does not cover independently operated services or websites that OpenTubeX links to.

## Operator and contact

The OpenTubeX website and app are operated by [D3SOX](https://github.com/D3SOX). For privacy questions or requests, email [Show email address](protected-email:5e.52.5a.5d.62.5g.31.5h.60.5a.64.52.54.67.37.5g.5h.56.5f.62.63.53.56.66.28.5g.60.58).

## Website

### Data processed when you visit

The website is static. It has no accounts, contact forms, advertising, analytics, fingerprinting, or other visitor tracking operated by OpenTubeX.

The site is hosted by GitHub Pages. When your browser requests a page or asset, GitHub may process standard connection and request information such as your IP address, browser and device information, requested URL, referring page, and the date and time of the request. OpenTubeX does not maintain a separate visitor log.

Fonts, scripts, styles, images, and videos are served with the website itself, except for two kinds of badges. The package version badges on the downloads page load from the OpenTubeX badge service on Cloudflare Workers, and one changelog entry shows a Product Hunt badge with its current upvote count. When your browser loads one of these badges, Cloudflare or Product Hunt receives the same kind of request information described above.

Following a link to GitHub, Weblate, Fluxer, Matrix, or another external service sends a request to that service. Its own privacy policy applies once you visit it.

### Local storage and cookies

The website stores your light, dark, or automatic theme preference and selections made in synchronized tab controls in your browser's local storage. These values stay on your device and do not identify you. The website itself does not set cookies.

### Web app

The [web demo](/demo/) and `opentubex.org/app/` run the OpenTubeX web build in your browser. Its subscriptions, playlists, history, and settings are stored in your browser's storage for opentubex.org and are only sent elsewhere if you enable synchronization. Clearing this site's data in your browser deletes the copies on this device.

The web app loads videos, searches, and images from the configured Invidious instance or Yattee server. With the [OpenTubeX Local API extension](/docs/self-hosting/), it requests YouTube directly from your browser instead. With a Yattee server, the app loads some thumbnails directly from YouTube's image server, i.ytimg.com. When it has to pick a random Invidious instance, it fetches the public instance list from api.invidious.io. It also checks GitHub for new releases unless update checks are turned off, and sends the requests listed under [Network exposure](#network-exposure) for the features you enable. Links and video IDs after the `#` in the address are not sent to GitHub Pages.

### Why this data is processed

The connection data described above is processed to deliver and secure the website. Where the GDPR applies, this processing is based on the operator's legitimate interest in providing a reliable and secure website under Article 6(1)(f), and on Article 6(1)(c) when processing is required by law.

### Service providers, transfers, and retention

GitHub, Inc. and its affiliates provide the website hosting and determine how long their operational records are retained. GitHub may use infrastructure in countries outside your own. See the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) for details about its processing, safeguards, retention, and privacy contacts. Cloudflare, Inc. runs the badge service and processes badge requests as described in the [Cloudflare Privacy Policy](https://www.cloudflare.com/policies/privacy/). Product Hunt processes requests for its badge under its own privacy policy.

OpenTubeX does not sell website visitor data, use it for advertising, or make automated decisions with legal or similarly significant effects.

## Desktop and mobile apps

The following applies to desktop, Android, and iOS/iPadOS where the described feature is available. The mobile apps store the library in private application storage and use the platform's storage picker for downloaded media; desktop profile paths and executable settings do not apply there.

### Privacy and threat model

OpenTubeX reduces the browser-based tracking surface by providing a local interface instead of loading the standard YouTube website and its page JavaScript. It does not provide anonymity: the services that answer a request can observe it, and network intermediaries can observe connection metadata.

This section describes the data exposed by OpenTubeX itself. It assumes that your device is trusted, HTTPS is not compromised, and your sync passphrase remains secret. It does not protect against malware on your device, traffic-correlation attacks, or information you deliberately share through submissions, exports, external players, or custom download arguments.

### Data stored by OpenTubeX

By default, subscriptions, playlists, settings including saved channel settings, history, watch statistics, profiles, and open tabs remain on your device. Enabling synchronization sends copies of the selected categories to the configured sync server.

The default public OpenTubeX sync server uses end-to-end encryption: the app encrypts the selected data on your device before upload. The server still receives account and traffic metadata.

When you enable synchronization, the default selection includes subscriptions, playlists, history, watch statistics, live reminders, notifications, profiles, open tabs and session, and settings. Watch statistics, live reminders, notifications, open tabs, and settings sync only with servers that support end-to-end encryption. You can turn individual categories off in **Settings → Sync**. See [sync setup](/docs/sync/) for setup and category selection.

The public OpenTubeX sync service has a [separate privacy policy](https://github.com/OpenTubeX/sync-server/blob/main/PRIVACY.md). Other sync-server operators are responsible for their own notices and practices.

With end-to-end encryption, sync also uploads encrypted account activity, including changed setting keys, scalar values, and bounded details about subscriptions, playlists, profiles, saved playlists, channel preferences, caption appearance, and custom themes. Watch history and frequent playback changes are excluded. Full object values are omitted from activity. Item names and scalar setting strings longer than 128 bytes are also omitted. Opening a video on another device sends an encrypted request containing its video ID, title, and playback position. The OpenTubeX sync server retains up to 100 activity batches per account for 30 days and up to 100 pending device requests per account for 24 hours; acknowledged requests are deleted, and expired records are normally removed within one hour.

### Network exposure

Rows for optional services apply only when the feature is enabled. An IP address in the table means your direct address unless the request is routed through a correctly configured proxy, VPN, or Tor.

| Mode or feature | Who receives requests | What they can observe |
| --- | --- | --- |
| Local extractor | YouTube/Google | IP address, requested API, media and image resources, video or channel identifiers, searches, and timing |
| Invidious | Configured Invidious operator; YouTube receives the instance's upstream requests and may receive direct media requests when video proxying is disabled | The operator can see your IP address, requested content, searches, and timing. YouTube normally sees the instance's IP for proxied requests, but sees your IP for direct media requests. Translating a comment sends its text directly to YouTube |
| YouTube account sign-in | YouTube/Google | Requests made with your account identify it. Depending on the options you enable, they include subscription and playlist sync, ratings, comments, recommendations, and watch-history reports. Reply notifications are on by default after sign-in |
| Update checks (enabled by default) | GitHub | IP address, request timing, and standard request metadata. Turn them off under **Settings → General → Check for Updates** |
| `yt-dlp` and FFmpeg downloads (desktop and Android) | GitHub; on Linux and macOS, FFmpeg comes from ffmpeg.martin-riedl.de | IP address, timing, and the requested operating system and architecture. Missing tools are downloaded when needed. **Settings → Advanced → External Software → Managed Tool Updates** chooses whether managed copies update automatically (the desktop default), ask first (the Android default), or update only through the manual buttons |
| Other platforms: Twitch, SoundCloud, PeerTube, Rumble, Odysee, media.ccc.de | The platform and its media hosts; SepiaSearch for PeerTube searches | IP address, searches, requested channels and media, and timing. While live notifications are on (the default), the app checks followed Twitch channels every few minutes |
| VPN or Tor | VPN or Tor infrastructure and the destination service | The intermediary can observe connection metadata depending on the setup. The destination sees the VPN or Tor exit address, requested resources, and timing instead of your direct IP address |
| Internet connectivity checks (enabled by default) | GrapheneOS-hosted connectivity check server | IP address, request timing, and standard request metadata such as the User-Agent. The `HEAD` request to `connectivitycheck.grapheneos.network/generate_204` sends no cookies, referrer, or request body |
| SponsorBlock | Configured SponsorBlock operator | IP address, timing, lookup hash prefixes, and requested categories; contribution-stat lookups reveal a stable hash of a SponsorBlock user identifier; submissions and votes additionally reveal video identifiers, segment data, and a SponsorBlock user identifier; submissions also include the video duration and OpenTubeX version. Removing SponsorBlock segments from a download makes `yt-dlp` look them up on its default server, sponsor.ajay.app, with a video-ID hash prefix |
| DeArrow | Configured SponsorBlock/DeArrow and thumbnail-service operators | IP address, timing, video-ID hash prefixes for branding lookups, and full video identifiers and timestamps for generated-thumbnail requests |
| Return YouTube Dislike | Configured Return YouTube Dislike operator | IP address, video identifiers, and timing |
| Voice-over translation | Unofficial Yandex voice-over translation service | IP address, YouTube video identifier and URL, video duration, requested output language, and timing |
| Sync | Configured sync operator | IP address, OpenTubeX application version from the desktop and mobile apps, account identifier, authentication data, encrypted payloads, collection names, payload sizes, revisions, event IDs, recipient device IDs, creation and expiry times, and request timing. Device pairing also sends the new device's name unencrypted. The operator cannot read the decrypted selected data, activity details, or video requests |
| Sync with a LibreTube sync server | Configured sync operator | IP address, OpenTubeX application version from the desktop and mobile apps, account identifier, authentication data, selected synced data, and timing |
| `yt-dlp` playback and downloads | YouTube or the media site you open, its media hosts, and the configured proxy, if any | IP address, requested page and media resources, media identifiers, formats, and timing. Media hosts also receive the request headers and cookies needed for extracted streams. Configured authentication cookies may identify your account to the relevant site. OpenTubeX's proxy setting is passed to `yt-dlp`. |

Opening an external media link can contact the selected site and its media services directly; selecting Invidious for YouTube metadata does not proxy these other sites. See [external media playback](/docs/playback/#play-a-link-from-another-site).

Some features contact a service only when you enable or use them: RSS feeds and RSSHub instances you add, and the RSSHub instance list on raw.githubusercontent.com; the AI slop channel lists on raw.githubusercontent.com; theme discovery on GitHub; the proxy test at ipwho.is, which reports the address and location your proxy exposes; favicons of the search engines you enable for the context menu; and casting receivers, which receive the media address and metadata. A Chromecast device also loads Google's default media receiver.

Connectivity checks may run at startup, when returning to the app, after connection changes, or during network recovery. Failed checks are retried while the system reports an internet connection. You can turn them off under **Settings → Privacy → Internet connectivity checks**.

Voice-over translation is disabled by default. When it is enabled, no translation-service request is made until you request a translation. The separate background-preparation option is also disabled by default; enabling it requests a translation whenever a supported non-live video loads. These requests omit browser credentials and cookies.

HTTPS encrypts request paths and payloads in transit, but DNS providers and network operators may still learn destination hostnames and traffic patterns. A VPN or Tor changes which parties see your direct IP address; it does not prevent the destination service from seeing the request itself.

### Choosing a setup

- To keep app data local, leave synchronization disabled.
- End-to-end encryption prevents the sync operator from reading your synced data. Use a separate, strong privacy passphrase and keep it private.
- To avoid sending requests to optional services, disable internet connectivity checks, update checks, Twitch live notifications, SponsorBlock, DeArrow, Return YouTube Dislike, voice-over translation, and synchronization, and don't use the on-demand features listed under [Network exposure](#network-exposure).
- To hide your direct IP address from YouTube or optional services, route the relevant requests through a trusted VPN or Tor and verify the proxy configuration.

## Your rights and policy changes

Depending on applicable law, you may request access, correction, deletion, restriction, objection, or portability for personal data controlled by the operator. You may also complain to your local data protection authority. Contact [Show email address](protected-email:5e.52.5a.5d.62.5g.31.5h.60.5a.64.52.54.67.37.5g.5h.56.5f.62.63.53.56.66.28.5g.60.58) to make a request. A service provider or independently operated service must handle requests relating to data that it controls.

This policy may change when the website, app, or their data practices change. The date at the top identifies the latest version.
