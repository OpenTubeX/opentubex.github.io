// @ts-check
import { fileURLToPath } from 'node:url';
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import rehypeFeatureSections from './src/plugins/rehype-feature-sections.mjs';
import remarkBundleGitHubImages, {
	clearExposedGitHubImages,
	copyExposedGitHubImages,
	copyReusedGitHubImages,
} from './src/plugins/remark-bundle-github-images.mjs';
import { copyCachedChangelogImages } from './src/plugins/remark-cache-changelog-images.mjs';

/** Copy reused images into dist after Astro's early public/ copy. */
const featureImageOptions = { command: 'build' };

function cachedImages() {
	return {
		name: 'opentubex-cached-images',
		hooks: {
			'astro:config:setup': async ({ command }) => {
				featureImageOptions.command = command;
				await clearExposedGitHubImages();
			},
			'astro:build:done': async ({ dir }) => {
				const distDirectory = fileURLToPath(dir);
				const [changelogCount, featureCount, animatedFeatureCount] = await Promise.all([
					copyCachedChangelogImages(distDirectory),
					copyReusedGitHubImages(distDirectory),
					copyExposedGitHubImages(distDirectory),
				]);
				if (changelogCount > 0) {
					console.log(
						`[changelog] Copied ${changelogCount} cached image(s) into dist/changelog-images`,
					);
				}
				if (featureCount > 0) {
					console.log(`[features] Reused ${featureCount} image(s) from the previous deployment`);
				}
				if (animatedFeatureCount > 0) {
					console.log(`[features] Copied ${animatedFeatureCount} animated image(s) into dist`);
				}
			},
		},
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://opentubex.org',
	trailingSlash: 'ignore',
	redirects: {
		'/download': '/downloads/',
		'/favicon.ico': '/favicon.svg',
		'/features': '/extra-features/',
		'/feature': '/extra-features/',
		'/extra-feature': '/extra-features/',
	},
	markdown: {
		processor: unified({
			remarkPlugins: [[remarkBundleGitHubImages, featureImageOptions]],
			rehypePlugins: [rehypeFeatureSections],
		}),
	},
	integrations: [
		cachedImages(),
		expressiveCode(),
		sitemap(),
		icon({
			include: {
				lucide: [
					'boxes',
					'captions',
					'chart-column',
					'circle-play',
					'copy',
					'code-xml',
					'compass',
					'download',
					'external-link',
					'eye-off',
					'file-archive',
					'hard-drive',
					'headphones',
					'history',
					'house',
					'layers',
					'list',
					'lock-keyhole',
					'monitor',
					'moon',
					'package',
					'package-check',
					'panels-top-left',
					'picture-in-picture-2',
					'refresh-cw',
					'rss',
					'skip-forward',
					'sliders-horizontal',
					'smartphone',
					'sparkles',
					'star',
					'terminal',
					'triangle-alert',
				],
				'simple-icons': [
					'alternativeto',
					'android',
					'appimage',
					'apple',
					'archlinux',
					'fedora',
					'fdroid',
					'flatpak',
					'fluxer',
					'github',
					'githubactions',
					'linux',
					'matrix',
					'nixos',
					'opensuse',
					'snapcraft',
					'ubuntu',
					'weblate',
					'windows',
				],
			},
		}),
	],
});
