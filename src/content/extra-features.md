---
title: Extra Features
description: Extra features available in OpenTubeX.
---

## Playback

### Per-channel playback settings

Manage and automatically apply playback speed, video quality, subtitles, and
volume for individual channels. Playback speeds can be saved automatically when
you change them through the player options, or you can leave automatic saving
off and use the dedicated button below the player to save the current speed for
that channel manually. One switch in Channel Settings turns all channel
playback settings off without deleting them. Import speeds saved by the
Youtube Speed By Channel userscript from Data & Storage settings.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/bbec3cfc-f1ce-47b1-866a-54c515697d17">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/7a917c90-4185-4d27-a4a0-1a76faca6de7">
  <img width="700" height="230" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" alt="Channel Settings with the switch that turns channel playback settings on or off" src="https://github.com/user-attachments/assets/bbec3cfc-f1ce-47b1-866a-54c515697d17">
</picture>

![Per-channel speed indicator](https://github.com/user-attachments/assets/560a55c0-f653-4c21-ae30-5cdeff6ac428)
![Per-channel settings](https://github.com/user-attachments/assets/a802d400-0f41-4375-a252-9f5a157afb84)

### Music player and visualizer

YouTube Music audio tracks and audio-only formats use a dedicated artwork
player with an optional animated audio visualizer.

<img width="356" height="200" style="max-width: min(100%, 356px); max-height: 200px;" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T212640Z-opentubex-music-player-real-song-82408ea747.webp" alt="YouTube Music artwork player with an animated audio spectrum">

### Music Mode

Enable the Music Mode control in Playback settings, then turn it on from the
player menu. New videos in that tab start from the beginning at 1×, regardless
of saved progress or your usual speed. A headphone badge marks the active mode.
The mode resets when you restart the app.

Video cards mark music videos with a music note. Music videos opened from
lists, the queue or autoplay start at normal speed.

### Play media from other sites

Paste a compatible video or audio link from another site to play it in a Watch
tab through yt-dlp. Available creator and media details appear alongside
the player. This supports individual links, not browsing or playlists from
other sites. Reopened links can resume from their saved playback position,
and available chapters use the same sidebar or mobile sheet as YouTube videos.
Watching media from other sites counts toward your watch statistics.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/12642eee-54a1-46ae-9d0f-ecfbc9826905">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/ba162225-f92d-40dd-a1fd-42b3c5b92d4d">
  <img alt="Creator and media details for a video opened from another site" src="https://github.com/user-attachments/assets/12642eee-54a1-46ae-9d0f-ecfbc9826905">
</picture>

### Preload upcoming videos and playlists

Preload upcoming yt-dlp videos from the watch queue, playlist or
recommendations, or prepare an entire playlist before watching. Choose how
many videos to prepare and how many extractions to run concurrently.
Preloading prepares stream URLs to reduce playback delays; use Downloads to
save videos for offline playback.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261021T120235Z-playlist-preload-menu-dark-dark-d54f7c6182.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261021T120235Z-playlist-preload-menu-light-light-b102e694bb.png">
  <img width="700" height="623" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" alt="Preloading all videos in a playlist's More menu with the progress notification" src="https://github.com/OpenTubeX/media/releases/download/attachments/20261021T120235Z-playlist-preload-menu-dark-dark-d54f7c6182.png">
</picture>

### Optional seek-interval behavior

Choose whether seek intervals (arrow keys and J/L) are multiplied by playback
rate.

![Seek interval setting](https://github.com/user-attachments/assets/9195f70e-a881-4052-b199-bbdad043e39a)

### Playback-rate adjusted timestamps

Optionally show timestamps adjusted for the current playback rate.

![Playback-rate adjusted timestamps setting](https://github.com/user-attachments/assets/d4d3cb45-b227-4521-a88b-2ff14051d0a6)
![Playback-rate adjusted timestamps example](https://github.com/user-attachments/assets/982ef08a-7f53-4efb-9ebc-c49328e306b9)

### Chapter tooltips and chapter sidebar

Display improved chapter tooltips directly on the seekbar and show the current
chapter list in the sidebar.

![Chapter tooltips on seekbar](https://github.com/user-attachments/assets/c6bed647-e872-458d-a4d6-2be58f4c17a0)
![Current chapter label](https://github.com/user-attachments/assets/cc653a3c-84b1-4541-8225-067d2c16a68e)
![Chapter sidebar](https://github.com/user-attachments/assets/e4986fdc-97f8-406f-8e0d-33cf8bbd31a2)

### Most-replayed moments

Hover over the seekbar to see YouTube's popularity graph when available.
Peak previews identify the most-replayed moments alongside chapter and
SponsorBlock labels. Hide the graph from Distraction Free settings if you
prefer a simpler timeline.

<img width="700" height="61" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" src="https://github.com/user-attachments/assets/ef990bfe-bc17-4be6-9a66-22bda270fdd9" alt="Most-replayed graph appearing above the seekbar on hover">

### Transcript panel

Follow a video's transcript in a dedicated panel.

![Transcript panel](https://github.com/user-attachments/assets/f69a2074-746d-4afe-bee5-9828040f048e)

### Caption appearance and preferred language

Customize caption appearance and choose a preferred caption language. If
captions appear too early or late, open **Adjust timing** in the Captions menu
to shift them by a chosen number of seconds. Changes apply immediately to the
current video; opening another video resets the offset.

![Caption preferences](https://github.com/user-attachments/assets/0098caa1-ccd6-40d5-bcb8-5daed8e0e15a)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/b0c31f98-4ddd-4d3f-beab-76eec5e9765c">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/182741c5-00d3-4da4-8744-5ebc5cbde1dd">
  <img width="389" height="269" style="max-width: min(100%, 389px); height: auto;" loading="lazy" decoding="async" alt="Per-video caption timing controls with Earlier, Later, and Reset" src="https://github.com/user-attachments/assets/b0c31f98-4ddd-4d3f-beab-76eec5e9765c">
</picture>

### Secondary captions and local subtitle files

Show a second caption track alongside the main captions, for example to read
a translation and the original language together. The auto-translation you
pick in the player is kept for later videos. You can also load a local SRT or
WebVTT file for the current video from the captions menu.

<img width="533" height="300" style="max-width: min(100%, 533px); height: auto;" loading="lazy" decoding="async" src="https://github.com/user-attachments/assets/d77711ee-4d49-49e4-b27d-1ba8a63c94e7" alt="Korean captions at the top of the player and English captions at the bottom">

<img width="401" height="144" style="max-width: min(100%, 401px); height: auto;" loading="lazy" decoding="async" src="https://github.com/user-attachments/assets/b16b0a5a-342a-4f38-9027-514b03ee7e6f" alt="Captions menu with a loaded local subtitle file and the Load subtitle file action">

### Prevent YouTube translations

Keep original titles and descriptions instead of YouTube's translations.
The **Entire App** untranslated-text option also restores original channel
names in search results.

![Prevent title and description translations](https://github.com/user-attachments/assets/4713b8eb-9933-45cb-81ca-8db950ebec71)

### Auto Picture-in-Picture

Automatically enter Picture-in-Picture when you switch tabs, minimize the app,
or switch windows.

![Auto Picture-in-Picture window options](https://github.com/user-attachments/assets/4c1f1f7b-7614-41c8-abd3-5c5179d75cee)

### Cast to Chromecast, FCast and DLNA devices

Chromecast, FCast and DLNA casting are supported on Android and desktop. Turn
on each protocol in Player settings, then choose a device from the cast button
in the player. Each protocol has its own tab, and FCast receivers don't get
subtitles. Stop casting to return to playback in OpenTubeX.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/08394191-94f4-480a-b426-60e728e62495">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/f85f5d41-412e-4682-9fa8-f77c6ac09c18">
  <img alt="The cast menu with Google Cast, FCast and DLNA tabs, listing an FCast receiver" src="https://github.com/user-attachments/assets/08394191-94f4-480a-b426-60e728e62495">
</picture>

### Scroll mini-player

Keep watching in a mini-player when you scroll away from a video, leave the
Watch page, or switch to another tab. The video shrinks into the mini-player
with an animation. Use its controls to return to the source tab or hide the player
without interrupting playback.

On mobile, the bottom player includes playback progress, play/pause, 10-second
seeking, and previous/next controls when available. Drag the progress line to
seek, tap or swipe up to reopen the video, or swipe down to close the player.
An optional compact layout lets you expand the controls when needed.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/1c4a69fe-1d90-4bf0-8b90-6086835632fb">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/c0c5db79-de43-47fc-a9d0-8418b0034474">
  <img width="398" height="128" style="max-width: min(100%, 398px); max-height: 128px;" loading="lazy" decoding="async" alt="Compact mobile player expanding and collapsing its controls" src="https://github.com/user-attachments/assets/1c4a69fe-1d90-4bf0-8b90-6086835632fb">
</picture>

![Scroll mini-player](https://github.com/user-attachments/assets/74411434-6ec6-4394-801f-2676074a742e)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T093432Z-937-cross-tab-mini-player-dark-dark-a5c2094e77.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T093432Z-937-cross-tab-mini-player-light-light-c891741308.webp">
  <img alt="Mini-player kept across tabs" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T093432Z-937-cross-tab-mini-player-dark-dark-a5c2094e77.webp">
</picture>

### YouTube end-screen annotations

Show YouTube end-screen annotations inside the player.

![YouTube end-screen annotations](https://github.com/user-attachments/assets/53bee38f-6221-4463-b474-d9e5f6781d2a)

### Recommendations when videos end

When autoplay is off, finished videos show a darkened poster with up to six
recommended videos if recommendations are enabled and **Hide End-Screen
Recommendations** is off in Distraction Free settings.

### Loop & Copy link in player context menu

Quickly toggle looping or copy the video link from the player's context menu.

![Loop and Copy link in player context menu](https://github.com/user-attachments/assets/24f7716f-27de-421d-8740-f9a5e30ed1e6)

### Quick Playback Speed Bar

Add an optional, fully customizable quick playback speed bar to the regular and
YouTube-style Shorts players.

![Quick Playback Speed Bar](https://github.com/user-attachments/assets/cd055a73-d188-4633-aac6-61ab708a4cd6)
![Quick Playback Speed Bar in Shorts](https://github.com/user-attachments/assets/84ec5eb9-2d69-4fcf-a6fd-d71b42308487)

### Skip silence

Jump over detected silent parts of a video. Enable this behavior in Player
settings, and choose whether new tabs start with it enabled.

![Skip silence setting](https://github.com/user-attachments/assets/7886468c-0f08-4ebb-9cfd-2ce07a4230f5)

### A-B repeat

Repeat a selected part of a video with draggable markers, player-menu controls,
and configurable keyboard shortcuts.

![A-B repeat player controls](https://github.com/OpenTubeX/media/releases/download/attachments/20260828T151651Z-ab-repeat-player-menu-b4502f02f5.png)
![Video looping between A-B repeat markers](https://github.com/OpenTubeX/media/releases/download/attachments/20260828T151655Z-ab-repeat-loop-5d27c2deb9.webp)

### Temporary 2× playback

Hold the left mouse button or <kbd>Space</kbd> to temporarily double the
playback speed.

![Temporary 2× playback setting](https://github.com/user-attachments/assets/1cebcba6-4337-4f3b-b98d-b44eba883544)
![Temporary 2× playback indicator](https://github.com/user-attachments/assets/d978403f-f61f-4768-9bb5-5669d898a72e)

### Remember volume

Remember the player volume between sessions. Enabled by default.

![Remember volume setting](https://github.com/user-attachments/assets/7b90cf31-5d90-41bb-b342-c15e2e7c33b6)

### Volume boost

Make quiet videos louder with up to 200% volume. Turn on **Show Volume Boost
Toggle** in Playback settings, then pick 125%, 150%, 175% or 200% from the
player menu. The boost applies to the current tab and resets in new tabs. It
is not available on iOS.

### Seek history

Turn on **Enable Seek History** in Playback settings to get back to where you
were after a mistaken seek. The player menu lists the positions you jumped away
from, and <kbd>Ctrl</kbd> + <kbd>Z</kbd> and <kbd>Ctrl</kbd> + <kbd>Shift</kbd> +
<kbd>Z</kbd> step back and forward through them.

<img width="700" height="164" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" src="https://github.com/user-attachments/assets/b5d343dc-fd60-4ebf-8a93-24a7b644b3ba" alt="Seek history menu listing earlier playback positions with their chapter names">

### Sleep timer

Stop playback after a chosen duration, when the current chapter ends, or when
the current video ends.

![Sleep timer control](https://github.com/user-attachments/assets/54fcc8cf-4bc4-49f7-b803-0340c9c218c6)
![Sleep timer options](https://github.com/user-attachments/assets/15440d77-f504-4982-a026-957ed13a07a9)

### Playlist playback controls

Reorder or remove playlist items during playback and remember the reverse state
of each playlist.

### Paused fullscreen controls

Choose which player interface elements remain visible while playback is paused
in full-window or fullscreen mode.

![Paused fullscreen control settings](https://github.com/user-attachments/assets/aa9e00c1-eecf-45cd-a00f-dc54dd5bcc26)

### Rewind live streams and premieres

Use **yt-dlp** as the [stream extraction method](/docs/providers/#choose-a-stream-extraction-method)
to rewind live streams and premieres when YouTube provides a rewindable stream.
Streams with DVR disabled cannot be rewound. The built-in method plays live
streams and premieres at the live edge without seeking.

### YouTube-style Shorts

Choose between a YouTube-style Shorts layout and player or the regular video
grid and player. Shorts follow your finger during vertical swipes, keep
recent videos buffered at their playback positions, and preload upcoming
streams for faster navigation.

![Shorts browsing layout](https://github.com/user-attachments/assets/22b51708-12b1-4d85-b09b-da6c7065e086)
![YouTube-style Shorts player](https://github.com/user-attachments/assets/44333d49-4ba7-4035-86da-0a28d4b7064a)

### Live streams, premieres, and chat replay

Automatically refresh upcoming premieres, view comments during premieres, and
use chat replay. Live chat also supports optional timestamps, top or all
messages, and a full-screen dock.

![Live chat and premiere controls](https://github.com/user-attachments/assets/7605cabd-8b2d-428d-a04f-207f9f24cf55)

### Voice-over translation

Translate supported videos through the unofficial Yandex API with synchronized
voice-over audio and separate translated and original volume controls.

<video controls preload="metadata" src="https://github.com/user-attachments/assets/0df65773-8f13-4c5e-90d6-2db9106dea98"></video>

### Interactive 360° videos

Watch supported 360° videos in an interactive panorama. Drag inside the player
to look around; clicking still plays or pauses the video.

### Mobile player gestures

Swipe horizontally in fullscreen to seek, with a target-time display and frame
previews when available. Enable or disable the gesture in Playback settings.
The swipe-to-seek preview can be turned off while keeping the seek-bar
feedback. Brightness, volume and playback speed swipes show only their
indicator, without revealing the player controls. Rotating your phone can
enter fullscreen automatically; Android also offers an option to ignore the
system rotation lock for this behavior.

<img width="632" height="300" style="max-width: min(100%, 632px); max-height: 300px;" loading="lazy" decoding="async" src="https://github.com/OpenTubeX/media/releases/download/attachments/20261026T140028Z-fullscreen-seek-seekbar-preview-f9a1bab720.webp" alt="Fullscreen horizontal swipe showing the target time and storyboard frames above the seek bar">

### Video zoom and pan

Zoom into videos from the player menu. Press <kbd>Z</kbd> to zoom in,
<kbd>Shift</kbd> + <kbd>Z</kbd> to zoom out, or hold <kbd>Shift</kbd> and drag to
pan the visible area.

![Video zoom and pan](https://github.com/user-attachments/assets/d54f6c4d-d7b1-4117-a783-f109c07d94b7)

### Video codec preferences

Choose a preferred video codec in Advanced settings. When a video is available
in several codecs, switch between AV1, VP9 and H.264 in the header of the
resolution menu. **Auto** prefers codecs your device can decode in hardware.

<img width="401" height="143" style="max-width: min(100%, 401px); height: auto;" loading="lazy" decoding="async" src="https://github.com/user-attachments/assets/b90b6a45-676a-45fd-b0ce-c2a98415d690" alt="Resolution menu with an AV1, VP9 and H.264 switcher in its header">

### Quality limit on metered networks

On Android, set **Quality Limit on Metered Networks** in Playback settings so
videos start at a lower quality on mobile data and other metered networks. You
can still choose a higher quality in the player.

### Automatic caption translation

Translate captions into any language offered by YouTube.

![Caption translation](https://github.com/user-attachments/assets/a706d1fa-a6b9-41a2-8ceb-9b42db1ca678)

## Subscriptions and library

### Return YouTube Dislike support

Show dislike count using [Return YouTube Dislike](https://returnyoutubedislike.com/).

![Return YouTube Dislike in video view](https://github.com/user-attachments/assets/8ed84d30-9e6f-4e2e-a09e-c3dbd74f8c32)
![Return YouTube Dislike counts](https://github.com/user-attachments/assets/45987612-64a1-48b6-8254-bd8966b3178a)

### Per-channel subscription feed controls

Choose whether each channel appears in Videos, Shorts, Live and Posts, set a
daily video limit, and enable members-only videos when playback cookies are
configured. Batch-edit channel preferences in Subscription settings, add
subscribed channels directly to Saved Channel Settings, or hide a channel's
content type from the feed menu.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260907T111835Z-channel-feed-dark-dark-f534fb0d44.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260907T111835Z-channel-feed-light-light-063edf63b2.png">
  <img width="624" height="250" style="max-width: min(100%, 624px); max-height: 250px;" alt="Per-channel subscription controls for feed types, members-only uploads, and the daily video limit" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260907T111835Z-channel-feed-dark-dark-f534fb0d44.png">
</picture>

### Subscription groups

Sort subscribed channels into groups, such as Music or Gaming, and select a
group in the Subscriptions header to filter every feed tab. Manage groups from
the Channels page or a channel's subscription settings. Channels can be sorted
by name or arranged in a custom order with drag and drop or the arrow keys,
and the side navigation follows the same order. Groups and the channel order
sync with your settings.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/ca3bab83-8e71-4503-8a85-fc30e3a3f12d">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/20fe6890-3030-4fc9-880c-d7644ca2574f">
  <img width="700" height="205" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" alt="Subscription group chips filtering the Videos feed" src="https://github.com/user-attachments/assets/ca3bab83-8e71-4503-8a85-fc30e3a3f12d">
</picture>

### Channel and phrase block lists

Hide channels directly from channel-link context menus, or filter content with
saved channel and phrase block lists in Distraction Free settings. Temporarily
pause both lists from settings or an optional Quick Settings control without
deleting your entries.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/48413b19-766e-405d-a2bd-42e0c01717cd">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/d197d0aa-6f63-4ef1-b26f-9150062247da">
  <img width="656" height="296" style="max-width: min(100%, 656px); max-height: 296px;" loading="lazy" decoding="async" alt="Enable block lists switch above saved channel and phrase lists" src="https://github.com/user-attachments/assets/48413b19-766e-405d-a2bd-42e0c01717cd">
</picture>

### Hide AI slop channels

Turn on **Hide AI slop channels** in Add-ons settings to use the
community-maintained [AiSList](https://github.com/Override92/AiSList).
OpenTubeX hides listed channels from search results, trending, Home
recommendations and watch-page recommendations. Videos from channels that
likely post AI-generated content stay visible with a **Possibly AI-generated**
tag. Subscriptions and channel pages stay unfiltered, and the setting only
affects results loaded through the Local API.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261025T070559Z-aislist-results-dark-dark-ee595cd33a.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261025T070559Z-aislist-results-light-light-0b5d5d075f.png">
  <img width="700" height="267" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" alt="Search results with a Possibly AI-generated tag on a flagged channel's video" src="https://github.com/OpenTubeX/media/releases/download/attachments/20261025T070559Z-aislist-results-dark-dark-ee595cd33a.png">
</picture>

### Auto-refresh subscriptions

Automatically refresh subscriptions on a schedule so your feed stays current
without a manual refresh.

![Auto-refresh subscriptions option](https://github.com/user-attachments/assets/31dfc690-b8a3-4ffd-994e-a53e59d0e71f)

### Watch history filters

Find watched videos by date range or channel alongside text search. Filters
apply across your history, including entries on other pages. Collapse the
filter controls without losing your selections, or return to History with
your search, filters, and page restored.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/3ef463be-15e1-4910-93f9-04ddcc92c376">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/86ff8f6b-4f3f-4d3b-82bd-f1550ca14185">
  <img width="632" height="300" style="max-width: min(100%, 632px); height: auto;" loading="lazy" decoding="async" alt="Watch history with date range, channel, and text search filters" src="https://github.com/user-attachments/assets/3ef463be-15e1-4910-93f9-04ddcc92c376">
</picture>

### Watch time statistics

Explore your viewing activity with daily and weekly watch-time charts. When
statistics sync is enabled, choose a device or **All devices** above the charts.
The combined view adds each device's recorded watch time. To reset or adjust
imported watch time, select the current device. If reconnecting created a
duplicate device, **Replace old device** previews the combined history and lets
you choose how to handle overlapping daily totals.

See [sync setup](/docs/sync/#choose-what-to-sync) to choose what to synchronize.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/e0d2162c-99e9-4ddb-8073-9f6a283dcd9b">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/11d21c44-1838-4af2-b41a-e5894f1c387f">
  <img width="800" height="450" style="max-width: min(100%, 800px); height: auto;" alt="Watch time statistics with a device switcher" src="https://github.com/user-attachments/assets/e0d2162c-99e9-4ddb-8073-9f6a283dcd9b">
</picture>

### Additional video metadata

See more context about a video, including AI-generated content labels,
paid-promotion disclosures, collaborators, categories, games, tags, relative
publication dates, comment counts, age restrictions, and unlisted status.
Channel avatars can also be shown beside channel names in video and playlist
results.

![Additional video metadata](https://github.com/user-attachments/assets/90cfb4b3-1d26-438d-86de-c1be2e8858ce)
![Video collaborators and category](https://github.com/user-attachments/assets/ceaa25b3-2157-4904-80ad-619426862c1d)
![Game metadata](https://github.com/user-attachments/assets/0c147b10-c2de-4560-898d-ae80223418c0)
![Paid-promotion disclosure](https://github.com/user-attachments/assets/7741014a-caa1-4bde-9fc2-6e2cdd5755c8)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-938-channel-avatars-dark-dark-56df4bda9e.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-938-channel-avatars-light-light-3fa490d1b6.png">
  <img alt="Channel avatars in search results" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-938-channel-avatars-dark-dark-56df4bda9e.png">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-949-watch-page-badges-dark-dark-bfe40a3411.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-949-watch-page-badges-light-light-784c2ffc3b.png">
  <img alt="Age-restricted and unlisted video badges" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-949-watch-page-badges-dark-dark-bfe40a3411.png">
</picture>

### YouTube AI video summaries

Choose whether summaries supplied by YouTube are hidden, collapsed, or
expanded below video descriptions. New installations start with summaries
collapsed, and the same preference applies to Shorts.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/cbf325b9-6c94-4837-9938-5f16633dbd49">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/59c40f1d-c647-443e-affd-e61c22aea4e5">
  <img alt="YouTube AI video summary beneath a video description" src="https://github.com/user-attachments/assets/cbf325b9-6c94-4837-9938-5f16633dbd49">
</picture>

### Playlist browsing and saved YouTube playlists

Choose an independent Grid or List view for playlist pages and switch it from
Quick settings. Save YouTube playlists as read-only bookmarks in Your
Playlists. Copy complete YouTube playlists into editable local playlists, then
append missing videos from the source while preserving local order and
additions.

![Playlist view setting](https://github.com/user-attachments/assets/9fab29b3-0111-4e1c-9227-ff11b7aa6442)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260830T075432Z-saved-playlist-dark-dark-815812ca6c.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260830T075432Z-saved-playlist-light-light-fdb2f428ab.png">
  <img alt="Saved YouTube playlist in Your Playlists" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260830T075432Z-saved-playlist-dark-dark-815812ca6c.png">
</picture>

### Playlist customization

Choose an image for a local playlist's thumbnail, replace it later, or restore
the default. Custom thumbnails appear in playlist cards, headers, Home, and
playlist selection menus. They stay in backups and can sync between devices
with a supporting sync server or Enhanced Privacy enabled.

In **Edit Playlist Info**, choose whether new videos go to the top or bottom
of that playlist's custom order. Existing videos stay in place, and bottom
insertion remains the default. You can also set a playlist to shuffle by
default, so it plays in random order from a random first video.

Arrange Your Playlists in a custom order with drag and drop, and reorder
playlists and their videos with the arrow keys. Each playlist remembers its
own sort order, and encrypted sync carries it to your other devices.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/e3803624-a338-4287-871e-dc15e87709e6">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/6240a3f3-e512-4dc6-a434-bfb04ece168f">
  <img width="339" height="291" style="max-width: min(100%, 339px); height: auto;" loading="lazy" decoding="async" alt="Custom playlist thumbnail preview with Choose image and Restore default thumbnail controls" src="https://github.com/user-attachments/assets/e3803624-a338-4287-871e-dc15e87709e6">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/1286d727-d195-4e5c-bd21-9de604e640b2">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/2d962fb0-3654-474f-8c9d-fc8f0fb6d812">
  <img width="442" height="240" style="max-width: min(100%, 442px); height: auto;" loading="lazy" decoding="async" alt="Edit Playlist Info with the top insertion and Shuffle videos by default switches" src="https://github.com/user-attachments/assets/1286d727-d195-4e5c-bd21-9de604e640b2">
</picture>

### Unavailable playlist videos

Optionally skip known unavailable videos while playing a playlist. You can
also scan an editable local playlist for confirmed unavailable entries and
choose whether to remove them. Videos that could not be checked are kept.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/73508c60-e037-452c-bf29-93e7af0bffe6">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/57e45347-b684-40a2-a83c-4a2998b7e3d3">
  <img alt="Confirmation before removing unavailable videos from a local playlist" src="https://github.com/user-attachments/assets/73508c60-e037-452c-bf29-93e7af0bffe6">
</picture>

### Repair playlist metadata

Restore missing video titles, channel details, publication dates, and durations
after a YouTube Takeout import. Select individual playlists or repair them all
from the Playlists page. Repair preserves playlist order, existing details,
and watch progress, with progress reporting, cancellation, and optional
configured yt-dlp cookies.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/b8eb6ba1-f713-497a-a47c-8a977b6f4a1f">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/61facc94-f4ab-48c4-a307-1e6d7f7d4019">
  <img width="290" height="300" style="max-width: min(100%, 290px); height: auto;" loading="lazy" decoding="async" alt="Repair Playlists dialog with individual selection, Select all, and optional configured cookies" src="https://github.com/user-attachments/assets/b8eb6ba1-f713-497a-a47c-8a977b6f4a1f">
</picture>

### Comment tools

Render nested reply threads, show when comments were edited, reload comments,
or copy a comment's direct YouTube link. Translate comments and replies into
the app language, search loaded comments, filter comments from the creator,
and pin comments locally. On mobile, preview the first five loaded comments
with author avatars below the video, then tap to open the full discussion.
GIF attachments in comments and replies animate while hovered.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261004T082407Z-opentubex-comment-preview-dark-dark-90cad7b700.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261004T082407Z-opentubex-comment-preview-light-light-7cca1fe570.webp">
  <img width="426" height="142" style="max-width: min(100%, 426px); max-height: 142px;" loading="lazy" decoding="async" alt="Rotating mobile comment previews with commenter avatars and position dots" src="https://github.com/OpenTubeX/media/releases/download/attachments/20261004T082407Z-opentubex-comment-preview-dark-dark-90cad7b700.webp">
</picture>

![Nested comment replies](https://github.com/user-attachments/assets/a3737645-e3c3-40e1-bc1b-a55e13ca44b1)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/a79d9cd8-12db-4978-9910-332df29f5393">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/6d6e5737-2b82-4fe3-85a2-7770f2f7b7e8">
  <img width="430" height="300" style="max-width: min(100%, 430px); height: auto;" loading="lazy" decoding="async" alt="Comment GIFs animate only while hovered" src="https://github.com/user-attachments/assets/a79d9cd8-12db-4978-9910-332df29f5393">
</picture>

![Edited comment indicator](https://github.com/user-attachments/assets/a34dc28c-2103-454b-9e24-4e7f6df5b494)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-936-comment-translation-dark-dark-3c214f1e9e.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-936-comment-translation-light-light-4114bb3ad8.png">
  <img alt="Comment translations" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-936-comment-translation-dark-dark-3c214f1e9e.png">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-939-comment-search-pins-dark-dark-6a86772413.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-939-comment-search-pins-light-light-6dc1798855.png">
  <img alt="Comment search and personal pins" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-939-comment-search-pins-dark-dark-6a86772413.png">
</picture>

### New subscription content

Show indicators for newly fetched content and optionally collect it in a
separate new-content feed. Sort that feed with the oldest content first or
switch its categories between combined sections and tabs.

![New-content indicator settings](https://github.com/user-attachments/assets/ba61cf09-a515-4410-8597-095d5644d34b)
![Separate new-content feed setting](https://github.com/user-attachments/assets/84d221e2-c56e-44e9-ad70-af0a23323549)
![New-content feed](https://github.com/user-attachments/assets/384bb44c-baf1-4b08-95cf-33af9b579ea4)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T200027Z-new-feed-tabbed-dark-dark-8c5a594149.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T200027Z-new-feed-tabbed-light-light-e57a70f649.png">
  <img alt="Tabbed New subscriptions feed" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T200027Z-new-feed-tabbed-dark-dark-8c5a594149.png">
</picture>

### Autoplay preview

See the next video and its countdown directly on the player before autoplay
starts it.

![Autoplay preview and countdown](https://github.com/user-attachments/assets/4765609c-aa89-4620-8918-1525cba44bd6)

### Premiere indicators

Distinguish premieres from live streams in video lists and metadata.

![Premiere indicator](https://github.com/user-attachments/assets/2724bb10-dea8-4162-8a7e-30521ce3b87b)
![Premiere metadata](https://github.com/user-attachments/assets/5b8ce731-99b6-4940-8416-77e114fe976e)

### Live chat channel links

Open a chatter's channel by clicking their handle in live chat.

### Watch queue

Queue videos from their three-dot menus, then manage and drag to reorder them
in a side panel on the watch page. Queued videos show their length, views and
upload date, and a menu moves or removes them. Save the queue to a new or
existing playlist, or add a whole playlist to the end of the queue from its
page. Downloaded videos and audio can also join the queue for offline playback
on desktop and Android. Pending videos return in their saved order after
restarting OpenTubeX, including downloaded entries.

![Add a video to the queue](https://github.com/user-attachments/assets/186215f1-f8de-4bfa-bcd8-188172448f69)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/7a5da83d-f281-47b1-9e9d-da81961fcdbc">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/74f67075-8309-44d1-bdf3-4d6b15b7353f">
  <img width="305" height="300" style="max-width: min(100%, 305px); height: auto;" loading="lazy" decoding="async" alt="Watch queue with durations, music badges, views, upload dates and item menus" src="https://github.com/user-attachments/assets/7a5da83d-f281-47b1-9e9d-da81961fcdbc">
</picture>

### Inline add-to-playlist

Choose playlists from an inline popover, and personalize the quick-bookmark
playlist with an icon, emoji, or cropped image.

![Inline add-to-playlist popover](https://github.com/user-attachments/assets/c3c6aead-f462-4386-8e82-399dbef2abd1)
![Add-to-playlist action](https://github.com/user-attachments/assets/bd6dcd6e-346c-4849-9806-dae1a00f6457)
![Custom quick-bookmark icons](https://github.com/user-attachments/assets/7147298f-38a2-4d5b-a99b-a6722e925049)

### Watched-percentage threshold

Choose how much of a video must play before it counts as watched. Set the
threshold to 0% to mark videos as watched immediately.

![Watched-percentage threshold setting](https://github.com/user-attachments/assets/91d298bd-8cda-4c7d-815d-3834cac977aa)

### Subscription feed refresh

Cancel subscription refreshes and see new videos immediately while the rest
loads.

![Cancelable subscription refresh](https://github.com/user-attachments/assets/b200bd06-0cde-49a5-8b13-2706a3c6cc8c)

### Upload, live stream, and premiere notifications

Turn on the bell in a channel's subscribe button to get a system notification
when the channel uploads a video, short, live stream or post. Choose which
types notify you from the subscribe button's settings, or for many channels at
once in Subscription settings. OpenTubeX checks for new uploads when
subscriptions refresh, including background refreshes. Upload notifications
are available on desktop and Android.

You can also get an operating-system notification when a scheduled live stream
or premiere starts.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/33b85808-4f80-4de6-a725-a8943573ed48">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/56b2b10a-0437-485a-a8a2-f1539f6eb6ba">
  <img width="235" height="300" style="max-width: min(100%, 235px); height: auto;" loading="lazy" decoding="async" alt="Subscribe button settings with upload notification types for Videos, Shorts, Live and Posts" src="https://github.com/user-attachments/assets/33b85808-4f80-4de6-a725-a8943573ed48">
</picture>

![Scheduled video notification](https://github.com/user-attachments/assets/d8d0e9fc-517c-4136-a3a7-d4f165e99477)

## Navigation and controls

### Quick search focus

Focus the search bar by pressing `/`, in addition to Ctrl+L or Cmd+L.

### In-page search

Find text on the current page with Ctrl+F or Cmd+F, including previous and next
match navigation.

![In-page search](https://github.com/user-attachments/assets/b4f651f1-321f-4b83-a392-67367b677497)

### Command palette

Press <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> to search app actions,
settings, and individual videos from your history, playlists, downloads, and
watch queue. Video results show their source and open the matching playlist,
download, or queue entry. This library search stays on your device.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/f1736f1a-998c-487e-b943-c95be078b0ad">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/08ff98b4-5439-4ce7-b8ca-cf2a3e7dbc86">
  <img width="682" height="279" style="max-width: min(100%, 682px); height: auto;" loading="lazy" decoding="async" alt="Find local video downloads in the command palette" src="https://github.com/user-attachments/assets/f1736f1a-998c-487e-b943-c95be078b0ad">
</picture>

### Tab support

Place browser-style tabs at the top, bottom, left, or right of the window. Pin,
color, preview, duplicate, unload, group, select, reorder, and move tabs between
windows. A searchable organizer provides bulk actions and recently closed tab
history. Choose an icon for a tab group in the organizer. Internal links support
browser-style middle-click, Ctrl/Cmd-click, and Shift-click behavior.

On desktop, <kbd>Ctrl</kbd> + middle-click unloads a tab without closing it.
Quick <kbd>Ctrl</kbd> + <kbd>Tab</kbd> presses switch tabs immediately; hold
<kbd>Ctrl</kbd> to open the tab switcher. Choose a loading bar or classic dot
for loading tabs in Appearance settings. Background tabs unload automatically
when memory runs low. Adjust or turn this off in Advanced settings. A badge
marks automatically unloaded tabs, and pinned tabs show a pin badge on their
icon.

On phones, swipe across the header to switch tabs or pull it down to open the
organizer. Mobile tabs can be disabled in General settings for a single-page
layout.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261008T155804Z-pr-dark-dark-9cf1a3a141.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261008T155804Z-pr-light-light-d3ca903b97.webp">
  <img width="324" height="300" style="max-width: min(100%, 324px); max-height: 300px;" loading="lazy" decoding="async" alt="Pull down the phone header to open the tab organizer, then tap a tab immediately" src="https://github.com/OpenTubeX/media/releases/download/attachments/20261008T155804Z-pr-dark-dark-9cf1a3a141.webp">
</picture>

The [tab comparison](/compare/#tabs) shows how other clients keep videos open.

![Experimental tab support](https://github.com/user-attachments/assets/2ddbedea-5997-4a3c-af9e-6a36d3a21d04)
![Horizontal and vertical tab layouts](https://github.com/user-attachments/assets/486f0119-ca74-40ec-835a-dd6f53cf1f56)
![Tab position setting](https://github.com/user-attachments/assets/358e09be-feb3-4dd2-809e-d868f93c7da5)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T130522Z-opentubex-tab-organizer-dark-dark-e96041e52b.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T130522Z-opentubex-tab-organizer-light-light-9e74e5c5cc.png">
  <img alt="Searchable tab organizer" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T130522Z-opentubex-tab-organizer-dark-dark-e96041e52b.png">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260923T085243Z-tab-group-picker-wide-dark-dark-f854ca9084.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260923T085243Z-tab-group-picker-wide-light-light-349c616b66.png">
  <img alt="Tab group icon picker" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260923T085243Z-tab-group-picker-wide-dark-dark-f854ca9084.png">
</picture>

### Pinned playlists and channels

Pin playlists and channels to the side navigation to open them from any page.
On phones, pinned items appear in the More menu.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/2ddddf43-c0d1-4158-bcb2-6b6bf0d66e97">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/5e830783-8b14-413d-a8a2-e877f2fea53d">
  <img width="569" height="300" style="max-width: min(100%, 569px); height: auto;" loading="lazy" decoding="async" alt="Pinned playlists in the side navigation and the Unpin from Navigation action" src="https://github.com/user-attachments/assets/2ddddf43-c0d1-4158-bcb2-6b6bf0d66e97">
</picture>

### Playback speed toggle shortcut

Press <kbd>G</kbd> to toggle between 1× playback speed and your last used speed.

### Mobile video swipe actions

Choose separate left and right swipe actions for video cards in General
settings. Shortcuts include queueing, playlists, bookmarks, watch history,
downloads, copying links, and sharing. Both gestures are off by default.
Swipe again to undo queue, Play Next, watched and download actions. Swipe
actions also work in Downloads, and the Bookmark swipe removes a video from
the bookmark playlist.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261004T175343Z-swipe-dark-dark-a88f071057.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261004T175343Z-swipe-light-light-6af519417b.webp">
  <img width="314" height="132" style="max-width: min(100%, 314px); max-height: 132px;" loading="lazy" decoding="async" alt="Swiping a mobile video card reveals queue and play-next actions with a circular ripple" src="https://github.com/OpenTubeX/media/releases/download/attachments/20261004T175343Z-swipe-dark-dark-a88f071057.webp">
</picture>

### Configurable thumbnail action

On desktop, choose an extra action button to show on video thumbnails.

![Thumbnail action setting](https://github.com/user-attachments/assets/2d7d7549-db79-4d9d-9063-77124d3a9750)
![Extra thumbnail action](https://github.com/user-attachments/assets/1f74350c-11cc-4515-8e0e-9abedcebaa71)

### Close confirmation

Optionally ask for confirmation before closing the app.

![Close confirmation](https://github.com/user-attachments/assets/a5e37f65-62ba-4fce-bc43-d408f7f17ce7)

### Customizable keyboard shortcuts

Choose the keyboard shortcuts used throughout the app. Search by action,
section, or key combination to find the shortcut you want to change.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/4140de12-214f-41c8-9ec9-f3ae9c13eac7">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/99a1c1ba-8a1d-470e-884f-cf91b2ceb1dd">
  <img width="700" height="170" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" alt="Keyboard shortcuts with a labeled search field beside Reset to defaults" src="https://github.com/user-attachments/assets/4140de12-214f-41c8-9ec9-f3ae9c13eac7">
</picture>

### Gamepad controls

Navigate menus, adjust sliders, control playback, and go back with a standard
gamepad. The current control receives theme-aware focus feedback.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114548Z-gamepad-navigation-dark-dark-9be08dd476.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114548Z-gamepad-navigation-light-light-f044bdd7dc.png">
  <img alt="Gamepad focus feedback in Settings" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114548Z-gamepad-navigation-dark-dark-9be08dd476.png">
</picture>

### Selection web search

Search selected text using your chosen search engine.

![Search selected text](https://github.com/user-attachments/assets/862fd213-8646-4f2e-a039-a9cf14c21600)

### Search history and channel filters

Revisit searches with their filters restored, and use filter chips when
searching within a channel. Save the same search query with different filters
as separate presets and restore each combination when selected. Use the arrow
beside a recent search or online suggestion to fill the search box for editing
without submitting it.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/60a3a667-6246-460e-b7c3-ecb4a8a604c4">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/844a6bde-85a4-4263-933e-aabd5e3f7517">
  <img width="456" height="143" style="max-width: min(100%, 456px); max-height: 143px;" loading="lazy" decoding="async" alt="Fill a search suggestion without submitting" src="https://github.com/user-attachments/assets/60a3a667-6246-460e-b7c3-ecb4a8a604c4">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260901T182410Z-search-history-dark-dark-a2e6328d63.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260901T182410Z-search-history-light-light-c1e3d5c3bc.png">
  <img width="440" height="119" style="max-width: min(100%, 440px); max-height: 119px;" alt="Search history entries for the same query with distinct saved filters" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260901T182410Z-search-history-dark-dark-a2e6328d63.png">
</picture>

### Settings window and search

Open settings in a draggable, resizable window with integrated subpages and
search across every category. An optional compact category list hides the
category descriptions to fit more settings on screen. Reopening settings
returns to the subpage you were using, including after unlocking protected
settings.

![Settings window](https://github.com/user-attachments/assets/be196edf-e84f-4bae-ab59-89a31e507a6c)

### Desktop tray controls

Use the system tray to show or hide OpenTubeX and control previous, play or
pause, and next. Choose separately whether minimizing or closing the window
sends it to the tray. Tray menu actions use icons from your selected icon pack.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/e5a11835-97ad-4c0c-8a93-c0dac329dbfd">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/5858545a-19d5-4c50-a8d4-d160ac5437cc">
  <img alt="Settings for using the tray icon and sending windows to the tray" src="https://github.com/user-attachments/assets/e5a11835-97ad-4c0c-8a93-c0dac329dbfd">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/742aab75-cc01-470d-839d-de17d08bfc7c">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/d28c46e1-122a-405d-a0d2-ce5fb1ef7e39">
  <img width="320" height="265" style="max-width: min(100%, 320px); height: auto;" loading="lazy" decoding="async" alt="Tray menu icons for window and playback actions" src="https://github.com/user-attachments/assets/742aab75-cc01-470d-839d-de17d08bfc7c">
</picture>

## Appearance

### Ambient Mode

Add an ambient glow around the player based on the current video.

![Ambient Mode](https://github.com/user-attachments/assets/3d14f6a5-0ded-4247-9a89-ba71e005b2c3)

### Customizable Home page

Resume videos and review recent subscriptions, queues, playlists, downloads,
reminders, and weekly watch activity from configurable Home shelves. Enable
personalized recommendations for unwatched videos, ranked locally from viewing
activity, saved videos and feedback. Choose Familiar, Balanced or Explore
discovery and reset learned feedback at any time.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260828T152427Z-opentubex-home-release-note-dark-dark-2c14b3da84.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260828T152427Z-opentubex-home-release-note-light-light-8a62aaf509.png">
  <img alt="Customizable Home page with recent activity shelves" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260828T152427Z-opentubex-home-release-note-dark-dark-2c14b3da84.png">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/01a7bfa4-bc19-4857-aef3-986aa0614795">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/41074e2c-25d3-4b48-9702-7a64d9975d94">
  <img width="601" height="250" style="max-width: min(100%, 601px); max-height: 250px;" alt="Personalized Home recommendations with the discovery options open and a centered load-more button" src="https://github.com/user-attachments/assets/01a7bfa4-bc19-4857-aef3-986aa0614795">
</picture>

### Configurable thumbnail sizes

Choose thumbnail sizes independently for general video browsing and playlist
pages. Enable **Data saver thumbnails** to reduce image data usage.

![Configurable thumbnail sizes](https://github.com/user-attachments/assets/47f102b3-5884-4219-85ce-552e631bf67c)

### Grid columns and Full Width view

Choose how many columns video and playlist grids show, or keep **Auto** to fit
them to the window. The **Full Width** view type shows one video per row, and
the Playlist View Type setting also applies on phones.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/973562f7-e7ca-4ac1-a2a2-35943a972857">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/af5ea1ea-ebeb-4f7f-8d8a-6cc26205b3bd">
  <img width="146" height="300" style="max-width: min(100%, 146px); height: auto;" loading="lazy" decoding="async" alt="Subscriptions feed on a phone with the Full Width view type" src="https://github.com/user-attachments/assets/973562f7-e7ca-4ac1-a2a2-35943a972857">
</picture>

### Animated thumbnail previews

Preview videos by hovering over their thumbnails. The animated previews can be
disabled in Appearance settings.

![Animated thumbnail preview](https://github.com/user-attachments/assets/90d4871b-0add-446e-b4a0-d1461b6d9ca9)

### Full-screen docks

Open video information, comments, playlists, chapters, live chat, the watch
queue, or Up Next recommendations in resizable and rearrangeable full-screen
docks. Choose and reorder fullscreen action buttons in **Customize interface**,
including an optional shortcut to the download dialog. In portrait on phones,
panels open as full-width bottom sheets that you can drag.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/2f2d069e-b86c-4010-8343-b9701c3877bb">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/7c1d17b4-7930-4f2c-a537-1920fcac125f">
  <img width="410" height="300" style="max-width: min(100%, 410px); max-height: 300px;" loading="lazy" decoding="async" alt="Fullscreen action customizer" src="https://github.com/user-attachments/assets/2f2d069e-b86c-4010-8343-b9701c3877bb">
</picture>

![Full-screen dock](https://github.com/user-attachments/assets/1cb48073-f523-455d-9926-c96a95fdc959)

### Animation controls

Follow your system's reduced-motion preference, or enable or disable UI
animations independently. Disabling animations also removes watched-thumbnail
highlight fades and tab-loading motion.

![Animation settings](https://github.com/user-attachments/assets/673693fb-0ec2-430b-acb8-2d0b7ea06473)

### Resizable playlist card

Make the playlist card taller or shorter while watching a video.

![Resizable playlist card](https://github.com/user-attachments/assets/3677e5cc-484c-46a8-bea7-63dea841d719)

### Changed-settings highlights

Highlight settings that differ from their defaults and reset them directly.

![Changed settings and reset action](https://github.com/user-attachments/assets/9ee3f994-e803-4679-80cf-454f294c9b0a)

### Toast notifications

Customize the position of toast notifications with icons, optional timeout
indicators, and video thumbnails. Dismiss them by swiping or pressing
<kbd>Escape</kbd>.

![Toast notification with a video thumbnail](https://github.com/user-attachments/assets/c1b1e055-4f25-46f3-8a8d-eae2345c94b5)
![Toast notification position settings](https://github.com/user-attachments/assets/88db071c-4ae7-4a12-a449-69390edba248)
![Toast timeout indicator](https://github.com/user-attachments/assets/2b762b06-f001-4541-8bba-005828176d16)

### Interface rounding and overlay scrollbars

Adjust how rounded interface elements are and choose whether overlay scrollbars
automatically hide or remain visible. Tab bars use the same scrollbar
preferences, with slim idle thumbs that expand on hover.

![Interface rounding setting](https://github.com/user-attachments/assets/1a5d4b45-307e-480b-8dcc-75a1502f4625)
![Always-show overlay scrollbar setting](https://github.com/user-attachments/assets/2158bbc6-8893-42be-a12b-8b75034bcd56)

### Interface preferences

Choose the app font from fonts installed on your system or the bundled
Google Sans, adjust mouse-wheel and
touchpad scroll speed from 25% to 300%, and select date and time formats
independently of the app language.

![App font setting](https://github.com/user-attachments/assets/14a3d8a7-6915-46d1-92e3-b57ab41be647)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114553Z-date-time-formats-dark-dark-3a9954e455.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114553Z-date-time-formats-light-light-a05cdc33c5.png">
  <img alt="Date and time format settings" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114553Z-date-time-formats-dark-dark-3a9954e455.png">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114556Z-scroll-speed-dark-dark-1d2178fb7a.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114556Z-scroll-speed-light-light-2c833601d7.png">
  <img alt="Scroll speed setting" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260831T114556Z-scroll-speed-dark-dark-1d2178fb7a.png">
</picture>

### Customize interface

Customize navigation, Quick Settings, player controls and fullscreen actions
on one **Customize interface** page in Appearance settings, with a live preview
for each. Add, remove and reorder navigation destinations for the desktop
sidebar and mobile bottom bar, and hide or reorder the buttons on the player's
control bar.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/2f9c77d8-735e-4ae3-b397-05583340a408">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/a64fa7a0-368a-430f-837e-e199ddd6fbe6">
  <img width="592" height="300" style="max-width: min(100%, 592px); height: auto;" loading="lazy" decoding="async" alt="Control bar tab in Customize interface with its live player preview" src="https://github.com/user-attachments/assets/2f9c77d8-735e-4ae3-b397-05583340a408">
</picture>

On mobile, keep the bar visible
while scrolling or choose compact icon-only labels. You can also keep the
phone search bar visible in the header. Navigation and tabs use Material 3
active highlights. The mobile More menu and context menus open as bottom
sheets; drag their handles down or tap outside to dismiss them.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/3e859256-a8d0-4b9d-8459-05c33d4840ca">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/ecae69dd-d6a6-4372-b141-7796af240e19">
  <img width="468" height="300" style="max-width: min(100%, 468px); max-height: 300px;" alt="Navigation customization settings" src="https://github.com/user-attachments/assets/3e859256-a8d0-4b9d-8459-05c33d4840ca">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/b528b76f-1e27-46b8-9d4e-02079341c8c2">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/4806ad4a-c364-473e-9542-dbedc598003d">
  <img width="375" height="60" style="max-width: min(100%, 375px); height: auto;" loading="lazy" decoding="async" alt="Material 3 mobile navigation" src="https://github.com/user-attachments/assets/b528b76f-1e27-46b8-9d4e-02079341c8c2">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/48a5ab57-1f1d-4a19-8d8a-08844c1e3fc3">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/5baa3a19-f38f-4122-a1b4-dea099855eb2">
  <img width="375" height="280" style="max-width: min(100%, 375px); height: auto;" loading="lazy" decoding="async" alt="Material 3 More menu sheet" src="https://github.com/user-attachments/assets/48a5ab57-1f1d-4a19-8d8a-08844c1e3fc3">
</picture>

### Quick settings and profile icons

Access profiles and common preferences from the top bar. Personalize profiles
with built-in icons, emoji, or interactively cropped images. Profile management
has separate customization and subscription tabs. Choose which Quick Settings
controls appear, including autoplay, audio-only playback, DeArrow, translations,
privacy preferences, distraction-free toggles, Reduced Motion, Toast Position,
and light/dark theme selection. Controls stay grouped by
category; drag to reorder categories or controls within each group.

![Quick-settings menu](https://github.com/user-attachments/assets/80cfe992-c400-4ecf-be56-f0685b1e9ecb)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/def760d3-393a-478e-b57b-df1063cf4daf">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/3c81e9ba-cf34-4c87-a334-e6ccd126999e">
  <img width="437" height="300" style="max-width: min(100%, 437px); max-height: 300px;" loading="lazy" decoding="async" alt="Profile icon choices and the default person icon for All Channels" src="https://github.com/user-attachments/assets/def760d3-393a-478e-b57b-df1063cf4daf">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/22e206ba-32d2-4fdc-9454-40c37a7b1525">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/6c76c039-000e-4a59-bf06-3182d604dab5">
  <img width="390" height="300" style="max-width: min(100%, 390px); max-height: 300px;" loading="lazy" decoding="async" alt="Quick settings grouped by category with category and individual reorder controls" src="https://github.com/user-attachments/assets/22e206ba-32d2-4fdc-9454-40c37a7b1525">
</picture>

### Material themes and system colors

Choose Material Light, Dark, or Black with coordinated interface colors.
Pick a preset or custom accent, or use Android wallpaper colors on supported
devices. **Dynamic colors** follows the system accent on desktop or wallpaper
on Android, along with the system's light or dark preference.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/2a8741f6-6ca9-4955-bd1a-81fa436f59a4">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/8652cb82-0b1f-43b1-baa2-7b9dd889d0ac">
  <img width="594" height="300" style="max-width: min(100%, 594px); height: auto;" loading="lazy" decoding="async" alt="Material theme variants and accent palette" src="https://github.com/user-attachments/assets/2a8741f6-6ca9-4955-bd1a-81fa436f59a4">
</picture>

### Custom title bar

On desktop, turn on **Use Custom Title Bar** in Theme settings to replace the
system title bar with the tab bar, or with the top navigation when tabs are
elsewhere. Window controls follow the style of Windows, macOS, Plasma or GNOME.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261025T070602Z-title-bar-dark-dark-f4f597e002.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20261025T070602Z-title-bar-light-light-9ebfeaa6d4.png">
  <img width="700" height="64" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" alt="Tab bar in place of the system title bar with Plasma-style window controls" src="https://github.com/OpenTubeX/media/releases/download/attachments/20261025T070602Z-title-bar-dark-dark-f4f597e002.png">
</picture>

### Custom themes

Create, import, export, edit, and share custom themes. Use transparent colors,
backdrop blur, custom interaction and text-selection colors, and independent
light and dark themes when following the system setting. Import themes
directly from the clipboard, or browse community screenshots and install,
apply or update themes inside the app. Customize the color and opacity of
watched-thumbnail overlays with a live preview in the Theme Editor.

![Custom theme editor](https://github.com/user-attachments/assets/55b85fc1-04de-44d6-9a0c-1a5081b5d39a)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/2b0908ed-2bc8-4814-a285-0a4b104901a9">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/464b9e32-3e6d-4b4a-9fe2-f1c22c39515a">
  <img width="632" height="300" style="max-width: min(100%, 632px); max-height: 300px;" alt="Discover community themes with screenshots and one-click installation" src="https://github.com/user-attachments/assets/2b0908ed-2bc8-4814-a285-0a4b104901a9">
</picture>

### Selectable icon packs

Choose between Material Symbols and Remix Icon throughout the interface.

![Icon pack setting](https://github.com/user-attachments/assets/2c5f32de-0aa8-4679-9888-b76b85795bab)

## SponsorBlock

### SponsorBlock side panel

Open a side panel with segment details, a temporary auto-skip toggle, and an
option to exclude the current channel from automatic skips.

![SponsorBlock side panel](https://github.com/user-attachments/assets/c62bf50f-aeb7-47fb-9639-63547ac6538d)

### SponsorBlock channel exclusions

Exclude individual channels from automatic SponsorBlock skips while keeping
their segments visible on the seekbar. Add channels from a video or manage
the list in SponsorBlock settings.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/eff4b809-fc39-44c6-a669-07cf9d7812b6">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/4f52fbcb-a79e-4ce2-b87d-135a1279c257">
  <img alt="Excluded SponsorBlock channel listed by name and avatar" src="https://github.com/user-attachments/assets/eff4b809-fc39-44c6-a669-07cf9d7812b6">
</picture>

### SponsorBlock tooltips (unskip / reskip / prompt to skip)

Improved SponsorBlock tooltips with unskip, reskip, and prompt-to-skip when you need to replay a segment, skip it again, or decide on a segment before it is skipped.

![SponsorBlock tooltip unskip](https://github.com/user-attachments/assets/299af609-e7f7-4b0d-802e-4062009fc77c)
![SponsorBlock tooltip reskip](https://github.com/user-attachments/assets/260874ac-1577-4f37-aa32-3b9a830e6d13)
![SponsorBlock tooltip prompt to skip](https://github.com/user-attachments/assets/996c0816-b237-47b6-8b7a-88f39f8e104c)

### SponsorBlock enhancements

Display SponsorBlock community-contributed chapters, including Highlight and
Hook/Greetings segments, in the player. Hover over a seekbar segment to see its
category label, and choose a custom color for each segment category.

![SponsorBlock category label](https://github.com/user-attachments/assets/177e216b-2eec-4f54-9aa9-ea98f5d89e18)
![Custom SponsorBlock colors](https://github.com/user-attachments/assets/f98bc167-d35b-498f-84c9-700ff4918f89)

### SponsorBlock submission

Submit SponsorBlock segments directly from the player and review your
submissions, contributed skips, and time saved. Correct an existing segment
from the info panel or a skipped notice: vote for a different category, or copy
and downvote the segment to edit its timings before submitting a replacement.
Press <kbd>;</kbd> to start or end a segment and <kbd>'</kbd> to open the
submission menu. You can change both shortcuts.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/8c8d17b3-6e3f-46b7-8889-1f853cc47c52">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/a70b7e7d-9144-4087-a499-6592125f66bd">
  <img width="332" height="300" style="max-width: min(100%, 332px); max-height: 300px;" loading="lazy" decoding="async" alt="SponsorBlock category correction editor" src="https://github.com/user-attachments/assets/8c8d17b3-6e3f-46b7-8889-1f853cc47c52">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-953-sponsorblock-stats-dark-dark-aa05727bab.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-953-sponsorblock-stats-light-light-e14a6dbf9c.png">
  <img alt="SponsorBlock contribution statistics" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-953-sponsorblock-stats-dark-dark-aa05727bab.png">
</picture>

### SponsorBlock full-video labels and mute segments

Display and submit SponsorBlock full-video labels and mute segments.

![SponsorBlock full-video label](https://github.com/user-attachments/assets/8a7a0a53-0b1f-478c-a615-9174c4508ddc)
![SponsorBlock mute-segment submission](https://github.com/user-attachments/assets/a8232e86-8d3b-42dc-9f81-e6718cfcea3c)

## Privacy and data

### IP block recovery script

Set a script to run when YouTube blocks your IP. OpenTubeX waits for the script to finish, then reloads the video.

![IP block recovery script setting](https://github.com/user-attachments/assets/2946401c-8e01-4048-9638-621289e31956)

### Automatic stream extraction fallback

Automatically switch between built-in extraction and yt-dlp when playback or
extraction fails. Turn this default-enabled behavior off in Advanced settings
if you prefer to choose the method yourself. It is independent of the
Local/Invidious metadata-provider fallback.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/4e6aaaf7-6fb1-4e62-8813-720d143126db">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/7b124e71-1025-4c90-b7b8-39c3be117426">
  <img width="700" height="86" style="max-width: min(100%, 700px); max-height: 86px;" loading="lazy" decoding="async" alt="Default-enabled automatic stream extraction fallback setting" src="https://github.com/user-attachments/assets/4e6aaaf7-6fb1-4e62-8813-720d143126db">
</picture>

### Use your own Yattee server

Connect your own [Yattee server](/docs/yattee-server/) in Advanced settings to
load videos, channels, search results and comments from it. You can also
stream videos through the server.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/45e06456-19aa-4b82-8a68-9b2c68153e65">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/4beeed78-f3ef-4193-a68a-10d4203875af">
  <img width="662" height="300" style="max-width: min(100%, 662px); height: auto;" loading="lazy" decoding="async" alt="Yattee Server settings with the server URL, credentials, connection test and proxy option" src="https://github.com/user-attachments/assets/45e06456-19aa-4b82-8a68-9b2c68153e65">
</picture>

### Authenticated playback

Retry age-restricted and members-only videos through yt-dlp with cookies from
a browser or file. Configured cookies can also request account-only formats
for any video. Use the configured cookies for subtitles, transcripts and
automatic caption translations, with a separate subtitle-only authentication
setting. On desktop and Android, age-restricted or empty Local API searches can
be retried with your configured yt-dlp cookies when family-friendly search is
off. Android uses your saved YouTube session.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/c9e6b26c-1986-4f74-b1b3-575763682b4b">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/ddb917d5-071f-4541-85d1-2d374eb3e217">
  <img width="700" height="136" style="max-width: min(100%, 700px); max-height: 136px;" loading="lazy" decoding="async" alt="Empty search with an age-restriction hint and cookie retry" src="https://github.com/user-attachments/assets/c9e6b26c-1986-4f74-b1b3-575763682b4b">
</picture>

![Cookie source settings](https://github.com/user-attachments/assets/a38336e6-9210-43c3-ab49-f8e889d4d9f1)
![Restricted video playback controls](https://github.com/user-attachments/assets/853fb879-ebeb-4d4e-b968-64beb8486bcf)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/f842285f-5ee9-4246-911f-2c2e17c061ab">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/b59e597c-8d52-4948-b6af-0ba25f4affc7">
  <img width="426" height="150" style="max-width: min(100%, 426px); max-height: 150px;" alt="Subtitle cookie settings" src="https://github.com/user-attachments/assets/f842285f-5ee9-4246-911f-2c2e17c061ab">
</picture>

### History retention and cleanup

Automatically clean up watch history after a configurable retention period, or
manually delete older entries.

![History retention setting](https://github.com/user-attachments/assets/4e91ec53-38e3-43cd-9262-af6a3a1589e7)
![Delete old history entries](https://github.com/user-attachments/assets/a7130fc6-d440-4857-a73e-f8d020c5c543)

### Local metadata history

Optionally keep a local history of video titles, thumbnails, and descriptions,
then review how they changed over time.

![Video metadata history](https://github.com/user-attachments/assets/ee6f65db-ea21-4e83-8bdd-e32c99ee61c4)

### LibreTube import

Import subscriptions and watch history from
[LibreTube](https://github.com/libre-tube/LibreTube).

### YouTube Takeout ZIP import

Import subscriptions, watch history, search history, and playlists directly
from a YouTube Takeout ZIP. Select the categories you want to bring in without
extracting the archive or importing each file separately. Before confirming,
preview new, existing, and skipped records and see which data will merge or be
replaced. Playlist titles and descriptions are preserved without Takeout's
export-file suffixes.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/a5a5c086-5aa1-4b85-b4f7-b21a502713e1">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/642db563-a423-4d80-b1d8-4445ea0626c0">
  <img width="319" height="300" style="max-width: min(100%, 319px); height: auto;" loading="lazy" decoding="async" alt="Preview record counts and merge or replacement effects before importing selected backup or Takeout data" src="https://github.com/user-attachments/assets/a5a5c086-5aa1-4b85-b4f7-b21a502713e1">
</picture>

### Data and storage controls

Review disk usage and clean individual caches or saved data from Data & Storage
settings.

![Data and Storage settings](https://github.com/user-attachments/assets/77e6bc25-bc34-43a3-a8e3-75e28e1e0db4)

### Complete ZIP backup

Export profiles, playlists, watch and search history, watch statistics, and
transferable settings in one ZIP file. Choose which categories to export or
restore. Before importing, preview record counts and each category's merge or
replacement behavior. On desktop, schedule complete backups to a chosen folder
and limit how many are kept.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/e91bec8c-739c-4ae8-94e3-0736b026e277">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/0fd83404-f6ea-4e76-83ed-1e78f76bda64">
  <img width="700" height="217" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" alt="Scheduled backups with a backup folder, frequency and number of backups to keep" src="https://github.com/user-attachments/assets/e91bec8c-739c-4ae8-94e3-0736b026e277">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/331d25bf-d8ba-43a0-bc93-48c4d16e9ee7">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/16152c28-897f-4785-a4e9-83964f4231d9">
  <img width="441" height="300" style="max-width: min(100%, 441px); height: auto;" loading="lazy" decoding="async" alt="Choose which categories to include in a backup ZIP" src="https://github.com/user-attachments/assets/331d25bf-d8ba-43a0-bc93-48c4d16e9ee7">
</picture>

### Encrypted sync

Synchronize subscriptions, playlists, history, saved channel settings,
profiles, tabs, and settings with end-to-end encryption.

LibreTube sync servers are also supported, but do not support end-to-end
encryption or certain sync features.

Sync sends changes as they happen. Account activity shows
which device added, removed, or changed items, and **Open on another device**
sends a video to another device from video cards or tab context menus. On
desktop, send several selected video tabs together. Clear the account activity
list on this device while keeping newer activity and other devices' lists.
Upcoming live-stream and premiere reminders
can also sync across desktop and mobile when notifications are allowed on the
receiving device.

**Watch stats** sync is enabled by default in **Settings → Sync**; turn it off
to keep statistics on this device. Add another device by
scanning a QR code or entering a text code without typing the account password
or privacy passphrase on it. Either device can show the code, so a connected
computer without a camera can still add a phone. Follow [Sync between devices](/docs/sync/) for
setup, pairing, and recovery limitations.

![Encrypted synchronization settings](https://github.com/user-attachments/assets/15144ab2-0111-4e38-b011-c7a57417fcd0)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/3ddee31f-b82d-4755-b2ee-821da774095b">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/5ab5391f-cde8-44db-abe4-901e24afadc2">
  <img alt="Account activity describing changes made on another device" src="https://github.com/user-attachments/assets/3ddee31f-b82d-4755-b2ee-821da774095b">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-943-device-pairing-dark-dark-9a0bd2458f.png">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-943-device-pairing-light-light-4a5ee41c60.png">
  <img alt="Pair with an existing device" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260827T091534Z-943-device-pairing-dark-dark-9a0bd2458f.png">
</picture>

### Diagnostic reports

Turn on diagnostic logging in Advanced settings to copy or save a report for
bug reports. Reports leave out cookies, tokens, IP addresses and URL
parameters. OpenTubeX keeps the log in memory and never saves or sends it on
its own.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/9b0b51ee-538f-495a-9b13-be90db1da87f">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/acc159ac-f91e-417d-a0b7-b88b8e798c02">
  <img width="700" height="197" style="max-width: min(100%, 700px); height: auto;" loading="lazy" decoding="async" alt="Diagnostics settings with Copy report, Save report and Clear log" src="https://github.com/user-attachments/assets/9b0b51ee-538f-495a-9b13-be90db1da87f">
</picture>

## Downloads

### Download support

Use yt-dlp for reliable playback and advanced video, audio, and playlist
downloads. Download subtitles separately as SRT, VTT, ASS, or LRC files, and
manage active and completed downloads from a dedicated page. On desktop and
mobile, paste an individual supported media URL from another site into
Downloads or use the download action on its Watch page. Downloaded videos show
a badge on their thumbnails and play from the saved file instead of streaming.
Completed downloads appear as compact rows with thumbnails and an actions menu.

![Updated download options](https://github.com/user-attachments/assets/1460f265-5b22-40b6-8958-73b4d3a89e83)
![Downloads manager](https://github.com/user-attachments/assets/d42c04c5-eca4-477f-bcd7-3c8a3bd5a272)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/94d84c27-ad90-4073-bf87-445dfe57d302">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/53d765d5-9552-4d72-b6b3-c7a1637b7150">
  <img width="670" height="300" style="max-width: min(100%, 670px); height: auto;" loading="lazy" decoding="async" alt="Downloaded badge on a video thumbnail beside a streamed video" src="https://github.com/user-attachments/assets/94d84c27-ad90-4073-bf87-445dfe57d302">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/e6aaafc4-719b-4c66-aff3-cddc6761bbb7">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/9b1a32e3-39d1-48ae-87b3-8771f7761ead">
  <img width="628" height="267" style="max-width: min(100%, 628px); height: auto;" loading="lazy" decoding="async" alt="Compact download row with its actions menu open" src="https://github.com/user-attachments/assets/e6aaafc4-719b-4c66-aff3-cddc6761bbb7">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/16dff1d6-c43b-4dd3-8df0-4167fad6bd18">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/e417f6f4-5ffd-424d-94f7-ffd500d4755e">
  <img alt="Add download URL dialog for media from another site" src="https://github.com/user-attachments/assets/16dff1d6-c43b-4dd3-8df0-4167fad6bd18">
</picture>

### Search and filter completed downloads

Find completed files by title or channel, filter by format or completion date,
and sort by date or file size. The filter controls can be collapsed without
losing your selections.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/9fa5f8c5-970d-489c-82e4-dbd26889ae05">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/eacc8f72-b6e9-4bfe-8d6d-9b713dc19392">
  <img width="700" height="154" style="max-width: min(100%, 700px); max-height: 154px;" loading="lazy" decoding="async" alt="Search and filter controls for completed downloads" src="https://github.com/user-attachments/assets/9fa5f8c5-970d-489c-82e4-dbd26889ae05">
</picture>

### Offline playback queue

On desktop and Android, add downloaded videos or audio to the watch queue and
play them in order without an internet connection. Available files from a
downloaded playlist are added in playlist order. iOS downloads use a separate
native player and do not support this queue action. On Android, queued
downloads continue while the phone is locked, including when automatic video
startup is disabled.

When the connection drops, the watch page switches Up Next to **Available
offline**, with saved thumbnails to help you choose another download.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/29d7f9a8-8c86-4b68-a1fa-9608c5113a38">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/b1e71208-b55e-41fe-94a0-0b7977326d51">
  <img width="700" height="75" style="max-width: min(100%, 700px); max-height: 75px;" loading="lazy" decoding="async" alt="Add to Queue beside Play for a downloaded video" src="https://github.com/user-attachments/assets/29d7f9a8-8c86-4b68-a1fa-9608c5113a38">
</picture>

### Automatic downloads and download queue

Automatically download new uploads from selected channels with per-channel
templates and filters. A persistent queue provides concurrency and bandwidth
limits, and <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>J</kbd> opens Downloads.
Automatic downloads can wait until the device is charging, or on Android until
it is on an unmetered network.

![Automatic download templates and filters](https://github.com/user-attachments/assets/39df3b81-e95e-456c-887d-b2e634b76276)
![Download queue controls](https://github.com/user-attachments/assets/3298735c-ba0d-4a6a-8894-f924b1fffbfe)

## Platforms

### Mobile app support

Mobile apps for phones and tablets, with background playback, offline
downloads, touch controls and sync with desktop devices. Android builds and
experimental iOS/iPadOS builds are available. Lite Android APKs of about
15 MiB leave out downloads and other yt-dlp features for devices with little
storage. On Android, the predictive back gesture previews going back through
pages, menus, search and the Tab Organizer.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260907T170658Z-mobile-tabs-flow-dark-dark-6d36048f51.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/OpenTubeX/media/releases/download/attachments/20260907T170658Z-mobile-tabs-flow-light-light-fcf25f28d8.webp">
  <img width="162" height="300" style="max-width: min(100%, 162px); max-height: 300px;" alt="Mobile tab flow: page previews, hold actions, drag to reorder, and switch tabs" src="https://github.com/OpenTubeX/media/releases/download/attachments/20260907T170658Z-mobile-tabs-flow-dark-dark-6d36048f51.webp">
</picture>

### Home screen widgets

Add **Continue watching** and **Quick access** widgets on Android and iOS.
Continue watching resumes your latest unfinished videos where you left off,
and Quick access opens Search, Subscriptions or Watch Later. The widgets make
no network requests of their own.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/354fb619-e977-4294-b3e7-f2a1db7f59e3">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/6bff31e2-3d66-40a5-9d93-4ddd8f1264c5">
  <img width="222" height="300" style="max-width: min(100%, 222px); height: auto;" loading="lazy" decoding="async" alt="Continue watching and Quick access home screen widgets" src="https://github.com/user-attachments/assets/354fb619-e977-4294-b3e7-f2a1db7f59e3">
</picture>

### Experimental iPhone and iPad app

Use OpenTubeX on iOS and iPadOS 17.4 or later with touch controls, background
playback, and on-device yt-dlp playback and downloads. Bundled FFmpeg supports
download templates, audio conversion, clipping, metadata, and artwork.
Experimental builds are available as unsigned IPAs that you sign and sideload
with an Apple Account.

<img width="169" height="300" style="max-width: min(100%, 169px); max-height: 300px;" src="/extra-features/ios-iphone-playback.webp" alt="OpenTubeX Watch page playing a video on iPhone">

### Android share actions

Share a YouTube link to OpenTubeX from another Android app, then choose whether
to open it in the player, add it to a playlist or queue, or download it.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/4866c6d2-e78d-4963-b90a-806459e47df5">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/5d48c447-b0c4-44a1-8f1b-49953c88cee2">
  <img width="244" height="300" style="max-width: min(100%, 244px); max-height: 300px;" loading="lazy" decoding="async" alt="Quick actions for a YouTube link shared to OpenTubeX on Android" src="https://github.com/user-attachments/assets/4866c6d2-e78d-4963-b90a-806459e47df5">
</picture>
