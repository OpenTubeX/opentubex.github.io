---
title: Installing and updating
description: Choose a release for your device and keep it up to date.
order: 1
---

## Choose your download

1. Open the [Downloads page](/downloads/).
2. Choose your operating system and processor. Use **arm64** for Apple Silicon and most recent Android phones; **x64** is for Intel or AMD desktop processors. If you are unsure on Android, choose the universal APK.
3. Use a regular release for everyday use. Development and nightly builds may contain unfinished changes.

The Downloads page lists current requirements and package-manager commands. OpenTubeX supports Windows, macOS, Linux, and an **Android app**. An experimental **iOS/iPadOS app** is available for version 17.4 and newer.

## Windows

1. Download the Windows installer matching your processor, or follow the [winget instructions](/downloads/#install-winget).
2. Open the installer and complete its prompts.
3. Launch OpenTubeX from the Start menu.

For a portable download, extract the archive before launching the application. Keep the extracted files together.

## macOS

1. Download the DMG for **Apple Silicon (arm64)** or **Intel (x64)**.
2. Open it and drag OpenTubeX into **Applications**.
3. Open OpenTubeX from Applications.

OpenTubeX is not notarized by Apple. If the first launch is blocked, allow the app in **System Settings → Privacy & Security** after checking that you downloaded it from the official release. Homebrew users can follow the [Homebrew instructions](/downloads/#install-homebrew).

## Linux

1. Choose a package matching your distribution on the [Downloads page](/downloads/).
2. Follow the linked repository instructions, or open a downloaded DEB/RPM with your distribution's package installer.
3. Launch OpenTubeX from your application menu.

For an AppImage, open the file's properties, allow it to run as a program, then launch it. For a portable archive, extract it first and run the included OpenTubeX executable. Repository installations are convenient when you want updates through your normal package manager.

## Android

1. On the [Downloads page](/downloads/), choose **F-Droid** or **Obtainium**. For a manual installation, download an APK from [GitHub Releases](https://github.com/OpenTubeX/OpenTubeX/releases).
2. Follow the selected installer's prompts. For a direct APK, Android may ask you to allow installation from the browser or file manager you used.
3. Open the app. Allow notifications if you want download progress and playback controls in Android's notification area.

The Android app has a phone layout, background playback, and offline downloads. Desktop integrations, window controls, and external software settings can differ or be unavailable.

## iOS / iPadOS (experimental)

Download the unsigned `.ipa` from the [iOS / iPadOS download card](/downloads/#download-ios-ipados). One IPA supports both iPhone and iPad. Opening it in Files does not install it: a sideloading tool must sign it with your Apple Account first.

### SideStore: refresh without a computer

We recommend [SideStore](https://sidestore.io/) for regular use because refreshes can run on your device after initial computer setup. OpenTubeX installation has been tested with iloader; the SideStore recommendation is based on its documented refresh workflow.

1. Follow SideStore's [prerequisites](https://docs.sidestore.io/docs/installation/prerequisites) and [installation guide](https://docs.sidestore.io/docs/installation/install). The guide uses iloader on your computer for initial installation and sets up the required pairing file and local VPN.
2. Trust your Apple Account under **Settings → General → VPN & Device Management**. Enable **Settings → Privacy & Security → Developer Mode**, restart, and confirm when prompted.
3. Connect the local VPN required by SideStore, open SideStore, and complete its initial refresh.
4. Import the downloaded OpenTubeX IPA from **My Apps** using the **+** button, then launch OpenTubeX.
5. With a free Apple Account, refresh **both SideStore and OpenTubeX within seven days**. Check their expiry counters; background refresh is not a guarantee. Keep SideStore's required local VPN available when refreshing.

SideStore does not remove Apple's expiry requirement. If SideStore itself expires, reinstall it from your computer. You may also need the computer to replace an expired pairing file, for example after an OS update or reset. See [SideStore troubleshooting](https://docs.sidestore.io/docs/troubleshooting).

### iloader: tested computer installation

[iloader](https://iloader.app/) has been used to install and update OpenTubeX on a physical iPad. It runs on Linux, macOS, and Windows.

1. Install iloader from its [official website](https://iloader.app/) or [GitHub releases](https://github.com/nab138/iloader/releases) and follow its platform prerequisites.
2. Connect your iPhone or iPad over USB, unlock it, and trust the computer.
3. In iloader, sign in with your Apple Account, select your device, and import the OpenTubeX IPA.
4. Trust your developer account and enable Developer Mode as described above, then open OpenTubeX.
5. With a free account, reconnect to your computer and install the IPA again before its seven-day signature expires.

### Other signing options and limits

[AltStore Classic](https://faq.altstore.io/altstore-classic/your-altstore) can also install IPAs, but refreshing still needs a computer running AltServer over Wi-Fi or USB. **AltStore PAL cannot install arbitrary IPA files** and is not an installation option for this build.

Free Apple Accounts allow three active sideloaded apps, including SideStore or AltStore itself. A paid Apple Developer membership provides longer signing periods; it is optional.

For updates, import the newer OpenTubeX IPA with the same signing tool and Apple Account, over the existing app. Avoid uninstalling it: that removes its local data. [Export your library](/docs/importing/#back-up-your-library) before switching signing tools or accounts. Refreshing renews the signature; it does not necessarily update OpenTubeX to a newer release.

### Current iOS limitations

The port is experimental. Playback, fullscreen, touch menus, and settings have been tested on a physical iPad, but broader device coverage is still in progress. Downloads, authenticated playback, translated audio, app-managed proxies, alternate icons, and closed-app subscription refresh are unavailable on iOS. Track progress in [the iOS port issue](https://github.com/OpenTubeX/OpenTubeX/issues/1279).

## Update without starting over

1. [Export your data](/docs/importing/#back-up-your-library) before changing release channels or reinstalling.
2. If you installed through a package manager, F-Droid, or Obtainium, use that same tool to update.
3. For a manual installation, get the newer package for the same platform and install it over the existing app. For a portable installation, keep your existing data when replacing the app files.
4. Reopen the app and check your subscriptions and playlists.

On desktop, **Settings → General → Check for Updates** controls update checks; it does not replace your package manager's update process. See the [Changelog](/changelog/) for release changes. Avoid uninstalling or clearing application data just to update.
