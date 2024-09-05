'use client';

/* * */

import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { PatternRealtime } from '@/utils/types';
import { useMemo } from 'react';
import useSWR from 'swr';

import SingleStop from '../SingleStop';
import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();

	//
	// B. Fetch data

	const { data: patternRealtime } = useSWR<PatternRealtime[]>(linesDetailContext.data.active_pattern_group?.pattern_id && `https://api.carrismetropolitana.pt/patterns/${linesDetailContext.data.active_pattern_group.pattern_id}/realtime`, { refreshInterval: 10000 });

	// C. Transform data

	const sortedStops = linesDetailContext.data.active_pattern_group?.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
	const relevantRealtimes = useMemo(() => patternRealtime?.filter(realtime => realtime.pattern_id === linesDetailContext.data.active_pattern_group?.pattern_id), [patternRealtime, linesDetailContext.data.active_pattern_group?.pattern_id]);
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

	//
	// D. Render components

	if (!sortedStops || !linesDetailContext.data.active_pattern_group) {
		return null;
	}

	return (
		<div className={styles.container}>{sortedStops.map(path => (
			<SingleStop
				key={path.stop.id + '-' + path.stop_sequence}
				arrivals={nextArrivalsPerStop[path.stop.id] || []}
				isSelected={linesDetailContext.data.active_stop?.stop === path.stop && linesDetailContext.data.active_stop?.sequence === path.stop_sequence}
				path={path}
			/>
		),
		)}

		</div>
	);

	//
}
