import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPathTimetable.module.css';
import { useEffect, useState } from 'react';

//
//
//
//

export default function LinePatternPathTimetable({ index, stop_code }) {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPathTimetable');

  const [timetable, setTimetable] = useState([]);

  //
  // B. Fetch data

  const { data: patternData } = useSWR(lineForm.values.pattern_code && `https://api.carrismetropolitana.pt/patterns/${lineForm.values.pattern_code}`);

  //
  // C. Transform data

  useEffect(() => {
    if (!patternData) return [];
    // Parse selected date
    const year = lineForm.values.date.getFullYear().toString();
    const month = (lineForm.values.date.getMonth() + 1).toString().padStart(2, '0');
    const day = lineForm.values.date.getDate().toString().padStart(2, '0');
    const selectedDateString = year + month + day;

    // Filter by available trips in the selected date
    const availableTripsForSelectedDate = patternData.trips.filter((trip) => {
      return trip.dates.includes(selectedDateString);
    });
    // For eacha available trip, find out the schedules for the selected stop
    let availableSchedulesForSelectedDate = availableTripsForSelectedDate.map((trip) => {
      const matchingScheduleForSelectedStop = trip.schedule.filter((stopTime, stopTimeIndex) => {
        return stopTime && stopTime.stop_code === stop_code && stopTimeIndex === index;
      });
      return matchingScheduleForSelectedStop[0];
    });
    availableSchedulesForSelectedDate = availableSchedulesForSelectedDate.filter((element) => {
      return element !== undefined;
    });
    // Define a variable to hold timetable values in the following format:
    // [{ hour: '07', minutes: ['23', '45'] }]
    let timetableTemp = [];
    // For each schedule for the selected stop, build the timetable
    availableSchedulesForSelectedDate.map((item) => {
      const arrival_hour = item ? item.arrival_time.substr(0, 2) : null; // [12]:34
      let found = false;
      // Cycle through each formatted schedule in the timetable variable above
      // to check if there is already an entry for the given 'arrival_hour'
      for (const formattedSchedule of timetableTemp) {
        if (arrival_hour === formattedSchedule.hour) {
          formattedSchedule.minutes.push(item.arrival_time.substr(3, 2)); // 12:[34]
          found = true;
        }
      }
      // If no entry was found matching the 'arrival_hour' then create it
      if (!found) {
        timetableTemp.push({ hour: arrival_hour, minutes: [item.arrival_time.substr(3, 2)] });
      }
    });
    setTimetable(timetableTemp);
  }, [index, lineForm.values.date, patternData, stop_code]);

  //
  // D. Render components

  return (
    <div className={styles.container}>
      {timetable.map((schedule, scheduleIndex) => (
        <div key={scheduleIndex} className={styles.time}>
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
