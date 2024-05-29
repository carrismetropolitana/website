/* * */

import FrontendPipSurveyAnswer from '@/components/FrontendPipSurveyAnswer/FrontendPipSurveyAnswer';
import Text from '@/components/Text/Text';
import { PipSurveyOptions } from '@/schemas/PipSurvey/options';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './FrontendPipSurvey.module.css';

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
			description: pipSurveyOptionsLabels(`answer.${item}.description`),
			title: pipSurveyOptionsLabels(`answer.${item}.title`),
		}));
	}, [pipSurveyOptionsLabels]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<Text>{t('question')}</Text>
			<div className={styles.answersGrid}>
				{pipSurveyAnswerData.map(item => <FrontendPipSurveyAnswer key={item.code} code={item.code} description={item.description} title={item.title} />)}
			</div>
		</div>
	);

	//
}
