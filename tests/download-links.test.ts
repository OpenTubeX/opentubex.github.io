import { expect, test } from 'bun:test';
import { downloadGroups, releaseTag, releaseVersion } from '../src/data/release';

test('Android APK links use the release asset names', () => {
	const android = downloadGroups.find((group) => group.title === 'Android');
	const apkUrls = android?.links.filter((link) => link.label.startsWith('.apk')).map((link) => link.url);
	const baseUrl = `https://github.com/OpenTubeX/OpenTubeX/releases/download/${releaseTag}`;

	expect(apkUrls).toEqual([
		`${baseUrl}/org.opentubex.app-${releaseVersion}-beta.apk`,
		`${baseUrl}/org.opentubex.app-${releaseVersion}-beta-arm64-v8a.apk`,
		`${baseUrl}/org.opentubex.app-${releaseVersion}-beta-armeabi-v7a.apk`,
		`${baseUrl}/org.opentubex.app-${releaseVersion}-beta-x86.apk`,
		`${baseUrl}/org.opentubex.app-${releaseVersion}-beta-x86_64.apk`,
	]);
});
