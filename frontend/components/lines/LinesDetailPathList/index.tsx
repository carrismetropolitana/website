'use client';

/* * */

import PathStop from '@/components/lines/PathStop';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { Routes } from '@/utils/routes';
import { PatternRealtime } from '@/utils/types';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();

	//
	// B. Fetch data

	const { data: patternRealtime } = useSWR<PatternRealtime[]>(linesDetailContext.data.active_pattern_group?.id && `${Routes.API}/patterns/${linesDetailContext.data.active_pattern_group.id}/realtime`, { refreshInterval: 10000 });

	// C. Transform data

	const sortedStops = linesDetailContext.data.active_pattern_group?.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
	const relevantRealtimes = useMemo(() => patternRealtime?.filter(realtime => realtime.pattern_id === linesDetailContext.data.active_pattern_group?.id), [patternRealtime, linesDetailContext.data.active_pattern_group?.id]);
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
		if (!linesDetailContext.data.active_stop) return;
		const selectedStop = document.getElementById(`stop-${linesDetailContext.data.active_stop.sequence}`);
		if (selectedStop) {
			selectedStop.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [linesDetailContext.data.active_stop]);

	//
	// D. Render components

	if (!sortedStops || !linesDetailContext.data.active_pattern_group) {
		return null;
	}

	return (
		<div className={styles.container}>
			{sortedStops.map((path, index) => (
				<PathStop
					key={`${path.stop_id}-${path.stop_sequence}`}
					arrivals={nextArrivalsPerStop[path.stop_id] || []}
					id={`stop-${path.stop_sequence}`}
					isFirstStop={index === 0}
					isLastStop={index === sortedStops.length - 1}
					isSelected={linesDetailContext.data.active_stop?.sequence === path.stop_sequence}
					path={path}
				/>
			))}
		</div>
	);

	//
}
