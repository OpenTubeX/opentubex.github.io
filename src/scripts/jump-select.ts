export {};

document.querySelectorAll<HTMLSelectElement>('[data-jump-select]').forEach((select) => {
	select.addEventListener('change', () => {
		if (!select.value.startsWith('#')) return;
		const target = document.getElementById(decodeURIComponent(select.value.slice(1)));
		if (!target) return;
		window.location.hash = select.value;
		target.tabIndex = -1;
		target.focus({ preventScroll: true });
		const navHeight = document.querySelector('.nav')?.getBoundingClientRect().height ?? 0;
		window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight - 16, behavior: 'instant' });
	});
});
