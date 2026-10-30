---
title: Organize channels with profiles
description: Create focused subscription feeds and manage channels in bulk.
order: 2.5
icon: lucide:users
---

Profiles group your subscribed channels into separate feeds, such as music, learning, or news. They are channel groups within the app, not separate Google accounts.

For a lighter way to filter one feed, use [subscription groups](#use-subscription-groups) instead. Profiles switch the whole app to a different set of channels; groups filter the feed of the current profile.

## Create a profile

1. Open **Settings → Data & Storage → Data**.
2. Select **Manage Subscriptions** to open the profile manager.
3. Choose **Create New Profile**.
4. Enter a name, choose its appearance, then select **Create Profile**.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/create-profile-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/create-profile-light.webp" type="image/webp" />
  <img src="/docs-images/create-profile-light.webp" alt="Profile Manager showing the color picker, a Learning profile name, profile preview, and Create Profile button." width="1232" height="820" loading="lazy" decoding="async" />
</picture>

*Choose a color and name, check the profile preview, then select Create Profile.*

The default **All Channels** profile collects your subscriptions. Use an additional profile when you want to focus on a subset.

## Switch the feed you see

1. Open the profile menu from the profile icon.
2. Choose a profile in the profile selector.
3. Open **Subscriptions** to view that profile's channels.

An empty profile has no channels to show. Switching profiles is not a way to create separate watch-history or playlist libraries.

## Add channels

To add a new channel, switch to your desired profile, open the channel, and select **Subscribe**. The channel is also included in **All Channels**. Once you have more than one profile, the arrow next to **Subscribe** opens **Subscription settings**, where you can tick the profiles and groups the channel belongs to without switching profiles.

To organize channels you already follow:

1. Open **Manage Subscriptions**, choose the profile you want to edit, and open the **Manage profile subscriptions** tab.
2. Select channels from the available channel list.
3. Choose **Add Selected To Profile**.
4. Return to your subscription feed and check the active profile.

## Remove channels carefully

Switch to a profile and use **Unsubscribe** on a channel to remove it from that group. The profile manager also offers bulk selection for managing channels.

Removing a channel from **All Channels** removes it from the other profiles too. If you only want it out of one group, edit that group instead. Export your subscriptions before reorganizing a large library.

## Use subscription groups

Groups are filters inside a profile, such as Music or Gaming. A channel can be in several groups.

1. Open **Channels** and select **New Group**.
2. Enter a **Group Name**, choose its channels, and select **Create**.
3. In **Subscriptions** or **Channels**, select a group chip to show only its channels; select **All** to show everything again.

Once a group exists, the **New Group** and **Edit Group** buttons appear next to the chips on both pages. Use **Edit Group** to change or delete the selected group. Deleting a group keeps its channels subscribed. You can also add a channel to a group from its **Subscription settings**.

## Back up profiles

Use **Settings → Data & Storage → Data → Export Subscriptions → Export OpenTubeX**. That format preserves profile information for importing on another OpenTubeX installation. Subscription groups and the custom channel order are settings, so the subscriptions export leaves them out. Use **Export Settings**, or **Export backup** with the settings category selected, to keep them. See [Back up your library](/docs/importing/#back-up-your-library).
