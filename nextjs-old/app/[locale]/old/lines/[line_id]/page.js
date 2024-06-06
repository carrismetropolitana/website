/* * */

import FrontendLines from '@/components/FrontendLines/FrontendLines';
import { OneFullColumn } from '@/components/Layouts/Layouts';
import { FrontendLinesContextProvider } from '@/contexts/FrontendLinesContext';

/* * */

export async function generateMetadata({ params }) {
	//

	// A. Fetch line data
	const lineData = await fetch(params.line_id?.length && `https://api.carrismetropolitana.pt/lines/${params.line_id}`).then(res => res.json());

	// B. Render the titles
	if (params.line_id === 'all' || !lineData.short_name || !!lineData.long_name) {
		switch (params.locale) {
			case 'pt':
				return { description: 'Conheça as linhas e horários da Carris Metropolitana', title: 'Todas as Linhas' };
			default:
			case 'en':
				return { description: 'Conheça as linhas e horários da Carris Metropolitana', title: 'Todas as Linhas' };
		}
	}
	else {
		switch (params.locale) {
			case 'pt':
				return { description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana.', title: `Horários da linha ${lineData.short_name} - ${lineData.long_name}` };
			default:
			case 'en':
				return { description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana.', title: `Horários da linha ${lineData.short_name} - ${lineData.long_name}` };
		}
	}

	//
}

/* * */

export default function Page({ params }) {
	//

	//
	// A. Render components

	return (
		<OneFullColumn>
			<FrontendLinesContextProvider>
				<FrontendLines />
			</FrontendLinesContextProvider>
		</OneFullColumn>
	);

	//
}
