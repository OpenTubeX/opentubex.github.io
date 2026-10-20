import { expect, test } from 'bun:test';
import { obtainiumLiteUrl, obtainiumNightlyLiteUrl, obtainiumNightlyUrl, obtainiumUrl } from '../src/data/release';

const abis = ['arm64-v8a', 'armeabi-v7a', 'x86', 'x86_64', 'universal'];
const nightlyApks = (flavor: string) => abis.map((abi) => `opentubex-0.34.0-nightly-1234-android-${flavor}${abi}.apk`);
const stableApks = (flavor: string) =>
	['', '-arm64-v8a', '-armeabi-v7a', '-x86', '-x86_64'].map((suffix) => `org.opentubex.app-0.34.0-beta${flavor}${suffix}.apk`);

function parse(url: string) {
	const app = JSON.parse(decodeURIComponent(url.split('obtainium://app/')[1]));
	const settings = JSON.parse(app.additionalSettings);
	const filter = new RegExp(settings.apkFilterRegEx);
	const accepts = (name: string) => filter.test(name) !== (settings.invertAPKFilter === true);
	return { app, settings, accepts };
}

// Lite APKs share the application ID, so each link must match exactly one flavor.
test.each([
	[obtainiumUrl, 'OpenTubeX', stableApks(''), stableApks('-lite')],
	[obtainiumLiteUrl, 'OpenTubeX Lite', stableApks('-lite'), stableApks('')],
])('Obtainium stable link %# picks only its own APK flavor', (url, name, accepted, rejected) => {
	const { app, settings, accepts } = parse(url);
	expect(app.id).toBe('org.opentubex.app');
	expect(app.name).toBe(name);
	expect(settings.includePrereleases).toBeUndefined();
	expect(settings.autoApkFilterByArch).toBe(true);
	for (const apk of accepted) expect(accepts(apk)).toBe(true);
	for (const apk of rejected) expect(accepts(apk)).toBe(false);
});

test.each([
	[obtainiumNightlyUrl, 'OpenTubeX Nightly', nightlyApks(''), nightlyApks('lite-')],
	[obtainiumNightlyLiteUrl, 'OpenTubeX Nightly Lite', nightlyApks('lite-'), nightlyApks('')],
])('Obtainium nightly link %# accepts architecture APKs and the universal fallback', (url, name, accepted, rejected) => {
	const { app, settings, accepts } = parse(url);
	expect(app.id).toBe('org.opentubex.app.nightly');
	expect(app.name).toBe(name);
	expect(settings.includePrereleases).toBe(true);
	expect(settings.fallbackToOlderReleases).toBe(true);
	expect(settings.filterReleaseTitlesByRegEx).toBe('nightly');
	expect(settings.autoApkFilterByArch).toBe(true);
	for (const apk of accepted) expect(accepts(apk)).toBe(true);
	for (const apk of [...rejected, 'org.opentubex.app-0.34.0-beta-arm64-v8a.apk', `${accepted[0]}.sha256`]) {
		expect(accepts(apk)).toBe(false);
	}
});
