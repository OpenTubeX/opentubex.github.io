import { expect, test } from 'bun:test';
import { appRoute } from '../src/lib/app-route';

test.each([
	['jNQXAC9IVRw', '/watch/jNQXAC9IVRw'],
	['  jNQXAC9IVRw  ', '/watch/jNQXAC9IVRw'],
	['https://www.youtube.com/watch?v=jNQXAC9IVRw', '/watch/jNQXAC9IVRw'],
	['youtube.com/watch?v=jNQXAC9IVRw&t=17', '/watch/jNQXAC9IVRw?timestamp=17'],
	['https://youtu.be/jNQXAC9IVRw?t=1m5s', '/watch/jNQXAC9IVRw?timestamp=65'],
	['https://m.youtube.com/shorts/jNQXAC9IVRw', '/watch/jNQXAC9IVRw'],
	['https://music.youtube.com/watch?v=jNQXAC9IVRw', '/watch/jNQXAC9IVRw'],
	['https://www.youtube-nocookie.com/embed/jNQXAC9IVRw?start=90', '/watch/jNQXAC9IVRw?timestamp=90'],
	['https://www.youtube.com/live/jNQXAC9IVRw', '/watch/jNQXAC9IVRw'],
	['https://www.youtube.com/watch?v=jNQXAC9IVRw&list=PL123&t=5', '/watch/jNQXAC9IVRw?timestamp=5&playlistId=PL123'],
	['https://www.youtube.com/playlist?list=PL123', '/playlist/PL123'],
	['https://www.youtube.com/channel/UC4QobU6STFB0P71PMvOGN5A', '/channel/UC4QobU6STFB0P71PMvOGN5A'],
	['me at the zoo', '/search/me%20at%20the%20zoo'],
	['https://example.com/watch?v=jNQXAC9IVRw', '/search/https%3A%2F%2Fexample.com%2Fwatch%3Fv%3DjNQXAC9IVRw'],
	['https://www.youtube.com/@jawed', '/search/https%3A%2F%2Fwww.youtube.com%2F%40jawed'],
] as const)('maps %s', (input, expected) => {
	expect(appRoute(input)).toBe(expected);
});
