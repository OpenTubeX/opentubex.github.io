type DownloadRoute = { repository: string; assetName(tag: string): string };

export const downloadRoutes = new Map<string, DownloadRoute>();

function add(path: string, suffix: string, repository = 'OpenTubeX', prefix = 'opentubex-', versionStyle: 'default' | 'deb' | 'plain' = 'default') {
	downloadRoutes.set(path, {
		repository: `OpenTubeX/${repository}`,
		assetName(tag) {
			let version = tag.replace(/^v/, '');
			if (versionStyle === 'deb') version = version.replace('-beta', '_beta');
			if (versionStyle === 'plain') version = version.replace(/-beta$/, '');
			return `${prefix}${version}${suffix}`;
		},
	});
}

for (const arch of ['x64', 'arm64', 'armv7l']) {
	const packageArch = arch === 'x64' ? 'amd64' : arch;
	add(`/linux/appimage-${arch}`, `-${packageArch}.AppImage`);
	add(`/linux/deb-${arch}`, `_${packageArch}.deb`, 'OpenTubeX', 'opentubex_', 'deb');
	for (const format of ['zip', '7z']) {
		add(`/linux/${format}-${arch}`, `-linux-${arch}-portable.${format}`);
	}
}

for (const arch of ['x64', 'arm64']) {
	add(`/windows/exe-${arch}`, `-setup-${arch}.exe`);
	for (const format of ['zip', '7z']) {
		add(`/windows/${format}-${arch}`, `-win-${arch}-portable.${format}`);
	}
	for (const format of ['dmg', 'zip', '7z']) {
		add(`/macos/${format}-${arch}`, `-mac-${arch}.${format}`);
	}
	const packageArch = arch === 'x64' ? 'amd64' : arch;
	add(`/linux/rpm-${arch}`, `.${packageArch}.rpm`);
	add(`/linux/snap-${arch}`, `_${packageArch}.snap`, 'snap', 'opentubex_', 'plain');
	add(`/linux/flatpak-${arch}`, `-${arch === 'x64' ? 'x86_64' : 'aarch64'}.flatpak`, 'flatpak', 'org.opentubex.OpenTubeX-v');
}

add('/linux/pacman-x64', '-amd64.pacman');
add('/ios/ipa-unsigned', '-ios-unsigned.ipa', 'OpenTubeX', 'opentubex-', 'plain');
add('/android/apk-universal', '.apk', 'OpenTubeX', 'org.opentubex.app-');
add('/android/apk-lite-universal', '-lite.apk', 'OpenTubeX', 'org.opentubex.app-');
for (const arch of ['arm64-v8a', 'armeabi-v7a', 'x86', 'x86_64']) {
	add(`/android/apk-${arch}`, `-${arch}.apk`, 'OpenTubeX', 'org.opentubex.app-');
	add(`/android/apk-lite-${arch}`, `-lite-${arch}.apk`, 'OpenTubeX', 'org.opentubex.app-');
}
