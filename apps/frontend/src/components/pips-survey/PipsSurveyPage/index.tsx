'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { PipsSurveyHeader } from '@/components/pips-survey/PipsSurveyHeader';
import PipsSurveyOption from '@/components/pips-survey/PipsSurveyOption';
import { usePipsContext } from '@/contexts/Pips.context';

import styles from './styles.module.css';

import { pipsSurveyOptionsData } from '../_data/options';

/* * */

export default function PipsSurveyPage() {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();
	const options = pipsSurveyOptionsData;
	const pipId = pipsContext.item_id;

	//
	// C. Render components

	return (
		<Section>
			<Surface>
				<div className={styles.container}>
					<PipsSurveyHeader pipId={pipId} />
					<div className={styles.answersGrid}>
						{options.map(option => <PipsSurveyOption key={option._id} description={option.content.description} id={option._id} title={option.content.title} />)}
					</div>
				</div>
			</Surface>
		</Section>
	);

	//
}
