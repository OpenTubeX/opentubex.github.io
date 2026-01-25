// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://opentubex.org',
	integrations: [
		starlight({
			title: 'OpenTubeX',
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
