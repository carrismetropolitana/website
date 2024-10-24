'use client';

/* * */

import styles from './FrontendStops.module.css';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Panel from '@/components/Panel/Panel';
import FrontendStopsToolbar from '@/components/FrontendStopsToolbar/FrontendStopsToolbar';
import FrontendStopsMap from '@/components/FrontendStopsMap/FrontendStopsMap';
import FrontendStopsStopInfo from '@/components/FrontendStopsStopInfo/FrontendStopsStopInfo';
import StopTimetable from '@/components/FrontendStopsTimetable/FrontendStopsTimetable';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext';
import BetaIcon from '@/components/BetaIcon/BetaIcon';
import { useAppAnalyticsContext } from '@/contexts/AppAnalyticsContext';

/* * */

export default function FrontendStops() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendStops');

	const analyticsContext = useAppAnalyticsContext();
	const frontendStopsContext = useFrontendStopsContext();

	//
	// B. Analytics

	useEffect(() => {
		analyticsContext.capture('view_stops_explorer');
	});

	//
	// C. Fetch data

	const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');
	const { isValidating: allVehiclesValidating } = useSWR('https://api.carrismetropolitana.pt/vehicles');
	const { isValidating: stopRealtimeValidating } = useSWR(frontendStopsContext.entities.stop?.id && `https://api.carrismetropolitana.pt/stops/${frontendStopsContext.entities.stop.id}/realtime`, { refreshInterval: 5000 });

	//
	// D. Handle actions

	useEffect(() => {
		const matchedStopIdFromUrl = window.location.pathname.match(/\/stops\/(.+)/);
		if (matchedStopIdFromUrl && matchedStopIdFromUrl[1] !== 'all' && allStopsData && !frontendStopsContext.entities.stop?.id) {
			frontendStopsContext.selectStop(matchedStopIdFromUrl[1]);
		}
	});

	//
	// E. Render components

	return (
		<Panel
			type='A'
			title={t('title')}
			loading={allStopsLoading}
			error={allStopsError}
			validating={allVehiclesValidating || stopRealtimeValidating}
			rightSection={
				<>
					{allVehiclesValidating && <div className={styles.validating}>V</div>}
					{stopRealtimeValidating && <div className={styles.validating}>SR</div>}
					<BetaIcon />
				</>
			}
		>
			<div className={styles.container}>
				<div className={styles.toolbar}>
					<FrontendStopsToolbar />
				</div>
				<div className={styles.map}>
					<FrontendStopsMap />
				</div>
				<div className={styles.sidebar}>
					{frontendStopsContext.entities.stop?.id ?
						<>
							<FrontendStopsStopInfo />
							<StopTimetable />
						</> :
						<NoDataLabel text={t('no_selection')} />
					}
				</div>
			</div>
		</Panel>
	);

	//
}