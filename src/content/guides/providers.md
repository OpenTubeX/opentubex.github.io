---
title: Choose a content provider
description: Understand metadata providers, stream extraction, fallback, and video proxying.
order: 7
---

A content provider retrieves video and channel information. It is separate from your local subscription library and from the player that plays the media.

## Local API and Invidious

**Local API** retrieves information directly from YouTube using the extractor included with OpenTubeX. YouTube receives those requests. If a YouTube change breaks extraction, an app update may be needed.

**Invidious API** retrieves information through the Invidious server you select. That server contacts YouTube on your behalf and can observe your requests. Its availability depends on the operator and whether YouTube is blocking it.

Neither option requires you to transfer your local subscriptions to a YouTube account. Choosing Invidious alone does not guarantee that every connection avoids YouTube: video proxying, fallback, and other enabled features also matter.

## Change the provider

1. Open **Settings → Advanced**.
2. Find **Preferred API Backend** under the provider settings.
3. Choose **Local API** or **Invidious API**.
4. If choosing Invidious, review **Current Invidious Instance** and select the server you intend to use.
5. Retry the same search or video to check the change.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/providers-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/providers-light.webp" type="image/webp" />
  <img src="/docs-images/providers-light.webp" alt="Advanced settings showing Preferred API Backend, fallback, stream extraction, and video proxy controls." width="1232" height="820" loading="lazy" decoding="async" />
</picture>

*Preferred API Backend and fallback are in the Video and metadata providers section of Advanced settings.*

Use settings search if the controls are not immediately visible. Choose an instance you trust rather than pasting an unknown server address solely because it appears in an error workaround.

## Choose a stream extraction method

In **Settings → Advanced → Video and metadata providers**, find **Stream extraction method**. This chooses how the app obtains playable streams; **Preferred API Backend** controls the provider used for video and channel information. A page loading successfully does not necessarily mean its media streams can be extracted.

| Method | When to use it |
| --- | --- |
| Built-in | Use the app's included stream extraction. This path does not support seeking in livestreams and premieres. |
| yt-dlp | Use yt-dlp for stream extraction. It must be available, and videos may take longer to start. |

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/stream-extraction-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/stream-extraction-light.webp" type="image/webp" />
  <img src="/docs-images/stream-extraction-light.webp" alt="Stream extraction method menu offering yt-dlp and Built-in beside the separate Preferred API Backend control." width="656" height="182" loading="lazy" decoding="async" />
</picture>

*Stream extraction method selects how to obtain playable streams; Preferred API Backend is a separate choice.*

On desktop, configure or update yt-dlp under **Settings → Advanced → External Software**. Android manages its own tool integration and does not use desktop executable paths.

If search and channel pages work but playback fails, note the current extraction method, try the other one, and retry the same public video. Record which method worked when reporting the problem. The method does not download a permanent offline copy; use [Downloads](/docs/downloads/) for that.

## Understand fallback

Fallback allows the app to try another backend when the preferred backend fails. This can improve availability, but it can also send requests to a service you were trying to avoid.

Search settings for **fallback**, review the setting, and disable it if you need to control which provider receives requests. Record your original settings before troubleshooting so you can restore them afterward.

## Proxy video through Invidious

Search settings for **Proxy Videos Through Invidious** to review video proxying. When supported by the selected playback path, this sends video requests through the instance rather than directly to YouTube. Proxying can affect speed and availability.

Do not assume this switch controls external players or every playback engine. OpenTubeX's [privacy policy](/privacy/#network-exposure) describes exposure for local extraction, Invidious, and yt-dlp separately.

## When a provider stops working

Try another public video, check for an app update, and check whether the selected instance is reachable. If you change providers as a test, note whether search, channel pages, or playback improved; that distinction helps a [bug report](/docs/troubleshooting/#report-a-bug).
