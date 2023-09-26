import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPathTimetable.module.css';
import { useEffect, useState } from 'react';

/* * */

export default function LinePatternPathTimetable({ index, stopId }) {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const [timetable, setTimetable] = useState([]);
  const t = useTranslations('LinePatternPathTimetable');

  //
  // B. Fetch data

  const { data: patternData } = useSWR(lineForm.values.pattern_id && `https://api.carrismetropolitana.pt/patterns/${lineForm.values.pattern_id}`);

  //
  // C. Transform data

  useEffect(() => {
    //
    // Return if patternData is undefined
    if (!patternData) return;

    // Filter trips that happen on the selected date
    const tripsForSelectedDate = patternData.trips.filter((trip) => {
      return trip.dates.includes(lineForm.values.date_string);
    });

    // For each available trip, find out the schedules for the selected stop
    let schedulesForSelectedDateAndStop = tripsForSelectedDate.map((trip) => {
      // Ensure that the current stop_time matches
      // both the current stop_id as well as the current stop_sequence
      return trip.schedule.find((stopTime, stopTimeIndex) => {
        return stopTime && stopTime.stop_id === stopId && stopTimeIndex === index;
      });
    });

    // Define a variable to hold timetable values in the following format:
    // [{ hour: '07', minutes: ['23', '45'] }]
    let timetableTemp = [];

    // For each schedule for the selected stop, build the timetable
    schedulesForSelectedDateAndStop.map((item) => {
      // Parse the arrival_hour
      const arrival_hour = item ? item.arrival_time.substr(0, 2) : null; // [12]:34
      // Cycle through each formatted schedule in the timetable variable above
      // to check if there is already an entry for the given 'arrival_hour'
      const existingTimetableEntry = timetableTemp.find((item) => item.hour === arrival_hour);
      if (existingTimetableEntry) existingTimetableEntry.minutes.push(item.arrival_time.substr(3, 2)); // 12:[34]
      else timetableTemp.push({ hour: arrival_hour, minutes: [item.arrival_time.substr(3, 2)] });
    });

    // Update the state variable
    setTimetable(timetableTemp);

    //
  }, [patternData, index, lineForm.values.date_string, stopId]);

  //
  // D. Render components

  return (
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
  );

  //
}
