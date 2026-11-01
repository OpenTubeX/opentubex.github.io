// Run in the browser console or preview_evaluate on /downloads/.
(async () => {
	const platform = document.querySelector('.sig-tabs[data-sync-key="download-platform"]');
	const nightly = document.querySelector('#development .sig-tabs[data-sync-key="package-platform"]');
	if (!platform || !nightly) throw new Error('Open the downloads page first.');
	const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
	const tab = (root, id) => root.querySelector(`:scope > .sig-tabs__list > [data-tab="${id}"]`);
	const list = nightly.querySelector(':scope > .sig-tabs__list');
	// Outlasts the tab height transition and the scroll reveal of package sections, which starts a
	// few frames after scrolling.
	async function settle() {
		for (let i = 0; i < 60; i++) await frame();
	}
	// Show the stable Linux packages, which sync with the nightly tabs further down.
	tab(platform, 'linux').click();
	const results = [];
	for (const [label, scroll] of [
		['page bottom', () => document.documentElement.scrollHeight],
		['mid viewport', () => scrollY + list.getBoundingClientRect().top - innerHeight / 2],
	]) {
		tab(nightly, 'opensuse').click();
		await settle();
		window.scrollTo({ top: scroll(), behavior: 'instant' });
		await settle();
		const before = list.getBoundingClientRect().top;
		tab(nightly, 'arch').click();
		await settle();
		const shift = list.getBoundingClientRect().top - before;
		if (Math.abs(shift) > 1.5) throw new Error(`Nightly tabs moved ${shift}px on screen (${label}).`);
		results.push(label);
	}
	return `PASS: nightly tabs stay in place when synced tabs above change height (${results.join(', ')}).`;
})()
