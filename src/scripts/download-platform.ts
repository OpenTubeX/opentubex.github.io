const platformTabs = document.querySelector<HTMLElement>('.sig-tabs[data-sync-key="download-platform"]');

const selectedTab = (root: Element | null | undefined) =>
	root?.querySelector<HTMLElement>(':scope > .sig-tabs__list > [aria-selected="true"]')?.dataset.tab;

/** Shows the nightly channels for the platform and Linux package chosen above. */
function syncNightlyPlatform() {
	const nightlyTabs = document.querySelector('#development .sig-tabs[data-sync-key="download-platform"]');
	const platform = selectedTab(platformTabs);
	const linuxPackage = selectedTab(platformTabs?.querySelector('.sig-tabs[data-sync-key="package-platform"]'));
	if (platform) nightlyTabs?.dispatchEvent(new CustomEvent('sig-tabs:select', { detail: platform }));
	if (linuxPackage) {
		nightlyTabs
			?.querySelector('.sig-tabs[data-sync-key="package-platform"]')
			?.dispatchEvent(new CustomEvent('sig-tabs:select', { detail: linuxPackage }));
	}
}

platformTabs?.addEventListener('sig-tabs:change', syncNightlyPlatform);

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

revealHash();
syncNightlyPlatform();
addEventListener('hashchange', revealHash);

