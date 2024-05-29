/* * */

import fs from 'fs';
import { ImageResponse } from 'next/og';
import OpenGraphDefault from 'opengraph/OpenGraphDefault';

/* * */

export const alt = 'Carris Metropolitana';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

/* * */

export default async function Image({ _ }) {
	//

	//
	// A. Setup fonts

	const customFonts = [
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer, name: 'Inter', style: 'normal', weight: 500 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 600 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 700 },
	];

	//
	// B. Render components

	return new ImageResponse(<OpenGraphDefault />, { ...size, fonts: customFonts });

	//
}
