/* * */

import { LinesDetail } from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { type ApiResponse } from '@carrismetropolitana/api-types/common';
import { type Locality } from '@carrismetropolitana/api-types/locations';
import { type Line } from '@carrismetropolitana/api-types/network';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { line_id } = await params;

	//
	// B. Fetch data

	let allLinesData: Line[] | null = null;
	let fetchedLocalitiesData: ApiResponse<Locality[]> | null = null;
	try {
		const [allLinesResponse, fetchedLocalitiesResponse] = await Promise.all([
			fetch(`${getPublicVariable('api_url')}/lines`),
			fetch(`${getPublicVariable('api_url')}/locations/localities`),
		]);
		if (!allLinesResponse.ok || !fetchedLocalitiesResponse.ok) throw new Error('Failed to fetch lines or localities');
		[allLinesData, fetchedLocalitiesData] = await Promise.all([
			allLinesResponse.json(),
			fetchedLocalitiesResponse.json(),
		]);
	}
	catch {
		return {
			description: `Horarios planeados e em tempo real da linha ${line_id}.`,
			title: `Linha ${line_id}`,
		};
	}
	const allLocalitiesData: Locality[] = fetchedLocalitiesData.status === 'success' ? fetchedLocalitiesData.data : [];

	//
	// C. Transform data

	const lineData = allLinesData.find(item => item.id === line_id);

	const goesTroughString = allLocalitiesData
		.filter(item => lineData?.locality_ids?.includes(item.id))
		.map(item => item.name)
		.join(', ');

	//
	// D. Render components

	return {
		description: `Horários planeados e em tempo real da linha ${lineData?.short_name}. Esta linha passa por ${goesTroughString}.`,
		title: `${lineData?.short_name} | ${lineData?.long_name}`,
	};

	//
}

/* * */

export default async function Page({ params }) {
	const { line_id } = await params;
	return (
		<LinesDetailContextProvider lineId={line_id}>
			<LinesDetail />
		</LinesDetailContextProvider>
	);
}
