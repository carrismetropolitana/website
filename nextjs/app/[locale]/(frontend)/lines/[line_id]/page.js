/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendLines from '@/components/FrontendLines/FrontendLines';
import { FrontendLinesContextProvider } from '@/contexts/FrontendLinesContext';

/* * */

export async function generateMetadata({ params }) {
	//

	// A. Fetch line data
	const lineData = await fetch(params.line_id?.length && `https://api.carrismetropolitana.pt/lines/${params.line_id}`).then(res => res.json());

	// B. Render the titles
	if (params.line_id === 'all' || !lineData.short_name || !lineData.long_name) {
		switch (params.locale) {
			case 'pt':
				return { title: 'Todas as Linhas', description: 'Conheça as linhas e horários da Carris Metropolitana' };
			default:
			case 'en':
				return { title: 'Todas as Linhas', description: 'Conheça as linhas e horários da Carris Metropolitana' };
		}
	} else {
		switch (params.locale) {
			case 'pt':
				return { title: `Horários da linha ${lineData.short_name} - ${lineData.long_name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana.' };
			default:
			case 'en':
				return { title: `Horários da linha ${lineData.short_name} - ${lineData.long_name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana.' };
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