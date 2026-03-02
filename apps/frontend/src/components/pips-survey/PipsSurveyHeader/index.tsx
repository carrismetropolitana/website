'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { usePipsContext } from '@/contexts/Pips.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface PipsSurveyHeaderProps {
	pipId: string
}

/* * */

export function PipsSurveyHeader({ pipId }: PipsSurveyHeaderProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('PipsSurvey.header');
	const pipsContext = usePipsContext();

	//
	// B. Render components

	const questionText = pipsContext.data.survey.selected_answer_code
		? t('question_pip_stops')
		: t('question');

	return (
		<Section heading={t('title', { pipId: Number(pipId) })} subheading={t('subtitle')} withGap withPadding>
			<p className={styles.question}>{questionText}</p>
		</Section>
	);

	//
}
