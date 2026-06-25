// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://opentubex.org',
	integrations: [
		icon(),
		starlight({
			title: 'OpenTubeX',
			customCss: ['./src/styles/splash.css'],
			components: {
				Hero: './src/components/Hero.astro',
				PageFrame: './src/components/PageFrame.astro',
			},
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				alt: 'OpenTubeX',
				replacesTitle: true,
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/OpenTubeX/OpenTubeX' }],
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
