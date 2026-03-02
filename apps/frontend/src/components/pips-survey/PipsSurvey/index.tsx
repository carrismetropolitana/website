'use client';

/* * */

import { PipPage } from '@/components/pips-survey/PipPage';
import { PipsStopsList } from '@/components/pips-survey/PipsStopsList';
import { usePipsContext } from '@/contexts/Pips.context';

import styles from './styles.module.css';

/* * */

export function PipsSurvey() {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();

	//
	// C. Render components

	return (
		<div className={styles.container}>
			{!pipsContext.data.survey ? <PipPage /> : <PipsStopsList />}
		</div>
	);

	//
}
