/* * */

import PipsSurveyPage from '@/components/pips-survey/PipsSurveyPage';
import { PipsContextProvider } from '@/contexts/Pips.context';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { pip_Id } = await params;

	//
	// B. Render components

	return (
		<PipsContextProvider pipId={pip_Id}>
			<PipsSurveyPage />
		</PipsContextProvider>
	);

	//
}
