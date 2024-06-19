'use client';

/* * */

import BetaIcon from '@/components/BetaIcon/BetaIcon';
import FrontendLinesContent from '@/components/FrontendLinesContent/FrontendLinesContent';
import FrontendLinesToolbar from '@/components/FrontendLinesToolbar/FrontendLinesToolbar';
import Panel from '@/components/Panel/Panel';
import { useAppAnalyticsContext } from '@/contexts/AppAnalyticsContext';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import useSWR from 'swr';

import styles from './FrontendLines.module.css';

/* * */

export default function FrontendLines() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendLines');

	const analyticsContext = useAppAnalyticsContext();
	const FrontendLinesContext = useFrontendLinesContext();

	//
	// B. Analytics

	useEffect(() => {
		analyticsContext.capture('view_lines_explorer');
	});

	//
	// C. Fetch data

	const { data: allLinesData, error: allLinesError, isLoading: allLinesLoading } = useSWR('https://api.carrismetropolitana.pt/lines');
	const { error: allMunicipalitiesError, isLoading: allMunicipalitiesLoading } = useSWR('https://api.carrismetropolitana.pt/municipalities/');
	const { isValidating: allVehiclesValidating } = useSWR('https://api.carrismetropolitana.pt/vehicles');

	//
	// D. Handle actions

	useEffect(() => {
		const matchedLineIdFromUrl = window.location.pathname.match(/\/lines\/(.+)/);
		if (matchedLineIdFromUrl && matchedLineIdFromUrl[1] !== 'all' && allLinesData && !FrontendLinesContext.entities.line?.id) {
			FrontendLinesContext.selectLine(matchedLineIdFromUrl[1]);
		}
	});

	//
	// E. Render components

	return (
		<Panel
			error={allLinesError || allMunicipalitiesError}
			loading={allLinesLoading || allMunicipalitiesLoading}
			title={t('Panel_title')}
			type="A"
			validating={allVehiclesValidating}
			rightSection={(
				<>
					{allVehiclesValidating && <div className={styles.validating}>V</div>}
					<BetaIcon />
				</>
			)}
		>
			<FrontendLinesToolbar />
			<FrontendLinesContent />
		</Panel>
	);

	//
}
