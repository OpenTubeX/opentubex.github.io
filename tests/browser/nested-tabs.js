// Run in the browser console or preview_evaluate on /downloads/.
(async () => {
	const outer = document.querySelector('.sig-tabs[data-sync-key="nightly-platform"]');
	const helpers = [...document.querySelectorAll('.sig-tabs[data-sync-key="aur-helper"]')];
	const inner = outer?.querySelector('.sig-tabs[data-sync-key="aur-helper"]');
	if (!inner) throw new Error('Open the downloads page with the nightly AUR helper tabs first.');
	const tabs = root => [...root.querySelectorAll(':scope > .sig-tabs__list > [role="tab"]')];
	const panels = root => [...root.querySelectorAll(':scope > .sig-tabs__panels > [role="tabpanel"]')];
	const selected = root => tabs(root).find(tab => tab.getAttribute('aria-selected') === 'true')?.dataset.tab;
	const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
	async function settle(root) {
		await Promise.all(root.querySelector(':scope > .sig-tabs__panels').getAnimations()
			.map(animation => animation.finished.catch(() => {})));
		await frame();
	}
	async function activate(root, id) {
		tabs(root).find(tab => tab.dataset.tab === id).click();
		await settle(root);
	}
	function check(root, id) {
		const visible = panels(root).filter(panel => !panel.hidden);
		if (selected(root) !== id || tabs(root).filter(tab => tab.getAttribute('aria-selected') === 'true').length !== 1 ||
			visible.length !== 1 || visible[0].dataset.panel !== id) {
			throw new Error(`Expected only ${id} to be selected and visible in ${root.dataset.syncKey}.`);
		}
	}
	const previousHelper = selected(inner);
	await activate(outer, 'arch');
	check(inner, previousHelper);
	for (const id of ['paru', 'yay', 'shelly']) {
		await activate(inner, id);
		check(outer, 'arch');
		for (const helper of helpers) check(helper, id);
		const panel = panels(inner).find(panel => panel.dataset.panel === id);
		const command = `${id} ${id === 'shelly' ? '-Ia' : '-S'} opentubex-nightly-bin`;
		if (!panel.innerText.includes(command) || !panel.getClientRects().length) {
			throw new Error(`The nightly ${id} command is not visible.`);
		}
	}
	tabs(inner).find(tab => tab.dataset.tab === 'shelly').dispatchEvent(
		new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
	);
	await settle(inner);
	check(inner, 'paru');
	check(outer, 'arch');
	if (document.activeElement?.dataset.tab !== 'paru') throw new Error('Helper keyboard focus escaped its tab group.');
	tabs(outer).find(tab => tab.dataset.tab === 'arch').dispatchEvent(
		new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
	);
	await settle(outer);
	check(outer, 'android');
	check(inner, 'paru');
	await activate(outer, 'arch');
	check(inner, 'paru');
	await activate(helpers.find(helper => helper !== inner), 'yay');
	check(inner, 'yay');
	check(outer, 'arch');
	return 'PASS: nested helper selection, commands, synchronization, keyboard navigation and platform round trip.';
})()
