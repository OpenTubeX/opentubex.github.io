---
title: Playback and settings
description: Control playback, captions, autoplay, and the options you use most.
order: 4
---

## Use the player

1. Open a video. Move the pointer over the player, or tap it on a phone, to reveal controls.
2. Use play/pause, the seek bar, and volume to control playback.
3. Open the player's settings menu to change quality or playback speed. Available qualities depend on the video and playback engine.
4. Use the captions control to select a subtitle track when one is available.
5. Use fullscreen for a larger view. On desktop, Picture-in-Picture keeps a floating player visible while you work elsewhere.

Some controls move into the player's overflow menu when space is limited. Live streams may not support seeking through the full video.

## Play a link from another site

1. Paste the full media page URL into OpenTubeX's search field and submit it.
2. OpenTubeX uses yt-dlp to extract the media. On desktop, allow any required managed tool download to finish; tool settings are under **Settings → Advanced → External Software**.
3. Use the player controls as usual. Details, chapters, captions, and formats depend on what the source provides.

Support depends on yt-dlp and the site; some links require authentication or are unavailable, and DRM-protected media is unsupported. Opening a link contacts that site and its media services. See [Downloads](/docs/downloads/#download-from-another-site) to save supported media offline.

## Set your playback defaults

1. Open **Settings → Playback**.
2. Adjust default quality, playback rate, or autoplay options to suit your connection and viewing preferences.
3. Set your preferred caption language and appearance if you use subtitles.
4. Open another video to check your defaults.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/player-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/player-light.webp" type="image/webp" />
  <img src="/docs-images/player-light.webp" alt="Playback settings showing subtitle, autoplay, volume, and Picture-in-Picture preferences." width="1232" height="820" loading="lazy" decoding="async" />
</picture>

*Desktop Playback settings. Player controls change the current video; settings let you choose defaults.*

**Start Videos Automatically**, **Autoplay Recommended Videos**, and **Autoplay Playlist Videos** control different behaviors. Turn off the ones you do not want. Per-channel settings can override global preferences, so check those if one channel behaves differently.

## Find and customize keyboard shortcuts

On desktop, open **Keyboard Shortcuts** from the profile menu to see the current bindings. Select a shortcut and press a new combination to change it. This is also the place to check the bindings for play/pause, seeking, captions, fullscreen, and Picture-in-Picture.

Shortcuts can be customized, so the displayed bindings are the source of truth. When typing in search or another text field, move focus back to the player before using playback keys.

## Choose appearance and content settings

- **Appearance:** choose a theme and adjust layout and thumbnails.
- **Subscriptions:** adjust feed refresh and display options.
- **Add-ons:** configure SponsorBlock and other optional services. Choose which SponsorBlock categories should be skipped automatically.
- **Privacy:** review viewing privacy options.
- **Data & Storage:** [import or export your library](/docs/importing/) and inspect storage usage.
- **Sync:** [connect and pair your devices](/docs/sync/). Enhanced-privacy servers support end-to-end encryption; legacy servers can read synced data. Keep the privacy passphrase private and make a backup before changing your setup.

See the [SponsorBlock guide](/docs/sponsorblock/) for skip behaviors and [Privacy and watch history](/docs/privacy/) for recording controls.

Use settings search when you know an option's name but not its category. The [Features page](/extra-features/) explains additional options such as transcripts and per-channel playback settings.

## Android and Linux differences

On Android, tap to show player controls. Background playback can continue when you switch apps; Android's media notification provides playback controls. If it stops after the screen locks, see [background playback troubleshooting](/docs/troubleshooting/#android-background-playback-stops).

On Linux Wayland, the automatic Picture-in-Picture trigger for minimizing the window is unavailable. Use **When the window loses focus or is switched away** instead. Desktop window and external-player options do not all apply to Android.
