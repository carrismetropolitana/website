/* * */

import { LinesDetail } from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { type ApiResponse } from '@carrismetropolitana/api-types/common';
import { type Locality } from '@carrismetropolitana/api-types/locations';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type HubLine } from '@tmlmobilidade/go-types-public-info';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { line_id } = await params;
	const lineId = decodeURIComponent(line_id);

	//
	// B. Fetch data

	let allLinesData: HubLine[] | null = null;
	let fetchedLocalitiesData: ApiResponse<Locality[]> | null = null;
	try {
		const [allLinesResponse, fetchedLocalitiesResponse] = await Promise.all([
			fetch(`${getPublicVariable('go_api_url')}/hub/api/v1/network/lines`),
			fetch(`${getPublicVariable('api_url')}/locations/localities`),
		]);
		if (!allLinesResponse.ok || !fetchedLocalitiesResponse.ok) throw new Error('Failed to fetch lines or localities');
		const [allLinesResponseData, fetchedLocalitiesResponseData] = await Promise.all([
			allLinesResponse.json() as Promise<{ data: HubLine[] }>,
			fetchedLocalitiesResponse.json(),
		]);
		allLinesData = allLinesResponseData.data;
		fetchedLocalitiesData = fetchedLocalitiesResponseData;
	}
	catch {
		return {
			description: `Horarios planeados e em tempo real da linha ${lineId}.`,
			title: `Linha ${lineId}`,
		};
	}
	const allLocalitiesData: Locality[] = fetchedLocalitiesData.status === 'success' ? fetchedLocalitiesData.data : [];

	//
	// C. Transform data

	const lineData = allLinesData.find(item => item._id === lineId);

	const goesTroughString = allLocalitiesData
		.filter(item => lineData?.locality_ids?.includes(item.id))
		.map(item => item.name)
		.join(', ');

	//
	// D. Render components

	return {
		description: lineData ? `Horários planeados e em tempo real da linha ${lineData.short_name}. Esta linha passa por ${goesTroughString}.` : `Horarios planeados e em tempo real da linha ${lineId}.`,
		title: lineData ? `${lineData.short_name} | ${lineData.long_name}` : `Linha ${lineId}`,
	};

	//
}

/* * */

export default async function Page({ params }) {
	const { line_id } = await params;
	const lineId = decodeURIComponent(line_id);
	return (
		<LinesDetailContextProvider lineId={lineId}>
			<LinesDetail />
		</LinesDetailContextProvider>
	);
}
