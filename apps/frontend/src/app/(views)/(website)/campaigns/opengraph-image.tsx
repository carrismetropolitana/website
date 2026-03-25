/* * */

import { OpenGraphNewsDefault } from '@/opengraph/OpenGraphNewsDefault';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export default async function Image() {
	return new ImageResponse(
		<OpenGraphNewsDefault />,
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
