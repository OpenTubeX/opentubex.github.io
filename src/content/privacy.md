Last updated: August 11, 2026

This policy explains how the OpenTubeX website and desktop app handle data. It does not cover independently operated services or websites that OpenTubeX links to.

## Operator and contact

The OpenTubeX website and app are operated by [D3SOX](https://github.com/D3SOX). For privacy questions or requests, email [privacy@opentubex.org](mailto:privacy@opentubex.org).

## Website

### Data processed when you visit

The website is static. It has no accounts, contact forms, advertising, analytics, fingerprinting, or other visitor tracking operated by OpenTubeX.

The site is hosted by GitHub Pages. When your browser requests a page or asset, GitHub may process standard connection and request information such as your IP address, browser and device information, requested URL, referring page, and the date and time of the request. OpenTubeX does not maintain a separate visitor log.

The site loads its fonts from [Bunny Fonts](https://fonts.bunny.net). Your browser therefore connects to Bunny.net, which necessarily exposes your IP address and the requested font files while delivering them. Bunny Fonts states that it does not collect or log this data. Other images, scripts, and styles are served with the website itself.

Following a link to GitHub, Weblate, Fluxer, Matrix, or another external service sends a request to that service. Its own privacy policy applies once you visit it.

### Local storage and cookies

The website stores only your light, dark, or automatic theme preference in your browser's local storage. This value stays on your device and does not identify you. The website itself does not set cookies.

### Why this data is processed

The connection data described above is processed to deliver and secure the website and its fonts. Where the GDPR applies, this processing is based on the operator's legitimate interest in providing a reliable and secure website under Article 6(1)(f), and on Article 6(1)(c) when processing is required by law.

### Service providers, transfers, and retention

GitHub, Inc. and its affiliates provide the website hosting and determine how long their operational records are retained. BunnyWay d.o.o. delivers the fonts and states that Bunny Fonts does not collect or pass on visitor data or logs. These services may use infrastructure in countries outside your own. See the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement), [Bunny Fonts privacy information](https://fonts.bunny.net/about), and [Bunny.net Privacy Policy](https://bunny.net/privacy/) for details about their processing, safeguards, retention, and privacy contacts.

OpenTubeX does not sell website visitor data, use it for advertising, or make automated decisions with legal or similarly significant effects.

## Desktop app

### Privacy and threat model

OpenTubeX reduces the browser-based tracking surface by providing a local interface instead of loading the standard YouTube website and its page JavaScript. It does not provide anonymity: the services that answer a request can observe it, and network intermediaries can observe connection metadata.

This section describes the data exposed by OpenTubeX itself. It assumes that your device is trusted, HTTPS is not compromised, and any enhanced-privacy sync passphrase remains secret. It does not protect against malware on your device, traffic-correlation attacks, or information you deliberately share through submissions, exports, external players, or custom download arguments.

### Data stored by OpenTubeX

By default, subscriptions, playlists, settings, history, profiles, open tabs, and channel playback speeds remain on your device. Enabling synchronization sends copies of the selected categories to the configured sync server:

- Enhanced-privacy sync encrypts the selected data on your device before upload. The server still receives account and traffic metadata.
- A legacy sync server does not support this encryption. Synced data is visible to that server's operator.

The public OpenTubeX sync service has a [separate privacy policy](https://github.com/OpenTubeX/sync-server/blob/main/PRIVACY.md). Other sync-server operators are responsible for their own notices and practices.

### Network exposure

Rows for optional services apply only when the feature is enabled. An IP address in the table means your direct address unless the request is routed through a correctly configured proxy, VPN, or Tor.

| Mode or feature | Who receives requests | What they can observe |
| --- | --- | --- |
| Local extractor | YouTube/Google | IP address, requested API, media and image resources, video or channel identifiers, searches, and timing |
| Invidious | Configured Invidious operator; YouTube receives the instance's upstream requests and may receive direct media requests when video proxying is disabled | The operator can see your IP address, requested content, searches, and timing. YouTube normally sees the instance's IP for proxied requests, but sees your IP for direct media requests |
| VPN or Tor | VPN or Tor infrastructure and the destination service | The intermediary can observe connection metadata depending on the setup. The destination sees the VPN or Tor exit address, requested resources, and timing instead of your direct IP address |
| SponsorBlock | Configured SponsorBlock operator | IP address, timing, lookup hash prefixes, and requested categories; submissions and votes additionally reveal video identifiers, segment data, and a SponsorBlock user identifier |
| DeArrow | Configured SponsorBlock/DeArrow and thumbnail-service operators | IP address, timing, video-ID hash prefixes for branding lookups, and full video identifiers and timestamps for generated-thumbnail requests |
| Return YouTube Dislike | Configured Return YouTube Dislike operator | IP address, video identifiers, and timing |
| Enhanced-privacy sync | Configured sync operator | IP address, account identifier, authentication data, encrypted payloads, collection names, payload sizes, revisions, and timing; not the decrypted selected data |
| Legacy sync | Configured sync operator | IP address, account identifier, authentication data, selected synced data, and timing |
| `yt-dlp` playback and downloads | YouTube and the configured proxy, if any | IP address, requested page and media resources, video identifier, formats, and timing. OpenTubeX's proxy setting is passed to `yt-dlp` |

HTTPS encrypts request paths and payloads in transit, but DNS providers and network operators may still learn destination hostnames and traffic patterns. A VPN or Tor changes which parties see your direct IP address; it does not prevent the destination service from seeing the request itself.

### Choosing a setup

- To keep app data local, leave synchronization disabled.
- To prevent a sync operator from reading synced data, use a server that supports enhanced-privacy sync and use a separate, strong privacy passphrase.
- To avoid sending requests to optional services, leave SponsorBlock, DeArrow, Return YouTube Dislike, and synchronization disabled.
- To hide your direct IP address from YouTube or optional services, route the relevant requests through a trusted VPN or Tor and verify the proxy configuration.

## Your rights and policy changes

Depending on applicable law, you may request access, correction, deletion, restriction, objection, or portability for personal data controlled by the operator. You may also complain to your local data protection authority. Contact [privacy@opentubex.org](mailto:privacy@opentubex.org) to make a request. A service provider or independently operated service must handle requests relating to data that it controls.

This policy may change when the website, app, or their data practices change. The date at the top identifies the latest version.
