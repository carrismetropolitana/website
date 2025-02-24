'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { PathWaypoint } from '@/components/lines/PathWaypoint';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { Routes } from '@/utils/routes';
import { PatternRealtime } from '@/utils/types';
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

	const { data: patternRealtime } = useSWR<PatternRealtime[]>(linesDetailContext.data.active_pattern?.id && `${Routes.API}/arrivals/by_pattern/${linesDetailContext.data.active_pattern.id}`, { refreshInterval: 10000 });

	// C. Transform data

	const relevantRealtimes = useMemo(() => {
		return patternRealtime?.filter((realtime) => {
			return realtime.pattern_id === linesDetailContext.data.active_pattern?.id;
		});
	}, [patternRealtime, linesDetailContext.data.active_pattern?.id]);

	const sortedStops = linesDetailContext.data.active_pattern?.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
	const nextArrivalsPerStop: Record<string, { type: 'realtime' | 'scheduled', unixTs: number }[]> = {};

	for (const realtime of relevantRealtimes ?? []) {
		if (!nextArrivalsPerStop[realtime.stop_id]) {
			nextArrivalsPerStop[realtime.stop_id] = [];
		}

		if (realtime.estimated_arrival_unix) {
			nextArrivalsPerStop[realtime.stop_id].push({ type: 'realtime', unixTs: realtime.estimated_arrival_unix * 1000 });
		}
		else {
			nextArrivalsPerStop[realtime.stop_id].push({ type: 'scheduled', unixTs: realtime.scheduled_arrival_unix * 1000 });
		}
	}

	for (const stopId of Object.keys(nextArrivalsPerStop)) {
		nextArrivalsPerStop[stopId].sort((a, b) => a.unixTs - b.unixTs);
	}

	// Scroll to selected stop on stop change
	useEffect(() => {
		if (!linesDetailContext.data.active_waypoint) return;
		const selectedStop = document.getElementById(`waypoint-${linesDetailContext.data.active_waypoint.stop_id}-${linesDetailContext.data.active_waypoint.stop_sequence}`);

		const selectedStopId = selectedStop?.id.split('-')[1];

		analyticsContext.actions.capture((ampli) => {
			if (selectedStopId) {
				ampli.stopSelected({ stop_id: selectedStopId });
			}
		});

		if (selectedStop) {
			selectedStop.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [linesDetailContext.data.active_waypoint]);

	//
	// D. Render components

	if (!sortedStops?.length || !linesDetailContext.data.active_pattern) {
		return (
			<NoDataLabel />
		);
	}

	return (
		<div className={styles.container}>
			{sortedStops.map((waypoint, index) => (
				<PathWaypoint
					key={`${waypoint.stop_id}-${waypoint.stop_sequence}`}
					arrivals={nextArrivalsPerStop[waypoint.stop_id] || []}
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
