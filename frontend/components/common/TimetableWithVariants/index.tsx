import { Link } from '@/translations/navigation';
import composeTimetable from '@/utils/composeTimetable';
import { Pattern } from '@/utils/types';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

export default function TimetableWithVariants(
	{ date, highlightNow = true, mainPatternId, patternGroups, stopId, stopSequence }:
	{ date: Date, highlightNow?: boolean, mainPatternId: string, patternGroups: Pattern[], stopId: string, stopSequence: number }) {
	// A. Setup variables
	const t = useTranslations('schedule');
	const now = new Date();
	const nowHour = now.getHours();
	const nowMinute = now.getMinutes() + now.getSeconds() / 60;

	const timetable = useMemo(() => {
		return composeTimetable(patternGroups, stopId, stopSequence, mainPatternId, date);
	}, [date, mainPatternId, patternGroups, stopId, stopSequence]);

	const newTimetable = {
		...timetable,
		hours: timetable.hours.map(hour => ({
			...hour,
			minutes: hour.minutes.map((minute, i) => {
				// Calculate the interval between two minutes, so that we can draw the now line at the correct position
				const prevMinute = hour.minutes[i - 1];
				const start = prevMinute ? (prevMinute.min + minute.min) / 2 : 0;

				const endMinute = hour.minutes[i + 1];
				const end = endMinute ? (endMinute.min + minute.min) / 2 : 60;
				return {
					...minute,
					interval: [
						start,
						end,
					],
				};
			},
			),
		})),
	};

	//
	// C. Render components

	// 1. Render the timetable itself
	const Table = newTimetable.hours.map(schedule => (
		<div
			key={schedule.hour}
			className={styles.column}
			style={{
				background: schedule.hour == nowHour && highlightNow ? 'var(--color-realtime-15)' : '',
				borderRadius: 5,
			}}
		>
			<div className={styles.hour}>{schedule.hour.toString().padStart(2, '0')}</div>
			{schedule.minutes.map((minute, minuteIndex) => {
				// Show line if in current hour and minute interval
				const showLine = minute.interval[0] <= nowMinute && nowMinute < minute.interval[1] && schedule.hour == nowHour && highlightNow;
				// Function that calculates the position of the line, based on the current time,
				// splitting the interval into two segments, so that the line is at 50% when the current time is the same as the minute variable
				// This could also be done with a translation, but it would be weird, as you would draw the line on the minute above instead of yourself,
				// and would require weird math for the last or first element.

				const linePosition = nowMinute < minute.min
					? (nowMinute - minute.interval[0]) / (minute.min - minute.interval[0]) * 50
					: 50 + (nowMinute - minute.min) / (minute.interval[1] - minute.min) * 50;

				return (
					<div
						key={minuteIndex}
						className={`${styles.minute} ${minute.exceptions_ids && styles.variant}`}
						style={{
						}}
					>
						{showLine && (
							<div
								className={styles.realtimeLine}
								style={{
									top: `${linePosition}%`,
								}}
							/>
						)}
						<div
							style={{
								zIndex: 1,
							}}
						>
							{minute.min.toString().padStart(2, '0')}
						</div>
						{minute.exceptions_ids
						&& (
							<div
								className={styles.exceptions}
							>
								{minute.exceptions_ids.map(exception =>
									<span key={exception}>{exception}</span>,
								)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	));

	// 2. Render the exceptions footer
	const Footer = timetable.exceptions.length > 0 && (
		<div className={styles.exceptionFooter}>
			{timetable.exceptions.map(exception => (
				exception.type == 'variant' && (
					<div key={exception.exception_id}>
						<span className={styles.exceptionTag}>
							{exception.exception_id})
						</span> {t('path')}&nbsp;{/* required for ESLint to play nice */}
						<Link className={styles.exceptionLink} href="#"><span className={styles.underline}>{exception.pattern_headsign}</span>
							<IconArrowUpRight size={12} />
						</Link>
					</div>
				)
			))}
		</div>
	);

	// Render everything if there is data, otherwise show a message
	return newTimetable.hours.length > 0
		? (
			<div>
				<div className={styles.scheduleContainer}>
					<div className={styles.column}>
						<div className={styles.hour}>{t('hours')}</div>
						<div className={styles.minute}>{t('minutes')}</div>
					</div>
					{Table}
				</div>
				{Footer}
			</div>
		)
		: (
			<div className={styles.scheduleContainer}>
				<p className={styles.noData}>{t('no_data')}</p>
			</div>
		);
}
