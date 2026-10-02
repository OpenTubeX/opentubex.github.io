export {};

const toc = document.querySelector<HTMLElement>('.docs-layout .page-index');
const sections = Array.from(toc?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]') ?? [])
	.map((link) => {
		const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
		return heading ? { link, heading } : null;
	})
	.filter((section) => section !== null);

if (sections.length) {
	const select = toc?.querySelector<HTMLSelectElement>('[data-jump-select]');
	let active: HTMLAnchorElement | undefined;
	let scheduled = false;

	function update() {
		scheduled = false;
		const offset = parseFloat(getComputedStyle(sections[0].heading).scrollMarginTop) || 0;
		let current = sections[0];
		for (const section of sections) {
			if (section.heading.getBoundingClientRect().top <= offset + 1) current = section;
		}
		if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
			current = sections[sections.length - 1];
		}
		if (active === current.link) return;
		active = current.link;
		for (const { link } of sections) {
			link.classList.toggle('is-active', link === active);
			if (link === active) link.setAttribute('aria-current', 'location');
			else link.removeAttribute('aria-current');
		}
		if (select) select.value = active.hash;
	}

	function scheduleUpdate() {
		if (scheduled) return;
		scheduled = true;
		requestAnimationFrame(update);
	}

	window.addEventListener('scroll', scheduleUpdate, { passive: true });
	window.addEventListener('resize', scheduleUpdate);
	update();
}
