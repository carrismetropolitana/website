'use client';

/* * */

import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './FrontendLinesContentPatternPathStopTimetable.module.css';

/* * */

export default function FrontendLinesContentPatternPathStopTimetable({ stopId, stopSequence }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendLinesContentPatternPathStopTimetable');
	const FrontendLinesContext = useFrontendLinesContext();
	// const [timetable, setTimetable] = useState([]);

	//
	// B. Transform data

	//   useEffect(() => {
	//     // Return if FrontendLinesContext.entities.pattern is undefined
	//     if (!FrontendLinesContext.entities.pattern) return;
	//     // Filter trips that happen on the selected date
	//     const tripsForSelectedDate = FrontendLinesContext.entities.pattern.trips.filter((trip) => {
	//       return trip.dates.includes(FrontendLinesContext.entities.date_string);
	//     });
	//     // For each available trip, find out the schedules for the selected stop
	//     let schedulesForSelectedDateAndStop = tripsForSelectedDate.map((trip) => {
	//       // Ensure that the current stop_time matches
	//       // both the current stop_id as well as the current stop_sequence
	//       return trip.schedule.find((stopTime) => {
	//         return stopTime && stopTime.stop_id === stopId && stopTime.stop_sequence === stopSequence;
	//       });
	//     });
	//     // Define a variable to hold timetable values in the following format:
	//     // [{ hour: '07', minutes: ['23', '45'] }]
	//     let timetableTemp = [];
	//     // For each schedule for the selected stop, build the timetable
	//     schedulesForSelectedDateAndStop.forEach((item) => {
	//       // Return ealy if the schedule is undefined
	//       if (!item) return;
	//       // Parse the arrival_hour
	//       const arrival_hour = item.arrival_time?.substr(0, 2); // [12]:34
	//       // Cycle through each formatted schedule in the timetable variable above
	//       // to check if there is already an entry for the given 'arrival_hour'
	//       const existingTimetableEntry = timetableTemp.find((item) => item.hour === arrival_hour);
	//       if (existingTimetableEntry) existingTimetableEntry.minutes.push(item.arrival_time.substr(3, 2)); // 12:[34]
	//       else timetableTemp.push({ hour: arrival_hour, minutes: [item.arrival_time.substr(3, 2)] });
	//     });
	//     // Sort the timetable by hour
	//     timetableTemp.sort((a, b) => a.hour - b.hour);
	//     // Update the state variable
	//     setTimetable(timetableTemp);
	//     //
	//   }, [FrontendLinesContext.entities.pattern, stopSequence, stopId, FrontendLinesContext.entities.date_string]);

	const newTimetable = useMemo(() => {
		// Return if FrontendLinesContext.entities.pattern is undefined
		if (!FrontendLinesContext.entities.pattern) return;
		// Filter trips that happen on the selected date
		const tripsForSelectedDate = FrontendLinesContext.entities.pattern.trips.filter((trip) => {
			return trip.dates.includes(FrontendLinesContext.entities.date_string);
		});
		// For each available trip, find out the schedules for the selected stop
		let schedulesForSelectedDateAndStopAndStopSequence = tripsForSelectedDate.map((trip) => {
			// Ensure that each stop_time matches both the selected stop_id and stop_sequence
			return trip.schedule.find((stopTime) => {
				return stopTime && stopTime.stop_id === stopId && stopTime.stop_sequence === stopSequence;
			});
		});
		// Define a variable to hold timetable values in the following format:
		// [{ hour: { value: '01', label:'25' }, minutes: ['23', '45'] }]
		let timetableTemp = [];
		// For each schedule for the selected stop, build the timetable
		schedulesForSelectedDateAndStopAndStopSequence.forEach((item) => {
			// Return ealy if the schedule is undefined
			if (!item) return;
			// Parse the arrival_hour
			const arrival_hour = item.arrival_time?.substr(0, 2); // [12]:34
			// Cycle through each formatted schedule in the timetable variable above
			// to check if there is already an entry for the given 'arrival_hour'
			const existingTimetableEntry = timetableTemp.find(item => item.hour.value === arrival_hour);
			if (existingTimetableEntry) existingTimetableEntry.minutes.push(item.arrival_time.substr(3, 2)); // 12:[34]
			else timetableTemp.push({ hour: { label: arrival_hour, value: item.arrival_time_operation?.substr(0, 2) }, minutes: [item.arrival_time.substr(3, 2)] });
		});
		// Sort the timetable by hour
		timetableTemp.sort((a, b) => a.hour.value - b.hour.value);
		// Sort the minutes
		timetableTemp = timetableTemp.map((hour) => {
			return {
				hour: { label: hour.hour.label, value: hour.hour.value },
				minutes: hour.minutes.sort((a, b) => a - b),
			};
		});
		// Iterate on the array to check if the hours are continuous. If they are not insert the object {type:divider} at that position in the array
		for (let i = 0; i < timetableTemp.length - 1; i++) {
			const hour = timetableTemp[i];
			const nextHour = timetableTemp[i + 1];
			if (Number(hour.hour.value) + 1 !== Number(nextHour.hour.value)) {
				timetableTemp.splice(i + 1, 0, { type: 'divider' });
				i++;
			}
		}
		// Update the state variable
		return timetableTemp;
		//
	}, [FrontendLinesContext.entities.date_string, FrontendLinesContext.entities.pattern, stopId, stopSequence]);

	//
	// C. Render components

	return newTimetable.length > 0
		? (
			<div className={styles.container}>
				<div className={styles.column}>
					<div className={styles.hour}>{t('hours.label')}</div>
					<div className={styles.minute}>{t('minutes.label')}</div>
				</div>
				{newTimetable.map((schedule, scheduleIndex) => (
					<div key={scheduleIndex} className={styles.column}>
						{schedule.type
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
