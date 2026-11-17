import { encode, QrCodeDataType } from 'uqr';

/** Light modules around the code that scanners need to find its edges. */
const QUIET_ZONE = 3;
/** Share of the code's width that the center logo may cover. */
const LOGO_SHARE = 0.24;

export interface BrandedQr {
	svg: string;
	/** Width of the cleared center, as a fraction of the SVG width. */
	logoSize: number;
}

/**
 * Renders `text` as a QR code with dot modules, rounded finder patterns,
 * and a cleared center for a logo. Error correction level Q recovers up to
 * 25% of the code, far more than the logo covers, and keeps the code less
 * dense than level H.
 */
export function renderBrandedQr(text: string): BrandedQr {
	const { size, data, types } = encode(text, { ecc: 'Q', border: 0 });

	// QR codes have an odd width, so an odd hole width keeps the hole on whole modules.
	let hole = Math.ceil(size * LOGO_SHARE);
	if (hole % 2 === 0) hole += 1;
	const holeStart = (size - hole) / 2;
	const inHole = (x: number, y: number) =>
		x >= holeStart && x < holeStart + hole && y >= holeStart && y < holeStart + hole;

	// Zero-length segments with round caps draw each dark module as a dot.
	let path = '';
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (data[y][x] && types[y][x] !== QrCodeDataType.Position && !inHole(x, y)) path += `M${x + 0.5} ${y + 0.5}h0`;
		}
	}

	const eyes = [
		[0, 0],
		[size - 7, 0],
		[0, size - 7],
	]
		.map(
			([x, y]) =>
				`<rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" rx="2"/>` +
				`<rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="1" class="qr-eye-dot"/>`,
		)
		.join('');

	const total = size + QUIET_ZONE * 2;
	const svg =
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-QUIET_ZONE} ${-QUIET_ZONE} ${total} ${total}">` +
		`<path class="qr-modules" d="${path}" fill="none" stroke-width="0.86" stroke-linecap="round"/>` +
		`<g class="qr-eyes" fill="none" stroke-width="1">${eyes}</g>` +
		'</svg>';

	return { svg, logoSize: hole / total };
}
