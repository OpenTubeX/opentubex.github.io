/** Builds the PAD (Portable Application Description) file that software directories such as UpdateStar read. */

type PadValue = string | { [element: string]: PadValue };

const email = 'info@opentubex.org';
const sourceUrl = 'https://github.com/OpenTubeX/OpenTubeX';
const rawSourceUrl = 'https://raw.githubusercontent.com/OpenTubeX/OpenTubeX/development';

// Languages of the app's active locales, as PAD 4.0 language identifiers.
const languages = [
	'English', 'Arabic', 'Azerbaijani', 'Byelorussian', 'Bulgarian', 'Breton', 'Catalan', 'Czech', 'Welsh',
	'Danish', 'German', 'Greek', 'Spanish', 'Estonian', 'Basque', 'Persian', 'Finnish', 'French', 'Galician',
	'Hebrew', 'Hungarian', 'Croatian', 'Indonesian', 'Icelandic', 'Italian', 'Japanese', 'Korean', 'Lithuanian',
	'Norwegian', 'Dutch', 'Polish', 'Portuguese', 'Romanian', 'Russian', 'Slovak', 'Slovenian', 'Serbian', 'Swedish',
	'Tamil', 'Turkish', 'Ukrainian', 'Vietnamese', 'ChineseSimplified', 'ChineseTraditional',
];

export const padDescriptions = {
	Char_Desc_45: 'Private YouTube client without ads',
	Char_Desc_80: 'Open source YouTube client without ads or a Google account',
	Char_Desc_250:
		'OpenTubeX is a free and open source YouTube client for Windows, macOS, Linux and Android. It needs no Google account, shows no ads, and keeps subscriptions, playlists and history on your device.',
	Char_Desc_450:
		'OpenTubeX is a free and open source YouTube client for Windows, macOS, Linux and Android. It needs no Google account, shows no ads, and keeps subscriptions, playlists and history on your device. Videos load through a built-in extractor, an Invidious instance or a Yattee Server. SponsorBlock and DeArrow are built in.',
	Char_Desc_2000: `OpenTubeX is a free and open source YouTube client for Windows, macOS, Linux and Android. It needs no Google account, shows no ads, and keeps subscriptions, playlists and watch history on your device by default.

Videos load through a built-in extractor, an Invidious instance or a Yattee Server, and the app can send its traffic through a proxy such as Tor. SponsorBlock and DeArrow are built in.

You can group subscriptions into profiles, choose whether each channel shows videos, Shorts, live streams or posts, and set daily video limits. You can save playback speed and quality per channel and customize keyboard shortcuts. Videos open in tabs, and the queue and mini-player keep playing while you browse.

Optional sync keeps your library the same on all your devices, with end-to-end encryption on a compatible server. OpenTubeX supports custom themes and is available in more than 40 languages.

OpenTubeX is licensed under the GNU Affero General Public License v3.0.`,
};

function escapeXml(text: string): string {
	const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };
	return text.replace(/[&<>"']/g, (char) => entities[char]!);
}

function render(name: string, value: PadValue, indent: string): string {
	if (typeof value === 'string') return `${indent}<${name}>${escapeXml(value)}</${name}>`;
	const children = Object.entries(value).map(([child, childValue]) => render(child, childValue, `${indent}\t`));
	return [`${indent}<${name}>`, ...children, `${indent}</${name}>`].join('\n');
}

export function padXml({ site, version, publishedAt, downloadUrl }: {
	site: URL;
	version: string;
	publishedAt?: string;
	downloadUrl: string;
}): string {
	const released = publishedAt ? new Date(publishedAt) : undefined;
	const pad: PadValue = {
		MASTER_PAD_VERSION_INFO: {
			MASTER_PAD_VERSION: '4.0',
			MASTER_PAD_INFO: 'Portable Application Description, or PAD for short, is a data set that is used by software authors to describe their software products.',
		},
		Company_Info: {
			Company_Name: 'OpenTubeX',
			Company_WebSite_URL: site.href,
			Contact_Info: { Contact_Email: email, Author_Email: email },
			Support_Info: { Sales_Email: email, Support_Email: email, General_Email: email },
		},
		Program_Info: {
			Program_Name: 'OpenTubeX',
			Program_Version: version,
			Program_Release_Month: released ? String(released.getUTCMonth() + 1).padStart(2, '0') : '',
			Program_Release_Day: released ? String(released.getUTCDate()).padStart(2, '0') : '',
			Program_Release_Year: released ? String(released.getUTCFullYear()) : '',
			Program_Cost_Dollars: '0',
			Program_Type: 'Freeware',
			Program_Release_Status: 'Beta',
			Program_Install_Support: 'Install and Uninstall',
			// The PAD 4.0 OS list predates Windows 10, so WinOther covers it.
			Program_OS_Support: 'WinOther,Mac OS X,Linux,Android',
			Program_Language: languages.join(','),
			Program_Category_Class: 'Audio & Multimedia::Video Tools',
			Program_System_Requirements: 'Windows 10 or later, macOS 12 or later, Linux, or Android 8.0 or later',
			Expire_Info: { Has_Expire_Info: 'N' },
		},
		Web_Info: {
			Application_URLs: {
				Application_Info_URL: site.href,
				Application_Order_URL: '',
				Application_Screenshot_URL: `${rawSourceUrl}/docs/screenshots/OpenTubeX1-dark.png`,
				Application_Icon_URL: `${rawSourceUrl}/_icons/iconColor.png`,
				Application_XML_File_URL: new URL('/pad.xml', site).href,
			},
			Download_URLs: {
				Primary_Download_URL: downloadUrl,
				Additional_Download_URL_1: '',
			},
		},
		Program_Descriptions: {
			English: {
				Keywords: 'youtube, youtube client, video player, privacy, no ads, sponsorblock, invidious, open source',
				...padDescriptions,
			},
		},
		Permissions: {
			Distribution_Permissions: `OpenTubeX is free software under the GNU Affero General Public License v3.0. You may redistribute it under the terms of that license. Source code: ${sourceUrl}`,
			EULA: `GNU Affero General Public License v3.0: ${sourceUrl}/blob/development/LICENSE`,
		},
	};
	return `<?xml version="1.0" encoding="UTF-8"?>\n${render('XML_DIZ_INFO', pad, '')}\n`;
}
