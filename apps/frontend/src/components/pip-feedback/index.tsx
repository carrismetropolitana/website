'use client';

/* * */

import PipIntro from '@/components/pip-feedback/PipIntro';
import FrontendPipStops from '@/components/pip-feedback/PipStops';
import FrontendPipSurvey from '@/components/pip-feedback/PipSurvey';
import { useFrontendPipContext } from '@/contexts/Pip.context';
import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './FrontendPip.module.css';

/* * */

export default function FrontendPip() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendPip');
	const frontendPipContext = useFrontendPipContext();

	//
	// B. Fetch data

	const { error: allPipError, isLoading: allPipLoading } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/pip');

	//
	// C. Render components

	return (
		<Panel error={allPipError} loading={allPipLoading} title={t('title', { pip_id: frontendPipContext.item_id })} type="B">
			<div className={styles.container}>
				<PipIntro />
				{!frontendPipContext.survey.selected_answer_code ? <FrontendPipSurvey /> : <FrontendPipStops />}
			</div>
		</Panel>
	);

	//
}
