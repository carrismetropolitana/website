/* * */

import { OpenGraphVehiclesDefault } from '@/opengraph/OpenGraphVehiclesDefault';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export default async function Image() {
	return new ImageResponse(
		<OpenGraphVehiclesDefault />,
		{
			fonts: [
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Medium.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 500 },
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-SemiBold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 600 },
				{ data: fs.readFileSync(`${process.cwd()}/public/fonts/Inter-Bold.ttf`).buffer as ArrayBuffer, name: 'Inter', style: 'normal', weight: 700 },
			],
			height: 630,
			width: 1200,
		},
	);
}
