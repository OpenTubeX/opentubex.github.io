---
title: Downloads and offline viewing
description: Save video or audio, manage the queue, and find your downloaded files.
order: 5
icon: lucide:hard-drive-download
---

The [download comparison](/compare/#offline-downloads) covers FreeTube and OpenTubeX. Downloads need yt-dlp, so they are not available in [OpenTubeX Lite](/docs/installing/#opentubex-lite) or the web demo.

## Set up downloads

1. Open **Settings → Downloads** and turn on **Enable Downloads** if needed.
2. Choose a **Download Folder** you can write to and that has enough free space. On desktop, leaving it blank saves to your system's Downloads folder. The Flatpak and the mobile apps need a folder before they can download.
3. On desktop, allow time for any required managed tools to download. OpenTubeX uses yt-dlp and FFmpeg for download tasks; tool options depend on your platform.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/download-settings-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/download-settings-light.webp" type="image/webp" />
  <img src="/docs-images/download-settings-light.webp" alt="Downloads settings showing Enable Downloads, Download Folder, concurrent downloads, and bandwidth limit." width="1232" height="820" loading="lazy" decoding="async" />
</picture>

*Select the folder icon in Download Folder to choose where files are saved.*

The mobile apps use their own storage pickers and download implementations. Grant access to your chosen folder when prompted; desktop executable paths and the choice of system-installed tools do not apply there.

## Download a video or audio

1. Select **Download** below the video, or **Download Video** in a video's menu.
2. In the download dialog, choose the offered format and quality, or an audio-only option when you want sound without video.
3. Confirm the download.
4. Open **Downloads** from the top bar or profile menu to see progress and queued items.

Downloads need a working connection until they finish. Higher-quality video usually uses more storage. Subtitles can be downloaded when offered for the selected video.

### Reuse settings with templates

To reuse a set of download options, select **Save Template** next to **Template** in the download dialog and give it a name. Pick it from **Template** next time. To create or edit templates outside the dialog, open **Settings → Downloads → Manage Download Templates**.

### Download new uploads automatically

On desktop and Android, **Settings → Downloads → Manage Automatic Downloads** picks a download template and filters for each subscribed channel. Matching videos download in the background when subscription feeds refresh. Enabling a channel starts with its next upload. OpenTubeX does not download older videos. You can limit automatic downloads to unmetered networks or to while the device is charging.

## Download from another site

1. Open **Downloads** and select **Add download**. If downloads are unavailable, check **Settings → Downloads → Enable Downloads**.
2. Paste the full media page URL into **Video or playlist URL** and select **Next**.
3. Choose the video or audio download options, confirm, and follow progress in **Downloads**.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/external-download-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/external-download-light.webp" type="image/webp" />
  <img src="/docs-images/external-download-light.webp" alt="Add download dialog with a Vimeo media URL entered and a Next button." width="452" height="238" loading="lazy" decoding="async" />
</picture>

*Paste the media page URL in Downloads → Add download, then select Next.*

You can also [open the link in the player](/docs/playback/#play-a-link-from-another-site) first and select **Download** below it.

Available formats depend on the site and yt-dlp. A supported playback link does not guarantee every download format will work. On iOS, compatible external-site downloads offer **Play download** inside OpenTubeX. On desktop and Android, open the saved file with a compatible media player. On desktop, use **Show in Folder** to find it.

## Play a completed download

1. Open **Downloads** and find a completed item.
2. Choose **Play download** to watch the saved media.
3. On desktop, use **Show in Folder** to locate the file in your file manager.

Keep the file in its saved location if you want OpenTubeX to find it again. Clearing an entry from the list and removing its file are different actions. **Remove File** moves the file to the trash on desktop and deletes it permanently on Android and iOS.

## Manage the queue

**Downloads** lists queued, running, and finished items. Use **Pause all** and **Resume all** for the whole queue, **Retry all failed downloads** after fixing a problem, and **Move earlier** or **Move later** on a queued item to change its order.

## Download a playlist

Open a playlist's menu and choose **Download Playlist** when available. Review the download options before starting: a large playlist can use significant space. The **Downloads** panel shows the queued work.

## Manage a failed download

1. Open **Downloads** and read the item's error.
2. Check your connection, free space, and access to the download folder.
3. If the error mentions yt-dlp or FFmpeg, check for tool updates under **Settings → Advanced → External Software** on desktop, or update yt-dlp there on Android.
4. Use **Retry download** after fixing the cause.

If the video itself will not play, start with [playback troubleshooting](/docs/troubleshooting/#a-video-will-not-play). Include the download error and platform when [reporting a bug](/docs/troubleshooting/#report-a-bug).
