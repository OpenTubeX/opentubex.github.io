import { expect, test } from 'bun:test';
import { downloadGroups, releaseVersion, releaseTag } from '../src/data/release';
import { detectOS } from '../src/lib/detect-os';

test('iOS and iPadOS share the unsigned release IPA and signing guide', () => {
	const group = downloadGroups.find(({ title }) => title === 'iOS / iPadOS');
	expect(group).toBeDefined();
	expect(group?.links.find(({ label }) => label === '.ipa (unsigned)')?.url).toBe(
		`https://github.com/OpenTubeX/OpenTubeX/releases/download/${releaseTag}/opentubex-${releaseVersion}-ios-unsigned.ipa`,
	);
	expect(group?.links.some(({ url }) => url === '/docs/installing/#ios--ipados-experimental')).toBe(true);
	expect(detectOS({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', platform: 'MacIntel', maxTouchPoints: 5 })).toBe('iOS');
});

test('the iOS download card adds the official source directly to SideStore', () => {
	const group = downloadGroups.find(({ title }) => title === 'iOS / iPadOS');
	const link = group?.links.find(({ label }) => label === 'Add to SideStore');
	expect(link).toBeDefined();
	const url = new URL(link!.url);
	expect(url.protocol).toBe('sidestore:');
	expect(url.hostname).toBe('source');
	expect(url.searchParams.get('url')).toBe('https://sidestore.opentubex.org/source.json');
	expect(link?.preferred).toBe(true);
});
