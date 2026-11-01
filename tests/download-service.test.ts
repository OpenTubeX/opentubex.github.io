import { expect, test } from 'bun:test';
import { downloadGroups } from '../src/data/release';
import { downloadRoutes } from '../download-service/routes';
import { handleDownload } from '../download-service/redirect';

function fixture(tag = 'v0.36.1-beta') {
	let now = 0;
	const entries = new Map<string, { response: Response; expires: number }>();
	const requests: Request[] = [];
	const cache = {
		async match(request: RequestInfo | URL) {
			const entry = entries.get(new Request(request).url);
			return entry && now < entry.expires ? entry.response.clone() : undefined;
		},
		async put(request: RequestInfo | URL, response: Response) {
			const seconds = Number(response.headers.get('Cache-Control')?.match(/max-age=(\d+)/)?.[1] ?? 0);
			entries.set(new Request(request).url, { response: response.clone(), expires: now + seconds * 1000 });
		},
	};
	let upstream: Response | Error | undefined;
	return {
		requests,
		advanceTime(ms: number) { now += ms; },
		setTag(value: string) { tag = value; },
		setUpstream(value: Response | Error) { upstream = value; },
		request(path = '/linux/appimage-x64', method = 'GET') {
			return handleDownload(new Request(`https://download.opentubex.org${path}`, { method }), cache, async (request) => {
				requests.push(request);
				if (upstream instanceof Error) throw upstream;
				return upstream?.clone() ?? new Response(null, {
					status: 302,
					headers: { Location: request.url.replace(/latest$/, `tag/${tag}`) },
				});
			});
		},
	};
}

test('every direct package on the website has exactly one stable route', () => {
	const covered = new Set<string>();
	for (const link of downloadGroups.flatMap(({ links }) => links)) {
		const match = link.url.match(/^https:\/\/github.com\/(OpenTubeX\/[^/]+)\/releases\/download\/([^/]+)\/(.+)$/);
		if (!match) continue;
		const routes = [...downloadRoutes].filter(([, route]) => route.repository === match[1] && route.assetName(match[2]) === match[3]);
		expect(routes.length, link.url).toBe(1);
		covered.add(routes[0][0]);
	}
	expect([...covered].sort()).toEqual([...downloadRoutes.keys()].sort());
});

test('uses the public latest-release redirect without GitHub API authentication or rate limits', async () => {
	const service = fixture('v0.37.0-beta');
	const response = await service.request();
	expect(response.status).toBe(302);
	expect(response.headers.get('Location')).toBe('https://github.com/OpenTubeX/OpenTubeX/releases/download/v0.37.0-beta/opentubex-0.37.0-beta-amd64.AppImage');
	expect(response.headers.get('Cache-Control')).toBe('no-store');
	expect(service.requests[0].url).toBe('https://github.com/OpenTubeX/OpenTubeX/releases/latest');
	expect(service.requests[0].method).toBe('HEAD');
	expect(service.requests[0].redirect).toBe('manual');
	expect(service.requests[0].headers.has('Authorization')).toBe(false);
});

test.each([
	['/linux/appimage-x64', 'opentubex-1.0.0-amd64.AppImage'],
	['/linux/deb-arm64', 'opentubex_1.0.0_arm64.deb'],
	['/android/apk-universal', 'org.opentubex.app-1.0.0.apk'],
	['/android/apk-lite-arm64-v8a', 'org.opentubex.app-1.0.0-lite-arm64-v8a.apk'],
	['/ios/ipa-unsigned', 'opentubex-1.0.0-ios-unsigned.ipa'],
])('accepts release names after beta ends: %s', async (path, name) => {
	expect((await fixture('v1.0.0').request(path)).headers.get('Location')).toEndWith(`/v1.0.0/${name}`);
});

test('HEAD, trailing slashes and query strings resolve to the same download', async () => {
	const service = fixture();
	const first = await service.request();
	const head = await service.request('/linux/appimage-x64/?source=website', 'HEAD');
	expect(head.status).toBe(302);
	expect(head.headers.get('Location')).toBe(first.headers.get('Location'));
	expect(await head.text()).toBe('');
	expect(service.requests).toHaveLength(1);
});

test('shares cached release tags across architectures, then refreshes after five minutes', async () => {
	const service = fixture();
	await service.request();
	expect((await service.request('/linux/appimage-arm64')).status).toBe(302);
	service.setTag('v0.37.0-beta');
	service.advanceTime(299_000);
	expect((await service.request()).headers.get('Location')).toContain('0.36.1');
	expect(service.requests).toHaveLength(1);
	service.advanceTime(1_000);
	expect((await service.request()).headers.get('Location')).toContain('0.37.0');
	expect(service.requests).toHaveLength(2);
});

test.each([
	['/linux/flatpak-x64', 'flatpak', 'org.opentubex.OpenTubeX-v0.36.1-beta-x86_64.flatpak'],
	['/linux/snap-arm64', 'snap', 'opentubex_0.36.1_arm64.snap'],
])('resolves %s from its own repository', async (path, repository, name) => {
	const service = fixture();
	const response = await service.request(path);
	expect(response.status).toBe(302);
	expect(response.headers.get('Location')).toBe(`https://github.com/OpenTubeX/${repository}/releases/download/v0.36.1-beta/${name}`);
	expect(service.requests[0].url).toBe(`https://github.com/OpenTubeX/${repository}/releases/latest`);
});

test('isolates release caches by repository', async () => {
	const service = fixture();
	await service.request();
	service.setTag('v0.36.2-beta');
	expect((await service.request('/linux/snap-x64')).headers.get('Location')).toContain('0.36.2');
	expect((await service.request()).headers.get('Location')).toContain('0.36.1');
	expect(service.requests).toHaveLength(2);
});

test('root lists every supported download without calling GitHub', async () => {
	const service = fixture();
	const response = await service.request('/');
	expect(response.status).toBe(200);
	expect(response.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
	const html = await response.text();
	for (const path of downloadRoutes.keys()) {
		expect(html).toContain(`href="https://download.opentubex.org${path}"`);
	}
	expect(html).toContain('curl -fL');
	expect(html).toContain('wget -O');
	expect(html).not.toContain('<script');
	expect(await (await service.request('/', 'HEAD')).text()).toBe('');
	expect(service.requests).toHaveLength(0);
});

test.each(['/linux/appimage-nope', '/__proto__', '/constructor', '/https://example.com'])('rejects unknown route %s without calling GitHub', async (path) => {
	const service = fixture();
	expect((await service.request(path)).status).toBe(404);
	expect(service.requests).toHaveLength(0);
});

test('rejects unsupported methods', async () => {
	const service = fixture();
	const response = await service.request('/linux/appimage-x64', 'POST');
	expect(response.status).toBe(405);
	expect(response.headers.get('Allow')).toBe('GET, HEAD');
	expect(service.requests).toHaveLength(0);
});

test.each([200, 403, 404, 429, 500])('handles GitHub HTTP %i without caching errors', async (status) => {
	const service = fixture();
	service.setUpstream(new Response(null, { status }));
	const response = await service.request();
	expect(response.status).toBe(503);
	expect(response.headers.get('Retry-After')).toBe('60');
	expect(response.headers.get('Cache-Control')).toBe('no-store');
	expect(response.headers.has('Location')).toBe(false);
	await service.request();
	expect(service.requests).toHaveLength(2);
});

test.each([
	'https://evil.example/OpenTubeX/OpenTubeX/releases/tag/v0.36.1-beta',
	'https://github.com/other/repo/releases/tag/v0.36.1-beta',
	'https://github.com/OpenTubeX/OpenTubeX/releases/tag/nightly',
	'https://github.com/OpenTubeX/OpenTubeX/releases/tag/v0.36.1-beta?download=bad',
	'https://github.com/OpenTubeX/OpenTubeX/releases/tag/v0.36.1-beta#bad',
	'https://github.com/OpenTubeX/OpenTubeX/releases/tag/v0.36.1-beta/asset',
	'',
])('rejects unexpected release redirects: %s', async (location) => {
	const service = fixture();
	service.setUpstream(new Response(null, { status: 302, headers: { Location: location } }));
	const response = await service.request('/linux/appimage-x64', 'HEAD');
	expect(response.status).toBe(503);
	expect(await response.text()).toBe('');
});

test('accepts a relative release redirect', async () => {
	const service = fixture();
	service.setUpstream(new Response(null, { status: 302, headers: { Location: '/OpenTubeX/OpenTubeX/releases/tag/v0.36.1-beta' } }));
	expect((await service.request()).status).toBe(302);
});

test('handles upstream timeouts', async () => {
	const service = fixture();
	service.setUpstream(new Error('Timed out'));
	expect((await service.request()).status).toBe(503);
});
