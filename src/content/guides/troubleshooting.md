---
title: Troubleshooting and bug reports
description: Work through common problems and give maintainers the details they need.
order: 6
---

## A video will not play

1. Try a second public video. If only one fails, it may be removed, private, region-restricted, or otherwise unavailable.
2. Check your connection and restart OpenTubeX.
3. [Update the app](/docs/installing/#update-without-starting-over). YouTube changes can break extraction in older versions.
4. If you changed playback or provider settings, review them under **Playback** and **Advanced**. Try returning the affected option to its default and retry the same video.
5. Check [existing issues](https://github.com/OpenTubeX/OpenTubeX/issues) for the same error before opening a report.

For buffering, try a lower quality in the player. If you use a proxy or an alternative provider, check whether the problem also happens without that configuration. Note which setting made a difference.

## Imports or subscriptions look incomplete

1. Check the active profile and try **All Channels**.
2. Review feed filters and refresh the subscription feed.
3. For an import, check the success or skipped-item message and confirm that you used a [supported format](/docs/importing/).
4. Keep the original export so you can retry or investigate missing entries.

An imported channel list does not instantly contain every video. Refreshing the feed needs a working connection. Do not clear your data as a first troubleshooting step.

## Downloads fail or saved files are missing

Check the chosen download folder, storage permission, and free space. Moving or deleting a saved file outside OpenTubeX can make its list entry unavailable. On desktop, a download error mentioning external tools may require updating the managed tools. Follow the [download troubleshooting steps](/docs/downloads/#manage-a-failed-download).

## Android background playback stops

1. Confirm that playback works with the app in the foreground.
2. Open Android's app information for OpenTubeX and review its battery/background usage settings. Allow background activity if Android has restricted it; names vary by device.
3. Check notification permission if media controls are missing.
4. Test again with the screen locked and note whether the problem happens on Wi-Fi, mobile data, or both.

Include your Android version and device model in a report. The Android app is a preview, so desktop behavior is not always identical.

## The app will not open after installation

Check that the package matches your processor and meets the requirements on the [Downloads page](/downloads/). Extract portable archives before running them. On Linux, check the executable permission for an AppImage. On macOS, review the first-launch instructions in the [installation guide](/docs/installing/#macos).

Before reinstalling or clearing storage, [export your data](/docs/importing/#back-up-your-library) if the app still opens. Clearing application data can remove your local library and settings.

## Report a bug

1. Search the [OpenTubeX issue tracker](https://github.com/OpenTubeX/OpenTubeX/issues) for your error or symptoms.
2. If no existing issue matches, select **New issue** and use the bug-report template.
3. Include the OpenTubeX version, operating system/version, installation method, and whether you use a regular release or nightly build. For Android, include the device model.
4. Write numbered steps that reproduce the problem, what you expected, and what happened instead. Include the affected video URL if it is public and relevant.
5. Copy the exact error text and attach a screenshot or short recording if it explains the problem. Mention any settings changes or workarounds you tested.

Remove personal information from screenshots and logs. Do not attach cookies, passwords, sync recovery information, or your full viewing database to a public issue.

For help using the app, you can also ask in the [Matrix community](https://matrix.opentubex.org) or [Fluxer community](https://fluxer.opentubex.org).
