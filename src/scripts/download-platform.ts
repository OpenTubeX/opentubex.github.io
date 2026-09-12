import { detectOS } from '../lib/detect-os';

const os = detectOS(navigator);
const targets = {
	Windows: '#download-windows',
	macOS: '#download-macos',
	Linux: '#download-ubuntu-debian',
	Android: '#download-android',
} as const;

if (os && os !== 'iOS') {
	document.querySelectorAll<HTMLAnchorElement>('[data-os-download]').forEach((link) => {
		const label = link.querySelector<HTMLElement>('[data-os-download-label]');
		if (!label) return;
		const url = new URL(link.href);
		url.hash = targets[os];
		link.href = url.href;
		label.textContent = `Download for ${os}`;
	});
}
