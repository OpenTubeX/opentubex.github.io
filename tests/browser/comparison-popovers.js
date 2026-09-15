// Open /compare/ in agent-browser, then run:
// agent-browser eval "$(cat tests/browser/comparison-popovers.js)"
(async () => {
	const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
	const buttons = [...document.querySelectorAll('.support-button')];
	if (!buttons.length) throw new Error('Open the comparison page first.');
	let checked = 0;
	for (const index of [0, 5, buttons.length - 1]) {
		const button = buttons[index];
		const panel = document.getElementById(button.getAttribute('popovertarget'));
		for (const block of ['center', 'start']) {
			button.scrollIntoView({ block, inline: 'center', behavior: 'instant' });
			await frame();
			const samples = [];
			// Open immediately before a paint, then inspect every visible position.
			await new Promise(resolve => requestAnimationFrame(() => {
				button.click();
				capture();
				resolve();
			}));
			for (let i = 0; i < 4; i++) { await frame(); capture(); }
			if (!samples.length) throw new Error('Popup never became visible.');
			const final = samples.at(-1);
			if (samples.some(rect => Math.abs(rect.x - final.x) > 1 || Math.abs(rect.y - final.y) > 1)) {
				panel.hidePopover();
				throw new Error(`Popup visibly jumped: ${JSON.stringify(samples)}`);
			}
			if (final.x < 0 || final.right > innerWidth || final.y < 0 || final.bottom > innerHeight) {
				throw new Error(`Popup outside viewport: ${JSON.stringify(final)}`);
			}
			panel.hidePopover();
			await frame();
			checked++;
			function capture() {
				if (panel.matches(':popover-open') && getComputedStyle(panel).visibility === 'visible') {
					const { x, y, right, bottom } = panel.getBoundingClientRect();
					samples.push({ x, y, right, bottom });
				}
			}
		}
	}
	return `PASS: ${checked} first-open/reopen checks without a visible jump.`;
})()
