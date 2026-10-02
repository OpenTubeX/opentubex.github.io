export {};

document.querySelectorAll<HTMLSelectElement>('[data-jump-select]').forEach((select) => {
	select.addEventListener('change', () => {
		const href = select.value;
		if (href.startsWith('/') && !href.startsWith('//')) {
			const links = select.closest('nav')?.querySelectorAll<HTMLAnchorElement>('a[href]');
			const link = Array.from(links ?? []).find((link) => link.getAttribute('href') === href);
			if (link?.origin === window.location.origin) link.click();
			return;
		}
		if (!href.startsWith('#')) return;
		const target = document.getElementById(decodeURIComponent(href.slice(1)));
		if (!target) return;

		// Native fragment navigation honors each target's scroll-margin-top.
		window.location.hash = href;
		target.tabIndex = -1;
		target.focus({ preventScroll: true });
	});
});
