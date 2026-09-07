export {};

const search = document.querySelector<HTMLInputElement>('#feature-search');
const form = document.querySelector<HTMLElement>('.feature-search');
const status = document.querySelector<HTMLElement>('[data-search-status]');
const empty = document.querySelector<HTMLElement>('[data-search-empty]');

if (search && form && status && empty) {
	const features = [...document.querySelectorAll<HTMLElement>('.feature-entry')].map((element) => ({
		element,
		id: element.querySelector('h3')?.id,
		text: (element.textContent ?? '').toLocaleLowerCase().replace(/\s+/g, ' '),
	}));
	const categories = [...document.querySelectorAll<HTMLElement>('.feature-category')];
	const links = [...document.querySelectorAll<HTMLAnchorElement>('.page-index a')];
	const options = [...document.querySelectorAll<HTMLOptionElement>('.page-index option[value^="#"]')];
	const filter = () => {
		const terms = search.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
		const matches = new Set<string>();
		features.forEach(({ element, id, text }) => {
			element.hidden = !terms.every((term) => text.includes(term));
			if (!element.hidden && id) matches.add(id);
		});
		categories.forEach((category) => {
			category.hidden = !category.querySelector('.feature-entry:not([hidden])');
		});
		links.forEach((link) => { if (link.parentElement) link.parentElement.hidden = !matches.has(decodeURIComponent(link.hash.slice(1))); });
		options.forEach((option) => { option.hidden = !matches.has(decodeURIComponent(option.value.slice(1))); });
		document.querySelectorAll<HTMLElement>('.page-index__group').forEach((group) => {
			group.hidden = !group.querySelector('li:not([hidden])');
			if (terms.length && group instanceof HTMLDetailsElement && !group.hidden) group.open = true;
		});
		document.querySelectorAll<HTMLOptGroupElement>('.page-index optgroup').forEach((group) => { group.hidden = !group.querySelector('option:not([hidden])'); });
		status.textContent = `${matches.size} of ${features.length} features`;
		empty.hidden = matches.size > 0;
	};
	search.addEventListener('input', filter);
	const revealHash = () => {
		const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
		if (target?.closest('[hidden]')) {
			search.value = '';
			filter();
		}
		if (target?.closest('.feature-category')) {
			target.scrollIntoView();
		}
	};
	window.addEventListener('hashchange', revealHash);
	form.hidden = false;
	filter();
	revealHash();
}
