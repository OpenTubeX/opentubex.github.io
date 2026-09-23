export {};

document.querySelectorAll<HTMLSelectElement>('[data-jump-select]').forEach((select) => {
	select.addEventListener('change', () => {
		if (select.value.startsWith('/') && !select.value.startsWith('//')) {
			window.location.assign(select.value);
			return;
		}
		if (!select.value.startsWith('#')) return;
		const target = document.getElementById(decodeURIComponent(select.value.slice(1)));
		if (!target) return;

		// Native fragment navigation honors each target's scroll-margin-top.
		window.location.hash = select.value;
		target.tabIndex = -1;
		target.focus({ preventScroll: true });
	});
});
