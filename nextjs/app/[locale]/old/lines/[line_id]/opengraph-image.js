/* * */

import fs from 'fs';
import { ImageResponse } from 'next/og';
import OpenGraphLinesDefault from 'opengraph/OpenGraphLinesDefault';
import OpenGraphLinesDynamic from 'opengraph/OpenGraphLinesDynamic';

/* * */

export const alt = 'Mais sobre esta linha';
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

	const lineData = await fetch(params.line_id?.length && `https://api.carrismetropolitana.pt/lines/${params.line_id}`).then(res => res.json());

	//
	// C. Render default component
	if (params.line_id === 'all' || !lineData?.id) {
		return new ImageResponse(<OpenGraphLinesDefault />, { ...size, fonts: customFonts });
	}

	//
	// D. Render dynamic component

	return new ImageResponse(<OpenGraphLinesDynamic lineData={lineData} />, { ...size, fonts: customFonts });

	//
}
