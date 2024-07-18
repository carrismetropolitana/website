'use client';
import LiveIcon from '@/components/common/LiveIcon';
import { Pattern, PatternRealtime } from '@/utils/types';
import React, { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

function formatDate(ms: number) {
	let toReturn = '';
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	if (minutes < 0) {
		return 'A chegar';
	}

	if (hours > 0) {
		toReturn += `${hours} hora${hours > 1 ? 's' : ''} `;
	}
	if (minutes > 0) {
		toReturn += `${minutes % 60} minuto${minutes > 1 ? 's' : ''} `;
	}
	return toReturn;
}

export default function Component({ pattern }: { pattern: Pattern }) {
	const { data: patternRealtime } = useSWR<PatternRealtime[]>('https://api.carrismetropolitana.pt/patterns/' + pattern.id + '/realtime', {
		refreshInterval: 10000,
	});
	const sortedStops = pattern.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
	const relevantRealtimes = useMemo(() => patternRealtime?.filter(realtime => realtime.pattern_id === pattern.id), [patternRealtime, pattern.id]);
	const now = Date.now();
	const nextArrivalsPerStop: Record<string, { deltaMs: number, type: 'realtime' | 'scheduled' }[]> = {};
	for (const realtime of relevantRealtimes ?? []) {
		if (!nextArrivalsPerStop[realtime.stop_id]) {
			nextArrivalsPerStop[realtime.stop_id] = [];
		}

		if (realtime.estimated_arrival_unix) {
			nextArrivalsPerStop[realtime.stop_id].push({ deltaMs: realtime.estimated_arrival_unix * 1000 - now, type: 'realtime' });
		}
		else {
			nextArrivalsPerStop[realtime.stop_id].push({ deltaMs: realtime.scheduled_arrival_unix * 1000 - now, type: 'scheduled' });
		}
	}
	for (const stopId of Object.keys(nextArrivalsPerStop)) {
		nextArrivalsPerStop[stopId].sort((a, b) => a.deltaMs - b.deltaMs);
	}
	console.log(nextArrivalsPerStop);
	return (
		<div className={styles.container}>{sortedStops.map((stop) => {
			const nextArrivals = nextArrivalsPerStop[stop.stop.id];
			const nextArrival = nextArrivals?.find(arrival => arrival.deltaMs > 0);

			return (
				<div key={stop.stop.id} className={styles.stop}>
					<div className={styles.spineLine} style={{ backgroundColor: pattern.color }}>
						<div />
					</div>
					<div className={styles.stopInfo}>
						<div className={styles.name}>{stop.stop.name}</div>
						<div className={styles.location}>{stop.stop.municipality_name}, {stop.stop.district_name}</div>
						{ nextArrival != undefined && (nextArrival.type === 'realtime'
							? <div className={styles.live}><LiveIcon /> {formatDate(nextArrival.deltaMs)}</div>
							: <div className={styles.live}>{formatDate(nextArrival.deltaMs)}</div>)}
					</div>
				</div>
			);
		})}
		</div>
	);
}
