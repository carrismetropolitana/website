/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from '../StopProbeSection/styles.module.css';

/* * */

interface Props {
	question2Answer: string
}

export function Question2({ question2Answer }: Props) {
	//

	//
	// A. Setup Variables

	const t = useTranslations('stops.Probe');
	const analyticsContext = useAnalyticsContext();
	const [stopQuestion2Answer, setQuestion2Answer] = useState<string | undefined>(question2Answer);

	//
	// B. Handle Actions

	const handleQuestion2 = (e: React.MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.value;
		localStorage.setItem('Stops|Question2Answer', value);
		setQuestion2Answer(value);
		analyticsContext.actions.capture(ampli => ampli.stopProbeQuestion2({ answer: value, answer_date: new Date().toISOString(), question_id: '2', question_title: t('stop|probe|question2') }));
	};

	//
	// C. Render Components

	return (
		<div className={styles.fullWidth}>
			<p className={styles.probeTitle}>{t('stop|probe|question2')}</p>
			<div className={styles.possibleAnswersContainer}>
				<Button className={stopQuestion2Answer === 'yes' ? styles.selected : ''} onClick={e => handleQuestion2(e)} value="yes">{t('stop|probe|q2|answer1')}</Button>
				<Button className={stopQuestion2Answer === 'no' ? styles.selected : ''} onClick={e => handleQuestion2(e)} value="no">{t('stop|probe|q2|answer2')}</Button>
			</div>
		</div>
	);

	//
}
