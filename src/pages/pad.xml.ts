import type { APIRoute } from 'astro';
import { recommendedDownload, releaseTag, releaseVersion } from '../data/release';
import { getChangelogReleases } from '../lib/github-releases';
import { padXml } from '../lib/pad';

export const GET: APIRoute = async ({ site }) => {
	const releases = await getChangelogReleases();
	const xml = padXml({
		site: site ?? new URL('https://opentubex.org'),
		version: releaseVersion,
		publishedAt: releases.find(({ tag }) => tag === releaseTag)?.publishedAt,
		downloadUrl: recommendedDownload('Windows', 'x86')!.url,
	});

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
