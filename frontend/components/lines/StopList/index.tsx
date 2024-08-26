'use client';

/* * */

import FacilityIcon from '@/components/common/FacilityIcon';
import LiveIcon from '@/components/common/LiveIcon';
import Timetable from '@/components/common/Timetable';
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { PatternRealtime } from '@/utils/types';
import { UnstyledButton } from '@mantine/core';
import { IconClock, IconClockHour9, IconClockSearch } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

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

/* * */

export default function Component({ selectedStop, setSelectedStop, setSelectedStopSequence }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('line');

	const linesSingleContext = useLinesSingleContext();
	const operationalDayContext = useOperationalDayContext();

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	//
	// B. Fetch data

	const { data: patternRealtime } = useSWR<PatternRealtime[]>(linesSingleContext.data.active_pattern_group?.pattern_id && `https://api.carrismetropolitana.pt/patterns/${linesSingleContext.data.active_pattern_group.pattern_id}/realtime`, { refreshInterval: 10000 });

	//
	// C. Render components

	const sortedStops = linesSingleContext.data.active_pattern_group?.path.sort((a, b) => a.stop_sequence - b.stop_sequence);
	const relevantRealtimes = useMemo(() => patternRealtime?.filter(realtime => realtime.pattern_id === linesSingleContext.data.active_pattern_group?.pattern_id), [patternRealtime, linesSingleContext.data.active_pattern_group?.pattern_id]);
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

	//
	// D. Render components

	if (!sortedStops || !linesSingleContext.data.active_pattern_group) {
		return null;
	}

	return (
		<div className={styles.container}>{sortedStops.map((path) => {
			const stop = path.stop;
			const stopId = stop.id;
			const stopSequence = path.stop_sequence;
			const arrivals = nextArrivalsPerStop[stopId];
			const nextArrivals = arrivals?.filter(arrival => arrival.unixTs > now) || [];
			const nextArrival = nextArrivals?.[0];
			const realtimeArrivals = nextArrivals.filter(arrival => arrival.type === 'realtime');
			const scheduledArrivals = nextArrivals.filter(arrival => arrival.type === 'scheduled');
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
					<div className={styles.spineLine} style={{ backgroundColor: linesSingleContext.data.active_pattern_group?.color }}>
						<div style={{ backgroundColor: linesSingleContext.data.active_pattern_group?.text_color }} />
					</div>
					<div className={styles.stopInfo}>
						<div className={styles.name}>{stop.name}</div>
						<div className={styles.location}>{stop.municipality_name}, {stop.district_name}</div>
						{ !isSelected ? (
							<> { nextArrival != undefined && operationalDayContext.flags.is_today_selected && (nextArrival.type === 'realtime'
								? <div className={styles.live}><LiveIcon /> {formatDelta(nextArrival.unixTs - now)}</div>
								: nextArrival.unixTs && <div className={styles.scheduled}><IconClock size={16} />{formatDate(nextArrival.unixTs)}</div>)}
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
									<div className={styles.label}>{operationalDayContext.flags.is_today_selected ? t('next_buses') : t('scheduled_times')}</div>
									<div className={styles.timesList}>
										{ operationalDayContext.flags.is_today_selected
											? (
												<>
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

												</>
											)
											: linesSingleContext.data.active_pattern_group && <Timetable date={operationalDayContext.data.selected_day_jsdate || new Date()} pattern={linesSingleContext.data.active_pattern_group} stop={stop} stopSequence={stopSequence} />}
									</div>
									{
										operationalDayContext.flags.is_today_selected
										&& (
											<div className={styles.buttons}>
												<UnstyledButton onClick={() => setIsDrawerOpen(true)}>
													<IconClockSearch size={18} />
													{t('schedules')}
												</UnstyledButton>
												{/* <UnstyledButton>
											<IconMapPin size={18} />
											{t('stop_info')}
										</UnstyledButton> */}
											</div>
										)
									}
								</>
							)}
					</div>
				</div>
			);
		})}

		</div>
	);

	//
}
