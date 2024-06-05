/* * */

import fs from 'fs';
import { ImageResponse } from 'next/og';
import OpenGraphDefault from 'opengraph/OpenGraphDefault';
import OpenGraphLinesDefault from 'opengraph/OpenGraphLinesDefault';
import OpenGraphLinesDynamic from 'opengraph/OpenGraphLinesDynamic';

/* * */

export const alt = 'Perguntas frequentes';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

/* * */

export default async function Image({ params }) {
	//

	//
	// A. Setup fonts

	const customFonts = [
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer, name: 'Inter', style: 'normal', weight: 500 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 600 },
		{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer, name: 'Inter', style: 'normal', weight: 700 },
	];

	//
	// B. Fetch data

	// const lineData = await fetch(params.line_id?.length && `https://api.carrismetropolitana.pt/lines/${params.line_id}`).then((res) => res.json());

	//
	// D. Render dynamic component

	return new ImageResponse(<OpenGraphDefault />, { ...size, fonts: customFonts });

	//
}
