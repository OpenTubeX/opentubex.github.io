import { handleDownload } from '../redirect';

export async function onRequest(context: { request: Request; next(): Promise<Response> }) {
	if (new URL(context.request.url).pathname === '/robots.txt') return context.next();
	return handleDownload(context.request, await caches.open('github-release-tags'));
}
