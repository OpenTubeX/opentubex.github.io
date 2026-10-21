// @ts-check
import { fileURLToPath } from 'node:url';
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { generateJpegXl } from './src/plugins/jpeg-xl.mjs';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
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
				const [changelogCount, featureCount, animatedFeatureCount] = await Promise.all([
					copyCachedChangelogImages(distDirectory),
					copyReusedGitHubImages(distDirectory),
					copyExposedGitHubImages(distDirectory),
				]);
				const jpegXl = await generateJpegXl(distDirectory);
				console.log(`[images] Generated ${jpegXl.count} progressive JPEG XL alternatives (${jpegXl.savedBytes} net bytes saved)`);
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
					'server-cog',
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
