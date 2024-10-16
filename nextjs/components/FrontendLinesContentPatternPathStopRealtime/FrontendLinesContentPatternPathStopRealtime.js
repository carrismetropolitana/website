'use client';

/* * */

import useSWR from 'swr';
import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import styles from './FrontendLinesContentPatternPathStopRealtime.module.css';
import NextArrivals from '@/components/NextArrivals/NextArrivals';
import { useDebugContext } from '@/contexts/DebugContext';

/* * */

export default function FrontendLinesContentPatternPathStopRealtime({ patternId, stopId, stopSequence, showScheduledArrivals = true, maxEstimatedArrivals = 3, maxScheduledArrivals = 3, showLabel = true }) {
	//

	//
	// A. Setup variables

	const debugContext = useDebugContext();
	const t = useTranslations('FrontendLinesContentPatternPathStopRealtime');

	//
	// B. Fetch data

	const { data: realtimeData } = useSWR(patternId && `https://api.carrismetropolitana.pt/patterns/${patternId}/realtime`, { refreshInterval: 10000 });

	//
	// C. Transform data

	const nextEstimatedArrivals = useMemo(() => {
		// Return early if no data is available
		if (!realtimeData) return [];
		// Filter estimates for the current pattern
		const filteredNextEstimatedArrivals = realtimeData.filter(item => {
			// Skip if not for the current stop
			if (item.stop_id !== stopId) return false;
			// Skip if no estimated arrival is available
			if (!item.estimated_arrival_unix) return false;
			// Skip if the estimated arrival is for a different pattern
			if (item.pattern_id !== patternId) return false;
			// Skip if the estimated arrival is for a different stop sequence
			if (item.stop_sequence !== stopSequence) return false;
			// Skip if the estimated arrival is in the past
			if (new Date(item.estimated_arrival_unix * 1000) < new Date) return false;
			// else return true
			return true;
		});
		// Format the arrival times
		const formattedNextEstimatedArrivals = filteredNextEstimatedArrivals.map(item => {
			const timeDifferenceBetweenEstimateAndNowInSeconds = item.estimated_arrival_unix - DateTime.local({ zone: 'Europe/Lisbon' }).toUnixInteger();
			return Math.floor(timeDifferenceBetweenEstimateAndNowInSeconds / 60);
		});
		// Sort by arrival_time
		const sortedNextEstimatedArrivals = formattedNextEstimatedArrivals.sort((a, b) => a - b);
		// Limit array to the max amount of items
		const limitedNextEstimatedArrivals = sortedNextEstimatedArrivals.slice(0, maxEstimatedArrivals);
		// Return result
		return limitedNextEstimatedArrivals;
		//
	}, [realtimeData, maxEstimatedArrivals, stopId, patternId, stopSequence]);

	const nextScheduledArrivals = useMemo(() => {
		// Return early if no data is available
		if (!realtimeData) return [];
		// Filter estimates for the current pattern
		const filteredNextScheduledArrivals = realtimeData.filter(item => {
			// Skip if there is no scheduled arrival
			if (!item.scheduled_arrival_unix) return false;
			// Skip if there is an estimated arrival
			if (item.estimated_arrival_unix) return false;
			// Skip if the estimated arrival is for a different pattern
			if (item.pattern_id !== patternId) return false;
			// Skip if the estimated arrival is for a different stop sequence
			if (item.stop_sequence !== stopSequence) return false;
			// Skip if the estimated arrival is in the past (within 2 minutes)
			const scheduledArrivalDateTime = DateTime.fromSeconds(item.scheduled_arrival_unix, { zone: 'UTC' });
			const nowDateTime = DateTime.now({ zone: 'UTC' });
			if (scheduledArrivalDateTime < nowDateTime.minus({ minute: 2 })) return false;
			// else return true
			return true;
		});
		// Sort by arrival_time
		const sortedNextScheduledArrivals = filteredNextScheduledArrivals.sort((a, b) => a.scheduled_arrival_unix - b.scheduled_arrival_unix);
		// Format the arrival times
		const formattedNextScheduledArrivals = sortedNextScheduledArrivals.map(item => {
			const dateTimeObject = DateTime.fromSeconds(item.scheduled_arrival_unix, { zone: 'UTC' });
			return `${dateTimeObject.setZone('Europe/Lisbon').toFormat('HH:mm')}`;
		});
		// Limit array to the max amount of items
		const limitedNextScheduledArrivals = formattedNextScheduledArrivals.slice(0, maxScheduledArrivals);
		// Return result
		return limitedNextScheduledArrivals;
		//
	}, [realtimeData, maxScheduledArrivals, patternId, stopSequence]);

	//
	// D. Render components

	if ((nextScheduledArrivals.length > 0 && showScheduledArrivals) || nextEstimatedArrivals.length > 0) {
		return (
			<div className={styles.container}>
				{showLabel && <p className={styles.label}>{t('next_arrivals')}</p>}
				<div className={styles.estimates}>
					{nextEstimatedArrivals.length > 0 && <NextArrivals type='estimated' arrivalsData={nextEstimatedArrivals} />}
					{nextEstimatedArrivals.length > 0 && debugContext.isDebug && <pre>{nextEstimatedArrivals.join('|')}</pre>}
					{(showScheduledArrivals || !nextEstimatedArrivals.length) && nextScheduledArrivals.length > 0 && <NextArrivals type='scheduled' arrivalsData={nextScheduledArrivals} />}
				</div>
			</div>
		);
	}

	//
}