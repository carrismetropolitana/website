/* * */

import { LinesDetail } from '@/components/lines/LinesDetail';
import { LinesDetailContextProvider } from '@/contexts/LinesDetail.context';
import { fetchGoLine } from '@/utils/go-api.server';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { line_id } = await params;
	const lineId = decodeURIComponent(line_id);

	const fallbackMetadata: Metadata = {
		description: `Horarios planeados e em tempo real da linha ${lineId}.`,
		title: `Linha ${lineId}`,
	};

	//
	// B. Fetch data
	// Only this line is fetched. Never fetch the full lines or
	// localities collections here, as this runs on every request.

	const lineData = await fetchGoLine(lineId);
	if (!lineData) return fallbackMetadata;

	//
	// C. Transform data

	const goesTroughString = (lineData.locality_names ?? []).join(', ');

	//
	// D. Render components

	return {
		description: `Horários planeados e em tempo real da linha ${lineData.short_name}. Esta linha passa por ${goesTroughString}.`,
		title: `${lineData.short_name} | ${lineData.long_name}`,
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
