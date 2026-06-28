export const releaseVersion = '0.25.6';

const releaseTag = `v${releaseVersion}-beta`;
const releaseBaseUrl = `https://github.com/OpenTubeX/OpenTubeX/releases/download/${releaseTag}`;

export const allReleasesUrl = 'https://github.com/OpenTubeX/OpenTubeX/releases';
export const githubReleaseUrl = `https://github.com/OpenTubeX/OpenTubeX/releases/tag/${releaseTag}`;

export const flatpakRemoteUrl = 'https://flatpak.opentubex.org/opentubex.flatpakrepo';
export const flatpakSiteUrl = 'https://flatpak.opentubex.org';
const flatpakReleaseBaseUrl = `https://github.com/OpenTubeX/flatpak/releases/download/${releaseTag}`;

export function downloadUrl(assetName: string): string {
	return `${releaseBaseUrl}/${assetName}`;
}

export type DownloadLink = {
	label: string;
	url: string;
	isExternal?: boolean;
};

export type DownloadGroup = {
	title: string;
	icon: string;
	links: DownloadLink[];
};

const linuxPortableDownloads = [
	{
		label: '.zip (x64)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-x64-portable.zip`),
	},
	{
		label: '.7z (x64)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-x64-portable.7z`),
	},
	{
		label: '.zip (arm64)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-arm64-portable.zip`),
	},
	{
		label: '.7z (arm64)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-arm64-portable.7z`),
	},
	{
		label: '.zip (armv7l)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-armv7l-portable.zip`),
	},
	{
		label: '.7z (armv7l)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-armv7l-portable.7z`),
	},
];

export const downloadGroups: DownloadGroup[] = [
	{
		title: 'Windows',
		icon: 'simple-icons:windows',
		links: [
			{
				label: '.exe installer (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-setup-x64.exe`),
			},
			{
				label: '.exe portable (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-x64-portable.exe`),
			},
			{
				label: '.zip (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-x64-portable.zip`),
			},
			{
				label: '.7z (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-x64-portable.7z`),
			},
			{
				label: '.exe installer (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-setup-arm64.exe`),
			},
			{
				label: '.exe portable (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-arm64-portable.exe`),
			},
			{
				label: '.zip (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-arm64-portable.zip`),
			},
			{
				label: '.7z (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-arm64-portable.7z`),
			},
		],
	},
	{
		title: 'macOS',
		icon: 'simple-icons:apple',
		links: [
			{
				label: '.dmg (Apple silicon)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-arm64.dmg`),
			},
			{
				label: '.zip (Apple silicon)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-arm64.zip`),
			},
			{
				label: '.7z (Apple silicon)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-arm64.7z`),
			},
			{
				label: '.dmg (Intel)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-x64.dmg`),
			},
			{
				label: '.zip (Intel)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-x64.zip`),
			},
			{
				label: '.7z (Intel)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-x64.7z`),
			},
		],
	},
	{
		title: 'Ubuntu / Debian',
		icon: 'simple-icons:ubuntu',
		links: [
			{
				label: '.deb (x64)',
				url: downloadUrl(`opentubex_${releaseVersion}_beta_amd64.deb`),
			},
			{
				label: '.deb (arm64)',
				url: downloadUrl(`opentubex_${releaseVersion}_beta_arm64.deb`),
			},
			{
				label: '.deb (armv7l)',
				url: downloadUrl(`opentubex_${releaseVersion}_beta_armv7l.deb`),
			},
		],
	},
	{
		title: 'Fedora / RedHat',
		icon: 'simple-icons:fedora',
		links: [
			{
				label: '.rpm (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta.amd64.rpm`),
			},
			{
				label: '.rpm (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta.arm64.rpm`),
			},
		],
	},
	{
		title: 'Arch Linux',
		icon: 'simple-icons:archlinux',
		links: [
			{
				label: '.pacman (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-amd64.pacman`),
			},
			{
				label: 'AUR (opentubex-bin)',
				url: 'https://aur.archlinux.org/packages/opentubex-bin/',
				isExternal: true,
			},
			{
				label: 'AUR (opentubex)',
				url: 'https://aur.archlinux.org/packages/opentubex/',
				isExternal: true,
			},
		],
	},
	{
		title: 'AppImage',
		icon: 'simple-icons:appimage',
		links: [
			{
				label: 'AppImage (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-amd64.AppImage`),
			},
			{
				label: 'AppImage (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-arm64.AppImage`),
			},
			{
				label: 'AppImage (armv7l)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-armv7l.AppImage`),
			},
		],
	},
	{
		title: 'Flatpak',
		icon: 'simple-icons:flatpak',
		links: [
			{
				label: 'Install instructions',
				url: flatpakSiteUrl,
				isExternal: true,
			},
			{
				label: '.flatpak (x86_64)',
				url: `${flatpakReleaseBaseUrl}/org.opentubex.OpenTubeX-${releaseTag}-x86_64.flatpak`,
				isExternal: true,
			},
			{
				label: '.flatpak (aarch64)',
				url: `${flatpakReleaseBaseUrl}/org.opentubex.OpenTubeX-${releaseTag}-aarch64.flatpak`,
				isExternal: true,
			},
		],
	},
	{
		title: 'Other Linux Distributions',
		icon: 'simple-icons:linux',
		links: linuxPortableDownloads,
	},
];
