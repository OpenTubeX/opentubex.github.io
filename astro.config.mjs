// @ts-check
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import icon from 'astro-icon';
import remarkBundleGitHubImages from './src/plugins/remark-bundle-github-images.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://opentubex.org',
	trailingSlash: 'ignore',
	redirects: {
		'/download': '/downloads/',
		'/download/': '/downloads/',
		'/features': '/extra-features/',
		'/features/': '/extra-features/',
		'/feature': '/extra-features/',
		'/feature/': '/extra-features/',
		'/extra-feature': '/extra-features/',
		'/extra-feature/': '/extra-features/',
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
					'boxes',
					'code-xml',
					'compass',
					'download',
					'external-link',
					'eye-off',
					'file-archive',
					'hard-drive',
					'house',
					'layers',
					'list',
					'lock-keyhole',
					'moon',
					'package',
					'sliders-horizontal',
					'sparkles',
				],
				'simple-icons': [
					'appimage',
					'apple',
					'archlinux',
					'fedora',
					'flatpak',
					'fluxer',
					'github',
					'linux',
					'matrix',
					'opensuse',
					'ubuntu',
					'weblate',
					'windows',
				],
			},
		}),
		starlight({
			title: 'OpenTubeX',
			pagefind: false,
			customCss: ['./src/styles/theme.css'],
			// Night Owl Light collapses shell tokens; vitesse-light keeps command/flag/path contrast.
			expressiveCode: {
				themes: ['starlight-dark', 'vitesse-light'],
			},
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
					href: 'https://fluxer.opentubex.org',
				},
				{
					icon: 'matrix',
					label: 'Matrix',
					href: 'https://matrix.opentubex.org',
				},
			],
			sidebar: [],
		}),
	],
});
