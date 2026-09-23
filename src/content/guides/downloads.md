---
title: Downloads and offline viewing
description: Save video or audio, manage the queue, and find your downloaded files.
order: 5
---

## Set up downloads

1. Open **Settings → Downloads** and turn on **Enable Downloads** if needed.
2. Choose a **Download Folder** you can write to and that has enough free space.
3. On desktop, allow time for any required managed tools to download. OpenTubeX uses yt-dlp and FFmpeg for download tasks; tool options depend on your platform.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/download-settings-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/download-settings-light.webp" type="image/webp" />
  <img src="/docs-images/download-settings-light.webp" alt="Downloads settings showing Enable Downloads, Download Folder, concurrent downloads, and bandwidth limit." width="1232" height="820" loading="lazy" decoding="async" />
</picture>

*Select the folder icon in Download Folder to choose where files are saved.*

Android uses its own storage picker and download implementation. Grant access to your chosen folder when prompted; desktop executable paths and the choice of system-installed tools do not apply there.

## Download a video or audio

1. Open a video or its menu and select **Download Video**.
2. In the download dialog, choose the offered format and quality, or an audio-only option when you want sound without video.
3. Confirm the download.
4. Open **Downloads** from the top bar or profile menu to see progress and queued items.

Downloads need a working connection until they finish. Higher-quality video usually uses more storage. Subtitles can be downloaded when offered for the selected video.

## Play a completed download

1. Open **Downloads** and find a completed item.
2. Choose **Play download** to watch the saved media.
3. On desktop, use **Show in Folder** to locate the file in your file manager.

Keep the file in its saved location if you want OpenTubeX to find it again. Clearing an entry from the list and permanently deleting its file are different actions; read the confirmation before removing media.

## Download a playlist

Open a playlist's menu and choose **Download Playlist** when available. Review the download options before starting: a large playlist can use significant space. The **Downloads** panel shows the queued work.

## Manage a failed download

1. Open **Downloads** and read the item's error.
2. Check your connection, free space, and access to the download folder.
3. On desktop, check managed tool updates under **Settings → Advanced → External Software** if the error mentions yt-dlp or FFmpeg.
4. Use **Retry download** after fixing the cause.

If the video itself will not play, start with [playback troubleshooting](/docs/troubleshooting/#a-video-will-not-play). Include the download error and platform when [reporting a bug](/docs/troubleshooting/#report-a-bug).
