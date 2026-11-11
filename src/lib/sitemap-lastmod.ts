import { execFileSync } from 'node:child_process';
import { getChangelogReleases } from './github-releases';

/** Content that a page renders from outside its own route file. */
const extraSources: Record<string, string[]> = {
	'/': ['src/data/release.ts'],
	'/demo/': ['src/data/release.ts'],
	'/docs/': ['src/content/guides'],
	'/downloads/': ['src/data/release.ts'],
	'/extra-features/': ['src/content/extra-features.md'],
	'/compare/': ['src/data/comparisons.ts'],
	'/privacy/': ['src/content/privacy.md'],
};

/** Source files whose last commit marks a page's last content change. */
export function pageSources(pathname: string): string[] {
	const route = pathname.replace(/^\/|\/$/g, '');
	const guide = route.match(/^docs\/(.+)$/)?.[1];
	if (guide) return [`src/content/guides/${guide}.md`];
	const pages = route ? [`src/pages/${route}.astro`, `src/pages/${route}/index.astro`] : ['src/pages/index.astro'];
	return [...pages, ...(extraSources[pathname] ?? [])];
}

function lastCommitDate(files: string[]): string | undefined {
	try {
		return execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], { encoding: 'utf8' }).trim() || undefined;
	} catch {
		// A throw would make @astrojs/sitemap skip the whole sitemap, so omit the date instead.
		return undefined;
	}
}

/** Needs full Git history; a shallow clone dates every page to the latest commit. */
export async function lastModified(pathname: string): Promise<string | undefined> {
	if (pathname === '/changelog/') {
		return (await getChangelogReleases()).map((release) => release.publishedAt).filter(Boolean).sort().at(-1);
	}
	return lastCommitDate(pageSources(pathname));
}
