/* * */

import { Line } from '@/types/lines.types';
import { Stop } from '@/types/stops.types';
import { Routes } from '@/utils/routes';

/* * */

export default async function Sitemap() {
	//

	//
	// A. Setup variables

	const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://0.0.0.0:${process.env.PORT || 3000}`;

	//
	// B. Fetch data

	const allStopsResponse = await fetch(`${Routes.API}/stops`);
	const allStopsData = await allStopsResponse.json();

	const allLinesResponse = await fetch(`${Routes.API}/lines`);
	const allLinesData = await allLinesResponse.json();

	//
	// C. Transform data

	const allStopsAsPages = allStopsData?.map((stopData: Stop) => {
		return {
			changeFrequency: 'daily',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/stops/${stopData.id}`,
		};
	}) ?? [];

	const allLinesAsPages = allLinesData?.map((lineData: Line) => {
		return {
			changeFrequency: 'daily',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/lines/${lineData.id}`,
		};
	}) ?? [];

	//
	// D. Return sitemap

	return [

		{
			changeFrequency: 'always',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/encm`,
		},

		{
			changeFrequency: 'daily',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/stops`,
		},

		...allStopsAsPages,

		{
			changeFrequency: 'daily',
			lastModified: new Date(),
			priority: 1,
			url: `${baseUrl}/lines`,
		},

		...allLinesAsPages,

	];

	//
}
