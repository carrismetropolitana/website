/* * */

import { LottiePlayer } from '@/components/common/LottiePlayer';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from '../StopProbeSection/styles.module.css';

/* * */

interface Props {
	question1Answer: string
}

export function Question1({ question1Answer }: Props) {
	//

	//
	// A. Setup Variables

	const t = useTranslations('stops.Probe');
	const analyticsContext = useAnalyticsContext();
	const [stopQuestion1Answer, setQuestion1Answer] = useState<string | undefined>(question1Answer);

	//
	// B. Handle Actions

	const handleQuestion1 = (e: React.MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.value;
		localStorage.setItem('Stops|Question1Answer', value);
		setQuestion1Answer(value);
		analyticsContext.actions.capture(ampli => ampli.stopsProbeAnswered({ question_1: value }));
		// analyticsContext.actions.capture(ampli => ampli.stopProbeQuestion1({ answer: value, answer_date: new Date().toISOString(), question_id: '1', question_title: t('stop|probe|question1') }));
	};

	//
	// C. Render Components
	return (
		<div className={styles.fullWidth}>
			<p className={styles.probeTitle}>{t('stop|probe|question1')}</p>
			<div className={styles.possibleAnswersContainer}>
				<Button
					className={stopQuestion1Answer === 'sad' ? styles.selected : ''}
					onClick={e => handleQuestion1(e)}
					value="sad"
				>
					<LottiePlayer
						path="/assets/probe/sad.json"
						style={{ height: 70, width: 70 }}
						loop
						play
					/>
				</Button>
				<Button
					className={stopQuestion1Answer === 'unsure' ? styles.selected : ''}
					onClick={e => handleQuestion1(e)}
					value="unsure"
				>
					<LottiePlayer
						path="/assets/probe/unsure.json"
						style={{ height: 70, width: 70 }}
						loop
						play
					/>
				</Button>
				<Button
					className={stopQuestion1Answer === 'happy' ? styles.selected : ''}
					onClick={e => handleQuestion1(e)}
					value="happy"
				>
					<LottiePlayer
						path="/assets/probe/happy.json"
						style={{ height: 70, width: 70 }}
						loop
						play
					/>
				</Button>
				<Button
					className={stopQuestion1Answer === 'loving' ? styles.selected : ''}
					onClick={e => handleQuestion1(e)}
					value="loving"
				>
					<LottiePlayer
						path="/assets/probe/loving.json"
						style={{ height: 70, width: 70 }}
						loop
						play
					/>
				</Button>
			</div>
		</div>
	);

	//
}
