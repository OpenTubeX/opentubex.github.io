export {};

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-email-reveal]')) {
	button.addEventListener('click', () => {
		const href = String.fromCharCode(...(button.dataset.emailReveal ?? '').split('.').map(value => parseInt(value, 19)));
		const link = document.createElement('a');
		link.href = href;
		link.textContent = href.slice('mailto:'.length).split('?')[0];
		button.replaceWith(link);
		link.focus();
	}, { once: true });
	button.hidden = false;
}
