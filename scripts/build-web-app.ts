import { existsSync } from 'node:fs';
import { cp, rm } from 'node:fs/promises';
import { releaseTag } from '../src/data/release';

// Builds the web version of the release on the downloads page for the /demo/ page.
const source = `.cache/opentubex-${releaseTag}`;
const output = Bun.argv[2] ?? 'public/app';

function run(command: string[], options: { cwd?: string; env?: Record<string, string> } = {}): boolean {
	return Bun.spawnSync(command, {
		cwd: options.cwd ?? source,
		env: { ...process.env, ...options.env },
		stdout: 'inherit',
		stderr: 'inherit',
	}).success;
}

function mustRun(command: string[], options?: { cwd?: string; env?: Record<string, string> }) {
	if (!run(command, options)) throw new Error(`${command.join(' ')} failed`);
}

if (!existsSync(source)) {
	mustRun(['git', 'clone', '--depth', '1', '--branch', releaseTag, 'https://github.com/OpenTubeX/OpenTubeX.git', source], { cwd: '.' });
}

// The web build needs no native dependencies or Electron download.
mustRun(['pnpm', 'install', '--frozen-lockfile', '--ignore-scripts']);

// The app picks its first Invidious instance from this bundled list. Refresh it so
// visitors do not start on instances that went offline or stopped allowing CORS.
if (!run(['node', '_scripts/getInstances.js'])) console.warn("Keeping the release's Invidious instance list");

// The About page links this commit instead of the website's.
const commit = Bun.spawnSync(['git', 'rev-parse', 'HEAD'], { cwd: source }).stdout.toString().trim();
mustRun(['pnpm', 'run', 'pack:web'], { env: { GITHUB_SHA: commit } });

await rm(output, { recursive: true, force: true });
await cp(`${source}/dist/web`, output, { recursive: true });
console.log(`Built the ${releaseTag} web app into ${output}`);
