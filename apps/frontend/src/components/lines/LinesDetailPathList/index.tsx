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
import { useDebugContext } from '@/contexts/Debug.context';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type GoApiResponse } from '@carrismetropolitana/website-shared-types';
import { type UnixMilliseconds } from '@tmlmobilidade/go-types-shared';
import { Dates } from '@tmlmobilidade/go-utils-dates';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface NextArrival {
	type: 'realtime' | 'scheduled'
	unixTs: number
}

interface HubEtaByStop {
	eta_at: null | UnixMilliseconds
	eta_seconds: null | number
	position_created_at: null | string
	stop_id: string
	trip_id: string
}

export function LinesDetailPathList() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();
	const operationalDateContext = useOperationalDateContext();
	const debugContext = useDebugContext();

	//
	// B. Fetch data

	const patternStopIds = useMemo(() => {
		const activePattern = linesDetailContext.data.active_pattern;
		if (!activePattern) return [];
		return [...new Set(activePattern.path.map(waypoint => String(waypoint.stop_id)))];
	}, [linesDetailContext.data.active_pattern]);

	const etaApiKey = operationalDateContext.flags.is_today_selected && patternStopIds.length > 0
		? ['lines-detail-eta-by-stop', ...patternStopIds]
		: null;

	const { data: etaData = [] } = useSWR<HubEtaByStop[]>(
		etaApiKey,
		async () => {
			const responses = await Promise.all(
				patternStopIds.map(async (stopId) => {
					const response = await fetch(`${getPublicVariable('go_api_url')}/hub/api/v1/realtime/eta/by-stop/${encodeURIComponent(stopId)}`);
					if (!response.ok) return [];
					const payload = await response.json() as GoApiResponse<HubEtaByStop[]>;
					return Array.isArray(payload.data) ? payload.data : [];
				}),
			);
			return responses.flat();
		},
		{ refreshInterval: 30_000 },
	);

	//
	// C. Transform data

	const realtimeArrivalsByStop = useMemo<Map<string, NextArrival[]>>(() => {
		const result = new Map<string, NextArrival[]>();
		const activePattern = linesDetailContext.data.active_pattern;
		const selectedDate = operationalDateContext.data.selected_date;
		if (!activePattern || !selectedDate || !operationalDateContext.flags.is_today_selected) return result;

		for (const tripData of activePattern.trips) {
			if (!tripData.valid_on.includes(selectedDate.operational_date_int)) continue;
			for (const stopTime of tripData.schedule) {
				const stopKey = `${stopTime.stop_id}-${stopTime.stop_sequence}`;
				const eta = etaData.find(etaItem => String(etaItem.stop_id) === String(stopTime.stop_id) && etaItem.trip_id.substring(etaItem.trip_id.indexOf(']') + 1) === tripData.trip_ids.find(tripId => tripId.substring(tripId.indexOf(']') + 1) === etaItem.trip_id.substring(etaItem.trip_id.indexOf(']') + 1))?.substring(etaItem.trip_id.indexOf(']') + 1));
				const estimatedArrivalMs = eta?.eta_at;
				if (!estimatedArrivalMs) continue;

				const isLastStop = stopTime.stop_sequence === activePattern.path[activePattern.path.length - 1].stop_sequence;
				if (!debugContext.flags.is_debug_mode && isLastStop) continue;

				if (!result.get(stopKey)) result.set(stopKey, []);
				result.get(stopKey)?.push({ type: 'realtime', unixTs: Number(estimatedArrivalMs) });
			}
		}

		for (const key of result.keys()) {
			result.get(key)?.sort((a, b) => a.unixTs - b.unixTs);
		}

		return result;
	}, [linesDetailContext.data.active_pattern, operationalDateContext.data.selected_date, operationalDateContext.flags.is_today_selected, etaData, debugContext.flags.is_debug_mode]);

	const scheduledArrivalsByStop = useMemo<Map<string, NextArrival[]>>(() => {
		const result = new Map<string, NextArrival[]>();
		const activePattern = linesDetailContext.data.active_pattern;
		const selectedDate = operationalDateContext.data.selected_date;
		if (!activePattern || !selectedDate) return result;

		for (const trip of activePattern.trips) {
			if (!trip.valid_on.includes(selectedDate.operational_date_int)) continue;
			for (const stopTime of trip.schedule) {
				const stopKey = `${stopTime.stop_id}-${stopTime.stop_sequence}`;
				const [hours, minutes, seconds = 0] = stopTime.arrival_time_24h.split(':').map(Number);
				const unixTs = Dates.now('Europe/Lisbon').set({ hour: hours, millisecond: 0, minute: minutes, second: seconds }).unix_milliseconds;
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
	// D. Render components

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
