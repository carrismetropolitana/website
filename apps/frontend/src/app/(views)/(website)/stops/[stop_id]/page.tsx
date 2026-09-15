/* * */

import { StopsDetail } from '@/components/stops/StopsDetail';
import { StopsDetailContextProvider } from '@/contexts/StopsDetail.context';
import { fetchGoLines, fetchGoStop } from '@/utils/go-api.server';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { stop_id } = await params;

	const fallbackMetadata: Metadata = {
		description: `Horarios planeados e em tempo real na paragem #${stop_id}.`,
		title: `Paragem ${stop_id}`,
	};

	//
	// B. Fetch data
	// Only this stop and its lines are fetched. Never fetch the full
	// stops or lines collections here, as this runs on every request.

	const stopData = await fetchGoStop(stop_id);
	if (!stopData) return fallbackMetadata;

	const linesData = await fetchGoLines(stopData.line_ids ?? []);

	//
	// C. Transform data

	const linesAtThisStopString = linesData.map(item => item.short_name).join(', ');

	//
	// D. Render components

	return {
		description: `Horários planeados e em tempo real na paragem #${stopData._id}. Nesta paragem passam as linhas ${linesAtThisStopString}.`,
		title: stopData.name,
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
