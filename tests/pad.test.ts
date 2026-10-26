import { expect, test } from 'bun:test';
import { padDescriptions, padXml } from '../src/lib/pad';

const site = new URL('https://opentubex.org');

test('PAD descriptions fit their character limits', () => {
	for (const [field, text] of Object.entries(padDescriptions)) {
		expect(text.length).toBeLessThanOrEqual(Number(field.replace('Char_Desc_', '')));
	}
});

test('PAD file describes the listed release', () => {
	const xml = padXml({
		site,
		version: '1.2.3',
		publishedAt: '2026-10-03T16:29:18Z',
		downloadUrl: 'https://example.org/setup.exe?a=1&b=2',
	});

	expect(xml).toStartWith('<?xml version="1.0" encoding="UTF-8"?>\n<XML_DIZ_INFO>\n');
	expect(xml).toContain('<Program_Version>1.2.3</Program_Version>');
	expect(xml).toContain('<Program_Release_Month>10</Program_Release_Month>');
	expect(xml).toContain('<Program_Release_Day>03</Program_Release_Day>');
	expect(xml).toContain('<Program_Release_Year>2026</Program_Release_Year>');
	expect(xml).toContain('<Primary_Download_URL>https://example.org/setup.exe?a=1&amp;b=2</Primary_Download_URL>');
	expect(xml).toContain('<Program_Category_Class>Audio &amp; Multimedia::Video Tools</Program_Category_Class>');
	expect(xml).toContain('<Application_XML_File_URL>https://opentubex.org/pad.xml</Application_XML_File_URL>');
	expect(xml).toContain('<Program_OS_Support>WinOther,Mac OS X,Linux,Android</Program_OS_Support>');
	expect(xml).toContain('<Additional_Download_URL_1></Additional_Download_URL_1>');
});

test('PAD file leaves the release date empty when it is unknown', () => {
	const xml = padXml({ site, version: '1.2.3', downloadUrl: 'https://example.org/setup.exe' });

	expect(xml).toContain('<Program_Release_Year></Program_Release_Year>');
});
