// Run in the browser console on /downloads/.
(() => {
	const platform = document.querySelector('.sig-tabs[data-sync-key="download-platform"]');
	const linux = platform?.querySelector('.sig-tabs[data-sync-key="package-platform"]');
	const nightly = document.querySelector('#development .sig-tabs[data-sync-key="package-platform"]');
	if (!platform || !linux || !nightly) throw new Error('Open the downloads page first.');
	const tab = (root, id) => root.querySelector(`:scope > .sig-tabs__list > [data-tab="${id}"]`);
	function check(id) {
		const selected = nightly.querySelector(':scope > .sig-tabs__list > [aria-selected="true"]');
		const visible = [...nightly.querySelectorAll(':scope > .sig-tabs__panels > [role="tabpanel"]')]
			.filter(panel => !panel.hidden);
		if (selected?.dataset.tab !== id || visible.length !== 1 || visible[0].dataset.panel !== id) {
			throw new Error(`Expected nightly ${id}, got ${selected?.dataset.tab}.`);
		}
	}
	tab(platform, 'linux').click();
	tab(linux, 'debian').click();
	check('debian');
	tab(platform, 'android').click();
	check('android');
	tab(platform, 'android').dispatchEvent(new KeyboardEvent('keydown', {
		key: 'ArrowRight', bubbles: true, cancelable: true,
	}));
	check('ios');
	if (document.activeElement !== tab(platform, 'ios')) throw new Error('Platform keyboard focus moved.');
	tab(platform, 'linux').click();
	check('debian');
	tab(linux, 'snap').click();
	check('snap');
	tab(platform, 'ios').click();
	check('ios');
	for (const id of ['windows', 'macos']) {
		tab(platform, id).click();
		check('ios');
	}
	return 'PASS: Android, iOS, keyboard selection, Linux round trip and package synchronization.';
})()
