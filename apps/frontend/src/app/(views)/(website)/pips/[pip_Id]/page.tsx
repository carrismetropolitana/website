/* * */

import { PipsSurveyPage } from '@/components/pips-survey/PipsSurveyPage';

/* * */

export default async function Page({ params }) {
	//

	//
	// A. Setup variables

	const { pip_Id } = await params;

	return <PipsSurveyPage pipId={pip_Id} />;

	//
}
