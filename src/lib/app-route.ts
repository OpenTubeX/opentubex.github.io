const VIDEO_ID = /^[\w-]{11}$/;
const YOUTUBE_HOST = /^(?:(?:www|m|music)\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be)$/;

/** Seconds from a `t` or `start` value such as `90`, `90s`, or `1h2m3s`. */
function seconds(value: string | null): number {
	const match = value?.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/);
	if (!match) return 0;
	const [, hours = '0', minutes = '0', secs = '0'] = match;
	return Number(hours) * 3600 + Number(minutes) * 60 + Number(secs);
}

function parseUrl(text: string): URL | null {
	try {
		return new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
	} catch {
		return null;
	}
}

/** Maps a YouTube link or video ID to an OpenTubeX route. Anything else becomes a search. */
export function appRoute(input: string): string {
	const text = input.trim();
	if (VIDEO_ID.test(text)) return `/watch/${text}`;

	const url = parseUrl(text);
	if (url && YOUTUBE_HOST.test(url.hostname)) {
		const [first, second] = url.pathname.split('/').filter(Boolean);
		const id = url.hostname.endsWith('youtu.be')
			? first
			: first === 'watch'
				? url.searchParams.get('v')
				: ['shorts', 'embed', 'live', 'v'].includes(first) ? second : null;

		if (id && VIDEO_ID.test(id)) {
			const query = new URLSearchParams();
			const timestamp = seconds(url.searchParams.get('t') ?? url.searchParams.get('start'));
			if (timestamp) query.set('timestamp', String(timestamp));
			const playlist = url.searchParams.get('list');
			if (playlist) query.set('playlistId', playlist);
			// `URLSearchParams.size` needs Safari 17.
			const search = query.toString();
			return `/watch/${id}${search ? `?${search}` : ''}`;
		}

		const list = url.searchParams.get('list');
		if (first === 'playlist' && list) return `/playlist/${encodeURIComponent(list)}`;
		if (first === 'channel' && second) return `/channel/${encodeURIComponent(second)}`;
	}

	return `/search/${encodeURIComponent(text)}`;
}
