import NoDataLabel from '@/components/layout/NoDataLabel';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { StopRealtime } from '@/types/stops.types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { NextBusRow } from '../NextBusRow';
import NextBusesHeader from '../NextBusesHeader';
import NextBusesHeaderLine from '../NextBusesHeaderLine';
import styles from './styles.module.css';

function bestTime(realtime: StopRealtime) {
	return realtime.estimated_arrival_unix || realtime.scheduled_arrival_unix;
}

export default function NextBuses() {
	// A. Setup variables
	const stopsSingleContext = useStopsSingleContext();
	const [showPrevious, setShowPrevious] = useState(false);
	const realtimeData = stopsSingleContext.data.realtime;
	const t = useTranslations('stops.NextBuses');

	// B. Transform data
	const now_seconds = Date.now() / 1000;
	const previousRealtimeData = realtimeData?.filter(realtime => bestTime(realtime) < now_seconds);
	const lastRealtime = previousRealtimeData?.[previousRealtimeData.length - 1];
	const nextRealtimeData = realtimeData?.filter(realtime => bestTime(realtime) >= now_seconds);

	// C. Render components
	return (
		<div className={styles.container}>
			<NextBusesHeader />
			<div className={styles.toggle} onClick={() => setShowPrevious(!showPrevious)}>
				{showPrevious ? t('hide') : t('show')}
			</div>
			<div>
				{!showPrevious ? lastRealtime && <NextBusRow realtime={lastRealtime} />
					: previousRealtimeData && previousRealtimeData.map(realtime => (
						<NextBusRow key={realtime.pattern_id + '-' + realtime.scheduled_arrival} realtime={realtime} />
					)) }
			</div>
			<NextBusesHeaderLine />
			{nextRealtimeData ? nextRealtimeData.map(realtime => (
				<NextBusRow key={realtime.pattern_id + '-' + realtime.scheduled_arrival} realtime={realtime} />
			)) : <NoDataLabel text="Sem passagens" />}
		</div>
	);
}
