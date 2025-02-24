import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Radio } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from '../StopProbeSection/styles.module.css';

interface Props {
	question3Answer: string
}

export function Question3({ question3Answer }: Props) {
	//

	//
	// A. Setup Variables

	const t = useTranslations('stops.Probe');
	const analyticsContext = useAnalyticsContext();
	const [stopQuestion3Answer, setQuestion3Answer] = useState<string | undefined>(question3Answer);

	//
	// B. Handle Actions

	const handleQuestion3 = (e) => {
		const value = e;
		localStorage.setItem('Stops|Question3Answer', value);
		setQuestion3Answer(value);
		analyticsContext.actions.capture(ampli => ampli.stopsProbeAnswered({ question_3: value }));
		// analyticsContext.actions.capture(ampli => ampli.stopProbeQuestion3({ answer: value, answer_date: new Date().toISOString(), question_id: '3', question_title: t('stop|probe|question3') }));
	};
	//
	// C. Render Components

	return (
		<div className={styles.fullWidth}>
			<p className={styles.probeTitle}>{t('stop|probe|question3')}</p>
			<Radio.Group onChange={e => handleQuestion3(e)} value={stopQuestion3Answer}>
				<div className={styles.possibleAnswersContainer}>
					<Radio label={t('stop|probe|q3|answer1')} value="1" />
					<Radio label={t('stop|probe|q3|answer2')} value="2" />
					<Radio label={t('stop|probe|q3|answer3')} value="3" />
					<Radio label={t('stop|probe|q3|answer4')} value="4" />
					<Radio label={t('stop|probe|q3|answer5')} value="5" />
				</div>
			</Radio.Group>
		</div>
	);
	//
}
