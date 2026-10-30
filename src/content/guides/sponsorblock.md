---
title: SponsorBlock and other add-ons
description: Choose which segments to skip and configure optional metadata services.
order: 5.5
icon: lucide:skip-forward
---

SponsorBlock uses community-contributed segment timings to identify sponsors and other sections inside videos. Coverage depends on contributions: an unmarked segment cannot be skipped automatically.

## Enable SponsorBlock

1. Open **Settings → Add-ons**.
2. Find **SponsorBlock** and turn on **Enable SponsorBlock**.
3. Review each category's skip option rather than assuming they all behave the same.
4. Open a video with known segments and check the seek bar.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/sponsorblock-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/sponsorblock-light.webp" type="image/webp" />
  <img src="/docs-images/sponsorblock-light.webp" alt="SponsorBlock enabled in Add-ons settings with separate Skip Option menus for Sponsor, Unpaid Self Promotion, and Interaction Reminder." width="1232" height="820" loading="lazy" decoding="async" />
</picture>

*Enable SponsorBlock, then choose each category’s Skip Option. Categories can use different behaviors.*

## Choose a skip behavior

| Option | What it does |
| --- | --- |
| Auto Skip | Skips segments in that category automatically. |
| Prompt To Skip | Offers a choice when a segment is reached. |
| Show In Seek Bar | Marks the segment without automatically skipping it. |
| Do Nothing | Disables the category's skipping behavior. |

Choose different behaviors for categories such as sponsorships and intros. **Show notice after a segment is skipped** controls the notification; it does not enable or disable skipping itself.

To never skip segments for a channel, add its channel ID under **Excluded Channels**. The ID must match exactly.

## Review a video's segments

To see the segments found for the current video, select **Open SponsorBlock info**, the SponsorBlock button below the video or in the player. From this panel you can:

- **Upvote** or **Downvote** a segment, or skip or mute it on demand.
- Turn **Automatically skip segments** off for the current video only.
- **Whitelist channel** to stop auto-skipping for that channel's videos.

## If the wrong part is skipped

1. Check which category is responsible.
2. For a one-off, open the player's SponsorBlock panel and turn off automatic skipping for that video. If the segment's timing or category is wrong, **Downvote** it there; votes affect the shared SponsorBlock data. Otherwise, change the category to **Prompt To Skip** or **Show In Seek Bar** while investigating.
3. Retry the affected section. If needed, temporarily disable SponsorBlock to compare playback.

Segment timing comes from contributors and can be inaccurate. When reporting an OpenTubeX problem, include the public video URL, segment time, category, and chosen behavior.

## Contributions and identity

**Enable SponsorBlock Submission** is separate from enabling playback skipping. Review it if you want to contribute. Turning it on shows **Private user ID (optional)**, where you can paste the private ID from the SponsorBlock browser extension. Keep that ID private; it is not something to include in a bug report. Leaving it empty lets the app use its generated ID.

## Other add-ons

In **Settings → Add-ons**, review **Use DeArrow Video Titles**, **Use DeArrow for thumbnails**, and **Enable Return YouTube Dislike** if you want alternative titles, thumbnails, or dislike information. These are optional services and their results may differ from YouTube's own display.

Two more add-ons are there as well:

- **AiSList** hides AI slop channels on a community-maintained blocklist from search, trending, and recommendations, and labels videos from channels on its warnlist. It only applies to results loaded with the Local API.
- **Voice-over translation**, on desktop and Android, plays a machine-translated voice-over through the unofficial Yandex service when you request it. It is off by default.

Enabling an add-on makes requests to its service. The [privacy policy's network exposure table](/privacy/#network-exposure) describes what each service can observe. An add-on outage does not necessarily mean the video provider itself is unavailable.
