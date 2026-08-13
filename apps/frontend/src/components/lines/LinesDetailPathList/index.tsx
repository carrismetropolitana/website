// 'use client';

// /* * */

// import { NoDataLabel } from '@/components/layout/NoDataLabel';
// import { PathWaypoint } from '@/components/lines/PathWaypoint';
// import { useAnalyticsContext } from '@/contexts/Analytics.context';
// import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
// import { NextArrival } from '@/types/timetables.types';
// import { PatternRealtime } from '@/utils/types';
// import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
// import { useEffect, useMemo } from 'react';
// import useSWR from 'swr';

// import styles from './styles.module.css';

// /* * */

// export function LinesDetailPathList() {
// 	//

// 	//
// 	// A. Setup variables

// 	const linesDetailContext = useLinesDetailContext();
// 	const analyticsContext = useAnalyticsContext();

// 	//
// 	// B. Fetch data

// 	// const { data: patternRealtimeData } = useSWR<PatternRealtime[]>(linesDetailContext.data.active_pattern?._id && `${getPublicVariable('api_url')}/arrivals/by_pattern/${linesDetailContext.data.active_pattern._id}`, { refreshInterval: 10000 });

// 	//
// 	// C. Transform data

// 	const preparedRealtimeData = useMemo<Map<string, NextArrival[]> | undefined>(() => {
// 		// Return early if there is no patternRealtimeData
// 		if (!patternRealtimeData) return;
// 		// Filter arrrivals for the current pattern
// 		const arrivalsForCurrentPattern = patternRealtimeData?.filter(arrivalData => arrivalData.pattern_id === linesDetailContext.data.active_pattern?._id) || [];
// 		// Organize arrivals by Stop ID
// 		const result = new Map<string, NextArrival[]>();
// 		arrivalsForCurrentPattern.forEach((arrivalData) => {
// 			// Setup the object key
// 			const objectKey = `${arrivalData.stop_id}-${arrivalData.stop_sequence}`;
// 			// Initialize the array if it doesn't exist
// 			if (!result.get(objectKey)) result.set(objectKey, []);
// 			// Push the arrival data
// 			if (arrivalData.estimated_arrival_unix) {
// 				result
// 					.get(objectKey)
// 					?.push({ type: 'realtime', unixTs: arrivalData.estimated_arrival_unix * 1000 });
// 			}
// 			else {
// 				result
// 					.get(objectKey)
// 					?.push({ type: 'scheduled', unixTs: arrivalData.scheduled_arrival_unix * 1000 });
// 			}
// 		});
// 		for (const key of Object.keys(result)) {
// 			result.get(key)?.sort((a, b) => a.unixTs - b.unixTs);
// 		}
// 		return result;
// 	}, [patternRealtimeData, linesDetailContext.data.active_pattern?._id]);

// 	const sortedStops = useMemo(() => {
// 		return linesDetailContext.data.active_pattern?.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
// 	}, [linesDetailContext.data.active_pattern?.path]);

// 	//
// 	// D. Handle actions

// 	useEffect(() => {
// 		// Scroll to selected stop on stop change
// 		if (!linesDetailContext.data.active_waypoint) return;
// 		const selectedStop = document.getElementById(`waypoint-${linesDetailContext.data.active_waypoint.stop_id}-${linesDetailContext.data.active_waypoint.stop_sequence}`);

// 		const selectedStopId = selectedStop?.id.split('-')[1];

// 		analyticsContext.actions.capture((ampli, props) => {
// 			if (selectedStopId) {
// 				ampli.stopSelected({ ...props, stop_id: selectedStopId });
// 			}
// 		});
// 	}, [linesDetailContext.data.active_waypoint]);

// 	//
// 	// E. Render components

// 	if (!sortedStops?.length || !linesDetailContext.data.active_pattern) {
// 		return <NoDataLabel />;
// 	}

// 	return (
// 		<div className={styles.container}>
// 			{sortedStops.map((waypoint, index) => (
// 				<PathWaypoint
// 					key={`${waypoint.stop_id}-${waypoint.stop_sequence}`}
// 					arrivals={preparedRealtimeData?.get(`${waypoint.stop_id}-${waypoint.stop_sequence}`) || []}
// 					id={`waypoint-${waypoint.stop_id}-${waypoint.stop_sequence}`}
// 					isFirstStop={index === 0}
// 					isLastStop={index === sortedStops.length - 1}
// 					isSelected={linesDetailContext.data.active_waypoint?.stop_id === waypoint.stop_id && linesDetailContext.data.active_waypoint?.stop_sequence === waypoint.stop_sequence}
// 					waypointData={waypoint}
// 				/>
// 			))}
// 		</div>
// 	);

// 	//
// }

'use client';

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { PathWaypoint } from '@/components/lines/PathWaypoint';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { Dates } from '@tmlmobilidade/dates';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface NextArrival {
	type: 'realtime' | 'scheduled'
	unixTs: number
}

export function LinesDetailPathList() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();
	const operationalDateContext = useOperationalDateContext();

	//
	// B. Transform data

	const realtimeArrivalsByStop = useMemo<Map<string, NextArrival[]>>(() => {
		return new Map<string, NextArrival[]>();
		// const result = new Map<string, NextArrival[]>();
		// const activePattern = linesDetailContext.data.active_pattern;
		// if (!activePattern || !operationalDate.isTodaySelected) return result;
		// if (!tripUpdatesContext.data.map.size) return result;

		// const stopSequenceToStopId = new Map<number, string>();
		// const stopSequenceToAllowedStopIds = new Map<number, Set<string>>();
		// const validStopKeys = new Set(activePattern.path.map((waypoint) => {
		// 	stopSequenceToStopId.set(waypoint.stop_sequence, waypoint.stop_id);
		// 	const allowedStopIds = new Set([waypoint.stop_id, ...(stopsContext.actions.getLegacyStopIds(waypoint.stop_id) ?? [])]);
		// 	stopSequenceToAllowedStopIds.set(waypoint.stop_sequence, allowedStopIds);
		// 	return `${waypoint.stop_id}-${waypoint.stop_sequence}`;
		// }));
		// const validTripIds = new Set<string>();
		// activePattern.trips.forEach((trip) => {
		// 	trip.trip_ids.forEach((tripId) => {
		// 		validTripIds.add(tripId);
		// 	});
		// });

		// for (const entity of tripUpdatesContext.data.map.values()) {
		// 	const tripUpdate = getTripUpdateFromEntity(entity);
		// 	const tripId = tripUpdate?.trip?.trip_id;
		// 	if (!tripId || !tripUpdate?.stop_time_update?.length) continue;
		// 	if (!validTripIds.has(tripId)) continue;

		// 	for (const stopUpdate of tripUpdate.stop_time_update) {
		// 		const stopSequence = stopUpdate.stop_sequence;
		// 		if (stopSequence == null) continue;
		// 		const stopId = String(stopUpdate.stop_id);
		// 		const allowedStopIds = stopSequenceToAllowedStopIds.get(stopSequence);
		// 		if (!allowedStopIds?.has(stopId)) continue;
		// 		const canonicalStopId = stopSequenceToStopId.get(stopSequence);
		// 		if (!canonicalStopId) continue;
		// 		const stopKey = `${canonicalStopId}-${stopSequence}`;
		// 		if (!validStopKeys.has(stopKey)) continue;
		// 		const arrivalTime = stopUpdate.arrival?.time;
		// 		if (arrivalTime == null) continue;
		// 		if (!result.get(stopKey)) result.set(stopKey, []);
		// 		result.get(stopKey)?.push({ type: 'realtime', unixTs: arrivalTime * 1000 });
		// 	}
		// }

		// for (const key of result.keys()) {
		// 	result.get(key)?.sort((a, b) => a.unixTs - b.unixTs);
		// }

		// return result;
	}, []);

	const scheduledArrivalsByStop = useMemo<Map<string, NextArrival[]>>(() => {
		const result = new Map<string, NextArrival[]>();
		const activePattern = linesDetailContext.data.active_pattern;
		const selectedDate = operationalDateContext.data.selected_date;
		if (!activePattern || !selectedDate) return result;

		for (const trip of activePattern.trips) {
			if (!trip.valid_on.includes(selectedDate.js_date.toISOString())) continue;
			for (const stopTime of trip.schedule) {
				const stopKey = `${stopTime.stop_id}-${stopTime.stop_sequence}`;
				const [hours, minutes, seconds = 0] = stopTime.arrival_time_24h.split(':').map(Number);
				const unixTs = Dates.now('Europe/Lisbon').set({ hour: hours, millisecond: 0, minute: minutes, second: seconds }).unix_timestamp;
				if (!result.get(stopKey)) result.set(stopKey, []);
				result.get(stopKey)?.push({ type: 'scheduled', unixTs });
			}
		}

		for (const key of result.keys()) {
			result.get(key)?.sort((a, b) => a.unixTs - b.unixTs);
		}

		return result;
	}, [linesDetailContext.data.active_pattern, operationalDateContext.data.selected_date]);

	const preparedArrivalsByStop = useMemo<Map<string, NextArrival[]>>(() => {
		const result = new Map<string, NextArrival[]>();
		const activePattern = linesDetailContext.data.active_pattern;
		if (!activePattern) return result;

		for (const waypoint of activePattern.path) {
			const stopKey = `${waypoint.stop_id}-${waypoint.stop_sequence}`;
			const realtimeArrivals = operationalDateContext.flags.is_today_selected
				? (realtimeArrivalsByStop.get(stopKey) || [])
				: [];
			if (realtimeArrivals.length > 0) {
				result.set(stopKey, realtimeArrivals.slice(0, 3));
				continue;
			}
			result.set(stopKey, scheduledArrivalsByStop.get(stopKey) || []);
		}

		return result;
	}, [linesDetailContext.data.active_pattern, operationalDateContext.flags.is_today_selected, realtimeArrivalsByStop, scheduledArrivalsByStop]);

	const sortedStops = useMemo(() => {
		return linesDetailContext.data.active_pattern?.path
			? [...linesDetailContext.data.active_pattern.path].sort((a, b) => a.stop_sequence - b.stop_sequence)
			: undefined;
	}, [linesDetailContext.data.active_pattern?.path]);

	//
	// C. Render components

	if (!sortedStops?.length || !linesDetailContext.data.active_pattern) {
		return <NoDataLabel />;
	}

	return (
		<div className={styles.container}>
			{sortedStops.map((waypoint, index) => (
				<PathWaypoint
					key={`${waypoint.stop_id}-${waypoint.stop_sequence}`}
					arrivals={preparedArrivalsByStop.get(`${waypoint.stop_id}-${waypoint.stop_sequence}`) || []}
					id={`waypoint-${waypoint.stop_id}-${waypoint.stop_sequence}`}
					isFirstStop={index === 0}
					isLastStop={index === sortedStops.length - 1}
					isSelected={linesDetailContext.data.active_waypoint?.stop_id === waypoint.stop_id && linesDetailContext.data.active_waypoint?.stop_sequence === waypoint.stop_sequence}
					waypointData={waypoint}
				/>
			))}
		</div>
	);

	//
}
