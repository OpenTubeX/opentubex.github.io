import { expect, test } from 'bun:test';
import { detectLinuxDistro, detectOS } from '../src/lib/detect-os';

test.each([
	['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Win32', 0, 'Windows'],
	['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'MacIntel', 0, 'macOS'],
	['Mozilla/5.0 (X11; Linux x86_64)', 'Linux x86_64', 0, 'Linux'],
	['Mozilla/5.0 (Linux; Android 14; Pixel 8)', 'Linux armv8l', 5, 'Android'],
	['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 'iPhone', 5, 'iOS'],
	['Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)', 'iPad', 5, 'iOS'],
	['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'MacIntel', 5, 'iOS'],
	['Mozilla/5.0 (X11; CrOS x86_64 16000.0.0)', 'Linux x86_64', 0, null],
	['Mozilla/5.0 (X11; FreeBSD amd64)', 'FreeBSD amd64', 0, null],
	['', '', 0, null],
] as const)('detects %s', (userAgent, platform, maxTouchPoints, expected) => {
	expect(detectOS({ userAgent, platform, maxTouchPoints })).toBe(expected);
});

test.each([
	['Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0', 'debian'],
	['Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0', 'fedora'],
	['Mozilla/5.0 (X11; openSUSE; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0', 'opensuse'],
	['Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0', null],
] as const)('detects the Linux distribution in %s', (userAgent, expected) => {
	expect(detectLinuxDistro(userAgent)).toBe(expected);
});
