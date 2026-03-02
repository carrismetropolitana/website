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

	return (
		<Section heading={t('title', { pipId: Number(pipId) })} subheading={t('subtitle')} withGap withPadding>
			{!pipsContext.data.survey ? <p className={styles.question}>{t('question')}</p> : <p className={styles.question}>{t('question_pip_stops')}</p>}
		</Section>
	);

	//
}
