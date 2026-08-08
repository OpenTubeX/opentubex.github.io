import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import fallbackData from '../data/changelog-releases.fallback.json';

const REPO = 'OpenTubeX/OpenTubeX';
const API = `https://api.github.com/repos/${REPO}/releases`;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_PATH = resolve('.cache/github-releases.json');

export type ChangelogRelease = {
	id: number;
	tag: string;
	name: string;
	url: string;
	publishedAt: string;
	body: string;
};

type CacheFile = {
	fetchedAt: number;
	releases: ChangelogRelease[];
};

type GithubRelease = {
	id: number;
	tag_name: string;
	name: string | null;
	html_url: string;
	published_at: string | null;
	body: string | null;
	draft: boolean;
	prerelease: boolean;
};

function readCache(): CacheFile | null {
	try {
		if (!existsSync(CACHE_PATH)) return null;
		const parsed = JSON.parse(readFileSync(CACHE_PATH, 'utf8')) as CacheFile;
		if (!parsed?.fetchedAt || !Array.isArray(parsed.releases)) return null;
		if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
		return parsed;
	} catch {
		return null;
	}
}

function writeCache(releases: ChangelogRelease[]) {
	mkdirSync(dirname(CACHE_PATH), { recursive: true });
	const payload: CacheFile = { fetchedAt: Date.now(), releases };
	writeFileSync(CACHE_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

function readFallback(): ChangelogRelease[] | null {
	return Array.isArray(fallbackData.releases) && fallbackData.releases.length
		? fallbackData.releases
		: null;
}

function readStaleCache(): ChangelogRelease[] | null {
	try {
		if (!existsSync(CACHE_PATH)) return null;
		const stale = JSON.parse(readFileSync(CACHE_PATH, 'utf8')) as CacheFile;
		if (Array.isArray(stale.releases) && stale.releases.length) return stale.releases;
		return null;
	} catch {
		return null;
	}
}

function authHeaders(): HeadersInit {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'User-Agent': 'opentubex.github.io-changelog',
		'X-GitHub-Api-Version': '2022-11-28',
	};
	const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
}

function isStableRelease(release: GithubRelease): boolean {
	if (release.draft || release.prerelease) return false;
	const tag = release.tag_name.toLowerCase();
	if (tag.includes('nightly')) return false;
	return true;
}

function mapRelease(release: GithubRelease): ChangelogRelease {
	return {
		id: release.id,
		tag: release.tag_name,
		name: release.name?.trim() || release.tag_name,
		url: release.html_url,
		publishedAt: release.published_at || '',
		body: release.body?.trim() || '',
	};
}

async function fetchFromGithub(): Promise<ChangelogRelease[]> {
	const releases: ChangelogRelease[] = [];
	let page = 1;

	while (page <= 10) {
		const response = await fetch(`${API}?per_page=100&page=${page}`, {
			headers: authHeaders(),
			signal: AbortSignal.timeout(30_000),
		});

		if (!response.ok) {
			throw new Error(`GitHub releases fetch failed (${response.status} ${response.statusText})`);
		}

		const batch = (await response.json()) as GithubRelease[];
		if (!batch.length) break;

		for (const release of batch) {
			if (isStableRelease(release)) releases.push(mapRelease(release));
		}

		if (batch.length < 100) break;
		page += 1;
	}

	return releases;
}

/** Stable (non-prerelease) releases, refreshed at most once per day at build time. */
export async function getChangelogReleases(): Promise<ChangelogRelease[]> {
	const cached = readCache();
	if (cached) return cached.releases;

	try {
		const releases = await fetchFromGithub();
		try {
			writeCache(releases);
		} catch (error) {
			console.warn(
				`[changelog] Could not update the releases cache (${error instanceof Error ? error.message : error}).`,
			);
		}
		return releases;
	} catch (error) {
		const stale = readStaleCache();
		if (stale) {
			console.warn(
				`[changelog] GitHub releases unavailable (${error instanceof Error ? error.message : error}); using stale cache.`,
			);
			return stale;
		}

		const fallback = readFallback();
		if (fallback) {
			console.warn(
				`[changelog] GitHub releases unavailable (${error instanceof Error ? error.message : error}); using committed fallback.`,
			);
			return fallback;
		}

		console.warn(
			`[changelog] GitHub releases unavailable (${error instanceof Error ? error.message : error}); building with an empty list.`,
		);
		return [];
	}
}

export function formatReleaseDate(iso: string): string {
	if (!iso) return '';
	return new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC',
	}).format(new Date(iso));
}
