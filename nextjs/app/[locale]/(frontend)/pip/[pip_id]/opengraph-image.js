/* * */

import fs from 'fs';
import { ImageResponse } from 'next/og';
import OpenGraphDefault from 'opengraph/OpenGraphDefault';

/* * */

export const alt = 'Avalie a sua experiência com este painel';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* * */

export default async function Image() {
	//

	//
	// A. Setup fonts

	const customFonts = [
		{ name: 'Inter', style: 'normal', weight: 500, data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer },
		{ name: 'Inter', style: 'normal', weight: 600, data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer },
		{ name: 'Inter', style: 'normal', weight: 700, data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer },
	];

	//
	// B. Render default component

	return new ImageResponse(<OpenGraphDefault />, { ...size, fonts: customFonts });

	//
}