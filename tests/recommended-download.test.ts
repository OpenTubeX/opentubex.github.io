import { expect, test } from 'bun:test';
import { recommendedDownload, releaseVersion } from '../src/data/release';

test.each([
	['Windows', null, `opentubex-${releaseVersion}-beta-setup-x64.exe`],
	['Windows', 'x86', `opentubex-${releaseVersion}-beta-setup-x64.exe`],
	['Windows', 'arm', `opentubex-${releaseVersion}-beta-setup-arm64.exe`],
	['macOS', null, `opentubex-${releaseVersion}-beta-mac-arm64.dmg`],
	['macOS', 'arm', `opentubex-${releaseVersion}-beta-mac-arm64.dmg`],
	['macOS', 'x86', `opentubex-${releaseVersion}-beta-mac-x64.dmg`],
] as const)('recommends a direct file for %s on %s', (os, arch, asset) => {
	expect(recommendedDownload(os, arch)?.url.endsWith(`/${asset}`)).toBe(true);
});

test.each(['Linux', 'Android', 'iOS', null])('lets %s visitors choose', (os) => {
	expect(recommendedDownload(os, null)).toBeUndefined();
});
