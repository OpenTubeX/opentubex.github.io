import { downloadRoutes } from './routes';
import { indexPage } from './index-page';

type ReleaseCache = Pick<Cache, 'match' | 'put'>;
type FetchRelease = (request: Request) => Promise<Response>;

function releaseTag(location: string | null, repository: string): string {
	if (!location) throw new Error('Missing release redirect');
	const url = new URL(location, 'https://github.com');
	const prefix = `/${repository}/releases/tag/`;
	if (url.origin !== 'https://github.com' || !url.pathname.startsWith(prefix) || url.search || url.hash) {
		throw new Error('Invalid release redirect');
	}
	const tag = url.pathname.slice(prefix.length);
	if (!/^v?\d+\.\d+\.\d+(?:-beta)?$/.test(tag)) throw new Error('Invalid release tag');
	return tag;
}

export async function handleDownload(
	request: Request,
	cache: ReleaseCache,
	fetchRelease: FetchRelease = fetch,
): Promise<Response> {
	const respond = (status: number, body: string | null, headers: Record<string, string> = {}) =>
		new Response(request.method === 'HEAD' ? null : body, {
			status,
			headers: { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8', ...headers },
		});
	if (request.method !== 'GET' && request.method !== 'HEAD') {
		return respond(405, 'Use GET or HEAD.\n', { Allow: 'GET, HEAD' });
	}

	const path = new URL(request.url).pathname.replace(/\/$/, '');
	if (path === '') return respond(200, indexPage, {
		'Content-Type': 'text/html; charset=utf-8',
		'Cache-Control': 'public, max-age=300',
		'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
	});
	const route = downloadRoutes.get(path);
	if (!route) return respond(404, 'Unknown download. See https://opentubex.org/downloads/\n');

	// GitHub's public redirect avoids the shared unauthenticated API rate limit.
	const cacheKey = new Request(`https://github.com/${route.repository}/releases/latest`);
	let tag: string;
	try {
		const cached = await cache.match(cacheKey);
		if (cached) {
			tag = releaseTag(await cached.text(), route.repository);
		} else {
			const response = await fetchRelease(new Request(cacheKey, {
				method: 'HEAD',
				redirect: 'manual',
				signal: AbortSignal.timeout(10_000),
			}));
			if (response.status !== 302) throw new Error(`GitHub returned ${response.status}`);
			const location = response.headers.get('Location');
			tag = releaseTag(location, route.repository);
			await cache.put(cacheKey, new Response(location, { headers: { 'Cache-Control': 'public, max-age=300' } }));
		}
	} catch {
		return respond(503, 'Release information is temporarily unavailable. Please try again.\n', { 'Retry-After': '60' });
	}

	const location = `https://github.com/${route.repository}/releases/download/${tag}/${route.assetName(tag)}`;
	return respond(302, null, { Location: location });
}
