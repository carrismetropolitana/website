/* * */

import { useMemo } from 'react';
import Text from '@/components/Text/Text';
import { useTranslations } from 'next-intl';
import styles from './FrontendPipSurvey.module.css';
import { PipSurveyOptions } from '@/schemas/PipSurvey/options';
import FrontendPipSurveyAnswer from '@/components/FrontendPipSurveyAnswer/FrontendPipSurveyAnswer';

/* * */

export default function FrontendPipSurvey() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendPipSurvey');
	const pipSurveyOptionsLabels = useTranslations('PipSurveyOptions');

	//
	// B. Transform data

	const pipSurveyAnswerData = useMemo(() => {
		if (!PipSurveyOptions.answer) return [];
		return PipSurveyOptions.answer.map(item => ({
			code: item,
			title: pipSurveyOptionsLabels(`answer.${item}.title`),
			description: pipSurveyOptionsLabels(`answer.${item}.description`),
		}));
	}, [pipSurveyOptionsLabels]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<Text>{t('question')}</Text>
			<div className={styles.answersGrid}>
				{pipSurveyAnswerData.map(item => <FrontendPipSurveyAnswer key={item.code} code={item.code} title={item.title} description={item.description} />)}
			</div>
		</div>
	);

	//
}