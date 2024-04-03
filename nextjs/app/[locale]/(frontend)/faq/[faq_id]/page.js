/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendLines from '@/components/FrontendLines/FrontendLines';
import { FrontendLinesContextProvider } from '@/contexts/FrontendLinesContext';
import FrontendFaq from '@/components/FrontendFaq/FrontendFaq';

/* * */

export async function generateMetadata({ params }) {
	//

	// A. Fetch line data

	// B. Render the titles
	switch (params.locale) {
		case 'pt':
			return { title: 'Perguntas frequentes', description: 'Esclareça as dúvidas frequentes' };
		default:
		case 'en':
			return { title: 'Frequently asked questions', description: 'Clarify your frequently asked questions' };
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
				<FrontendFaq />
			</FrontendLinesContextProvider>
		</OneFullColumn>
	);

	//
}