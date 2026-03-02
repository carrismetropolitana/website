'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { pipsSurveyOptionsData } from '@/components/pips-survey/_data/options';
import { PipsSurveyOption } from '@/components/pips-survey/PipsSurveyOption';

import styles from './styles.module.css';

/* * */

export function PipPage() {
	//

	//
	// A. Setup variables

	const options = pipsSurveyOptionsData;

	//
	// C. Render components

	return (
		<Section withGap withPadding>
			<div className={styles.answersGrid}>
				{options.map(option => <PipsSurveyOption key={option._id} answerCode={option.content.code} description={option.content.description} title={option.content.title} />)}
			</div>
		</Section>
	);

	//
}
