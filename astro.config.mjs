// @ts-check
import { fileURLToPath } from 'node:url';
import { unified } from '@astrojs/markdown-remark';
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import { convertAnimatedImages } from './src/plugins/animated-video.mjs';
import rehypeFeatureSections from './src/plugins/rehype-feature-sections.mjs';
import rehypeObfuscateEmail from './src/plugins/rehype-obfuscate-email.mjs';
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
				const [changelogCount, featureCount, exposedFeatureCount] = await Promise.all([
					copyCachedChangelogImages(distDirectory),
					copyReusedGitHubImages(distDirectory),
					copyExposedGitHubImages(distDirectory),
				]);
				const videos = await convertAnimatedImages(distDirectory);
				console.log(`[images] Replaced ${videos.count} animated image(s) with video (${videos.savedBytes} bytes saved)`);
				if (changelogCount > 0) {
					console.log(
						`[changelog] Copied ${changelogCount} cached image(s) into dist/changelog-images`,
					);
				}
				if (featureCount > 0) {
					console.log(`[features] Reused ${featureCount} image(s) from the previous deployment`);
				}
				if (exposedFeatureCount > 0) {
					console.log(`[features] Copied ${exposedFeatureCount} unprocessed image(s) into dist`);
				}
			},
		},
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://opentubex.org',
	trailingSlash: 'ignore',
	// GitHub Pages caches assets for only 10 minutes, so separate stylesheets mostly add a render-blocking round trip.
	build: { inlineStylesheets: 'always' },
	// Self-hosted with metric-matched fallbacks so late font swaps do not shift the layout.
	fonts: [
		{ provider: fontProviders.bunny(), name: 'IBM Plex Sans', cssVariable: '--font-body', weights: [400, 500, 600], styles: ['normal'] },
		{ provider: fontProviders.bunny(), name: 'Space Grotesk', cssVariable: '--font-display', weights: [500, 600, 700], styles: ['normal'] },
		{ provider: fontProviders.bunny(), name: 'IBM Plex Mono', cssVariable: '--font-mono', weights: [400, 500], styles: ['normal'], fallbacks: ['ui-monospace', 'monospace'] },
	],
	redirects: {
		'/download': '/downloads/',
		'/install': '/docs/installing/',
		'/installation': '/docs/installing/',
		'/documentation': '/docs/',
		'/guides': '/docs/',
		'/releases': '/changelog/',
		'/release-notes': '/changelog/',
		'/comparison': '/compare/',
		'/comparisons': '/compare/',
		'/privacy-policy': '/privacy/',
		'/features': '/extra-features/',
		'/feature': '/extra-features/',
		'/extra-feature': '/extra-features/',
	},
	markdown: {
		processor: unified({
			remarkPlugins: [[remarkBundleGitHubImages, featureImageOptions]],
			rehypePlugins: [rehypeFeatureSections, rehypeObfuscateEmail],
		}),
	},
	integrations: [
		cachedImages(),
		expressiveCode(),
		sitemap(),
		icon({
			include: {
				lucide: [
					'book-open',
					'boxes',
					'bug',
					'captions',
					'cast',
					'chart-column',
					'chevron-right',
					'circle-play',
					'clapperboard',
					'copy',
					'code-xml',
					'columns-2',
					'compass',
					'database-backup',
					'download',
					'external-link',
					'eye-off',
					'file-archive',
					'hard-drive',
					'hard-drive-download',
					'headphones',
					'history',
					'house',
					'layers',
					'list',
					'list-filter',
					'list-video',
					'lock-keyhole',
					'monitor',
					'moon',
					'package',
					'package-check',
					'panels-top-left',
					'picture-in-picture-2',
					'refresh-cw',
					'search',
					'rss',
					'scale',
					'server',
					'shield-alert',
					'skip-forward',
					'sliders-horizontal',
					'smartphone',
					'sparkles',
					'star',
					'terminal',
					'timer',
					'triangle-alert',
					'users',
					'x',
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
