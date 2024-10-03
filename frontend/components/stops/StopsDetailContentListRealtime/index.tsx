/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import { StopsDetailContentListRealtimeClockLine } from '@/components/stops/StopsDetailContentListRealtimeClockLine';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { NextBusRow } from '../NextBusRow';
import styles from './styles.module.css';

/* * */

export function StopsDetailContentListRealtime() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.NextBuses');
	const stopsDetailContext = useStopsSingleContext();

	const [showPastTrips, setShowPastTrips] = useState(false);

	//
	// B. Transform data

	const now_seconds = Date.now() / 1000;
	const previousRealtimeData = stopsDetailContext.data.realtime?.filter(realtime => (realtime.estimated_arrival_unix || realtime.scheduled_arrival_unix) < now_seconds);
	const lastRealtime = previousRealtimeData?.[previousRealtimeData.length - 1];
	const nextRealtimeData = stopsDetailContext.data.realtime?.filter(realtime => (realtime.estimated_arrival_unix || realtime.scheduled_arrival_unix) >= now_seconds);

	//
	// C. Handle actions

	const handleToggleShowPastTrips = () => {
		setShowPastTrips(prev => !prev);
	};

	//
	// D. Render components

	return (
		<>

			<p className={styles.showPastTripsToggle} onClick={handleToggleShowPastTrips}>
				{showPastTrips ? t('hide') : t('show')}
			</p>

			{!showPastTrips && lastRealtime && <NextBusRow realtime={lastRealtime} />}

			{showPastTrips && previousRealtimeData && previousRealtimeData.map(realtime => (
				<NextBusRow key={realtime.trip_id} realtime={realtime} />
			))}

			<StopsDetailContentListRealtimeClockLine />

			{nextRealtimeData ? nextRealtimeData.map(realtime => (
				<NextBusRow key={realtime.trip_id} realtime={realtime} />
			)) : <NoDataLabel text="Sem passagens" />}

		</>
	);

	//
}
