'use client';

/* * */

import { Pattern, Stop } from '@/utils/types';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ date, pattern, stop, stopSequence }: { date: Date, pattern: Pattern, stop: Stop, stopSequence: number }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('schedule_drawer');
	// const [timetable, setTimetable] = useState([]);

	//
	// B. Transform data

	const newTimetable = useMemo(() => {
		const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
		// Return if FrontendLinesContext.entities.pattern is undefined
		// Filter trips that happen on the selected date
		const tripsForSelectedDate = pattern.trips.filter((trip) => {
			return trip.dates.includes(formattedDate);
		});
		// For each available trip, find out the schedules for the selected stop
		const schedulesForSelectedDateAndStopAndStopSequence = tripsForSelectedDate.map((trip) => {
			// Ensure that each stop_time matches both the selected stop_id and stop_sequence
			return trip.schedule.find((stopTime) => {
				return stopTime && stopTime.stop_id === stop.id && stopTime.stop_sequence === stopSequence;
			});
		});
		// Define a variable to hold timetable values in the following format:
		// [{ hour: { value: '01', label:'25' }, minutes: ['23', '45'] }]
		let timetableTemp: { hour: { label: string, value: string }, minutes: string[] }[] = [];
		// For each schedule for the selected stop, build the timetable
		schedulesForSelectedDateAndStopAndStopSequence.forEach((item) => {
			// Return ealy if the schedule is undefined
			if (!item) return;
			// Parse the arrival_hour
			const arrival_hour = item.arrival_time.slice(0, 2); // [12]:34
			// Cycle through each formatted schedule in the timetable variable above
			// to check if there is already an entry for the given 'arrival_hour'
			const existingTimetableEntry = timetableTemp.find(item => item.hour.value === arrival_hour);
			if (existingTimetableEntry) existingTimetableEntry.minutes.push(item.arrival_time.slice(3, 5)); // 12:[34]
			else timetableTemp.push({ hour: { label: arrival_hour, value: item.arrival_time_operation.slice(0, 2) }, minutes: [item.arrival_time.slice(3, 5)] });
		});
		// Sort the timetable by hour
		timetableTemp.sort((a, b) => parseInt(a.hour.value) - parseInt(b.hour.value));
		// Sort the minutes
		timetableTemp = timetableTemp.map((hour) => {
			return {
				hour: { label: hour.hour.label, value: hour.hour.value },
				minutes: hour.minutes.sort((a, b) => parseInt(a) - parseInt(b)),
			};
		});
		// Iterate on the array to check if the hours are continuous. If they are not insert the object {type:divider} at that position in the array
		const dividedTimeTable: ({ type: 'divider' } | typeof timetableTemp[0])[] = timetableTemp;
		for (let i = 0; i < timetableTemp.length - 1; i++) {
			const hour = timetableTemp[i];
			const nextHour = timetableTemp[i + 1];
			if (Number(hour.hour.value) + 1 !== Number(nextHour.hour.value)) {
				dividedTimeTable.splice(i + 1, 0, { type: 'divider' });
				i++;
			}
		}
		// Update the state variable
		return dividedTimeTable;
		//
	}, [pattern]);

	//
	// C. Render components

	function isDivider(schedule: typeof newTimetable[0]): schedule is { type: 'divider' } {
		return (schedule as { type: 'divider' }).type === 'divider';
	}

	return newTimetable.length > 0
		? (
			<div className={styles.container}>
				<div className={styles.column}>
					<div className={styles.hour}>{t('hours')}</div>
					<div className={styles.minute}>{t('minutes')}</div>
				</div>
				{newTimetable.map((schedule, scheduleIndex) => (
					<div key={scheduleIndex} className={styles.column}>
						{isDivider(schedule)
							? <div className={styles.hourDivider} />
							: (
								<>
									<div className={styles.hour}>{schedule.hour.label}</div>
									{schedule.minutes.map((minute, minuteIndex) => (
										<div key={minuteIndex} className={styles.minute}>
											{minute}
										</div>
									))}
								</>
							)}
					</div>
				),

				)}
			</div>
		)
		: (
			<div className={styles.container}>
				<p className={styles.noData}>{t('no_data')}</p>
			</div>
		);

	//
}
