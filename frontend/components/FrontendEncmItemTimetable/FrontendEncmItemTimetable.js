'use client';

import { useTranslations } from 'next-intl';
import styles from './FrontendEncmItemTimetable.module.css';
import { useEffect, useState } from 'react';

export default function FrontendEncmItemTimetable({ isOpen, mon, tue, wed, thu, fri, sat, sun }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendEncmItemTimetable');

  const [parsedSchedules, setParsedSchedules] = useState([]);

  //
  // B. Transform data

  useEffect(() => {
    //
    const openHoursArray = [];

    //
    if (mon?.length > 0) openHoursArray.push({ day: 'mon', hours: mon });
    if (tue?.length > 0) openHoursArray.push({ day: 'tue', hours: tue });
    if (wed?.length > 0) openHoursArray.push({ day: 'wed', hours: wed });
    if (thu?.length > 0) openHoursArray.push({ day: 'thu', hours: thu });
    if (fri?.length > 0) openHoursArray.push({ day: 'fri', hours: fri });
    if (sat?.length > 0) openHoursArray.push({ day: 'sat', hours: sat });
    if (sun?.length > 0) openHoursArray.push({ day: 'sun', hours: sun });

    const resultArray = [];

    for (const daySchedule of openHoursArray) {
      //
      const arrayIndex = resultArray.findIndex((item) => item.hours.join(',') === daySchedule.hours.join(','));
      //
      if (arrayIndex < 0) {
        resultArray.push({ first_day: daySchedule.day, last_day: null, hours: daySchedule.hours });
      } else {
        resultArray[arrayIndex].last_day = daySchedule.day;
      }
    }

    const parsedSchedulesResult = resultArray.map((parsedHours) => {
      return {
        days: `${parsedHours.first_day ? t(parsedHours.first_day) : ''}${parsedHours.last_day ? '-' + t(parsedHours.last_day) : ''}`,
        hours: parsedHours.hours.join(' | '),
      };
    });

    setParsedSchedules(parsedSchedulesResult);
    //
  }, [t, fri, mon, sat, sun, thu, tue, wed]);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{t('title')}</h4>
      {parsedSchedules.map((item) => (
        <div key={item.days} className={styles.schedule}>
          <p className={styles.day}>{item.days}</p>
          <p className={styles.hours}>{item.hours}</p>
        </div>
      ))}
      {/* {isOpen ? <p className={styles.isOpen}>{t('is_open')}</p> : <p className={styles.isClosed}>{t('is_closed')}</p>} */}
    </div>
  );

  //
}
