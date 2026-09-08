import { expect, test } from 'bun:test';
import { obtainiumNightlyUrl } from '../src/data/release';

test('Obtainium accepts nightly architecture APKs and the universal fallback', () => {
	const encoded = obtainiumNightlyUrl.split('obtainium://app/')[1];
	const app = JSON.parse(decodeURIComponent(encoded));
	const settings = JSON.parse(app.additionalSettings);
	const filter = new RegExp(settings.apkFilterRegEx);

	expect(app.id).toBe('org.opentubex.app.nightly');
	expect(settings.includePrereleases).toBe(true);
	expect(settings.fallbackToOlderReleases).toBe(true);
	expect(settings.filterReleaseTitlesByRegEx).toBe('nightly');
	for (const abi of ['arm64-v8a', 'armeabi-v7a', 'x86', 'x86_64', 'universal']) {
		expect(filter.test(`opentubex-0.34.0-nightly-1234-android-${abi}.apk`)).toBe(true);
	}
	expect(filter.test('org.opentubex.app-0.34.0-alpha-arm64-v8a.apk')).toBe(false);
	expect(filter.test('opentubex-0.34.0-nightly-1234-android-arm64-v8a.apk.sha256')).toBe(false);
	expect(settings.autoApkFilterByArch).toBe(true);
});
