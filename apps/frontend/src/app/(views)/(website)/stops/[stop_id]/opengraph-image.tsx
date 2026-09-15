/* * */

import { OpenGraphStopsDefault } from '@/opengraph/OpenGraphStopsDefault';
import { OpenGraphStopsDynamic } from '@/opengraph/OpenGraphStopsDynamic';
import { formatStopLocation } from '@/utils/formatStopLocation';
import { fetchGoLines, fetchGoStop } from '@/utils/go-api.server';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export default async function Image({ params }) {
	//

	//
	// A. Setup variables

	const { stop_id } = await params;

	//
	// B. Fetch data
	// Only this stop and its lines are fetched. Never fetch the full
	// stops or lines collections here, as this runs on every request.

	const stopData = await fetchGoStop(stop_id);
	const linesDataForStop = stopData ? await fetchGoLines(stopData.line_ids ?? []) : [];

	//
	// C. Render components

	if (!stopData || !stopData.name) {
		return new ImageResponse(
			<OpenGraphStopsDefault />,
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
		<OpenGraphStopsDynamic
			facilities={[]}
			id={stop_id}
			lines={linesDataForStop}
			location={formatStopLocation(stopData.locality_name ?? undefined, stopData.municipality_name)}
			name={stopData.name}
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
