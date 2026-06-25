// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://opentubex.org',
	integrations: [
		icon({
			include: {
				lucide: [
					'book-marked',
					'clock',
					'columns-2',
					'fast-forward',
					'gauge',
					'keyboard',
					'languages',
					'message-square',
					'monitor-play',
					'picture-in-picture-2',
					'repeat',
					'search',
					'skip-forward',
					'sliders-horizontal',
					'terminal',
					'thumbs-down',
					'upload',
					'users',
					'volume-2',
				],
			},
		}),
		starlight({
			title: 'OpenTubeX',
			pagefind: false,
			customCss: ['./src/styles/splash.css'],
			components: {
				Hero: './src/components/Hero.astro',
				PageFrame: './src/components/PageFrame.astro',
				SocialIcons: './src/components/SocialIcons.astro',
			},
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				alt: 'OpenTubeX',
				replacesTitle: true,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/OpenTubeX/OpenTubeX' },
				{
					icon: 'translate',
					label: 'Weblate',
					href: 'https://weblate.d3sox.me/engage/opentubex/',
				},
			],
			sidebar: [
				{
					label: 'Pages',
					items: [
						{ label: 'Downloads', slug: 'downloads' },
						{ label: 'Extra Features', slug: 'extra-features' },
					],
				},
			],
		}),
	],
});
