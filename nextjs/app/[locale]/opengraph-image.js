/* * */

import fs from 'fs';
import { ImageResponse } from 'next/og';
import OpenGraphDefault from 'opengraph/OpenGraphDefault';

/* * */

export const alt = 'Carris Metropolitana';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* * */

export default async function Image({ params }) {
	//

	//
	// A. Setup fonts

	const customFonts = [
		{ name: 'Inter', style: 'normal', weight: 500, data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer },
		{ name: 'Inter', style: 'normal', weight: 600, data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer },
		{ name: 'Inter', style: 'normal', weight: 700, data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer },
	];

	//
	// B. Render components

	return new ImageResponse(<OpenGraphDefault />, { ...size, fonts: customFonts });

	//
}