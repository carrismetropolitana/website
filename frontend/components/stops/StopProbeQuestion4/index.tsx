/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Radio } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from '../StopProbeSection/styles.module.css';

/* * */

interface Props {
	question4Answer: string
	stopId: string
}

export function Question4({ question4Answer, stopId }: Props) {
	//

	//
	// A. Setup Variables

	const t = useTranslations('stops.Probe');
	const analyticsContext = useAnalyticsContext();
	const [stopQuestion4Answer, setQuestion4Answer] = useState<string | undefined>(question4Answer);

	//
	// B. Handle Actions

	const handleQuestion4 = (e) => {
		const value = e;
		localStorage.setItem('Stops|Question4Answer', value);
		setQuestion4Answer(value);
		analyticsContext.actions.capture(ampli => ampli.stopsProbeAnswered({ question_4: value, stop_id: stopId }));
		// analyticsContext.actions.capture(ampli => ampli.stopProbeQuestion4({ answer: value, answer_date: new Date().toISOString(), question_id: '4', question_title: t('stop|probe|question4') }));
	};

	//
	// C. Render Components

	return (

		<div className={styles.fullWidth}>
			<p className={styles.probeTitle}>{t('stop|probe|question4')}</p>
			<Radio.Group onChange={e => handleQuestion4(e)} value={stopQuestion4Answer}>
				<div className={styles.possibleAnswersContainer}>
					<Radio label={t('stop|probe|q4|answer1')} value="1" />
					<Radio label={t('stop|probe|q4|answer2')} value="2" />
					<Radio label={t('stop|probe|q4|answer3')} value="3" />
					<Radio label={t('stop|probe|q4|answer4')} value="4" />
					<Radio label={t('stop|probe|q4|answer5')} value="5" />
				</div>
			</Radio.Group>
		</div>

	);

	//
}
