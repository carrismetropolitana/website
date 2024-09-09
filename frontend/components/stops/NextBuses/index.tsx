import NoDataLabel from '@/components/layout/NoDataLabel';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { StopRealtime } from '@/types/stops.types';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

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
	const operationalDayContext = useOperationalDayContext();
	const [showPrevious, setShowPrevious] = useState(false);
	const realtimeData = stopsSingleContext.data.realtime;
	const t = useTranslations('stops.NextBuses');

	// B. Transform data
	const operationalDayJs = dayjs(operationalDayContext.data.selected_day_jsdate, 'YYYYMMDD');
	const now_seconds = Date.now() / 1000;
	const previousRealtimeData = realtimeData?.filter(realtime => bestTime(realtime) < now_seconds);
	const lastRealtime = previousRealtimeData?.[previousRealtimeData.length - 1];
	const nextRealtimeData = realtimeData?.filter(realtime => bestTime(realtime) >= now_seconds);

	const operationalDate = operationalDayContext.data.selected_day;

	// Get the valid scheduled trips for the current operationalDay
	const validScheduledTrips = useMemo(() => {
		// StopRealtime but only with required fields
		const validScheduledTrips: {
			estimated_arrival?: never
			estimated_arrival_unix?: never
			headsign: string
			line_id: string
			observed_arrival?: never
			observed_arrival_unix?: never
			pattern_id: string
			route_id: string
			scheduled_arrival: string
			scheduled_arrival_unix: number
			stop_sequence: number
			trip_id: string
			vehicle_id?: never
		}[] = [];
		// Filter the valid scheduled trips
		if (operationalDate && !operationalDayContext.flags.is_today_selected) {
			for (const patternGroup of stopsSingleContext.data.valid_pattern_groups || []) {
				for (const trip of patternGroup.trips) {
					if (trip.dates.includes(operationalDate)) {
						for (const stopTime of trip.schedule) {
							if (stopTime.stop_id !== stopsSingleContext.data.stop?.id) {
								continue;
							}
							const [hours, minutes, seconds] = stopTime.arrival_time.split(':').map(Number);
							const unixTime = operationalDayJs.set('hour', hours).set('minute', minutes).set('second', seconds).unix();
							validScheduledTrips.push({
								headsign: patternGroup.headsign,
								line_id: patternGroup.line_id,
								pattern_id: patternGroup.pattern_id,
								route_id: patternGroup.route_id,
								scheduled_arrival: stopTime.arrival_time_24h,
								scheduled_arrival_unix: unixTime,
								stop_sequence: stopTime.stop_sequence,
								trip_id: trip.trip_ids[0],
							});
						}
					}
				}
			}
		}
		console.log('validScheduledTrips', validScheduledTrips);
		validScheduledTrips.sort((a, b) => a.scheduled_arrival_unix - b.scheduled_arrival_unix);
		return validScheduledTrips;
	}, [operationalDate, stopsSingleContext.data.valid_pattern_groups, stopsSingleContext.data.stop?.id]);

	// Use realtime trips for today, else use our calculated validScheduledTrips
	const renderedRealtimeData = operationalDayContext.flags.is_today_selected ? nextRealtimeData : validScheduledTrips;

	// C. Render components
	return (
		<div className={styles.container}>
			<NextBusesHeader />
			{ operationalDayContext.flags.is_today_selected
			&& (
				<>
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
				</>
			)}
			{renderedRealtimeData ? renderedRealtimeData.map(realtime => (
				<NextBusRow key={realtime.pattern_id + '-' + realtime.scheduled_arrival} realtime={realtime} />
			)) : <NoDataLabel text="Sem passagens" />}
		</div>
	);
}
