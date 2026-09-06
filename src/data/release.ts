export const releaseVersion = '0.34.0';

export const releaseTag = `v${releaseVersion}-beta`;
const releaseBaseUrl = `https://github.com/OpenTubeX/OpenTubeX/releases/download/${releaseTag}`;

export const allReleasesUrl = 'https://github.com/OpenTubeX/OpenTubeX/releases';
export const githubReleaseUrl = `https://github.com/OpenTubeX/OpenTubeX/releases/tag/${releaseTag}`;

export const aptRepositoryUrl = 'https://apt.opentubex.org';
export const coprRepositoryUrl = 'https://copr.fedorainfracloud.org/coprs/d3sox/opentubex/';
export const rpmRepositoryUrl = 'https://rpm.opentubex.org';
export const flatpakRemoteUrl = 'https://flatpak.opentubex.org/opentubex.flatpakrepo';
export const flatpakSiteUrl = 'https://flatpak.opentubex.org';
export const flatparkSiteUrl = 'https://flatpark.org/apps/org.opentubex.OpenTubeX/';
const flatpakReleaseBaseUrl = `https://github.com/OpenTubeX/flatpak/releases/download/${releaseTag}`;
export const snapSiteUrl = 'https://snapcraft.io/opentubex';
const snapReleaseBaseUrl = `https://github.com/OpenTubeX/snap/releases/download/${releaseTag}`;
export const fdroidSiteUrl = 'https://fdroid.opentubex.org/';
export const obtainiumUrl =
	'https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/OpenTubeX/OpenTubeX';
export const fdroidNightlyUrl = 'https://fdroid.opentubex.org/#release-channels';
export const obtainiumNightlyUrl =
	'https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/%7B%22id%22%3A%22org.opentubex.app.nightly%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FOpenTubeX%2FOpenTubeX%22%2C%22author%22%3A%22OpenTubeX%22%2C%22name%22%3A%22OpenTubeX%20Nightly%22%2C%22preferredApkIndex%22%3A0%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22fallbackToOlderReleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22nightly%5C%22%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22android-universal%5B.%5Dapk%24%5C%22%7D%22%2C%22overrideSource%22%3A%22GitHub%22%7D';

export function downloadUrl(assetName: string): string {
	return `${releaseBaseUrl}/${assetName}`;
}

export type DownloadLink = {
	label: string;
	url: string;
	icon: string;
	preferred?: boolean;
	isExternal?: boolean;
};

export type DownloadGroup = {
	title: string;
	icon: string;
	links: DownloadLink[];
};

const linuxPortableDownloads: DownloadLink[] = [
	{
		label: '.zip (x64)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-x64-portable.zip`),
		icon: 'lucide:file-archive',
	},
	{
		label: '.zip (arm64)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-arm64-portable.zip`),
		icon: 'lucide:file-archive',
	},
	{
		label: '.zip (armv7l)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-armv7l-portable.zip`),
		icon: 'lucide:file-archive',
	},
	{
		label: '.7z (x64)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-x64-portable.7z`),
		icon: 'lucide:file-archive',
	},
	{
		label: '.7z (arm64)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-arm64-portable.7z`),
		icon: 'lucide:file-archive',
	},
	{
		label: '.7z (armv7l)',
		url: downloadUrl(`opentubex-${releaseVersion}-beta-linux-armv7l-portable.7z`),
		icon: 'lucide:file-archive',
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
				icon: 'lucide:package',
				preferred: true,
			},
			{
				label: '.exe installer (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-setup-arm64.exe`),
				icon: 'lucide:package',
				preferred: true,
			},
			{
				label: '.exe portable (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-x64-portable.exe`),
				icon: 'lucide:download',
			},
			{
				label: '.exe portable (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-arm64-portable.exe`),
				icon: 'lucide:download',
			},
			{
				label: '.zip (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-x64-portable.zip`),
				icon: 'lucide:file-archive',
			},
			{
				label: '.zip (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-arm64-portable.zip`),
				icon: 'lucide:file-archive',
			},
			{
				label: '.7z (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-x64-portable.7z`),
				icon: 'lucide:file-archive',
			},
			{
				label: '.7z (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-win-arm64-portable.7z`),
				icon: 'lucide:file-archive',
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
				icon: 'lucide:hard-drive',
				preferred: true,
			},
			{
				label: '.dmg (Intel)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-x64.dmg`),
				icon: 'lucide:hard-drive',
				preferred: true,
			},
			{
				label: '.zip (Apple silicon)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-arm64.zip`),
				icon: 'lucide:file-archive',
			},
			{
				label: '.zip (Intel)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-x64.zip`),
				icon: 'lucide:file-archive',
			},
			{
				label: '.7z (Apple silicon)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-arm64.7z`),
				icon: 'lucide:file-archive',
			},
			{
				label: '.7z (Intel)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-mac-x64.7z`),
				icon: 'lucide:file-archive',
			},
		],
	},
	{
		title: 'Android',
		icon: 'simple-icons:android',
		links: [
			{
				label: 'Install with F-Droid',
				url: fdroidSiteUrl,
				icon: 'simple-icons:fdroid',
				preferred: true,
				isExternal: true,
			},
			{
				label: 'Install with Obtainium',
				url: obtainiumUrl,
				icon: 'lucide:package-check',
				preferred: true,
				isExternal: true,
			},
		],
	},
	{
		title: 'Ubuntu / Debian',
		icon: 'simple-icons:ubuntu',
		links: [
			{
				label: 'Install APT repository',
				url: aptRepositoryUrl,
				icon: 'lucide:boxes',
				preferred: true,
				isExternal: true,
			},
			{
				label: '.deb (x64)',
				url: downloadUrl(`opentubex_${releaseVersion}_beta_amd64.deb`),
				icon: 'lucide:package',
			},
			{
				label: '.deb (arm64)',
				url: downloadUrl(`opentubex_${releaseVersion}_beta_arm64.deb`),
				icon: 'lucide:package',
			},
			{
				label: '.deb (armv7l)',
				url: downloadUrl(`opentubex_${releaseVersion}_beta_armv7l.deb`),
				icon: 'lucide:package',
			},
		],
	},
	{
		title: 'Fedora / Red Hat',
		icon: 'simple-icons:fedora',
		links: [
			{
				label: 'Install with COPR',
				url: coprRepositoryUrl,
				icon: 'lucide:boxes',
				preferred: true,
				isExternal: true,
			},
			{
				label: 'Install RPM repository',
				url: rpmRepositoryUrl,
				icon: 'lucide:boxes',
				preferred: true,
				isExternal: true,
			},
			{
				label: '.rpm (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta.amd64.rpm`),
				icon: 'lucide:package',
			},
			{
				label: '.rpm (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta.arm64.rpm`),
				icon: 'lucide:package',
			},
		],
	},
	{
		title: 'openSUSE',
		icon: 'simple-icons:opensuse',
		links: [
			{
				label: 'Install RPM repository',
				url: rpmRepositoryUrl,
				icon: 'lucide:boxes',
				preferred: true,
				isExternal: true,
			},
			{
				label: '.rpm (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta.amd64.rpm`),
				icon: 'lucide:package',
			},
			{
				label: '.rpm (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta.arm64.rpm`),
				icon: 'lucide:package',
			},
		],
	},
	{
		title: 'Arch Linux',
		icon: 'simple-icons:archlinux',
		links: [
			{
				label: 'AUR (opentubex-bin)',
				url: 'https://aur.archlinux.org/packages/opentubex-bin/',
				icon: 'simple-icons:archlinux',
				preferred: true,
				isExternal: true,
			},
			{
				label: 'AUR (opentubex)',
				url: 'https://aur.archlinux.org/packages/opentubex/',
				icon: 'simple-icons:archlinux',
				isExternal: true,
			},
			{
				label: '.pacman (x64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-amd64.pacman`),
				icon: 'lucide:package',
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
				icon: 'simple-icons:appimage',
			},
			{
				label: 'AppImage (arm64)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-arm64.AppImage`),
				icon: 'simple-icons:appimage',
			},
			{
				label: 'AppImage (armv7l)',
				url: downloadUrl(`opentubex-${releaseVersion}-beta-armv7l.AppImage`),
				icon: 'simple-icons:appimage',
			},
		],
	},
	{
		title: 'Flatpak',
		icon: 'simple-icons:flatpak',
		links: [
			{
				label: 'Install with OpenTubeX remote',
				url: flatpakSiteUrl,
				icon: 'simple-icons:flatpak',
				preferred: true,
				isExternal: true,
			},
			{
				label: 'Install with Flatpark',
				url: flatparkSiteUrl,
				icon: 'simple-icons:flatpak',
				isExternal: true,
			},
			{
				label: '.flatpak (x86_64)',
				url: `${flatpakReleaseBaseUrl}/org.opentubex.OpenTubeX-${releaseTag}-x86_64.flatpak`,
				icon: 'lucide:package',
				isExternal: true,
			},
			{
				label: '.flatpak (aarch64)',
				url: `${flatpakReleaseBaseUrl}/org.opentubex.OpenTubeX-${releaseTag}-aarch64.flatpak`,
				icon: 'lucide:package',
				isExternal: true,
			},
		],
	},
	{
		title: 'Snap',
		icon: 'simple-icons:snapcraft',
		links: [
			{
				label: 'Install from the Snap Store',
				url: snapSiteUrl,
				icon: 'simple-icons:snapcraft',
				preferred: true,
				isExternal: true,
			},
			{
				label: '.snap (amd64)',
				url: `${snapReleaseBaseUrl}/opentubex_${releaseVersion}_amd64.snap`,
				icon: 'lucide:package',
				isExternal: true,
			},
			{
				label: '.snap (arm64)',
				url: `${snapReleaseBaseUrl}/opentubex_${releaseVersion}_arm64.snap`,
				icon: 'lucide:package',
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
