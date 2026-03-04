/* * */

import { OpenGraphAlertsDefault } from '@/opengraph/OpenGraphAlertsDefault';
import { OpenGraphAlertsDynamic } from '@/opengraph/OpenGraphAlertsDynamic';
import { type Alert } from '@carrismetropolitana/api-types/alerts';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import fs from 'fs';
import { ImageResponse } from 'next/og';

/* * */

export const alt = 'Mais sobre este Alerta';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';

/* * */

export default async function Image({ params }) {
	//

	//
	// A. Fetch data

	const allAlertsResponse = await fetch(`${getPublicVariable('api_url')}/alerts`);
	const allAlertsData: Alert[] = await allAlertsResponse.json();

	//
	// B. Transform data

	const alertData = allAlertsData.find(item => item['alert_id'] === params.alert_id);

	//
	// C. Render components

	if (!alertData) {
		return new ImageResponse(
			<OpenGraphAlertsDefault />,
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
		<OpenGraphAlertsDynamic
			description={alertData.description_text?.translation.pop()?.text}
			title={alertData.header_text?.translation.pop()?.text}
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
