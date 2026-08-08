import { afterEach, describe, expect, test } from 'bun:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const originalCwd = process.cwd();
const originalFetch = globalThis.fetch;
const originalOfflineBuild = process.env.OPENTUBEX_OFFLINE_BUILD;

afterEach(() => {
	process.chdir(originalCwd);
	globalThis.fetch = originalFetch;
	if (originalOfflineBuild === undefined) delete process.env.OPENTUBEX_OFFLINE_BUILD;
	else process.env.OPENTUBEX_OFFLINE_BUILD = originalOfflineBuild;
});

describe('getChangelogReleases', () => {
	test('uses the committed fallback when GitHub is unavailable', async () => {
		const directory = mkdtempSync(join(tmpdir(), 'opentubex-releases-'));
		process.chdir(directory);
		globalThis.fetch = async () =>
			new Response(null, { status: 503, statusText: 'Service Unavailable' });

		try {
			const { getChangelogReleases } = await import('../src/lib/github-releases');
			const releases = await getChangelogReleases();

			expect(releases.length).toBeGreaterThan(0);
			expect(releases[0]?.tag).toBe('v0.30.2-beta');
		} finally {
			process.chdir(originalCwd);
			rmSync(directory, { recursive: true, force: true });
		}
	});

	test('does not contact GitHub during offline builds', async () => {
		process.env.OPENTUBEX_OFFLINE_BUILD = '1';
		globalThis.fetch = async () => {
			throw new Error('unexpected network request');
		};

		const { getChangelogReleases } = await import('../src/lib/github-releases?offline');
		const releases = await getChangelogReleases();

		expect(releases.length).toBeGreaterThan(0);
		expect(releases[0]?.tag).toBe('v0.30.2-beta');
	});
});
