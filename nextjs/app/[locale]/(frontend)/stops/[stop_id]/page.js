/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import { FrontendStopsContextProvider } from '@/contexts/FrontendStopsContext';
import FrontendStops from '@/components/FrontendStops/FrontendStops';

/* * */

export async function generateMetadata({ params }) {
	//

	// A. Fetch stop data
	const stopData = await fetch(params.stop_id?.length && `https://api.carrismetropolitana.pt/stops/${params.stop_id}`).then(res => res.json());

	// B. Render the titles
	if (params.stop_id === 'all' || !stopData.name) {
		switch (params.locale) {
			case 'pt':
				return { title: 'Todas as Paragens', description: 'Conheça as paragens e horários da Carris Metropolitana' };
			default:
			case 'en':
				return { title: 'Todas as Paragens', description: 'Conheça as paragens e horários da Carris Metropolitana' };
		}
	} else {
		switch (params.locale) {
			case 'pt':
				return { title: `Horários na paragem ${stopData.name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana nesta paragem.' };
			default:
			case 'en':
				return { title: `Horários na paragem ${stopData.name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana nesta paragem.' };
		}
	}

	//
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