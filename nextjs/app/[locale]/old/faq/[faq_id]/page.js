/* * */

import FrontendFaq from '@/components/FrontendFaq/FrontendFaq';
import FrontendLines from '@/components/FrontendLines/FrontendLines';
import { OneFullColumn } from '@/components/Layouts/Layouts';
import { FrontendLinesContextProvider } from '@/contexts/FrontendLinesContext';

/* * */

export async function generateMetadata({ params }) {
	//

	// A. Fetch line data

	// B. Render the titles
	switch (params.locale) {
		case 'pt':
			return { description: 'Esclareça as dúvidas frequentes', title: 'Perguntas frequentes' };
		default:
		case 'en':
			return { description: 'Clarify your frequently asked questions', title: 'Frequently asked questions' };
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
