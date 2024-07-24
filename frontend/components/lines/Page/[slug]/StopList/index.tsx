import FacilityIcon from '@/components/common/FacilityIcon';
import LiveIcon from '@/components/common/LiveIcon';
import { Pattern, PatternRealtime, Stop } from '@/utils/types';
import { UnstyledButton } from '@mantine/core';
import { IconClock, IconClockHour9, IconClockSearch, IconInfoCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

function formatDelta(ms: number) {
	let toReturn = '';
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

export default function Component({ pattern, selectedStop, setDrawerOpen, setSelectedStop, setSelectedStopSequence }:
{ pattern: Pattern, selectedStop: Stop | null, setDrawerOpen: (open: boolean) => void, setSelectedStop: (stop: Stop) => void, setSelectedStopSequence: (sequence: number) => void }) {
	const t = useTranslations('line');

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
	return (
		<div className={styles.container}>{sortedStops.map((path) => {
			const stop = path.stop;
			const stopId = stop.id;
			const arrivals = nextArrivalsPerStop[stopId];
			const nextArrivals = arrivals?.filter(arrival => arrival.unixTs > now);
			const nextArrival = nextArrivals?.find(arrival => arrival.unixTs > now);
			const realtimeArrivals = nextArrivals?.filter(arrival => arrival.type === 'realtime');
			const scheduledArrivals = nextArrivals?.filter(arrival => arrival.type === 'scheduled');
			const isSelected = selectedStop == stop;
			return (
				<div
					key={stopId + path.stop_sequence}
					className={styles.stop}
					data-selected={isSelected}
					onClick={() => {
						setSelectedStop(stop);
						setSelectedStopSequence(path.stop_sequence);
					}}
				>
					<div className={styles.spineLine} style={{ backgroundColor: pattern.color }}>
						<div style={{ backgroundColor: pattern.text_color }} />
					</div>
					<div className={styles.stopInfo}>
						<div className={styles.name}>{stop.name}</div>
						<div className={styles.location}>{stop.municipality_name}, {stop.district_name}</div>
						{ !isSelected ? (
							<> { nextArrival != undefined && (nextArrival.type === 'realtime'
								? <div className={styles.live}><LiveIcon /> {formatDelta(nextArrival.unixTs - now)}</div>
								: <div className={styles.scheduled}><IconClock size={16} />{formatDate(nextArrival.unixTs)}</div>)}
							</>
						)
							: (
								<>
									{stop.facilities.length > 0
									&& (
										<div className={styles.facilityIcons}>
											{stop.facilities.map(facility => (
												<FacilityIcon key={facility} name={facility} />
											))}
										</div>
									)}
									<div className={styles.label}>{t('next_buses')}</div>
									<div className={styles.timesList}>
										{realtimeArrivals.length > 0 && (
											<div className={styles.realtimeList}>
												<LiveIcon />{
													realtimeArrivals.map(realtimeArrival => realtimeArrival != undefined
													&& <div key={realtimeArrival.unixTs}>{formatDelta(realtimeArrival.unixTs - now)}</div>)
												}
											</div>
										)}
										{
											scheduledArrivals.length > 0 && (
												<div className={styles.scheduledList}>
													<IconClockHour9 size={16} />
													<div>
														{
															scheduledArrivals.slice(0, realtimeArrivals.length > 0 ? 3 : 4)
																.map(scheduledArrival => scheduledArrival != undefined && (
																	<div key={scheduledArrival.unixTs}>
																		{formatDate(scheduledArrival.unixTs)}
																	</div>
																))
														}
													</div>
												</div>
											)
										}
									</div>
									<div className={styles.buttons}>
										<UnstyledButton onClick={() => setDrawerOpen(true)}>
											<IconClockSearch size={18} />
											Horários
										</UnstyledButton>
										<UnstyledButton>
											<IconInfoCircle size={18} />
											Sobre a Paragem
										</UnstyledButton>
									</div>
								</>
							)}
					</div>
				</div>
			);
		})}

		</div>
	);
}
