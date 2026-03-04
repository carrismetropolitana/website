/* * */

import { StopsDetail } from '@/components/stops/StopsDetail';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';
import { type Line, type Stop } from '@carrismetropolitana/api-types/network';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { stop_id } = await params;

	//
	// B. Fetch data

	let allStopsData: null | Stop[] = null;
	let allLinesData: Line[] | null = null;
	try {
		const [allStopsResponse, allLinesResponse] = await Promise.all([
			fetch(`${getPublicVariable('api_url')}/stops`),
			fetch(`${getPublicVariable('api_url')}/lines`),
		]);
		if (!allStopsResponse.ok || !allLinesResponse.ok) throw new Error('Failed to fetch stops or lines');
		[allStopsData, allLinesData] = await Promise.all([
			allStopsResponse.json(),
			allLinesResponse.json(),
		]);
	}
	catch {
		return {
			description: `Horarios planeados e em tempo real na paragem #${stop_id}.`,
			title: `Paragem ${stop_id}`,
		};
	}

	//
	// C. Transform data

	const stopData = allStopsData.find(item => item.id === stop_id);
	const linesAtThisStopString = allLinesData
		.filter(item => stopData?.line_ids.includes(item.id))
		.sort((a, b) => a.id.localeCompare(b.id))
		.map(item => item.short_name)
		.join(', ');

	//
	// D. Render components

	return {
		description: `Horários planeados e em tempo real na paragem #${stopData?.id}. Nesta paragem passam as linhas ${linesAtThisStopString}.`,
		title: stopData?.long_name,
	};

	//
}

/* * */

export default async function Page({ params }) {
	const { stop_id } = await params;
	return (
		<StopsDetailContextProvider stopId={stop_id}>
			<StopsDetail />
		</StopsDetailContextProvider>
	);
}
