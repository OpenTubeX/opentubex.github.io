---
title: Import from Google Takeout
description: Import subscriptions, history, and playlists from a YouTube Takeout ZIP.
order: 3.5
---

Google Takeout exports your Google account data. OpenTubeX can import subscriptions, watch history, search history, and playlists directly from the ZIP; you do not need to sign in to Google inside OpenTubeX.

## Choose your YouTube data

1. Open [Google Takeout](https://takeout.google.com/) in your browser and sign in to the account you use for YouTube.
2. Choose **Deselect all**, then select **YouTube and YouTube Music**.
3. Open **All YouTube data included**. Deselect everything in that dialog, then select **subscriptions**, **history**, and/or **playlists** for the data you want.
4. Confirm with **OK**.

Selecting only these categories keeps the export smaller. If you use more than one Google account, check which account is selected before exporting.

<img src="/docs-images/takeout/history.png" alt="Google Takeout content-options dialog with history selected." width="431" height="451" loading="lazy" decoding="async" />

*Select history for watch and search history. You can also select subscriptions and playlists.*

The screenshots show the relevant controls, but are not captures of today's interface. Google may change the layout and labels.

## Choose JSON for history

1. In the **YouTube and YouTube Music** entry, open **Multiple formats**.
2. Change **History** to **JSON** and confirm with **OK**.
3. Select **Next step**.

<img src="/docs-images/takeout/json.png" alt="Google Takeout format dialog with history set to JSON." width="553" height="319" loading="lazy" decoding="async" />

*Set history to JSON before requesting the export.*

<img src="/docs-images/takeout/youtube.png" alt="Google Takeout YouTube entry showing JSON format, one data type selected, and the Next step button." width="689" height="409" loading="lazy" decoding="async" />

*After making your choices, the buttons may read JSON format and a count of selected types rather than Multiple formats and All YouTube data included. This example includes history only.*

This step matters for watch and search history. OpenTubeX expects a JSON history export, not Takeout's HTML version. Subscription exports use CSV. Renaming an HTML file to `.json` does not convert it.

## Create and download the export

1. Choose **Send download link via email**, **Export once**, and **.zip**.
2. Select **Create export**.
3. Wait for Google to prepare the archive. Use the download link when it is ready; Google may ask you to sign in again.
4. Download the ZIP. If Google splits the export into several archives, import each ZIP that contains YouTube data.

You do not need to upload the archive to another website. Creating an export does not delete your data from Google. [Google's export help](https://support.google.com/accounts/answer/3024190) covers delivery options and account-specific problems.

## Import the ZIP

1. In OpenTubeX, open your profile menu, choose **All settings**, then **Data & Storage → Data**.
2. Choose **Import YouTube Takeout ZIP** and select the downloaded ZIP.
3. OpenTubeX detects subscriptions, watch history, search history, and playlists in the archive. Uncheck anything you do not want to import, then choose **Import selected data**.
4. Check the corresponding library pages. Refresh the subscription feed to fetch channel uploads.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/takeout-selection-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/takeout-selection-light.webp" type="image/webp" />
  <img src="/docs-images/takeout-selection-light.webp" alt="Takeout ZIP import screen with checkboxes for detected subscriptions, watch history, playlists, and search history." width="1232" height="820" loading="lazy" decoding="async" />
</picture>

You can still extract the ZIP and import individual files from `Takeout/YouTube and YouTube Music/`: choose `subscriptions/subscriptions.csv` with **Import Subscriptions**, `history/watch-history.json` with **Import History**, `history/search-history.json` with **Import search history**, or a CSV in `playlists/` with **Import Playlists**.

<picture>
  <source data-shot-theme="dark" media="(prefers-color-scheme: dark)" srcset="/docs-images/data-dark.webp" type="image/webp" />
  <source data-shot-theme="light" media="(prefers-color-scheme: light)" srcset="/docs-images/data-light.webp" type="image/webp" />
  <img src="/docs-images/data-light.webp" alt="OpenTubeX Data settings showing Import YouTube Takeout ZIP and separate data import actions." width="1232" height="820" loading="lazy" decoding="async" />
</picture>

*Choose Import YouTube Takeout ZIP to select the archive directly.*

## If something is missing

- **Only HTML history files:** create another export with History set to JSON.
- **No supported YouTube data found:** check the account and the selected data categories. The archive's `archive_browser.html` is an index, not importable data.
- **Older history is missing:** the export can only contain data Google still retains. Previously deleted activity may not be recoverable.
- **A channel is missing after import:** check the import result and your active [profile](/docs/profiles/). A removed channel or incomplete export may need investigation.
- **A playlist video shows only its ID:** Takeout's playlist CSV includes video IDs and timestamps, but no video titles or durations.

Keep your original archive until you have checked the imported data. See [Importing and backing up data](/docs/importing/) for other supported formats.

## Sources and image credits

Takeout instructions are adapted from FreeTube's [subscription](https://docs.freetubeapp.io/usage/importing-subscriptions/) and [history](https://docs.freetubeapp.io/usage/importing-history/) guides ([MIT license](/docs-sources/freetube-license.txt)), with OpenTubeX-specific import steps. General export behavior is checked against [Google Account Help](https://support.google.com/accounts/answer/3024190).

The three Google Takeout UI screenshots are reproduced unchanged from [positron48's source images](https://github.com/positron48/youtube-history-analyzer/tree/master/images), published with [Positroid's September 2025 walkthrough](https://positroid.tech/en/post/youtube-history-analyzer). Google product visuals belong to Google and are shown for instructional purposes. See [Google's educational-use guidance](https://about.google/brand-resource-center/guidance/). OpenTubeX is not affiliated with Google.
