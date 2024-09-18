/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import { FrontendStopsContextProvider } from '@/contexts/FrontendStopsContext';
import FrontendStops from '@/components/FrontendStops/FrontendStops';

/* * */

export async function generateMetadata({ params }) {
	const defaultMessage = { title: 'Todas as Paragens', description: 'Conheça as paragens e horários da Carris Metropolitana' };
	try {
		if (params.stop_id !== 'all') {
			const stopData = await fetch(params.stop_id?.length && `https://api.carrismetropolitana.pt/stops/${params.stop_id}`).then(res => res.json());
			if (!stopData && !stopData.name) return defaultMessage;
			return { title: `Horários na paragem ${stopData.name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana nesta paragem.' };
		} else {
			return defaultMessage;
		}
	} catch (error) {
		return defaultMessage;
	}
}

/* * */

export default function Page() {
	//

	//
	// A. Render components

	return (
		<OneFullColumn>
			<FrontendStopsContextProvider>
				<FrontendStops />
			</FrontendStopsContextProvider>
		</OneFullColumn>
	);

	//
}