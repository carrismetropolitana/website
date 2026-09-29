/* * */

import { OpenGraphLinesDefault } from '@/opengraph/OpenGraphLinesDefault';
import { OpenGraphLinesDynamic } from '@/opengraph/OpenGraphLinesDynamic';
import { fetchGoLine } from '@/utils/go-api.server';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export default async function Image({ params }) {
	//

	//
	// A. Setup variables

	const { line_id } = await params;

	//
	// B. Fetch data
	// Only this line is fetched. Never fetch the full lines or
	// localities collections here, as this runs on every request.

	const lineData = await fetchGoLine(decodeURIComponent(line_id));

	//
	// C. Render components

	if (!lineData || !lineData.long_name) {
		return new ImageResponse(
			<OpenGraphLinesDefault />,
			{
				fonts: [
					{ data: fs.readFileSync(`${process.cwd()}/public/assets/fonts/Inter-Medium.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 500 },
					{ data: fs.readFileSync(`${process.cwd()}/public/assets/fonts/Inter-SemiBold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 600 },
					{ data: fs.readFileSync(`${process.cwd()}/public/assets/fonts/Inter-Bold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 700 },
				],
				height: 630,
				width: 1200,
			},
		);
	}

	return new ImageResponse(
		<OpenGraphLinesDynamic
			color={lineData.color}
			localities={lineData.locality_names ?? []}
			longName={lineData.long_name}
			shortName={lineData.short_name}
			textColor={lineData.text_color}
		/>,
		{
			fonts: [
				{ data: fs.readFileSync(`${process.cwd()}/public/assets/fonts/Inter-Medium.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 500 },
				{ data: fs.readFileSync(`${process.cwd()}/public/assets/fonts/Inter-SemiBold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 600 },
				{ data: fs.readFileSync(`${process.cwd()}/public/assets/fonts/Inter-Bold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 700 },
			],
			height: 630,
			width: 1200,
		},
	);

	//
}
