export {};

// Animated images become videos at build time; play them only while near the viewport.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const observer = new IntersectionObserver(
	(entries) => {
		for (const { target, isIntersecting } of entries) {
			const video = target as HTMLVideoElement;
			if (!isIntersecting) video.pause();
			else if (reduceMotion.matches) video.preload = 'metadata';
			else video.play().catch(() => (video.controls = true));
		}
	},
	{ rootMargin: '300px 0px' },
);

for (const video of document.querySelectorAll<HTMLVideoElement>('video.animation')) {
	video.controls = reduceMotion.matches;
	observer.observe(video);
}
