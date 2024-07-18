'use client';
import LiveIcon from '@/components/common/LiveIcon';
import { Pattern, PatternRealtime } from '@/utils/types';
import { IconClock } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

function formatDelta(ms: number) {
	let toReturn = '';
	console.log(ms);
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	if (minutes <= 0) {
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

function formatDate(unixTs: number) {
	return dayjs(unixTs).format('HH:mm');
}

export default function Component({ pattern }: { pattern: Pattern }) {
	const { data: patternRealtime } = useSWR<PatternRealtime[]>('https://api.carrismetropolitana.pt/patterns/' + pattern.id + '/realtime', {
		refreshInterval: 10000,
	});
	const sortedStops = pattern.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
	const relevantRealtimes = useMemo(() => patternRealtime?.filter(realtime => realtime.pattern_id === pattern.id), [patternRealtime, pattern.id]);
	const now = Date.now();
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
	console.log(nextArrivalsPerStop);
	return (
		<div className={styles.container}>{sortedStops.map((stop) => {
			const nextArrivals = nextArrivalsPerStop[stop.stop.id];
			const nextArrival = nextArrivals?.find(arrival => arrival.unixTs > now);

			return (
				<div key={stop.stop.id} className={styles.stop}>
					<div className={styles.spineLine} style={{ backgroundColor: pattern.color }}>
						<div />
					</div>
					<div className={styles.stopInfo}>
						<div className={styles.name}>{stop.stop.name}</div>
						<div className={styles.location}>{stop.stop.municipality_name}, {stop.stop.district_name}</div>
						{ nextArrival != undefined && (nextArrival.type === 'realtime'
							? <div className={styles.live}><LiveIcon /> {formatDelta(nextArrival.unixTs - now)}</div>
							: <div className={styles.scheduled}><IconClock size={16} />{formatDate(nextArrival.unixTs)}</div>)}
					</div>
				</div>
			);
		})}
		</div>
	);
}
