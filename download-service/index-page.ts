import { downloadRoutes } from './routes';

const platforms = [
	['linux', 'Linux'],
	['windows', 'Windows'],
	['macos', 'macOS'],
	['android', 'Android'],
	['ios', 'iOS / iPadOS'],
];
const baseUrl = 'https://download.opentubex.org';

export const indexPage = `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="color-scheme" content="light dark">
	<title>OpenTubeX downloads</title>
	<style>
		body { max-width: 54rem; margin: 2rem auto; padding: 0 1rem; font: 1rem/1.6 system-ui, sans-serif; }
		h1, h2 { line-height: 1.25; }
		h1 { font-size: 1.75rem; }
		h2 { margin-top: 2rem; font-size: 1.25rem; }
		a { color: light-dark(#0645ad, #9ecbff); text-underline-offset: .15em; }
		a:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
		ul { columns: 2 20rem; padding-left: 1.25rem; }
		li { break-inside: avoid; padding: .25rem 0; }
		code { font-size: .9em; overflow-wrap: anywhere; }
		pre { padding: 1rem; background: light-dark(#f3f3f3, #242424); white-space: pre-wrap; }
		footer { margin-top: 2rem; }
	</style>
</head>
<body>
	<main>
		<h1>OpenTubeX downloads</h1>
		<p>These URLs redirect to the latest release on GitHub. They stay the same when a new version is released. Updates can take up to five minutes to appear.</p>
		<p>Base URL: <code>${baseUrl}</code>. Copy a link below or use it with curl or wget.</p>
		<pre><code>curl -fL -o OpenTubeX.AppImage ${baseUrl}/linux/appimage-x64
wget -O OpenTubeX.AppImage ${baseUrl}/linux/appimage-x64</code></pre>
		${platforms.map(([platform, label]) => `<section aria-labelledby="${platform}">
			<h2 id="${platform}">${label}</h2>
			<ul>${[...downloadRoutes.keys()].filter((path) => path.startsWith(`/${platform}/`)).sort().map((path) =>
				`<li><a href="${baseUrl}${path}"><code>${path}</code></a></li>`).join('')}</ul>
		</section>`).join('\n')}
	</main>
	<footer><a href="https://opentubex.org/downloads/">Installation help and other download options</a></footer>
</body>
</html>`;
