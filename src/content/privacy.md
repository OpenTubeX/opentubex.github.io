Last updated: November 16, 2026

This policy explains how the OpenTubeX website, desktop app, and mobile app handle data. It does not cover independently operated services or websites that OpenTubeX links to.

## Summary

- The website has no accounts, advertising, analytics, or visitor tracking.
- The apps keep your subscriptions, playlists, history, and settings on your device. They leave it only if you turn on sync or sign in to YouTube. Sync is end-to-end encrypted.
- To load videos, the app contacts YouTube, an Invidious instance, or another platform. Those services see your IP address and what you request. OpenTubeX does not make you anonymous.
- A few requests happen by default: update checks, internet connectivity checks, Twitch live notifications, and downloads of `yt-dlp` and FFmpeg. You can [turn them off](#reduce-what-the-app-sends).

## Operator and contact

The OpenTubeX website and app are operated by [D3SOX](https://github.com/D3SOX). For privacy questions or requests, email [Show email address](protected-email:5e.52.5a.5d.62.5g.31.5h.60.5a.64.52.54.67.37.5g.5h.56.5f.62.63.53.56.66.28.5g.60.58).

## Website

### Hosting

The website is static and hosted on GitHub Pages. It has no accounts, contact forms, advertising, analytics, fingerprinting, or other visitor tracking run by OpenTubeX, and OpenTubeX keeps no visitor log.

When your browser requests a page, GitHub may process your IP address, browser and device information, the requested URL, the referring page, and the time of the request. GitHub decides how long it keeps these records and may process them outside your country. See the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) for details.

### Third-party content

The website serves its own fonts, scripts, styles, images, and videos. Two kinds of badges are the exception:

- The package version badges on the downloads page load from the OpenTubeX badge service on Cloudflare Workers. Cloudflare processes these requests under the [Cloudflare Privacy Policy](https://www.cloudflare.com/policies/privacy/).
- One changelog entry shows a Product Hunt badge with its current upvote count. Product Hunt processes these requests under its own privacy policy.

When your browser loads a badge, Cloudflare or Product Hunt receives the same request information as GitHub.

Following a link to GitHub, Weblate, Fluxer, Matrix, or another external service sends a request to that service, and its own privacy policy applies.

### Local storage and cookies

The website saves your theme choice (light, dark, or automatic) and the tabs you select in tabbed sections in your browser's local storage. These values stay on your device and do not identify you. The website does not set cookies.

### Web app

The [web demo](/demo/) and `opentubex.org/app/` run OpenTubeX in your browser. The web app stores your subscriptions, playlists, history, and settings in your browser's storage for opentubex.org. It sends them elsewhere only if you turn on sync. Clearing this site's data in your browser deletes them from this device.

The web app contacts these services:

- The Invidious instance or Yattee server you configure, for videos, searches, and images. With a Yattee server, some thumbnails load directly from YouTube's image server, i.ytimg.com.
- YouTube directly from your browser, if you use the [OpenTubeX Local API extension](/docs/self-hosting/).
- api.invidious.io, for the list of public instances when the app has to pick a random Invidious instance.
- GitHub, to check for new releases, unless you turn update checks off.
- The services under [Services the app contacts](#services-the-app-contacts) for the features you enable.

Links and video IDs after the `#` in the address are not sent to GitHub Pages.

### Legal basis

GitHub processes connection data to deliver and secure the website. Where the GDPR applies, the legal basis is the operator's legitimate interest in a reliable and secure website under Article 6(1)(f), and Article 6(1)(c) when the law requires the processing.

OpenTubeX does not sell visitor data, use it for advertising, or make automated decisions about visitors with legal or similarly significant effects.

## Desktop and mobile apps

This section applies to desktop, Android, and iOS/iPadOS where a feature is available. The mobile apps keep your library in private app storage and save downloaded media to a location you choose with the system file picker.

### What OpenTubeX protects against

OpenTubeX shows its own interface instead of loading the YouTube website, so YouTube's page scripts do not run. This reduces browser-based tracking, but it does not make you anonymous. Every service that answers a request can see it, and the networks in between can see connection metadata.

This policy assumes that your device is not compromised, HTTPS works as intended, and your sync passphrase stays secret. OpenTubeX does not protect against malware on your device or traffic-correlation attacks. It also cannot protect information you choose to share through submissions, exports, external players, or custom download arguments.

### Data stored on your device

Your subscriptions, playlists, settings (including per-channel settings), history, watch statistics, profiles, and open tabs stay on your device by default.

### Sync

Sync is off by default. When you turn it on, the app sends copies of your subscriptions, playlists, history, watch statistics, live reminders, notifications, profiles, open tabs and session, and settings to the sync server. You can turn individual categories off in **Settings → Sync**. See [sync setup](/docs/sync/) for details.

Sync is end-to-end encrypted. The app encrypts your data on your device before uploading it, so the server cannot read it. The server still sees account and traffic metadata, listed under [Optional features](#optional-features). The public OpenTubeX sync server has its [own privacy policy](https://github.com/OpenTubeX/sync-server/blob/main/PRIVACY.md). Other sync server operators are responsible for their own policies.

Sync also uploads two kinds of encrypted records:

- **An activity log.** It lists changed setting keys and simple setting values, and short details about changes to subscriptions, playlists, profiles, saved playlists, channel preferences, caption appearance, and custom themes. It leaves out watch history, frequent playback changes, full object values, and item names or text settings longer than 128 bytes.
- **Requests to other devices.** Opening a video on another device sends its video ID, title, and playback position.

The OpenTubeX sync server keeps up to 100 batches of activity per account for 30 days and up to 100 pending device requests per account for 24 hours. It deletes a device request once the receiving device confirms it, and usually removes expired records within an hour.

## Services the app contacts

Each service below can see the listed data. "IP address" means your real address unless you route the request through a working proxy, VPN, or Tor.

### Video sources

You choose where videos come from. Each source sees what you watch and search for.

- **Local extractor.** YouTube/Google sees your IP address, the API requests, media and image requests, video and channel IDs, searches, and timing.
- **Invidious.** The Invidious operator sees your IP address, what you request and search for, and timing. YouTube usually sees only the instance's IP address. If the instance has video proxying turned off, YouTube sees your IP address for video streams. Translating a comment, description, or post sends its text directly to YouTube.
- **`yt-dlp` playback and downloads.** YouTube or the site you open, its media servers, and your proxy, if you set one, see your IP address, the pages and media you request, media IDs, formats, and timing. Media servers also receive the headers and cookies needed for the stream. If you configure login cookies, they may identify your account to that site. `yt-dlp` uses the proxy you set in OpenTubeX.
- **Other platforms.** Twitch, SoundCloud, PeerTube, Rumble, Odysee, media.ccc.de, and their media servers see your IP address, searches, the channels and media you request, and timing. PeerTube searches go to SepiaSearch.
- **External media links.** Opening a link from another site contacts that site and its media servers directly, even if you use Invidious for YouTube. See [external media playback](/docs/playback/#play-a-link-from-another-site).

### On by default

These requests happen unless you turn them off:

- **Update checks.** GitHub sees your IP address, timing, and standard request headers. Turn them off under **Settings → General → Check for Updates**.
- **Internet connectivity checks.** A server hosted by GrapheneOS sees your IP address, timing, and standard request headers such as the User-Agent. The app sends a `HEAD` request to `connectivitycheck.grapheneos.network/generate_204` with no cookies, referrer, or body. It checks at startup, when you return to the app, after connection changes, and while recovering from network errors, and retries failed checks while the system reports a connection. Turn them off under **Settings → Privacy → Internet connectivity checks**.
- **Twitch live notifications.** The app checks the Twitch channels you follow every few minutes.
- **`yt-dlp` and FFmpeg downloads** on desktop and Android. The app downloads missing tools from GitHub when needed. On Linux and macOS, FFmpeg comes from ffmpeg.martin-riedl.de. These servers see your IP address, timing, and your operating system and processor type. **Settings → Advanced → External Software → Managed Tool Updates** controls updates. Desktop updates automatically by default, Android asks first, and you can also choose manual updates only.

### Optional features

These features contact a service only after you turn them on:

- **YouTube account sign-in.** Requests made with your account identify you to YouTube/Google. Depending on your options, they include subscription and playlist sync, ratings, comments, recommendations, and watch history reports. Reply notifications are on by default after you sign in.
- **SponsorBlock.** The SponsorBlock server sees your IP address, timing, the categories you request, and a short prefix of a hash of the video ID. Looking up your contribution stats reveals a stable hash of your SponsorBlock user ID. Submitting segments or voting reveals the video ID, the segment data, and your SponsorBlock user ID. Submissions also include the video length and OpenTubeX version. Removing SponsorBlock segments from a download makes `yt-dlp` look them up on its default server, sponsor.ajay.app, with a hash prefix of the video ID.
- **DeArrow.** The DeArrow and thumbnail servers see your IP address and timing. Title and thumbnail lookups send a hash prefix of the video ID. Generated thumbnails send the full video ID and a timestamp.
- **Return YouTube Dislike.** The server sees your IP address, video IDs, and timing.
- **Voice-over translation.** This uses an unofficial Yandex service, which sees your IP address, the YouTube video ID and URL, the video length, the language you want, and timing. The app sends nothing until you ask for a translation. A separate option, also off by default, requests a translation in the background whenever a supported video that is not live loads. These requests send no browser cookies or credentials.
- **Sync.** The sync server sees your IP address, app version (in the desktop and mobile apps), account ID, login data, the encrypted data, collection names, data sizes, revision and event IDs, the IDs of receiving devices, creation and expiry times, and timing. Pairing a new device sends its name unencrypted. The server cannot read your synced data, the activity log, or requests to other devices. A LibreTube sync server is the one exception. It receives your data unencrypted.

### Features you use on demand

These services are contacted only when you use the feature:

- RSS feeds and RSSHub instances you add, and the list of RSSHub instances on raw.githubusercontent.com.
- The AI slop channel lists on raw.githubusercontent.com.
- Theme discovery on GitHub.
- The proxy test at ipwho.is, which shows the address and location your proxy reveals.
- The icons of search engines you enable for the context menu.
- Cast devices, which receive the media address and details. A Chromecast also loads Google's default media receiver.

### Proxies, VPNs, and Tor

A VPN or Tor hides your IP address from the services you contact. They see the VPN or Tor exit address, what you request, and timing. The VPN provider or Tor network can see connection metadata, depending on your setup.

HTTPS encrypts what you request and what you receive. Your DNS provider and network operator can still see which servers you connect to and when.

### Reduce what the app sends

- To keep your library on your device, leave sync off.
- If you use sync, choose a strong privacy passphrase that you use nowhere else.
- To avoid optional services, turn off internet connectivity checks, update checks, Twitch live notifications, SponsorBlock, DeArrow, Return YouTube Dislike, voice-over translation, and sync. Avoid the [features you use on demand](#features-you-use-on-demand).
- To hide your IP address from YouTube or other services, route the app through a VPN or Tor you trust, and check that the app uses it.

## Your rights and policy changes

Depending on the law that applies to you, you can ask the operator to access, correct, delete, restrict, or transfer your personal data, or object to its processing. You can also complain to your local data protection authority. To make a request, email [Show email address](protected-email:5e.52.5a.5d.62.5g.31.5h.60.5a.64.52.54.67.37.5g.5h.56.5f.62.63.53.56.66.28.5g.60.58). For data held by GitHub, Cloudflare, Product Hunt, or an independently operated service, contact that provider.

This policy changes when the website, apps, or data practices change. The date at the top shows the latest version.
