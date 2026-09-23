---
title: Installing and updating
description: Choose a release for your device and keep it up to date.
order: 1
---

## Choose your download

1. Open the [Downloads page](/downloads/).
2. Choose your operating system and processor. Use **arm64** for Apple Silicon and most recent Android phones; **x64** is for Intel or AMD desktop processors. If you are unsure on Android, choose the universal APK.
3. Use a regular release for everyday use. Development and nightly builds may contain unfinished changes.

The Downloads page lists current requirements and package-manager commands. OpenTubeX supports Windows, macOS, Linux, and an **Android preview**. There is no iOS build listed.

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

## Android preview

1. On the [Downloads page](/downloads/), choose **F-Droid** or **Obtainium**. For a manual installation, download an APK from [GitHub Releases](https://github.com/OpenTubeX/OpenTubeX/releases).
2. Follow the selected installer's prompts. For a direct APK, Android may ask you to allow installation from the browser or file manager you used.
3. Open the app. Allow notifications if you want download progress and playback controls in Android's notification area.

The preview has a phone layout, background playback, and offline downloads. Desktop integrations, window controls, and external software settings can differ or be unavailable.

## Update without starting over

1. [Export your data](/docs/importing/#back-up-your-library) before changing release channels or reinstalling.
2. If you installed through a package manager, F-Droid, or Obtainium, use that same tool to update.
3. For a manual installation, get the newer package for the same platform and install it over the existing app. For a portable installation, keep your existing data when replacing the app files.
4. Reopen the app and check your subscriptions and playlists.

On desktop, **Settings → General → Check for Updates** controls update checks; it does not replace your package manager's update process. See the [Changelog](/changelog/) for release changes. Avoid uninstalling or clearing application data just to update.
