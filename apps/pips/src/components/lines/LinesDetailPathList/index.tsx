'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { PathWaypoint } from '@/components/lines/PathWaypoint';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { NextArrival } from '@/types/timetables.types';
import { PatternRealtime } from '@/utils/types';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function LinesDetailPathList() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();
	const analyticsContext = useAnalyticsContext();

	//
	// B. Fetch data

	const { data: patternRealtimeData } = useSWR<PatternRealtime[]>(linesDetailContext.data.active_pattern?.id && `${getPublicVariable('api_url')}/arrivals/by_pattern/${linesDetailContext.data.active_pattern.id}`, { refreshInterval: 10000 });

	//
	// C. Transform data

	const preparedRealtimeData = useMemo<Map<string, NextArrival[]> | undefined>(() => {
		// Return early if there is no patternRealtimeData
		if (!patternRealtimeData) return;
		// Filter arrrivals for the current pattern
		const arrivalsForCurrentPattern = patternRealtimeData?.filter(arrivalData => arrivalData.pattern_id === linesDetailContext.data.active_pattern?.id) || [];
		// Organize arrivals by Stop ID
		const result = new Map<string, NextArrival[]>();
		arrivalsForCurrentPattern.forEach((arrivalData) => {
			// Setup the object key
			const objectKey = `${arrivalData.stop_id}-${arrivalData.stop_sequence}`;
			// Initialize the array if it doesn't exist
			if (!result.get(objectKey)) result.set(objectKey, []);
			// Push the arrival data
			if (arrivalData.estimated_arrival_unix) {
				result
					.get(objectKey)
					?.push({ type: 'realtime', unixTs: arrivalData.estimated_arrival_unix * 1000 });
			}
			else {
				result
					.get(objectKey)
					?.push({ type: 'scheduled', unixTs: arrivalData.scheduled_arrival_unix * 1000 });
			}
		});
		for (const key of Object.keys(result)) {
			result.get(key)?.sort((a, b) => a.unixTs - b.unixTs);
		}
		return result;
	}, [patternRealtimeData, linesDetailContext.data.active_pattern?.id]);

	const sortedStops = useMemo(() => {
		return linesDetailContext.data.active_pattern?.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
	}, [linesDetailContext.data.active_pattern?.path]);

	//
	// D. Handle actions

	useEffect(() => {
		// Scroll to selected stop on stop change
		if (!linesDetailContext.data.active_waypoint) return;
		const selectedStop = document.getElementById(`waypoint-${linesDetailContext.data.active_waypoint.stop_id}-${linesDetailContext.data.active_waypoint.stop_sequence}`);

		const selectedStopId = selectedStop?.id.split('-')[1];

		analyticsContext.actions.capture((ampli, props) => {
			if (selectedStopId) {
				ampli.stopSelected({ ...props, stop_id: selectedStopId });
			}
		});

		if (selectedStop) {
			selectedStop.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [linesDetailContext.data.active_waypoint]);

	//
	// E. Render components

	if (!sortedStops?.length || !linesDetailContext.data.active_pattern) {
		return <NoDataLabel />;
	}

	return (
		<div className={styles.container}>
			{sortedStops.map((waypoint, index) => (
				<PathWaypoint
					key={`${waypoint.stop_id}-${waypoint.stop_sequence}`}
					arrivals={preparedRealtimeData?.get(`${waypoint.stop_id}-${waypoint.stop_sequence}`) || []}
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
