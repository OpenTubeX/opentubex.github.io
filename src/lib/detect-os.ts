export type OperatingSystem = 'Windows' | 'macOS' | 'Linux' | 'Android' | 'iOS' | null;

export function detectOS({ userAgent, platform, maxTouchPoints = 0 }: {
	userAgent: string;
	platform: string;
	maxTouchPoints?: number;
}): OperatingSystem {
	if (/iPhone|iPad|iPod/i.test(userAgent) || (/Mac/i.test(platform) && maxTouchPoints > 1)) return 'iOS';
	if (/Android/i.test(userAgent)) return 'Android';
	// ChromeOS exposes Linux in some platform strings but cannot run desktop builds directly.
	if (/CrOS/i.test(userAgent)) return null;
	if (/Windows/i.test(userAgent) || /^Win/i.test(platform)) return 'Windows';
	if (/Macintosh|Mac OS X/i.test(userAgent) || /Mac/i.test(platform)) return 'macOS';
	if (/Linux/i.test(userAgent) || /Linux/i.test(platform)) return 'Linux';
	return null;
}

export type LinuxDistro = 'debian' | 'fedora' | 'opensuse' | null;

/** Some Linux browsers, such as distro-packaged Firefox, name the distribution in the user agent. */
export function detectLinuxDistro(userAgent: string): LinuxDistro {
	if (/Ubuntu|Debian|Mint/i.test(userAgent)) return 'debian';
	if (/Fedora|Red Hat/i.test(userAgent)) return 'fedora';
	if (/SUSE/i.test(userAgent)) return 'opensuse';
	return null;
}
