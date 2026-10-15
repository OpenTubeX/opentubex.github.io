import { recommendedDownload, type CpuArchitecture } from '../data/release';
import { detectOS } from '../lib/detect-os';

const os = detectOS(navigator);

/** Opens every tab panel around the element, outermost first. */
function reveal(element: Element | null) {
	const panels: HTMLElement[] = [];
	for (let panel = element?.closest<HTMLElement>('.sig-tabs__panel'); panel; panel = panel.parentElement?.closest('.sig-tabs__panel')) {
		panels.unshift(panel);
	}
	panels.forEach((panel) => {
		if (panel.hidden) panel.closest('.sig-tabs')?.dispatchEvent(new CustomEvent('sig-tabs:select', { detail: panel.dataset.panel }));
	});
	return panels.length > 0;
}

function revealHash() {
	const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
	if (target && reveal(target)) target.scrollIntoView();
}

async function detectArchitecture(): Promise<CpuArchitecture> {
	const { userAgentData } = navigator as Navigator & {
		userAgentData?: { getHighEntropyValues(hints: string[]): Promise<{ architecture?: string }> };
	};
	try {
		const { architecture } = (await userAgentData?.getHighEntropyValues(['architecture'])) ?? {};
		return architecture === 'arm' || architecture === 'x86' ? architecture : null;
	} catch {
		return null;
	}
}

revealHash();
addEventListener('hashchange', revealHash);

// Platforms without a direct download send the hero button to the chooser, so open the visitor's tab there.
document.querySelector('[data-os-download]')?.addEventListener('click', () => {
	if (!os) return;
	document
		.querySelector('.sig-tabs[data-sync-key="download-platform"]')
		?.dispatchEvent(new CustomEvent('sig-tabs:select', { detail: os.toLowerCase() }));
});

// The inline hero script assumed the default architecture; correct it where the browser reports the CPU.
if (os) {
	void detectArchitecture().then((architecture) => {
		const download = recommendedDownload(os, architecture);
		const link = document.querySelector<HTMLAnchorElement>('[data-os-download]');
		const detail = document.querySelector<HTMLElement>('[data-os-download-detail]');
		if (download && link && detail) {
			link.href = download.url;
			detail.textContent = download.label;
		}
	});
}
