'use client';
/* * */

import { Section } from '@/components/layout/Section';
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

	//
	// B. Render components

	return (
		<Section heading={t('title', { pipId: Number(pipId) })} subheading={t('subtitle')} withGap withPadding>
			<p className={styles.question}>{t('question')}</p>
		</Section>
	);

	//
}
