// @ts-check
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import remarkBundleGitHubImages from './src/plugins/remark-bundle-github-images.mjs';

/** Stable invite targets — update these when Fluxer/Matrix invite links change. */
const communityInvites = {
	fluxer: 'https://fluxer.gg/PHdJoM1G',
	matrix: 'https://matrix.to/#/#opentubex:matrix.org',
};

// https://astro.build/config
export default defineConfig({
	site: 'https://opentubex.org',
	redirects: {
		'/fluxer': communityInvites.fluxer,
		'/matrix': communityInvites.matrix,
	},
	markdown: {
		processor: unified({
			remarkPlugins: [remarkBundleGitHubImages],
		}),
	},
	integrations: [
		icon({
			include: {
				lucide: [
					'badge-info',
					'book-marked',
					'chart-no-axes-column',
					'clock',
					'columns-2',
					'download',
					'fast-forward',
					'gauge',
					'keyboard',
					'languages',
					'list-video',
					'message-square',
					'monitor-play',
					'picture-in-picture-2',
					'radio-tower',
					'refresh-cw',
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
				{
					// Starlight has no Fluxer icon; remapped to simple-icons:fluxer in SocialIcons.
					icon: 'discord',
					label: 'Fluxer',
					href: '/fluxer',
				},
				{
					icon: 'matrix',
					label: 'Matrix',
					href: '/matrix',
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
