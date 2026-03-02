'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { PipPage } from '@/components/pips-survey/PipPage';
import { PipsStopsList } from '@/components/pips-survey/PipsStopsList';
import { PipsSurveyHeader } from '@/components/pips-survey/PipsSurveyHeader';
import { usePipsContext } from '@/contexts/Pips.context';

/* * */

export function PipsSurvey() {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();

	//
	// C. Render components

	return (
		<Section withPadding>
			<Surface>
				<PipsSurveyHeader pipId={pipsContext.data.pipId} />
				{!pipsContext.data.survey ? <PipPage /> : <PipsStopsList />}
			</Surface>
		</Section>
	);

	//
}
