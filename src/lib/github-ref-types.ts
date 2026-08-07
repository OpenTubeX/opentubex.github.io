import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OWNER = 'OpenTubeX';
const REPO = 'OpenTubeX';
const CACHE_PATH = join(dirname(fileURLToPath(import.meta.url)), '../../.cache/github-ref-types.json');

export type GithubRefKind = 'issue' | 'pull';

type CacheFile = {
	types: Record<string, GithubRefKind>;
};

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

function readCache(): Record<string, GithubRefKind> {
	try {
		if (!existsSync(CACHE_PATH)) return {};
		const parsed = JSON.parse(readFileSync(CACHE_PATH, 'utf8')) as CacheFile;
		return parsed?.types && typeof parsed.types === 'object' ? parsed.types : {};
	} catch {
		return {};
	}
}

function writeCache(types: Record<string, GithubRefKind>) {
	mkdirSync(dirname(CACHE_PATH), { recursive: true });
	writeFileSync(CACHE_PATH, `${JSON.stringify({ types }, null, 2)}\n`, 'utf8');
}

function collectRefNumbers(text: string): number[] {
	const numbers = new Set<number>();
	for (const match of text.matchAll(/#(\d+)\b/g)) {
		numbers.add(Number(match[1]));
	}
	for (const match of text.matchAll(
		/https:\/\/github\.com\/OpenTubeX\/OpenTubeX\/(?:issues|pull)\/(\d+)/gi,
	)) {
		numbers.add(Number(match[1]));
	}
	return [...numbers].sort((a, b) => a - b);
}

async function fetchRefKind(number: number): Promise<GithubRefKind> {
	// Issues API returns both issues and PRs; PRs include a `pull_request` field.
	const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${number}`, {
		headers: authHeaders(),
	});

	if (response.status === 404) return 'issue';
	if (!response.ok) {
		throw new Error(`GitHub issue lookup failed for #${number} (${response.status})`);
	}

	const payload = (await response.json()) as { pull_request?: unknown };
	return payload.pull_request ? 'pull' : 'issue';
}

async function fetchRefKinds(numbers: number[]): Promise<Record<string, GithubRefKind>> {
	const resolved: Record<string, GithubRefKind> = {};
	const concurrency = 6;

	for (let index = 0; index < numbers.length; index += concurrency) {
		const batch = numbers.slice(index, index + concurrency);
		const results = await Promise.all(
			batch.map(async (number) => {
				try {
					return [String(number), await fetchRefKind(number), true] as const;
				} catch (error) {
					console.warn(`[changelog] ${error instanceof Error ? error.message : error}`);
					return [String(number), 'issue' as const, false] as const;
				}
			}),
		);
		for (const [key, kind, confirmed] of results) {
			if (confirmed) resolved[key] = kind;
		}
	}

	return resolved;
}

/** Resolve whether OpenTubeX #N refs are issues or pull requests (cached on disk). */
export async function resolveGithubRefTypes(markdownBodies: string[]): Promise<Map<number, GithubRefKind>> {
	const wanted = new Set<number>();
	for (const body of markdownBodies) {
		for (const number of collectRefNumbers(body)) wanted.add(number);
	}

	const cached = readCache();
	const missing = [...wanted].filter((number) => !cached[String(number)]);

	if (missing.length) {
		const fetched = await fetchRefKinds(missing);
		Object.assign(cached, fetched);
		writeCache(cached);
	}

	const map = new Map<number, GithubRefKind>();
	for (const number of wanted) {
		map.set(number, cached[String(number)] ?? 'issue');
	}
	return map;
}
