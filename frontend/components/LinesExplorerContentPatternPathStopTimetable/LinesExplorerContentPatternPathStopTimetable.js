'use client';

/* * */

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import styles from './LinesExplorerContentPatternPathStopTimetable.module.css';
import NoDataLabel from '../NoDataLabel/NoDataLabel';

/* * */

export default function LinesExplorerContentPatternPathStopTimetable({ stopSequence, stopId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContentPatternPathStopTimetable');
  const linesExplorerContext = useLinesExplorerContext();
  const [timetable, setTimetable] = useState([]);

  //
  // B. Transform data

  useEffect(() => {
    // Return if linesExplorerContext.entities.pattern is undefined
    if (!linesExplorerContext.entities.pattern) return;
    // Filter trips that happen on the selected date
    const tripsForSelectedDate = linesExplorerContext.entities.pattern.trips.filter((trip) => {
      return trip.dates.includes(linesExplorerContext.entities.date_string);
    });
    // For each available trip, find out the schedules for the selected stop
    let schedulesForSelectedDateAndStop = tripsForSelectedDate.map((trip) => {
      // Ensure that the current stop_time matches
      // both the current stop_id as well as the current stop_sequence
      return trip.schedule.find((stopTime) => {
        return stopTime && stopTime.stop_id === stopId && stopTime.stop_sequence === stopSequence;
      });
    });
    // Define a variable to hold timetable values in the following format:
    // [{ hour: '07', minutes: ['23', '45'] }]
    let timetableTemp = [];
    // For each schedule for the selected stop, build the timetable
    schedulesForSelectedDateAndStop.forEach((item) => {
      // Return ealy if the schedule is undefined
      if (!item) return;
      // Parse the arrival_hour
      const arrival_hour = item.arrival_time?.substr(0, 2); // [12]:34
      // Cycle through each formatted schedule in the timetable variable above
      // to check if there is already an entry for the given 'arrival_hour'
      const existingTimetableEntry = timetableTemp.find((item) => item.hour === arrival_hour);
      if (existingTimetableEntry) existingTimetableEntry.minutes.push(item.arrival_time.substr(3, 2)); // 12:[34]
      else timetableTemp.push({ hour: arrival_hour, minutes: [item.arrival_time.substr(3, 2)] });
    });
    // Update the state variable
    setTimetable(timetableTemp);
    //
  }, [linesExplorerContext.entities.pattern, stopSequence, stopId, linesExplorerContext.entities.date_string]);

  //
  // C. Render components

  return timetable.length > 0 ? (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.hour}>{t('hours.label')}</div>
        <div className={styles.minute}>{t('minutes.label')}</div>
      </div>
      {timetable.map((schedule, scheduleIndex) => (
        <div key={scheduleIndex} className={styles.column}>
          <div className={styles.hour}>{schedule.hour}</div>
          {schedule.minutes.map((minute, minuteIndex) => (
            <div key={minuteIndex} className={styles.minute}>
              {minute}
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <div className={styles.container}>
      <p className={styles.noData}>Sem horários nesta data.</p>
    </div>
  );

  //
}
