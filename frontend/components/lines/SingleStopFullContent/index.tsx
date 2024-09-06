import FacilityIcon from '@/components/common/FacilityIcon';
import LiveIcon from '@/components/common/LiveIcon';
import TimetableWithVariants from '@/components/common/TimetableWithVariants';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { Stop } from '@/types/stops.types';
import { UnstyledButton } from '@mantine/core';
import { IconClockHour9, IconClockSearch } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

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

export default function SingleStopFullContent({ realtimeArrivals, scheduledArrivals, stop, stopSequence }: { realtimeArrivals: { type: 'realtime' | 'scheduled', unixTs: number }[], scheduledArrivals: { type: 'realtime' | 'scheduled', unixTs: number }[], stop: Stop, stopSequence: number }) {
	// A. Setup variables
	const operationalDayContext = useOperationalDayContext();
	const t = useTranslations('line');
	const linesDetailContext = useLinesDetailContext();
	const now = Date.now();

	// B. Helper functions
	function onClickException(patternId: string) {
		const patternGroup = linesDetailContext.data.valid_pattern_groups?.find(patternGroup => patternGroup.pattern_id === patternId);
		if (!patternGroup) {
			return;
		}
		linesDetailContext.actions.setActivePatternGroup(patternGroup.pattern_group_id);
	}

	// D. Render components
	return (
		<>
			<div className={styles.label}>{operationalDayContext.flags.is_today_selected ? t('next_buses') : t('scheduled_times')}</div>
			<div className={styles.timesList}>
				{/*
					If today is selected, show the realtime buses, otherwise show a timetable
				*/}
				{operationalDayContext.flags.is_today_selected
					? (
						<>
							{realtimeArrivals.length > 0 && (
								<div className={styles.realtimeList}>
									<LiveIcon />{realtimeArrivals.map(realtimeArrival => realtimeArrival != undefined
									&& <div key={realtimeArrival.unixTs}>{formatDelta(realtimeArrival.unixTs - now)}</div>)}
								</div>
							)}
							{scheduledArrivals.length > 0 && (
								<div className={styles.scheduledList}>
									<IconClockHour9 size={16} />
									<div>
										{scheduledArrivals.slice(0, realtimeArrivals.length > 0 ? 3 : 4)
											.map(scheduledArrival => scheduledArrival != undefined && (
												<div key={scheduledArrival.unixTs}>
													{dayjs(scheduledArrival.unixTs).format('HH:mm')}
												</div>
											))}
									</div>
								</div>
							)}

						</>
					)
					: linesDetailContext.data.active_pattern_group && linesDetailContext.data.valid_pattern_groups && operationalDayContext.data.selected_day_jsdate
					&& (
						<TimetableWithVariants
							date={operationalDayContext.data.selected_day_jsdate || new Date()}
							direction={linesDetailContext.data.active_pattern_group.direction}
							mainPatternId={linesDetailContext.data.active_pattern_group.pattern_id}
							onClickException={onClickException}
							patternGroups={linesDetailContext.data.valid_pattern_groups}
							stopId={stop.id}
							stopSequence={stopSequence}
						/>
					)}
			</div>
			{
			// Only give option to pop up timetable if today is selected, because otherwise it is already displayed
				operationalDayContext.flags.is_today_selected
				&& (
					<div className={styles.buttons}>
						<UnstyledButton onClick={() => linesDetailContext.actions.setDrawerOpen(true)}>
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
	);
}
