'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { DatePickerInput } from '@mantine/dates';
import styles from './LinesExplorerToolbarSelectDate.module.css';
import parseDateToString from '@/services/parseDateToString';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import { Button } from '@mantine/core';

export default function LinesExplorerToolbarSelectDate() {
  //

  //
  // A. Setup variables

  const linesExplorerContext = useLinesExplorerContext();
  const t = useTranslations('LinesExplorerToolbarSelectDate');

  //
  // B. Transform data

  const todayDate = useMemo(() => {
    // Get the current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    // If the current hour is after midnight and before 4AM, set the date to the previous day.
    if (currentHour >= 0 && currentHour < 4) currentDate.setDate(currentDate.getDate() - 1);
    // Return date for today
    return currentDate;
    //
  }, []);

  const isTodaySelected = useMemo(() => {
    const todayDateString = parseDateToString(todayDate);
    return todayDateString === linesExplorerContext.entities.date;
  }, [linesExplorerContext.entities.date, todayDate]);

  const tomorrowDate = useMemo(() => {
    // Get the current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    // If the current hour is after midnight and before 4AM,
    // set the date to the previous day.
    if (!(currentHour >= 0 && currentHour < 4)) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // Return date for today
    return currentDate;
    //
  }, []);

  const isTomorrowSelected = useMemo(() => {
    const tomorrowDateString = parseDateToString(tomorrowDate);
    return tomorrowDateString === linesExplorerContext.entities.date;
  }, [linesExplorerContext.entities.date, tomorrowDate]);

  //
  // C. Handle actions

  const handleSetToday = () => {
    handleSetDate(todayDate);
  };

  const handleSetTomorrow = () => {
    handleSetDate(tomorrowDate);
  };

  const handleSetDate = (value) => {
    linesExplorerContext.selectDate(value);
  };

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <Button.Group>
        <Button size="md" variant="default" onClick={handleSetToday}>
          {t('today')}
        </Button>
        <Button size="md" variant="default" onClick={handleSetTomorrow}>
          {t('tomorrow')}
        </Button>
        <DatePickerInput aria-label={t('label')} placeholder={t('placeholder')} dropdownType="modal" onChange={handleSetDate} value={linesExplorerContext.entities.date} size="md" classNames={{ input: `${styles.input} ${!isTodaySelected && !isTomorrowSelected && styles.selected}` }} />
      </Button.Group>
    </div>
  );

  //   return (
  //     <div className={styles.container}>
  //       <div className={styles.wrapper}>
  //         <div className={`${styles.button} ${isTodaySelected && styles.selected}`} onClick={handleSetToday}>
  //           {t('today')}
  //         </div>
  //         <div className={`${styles.button} ${isTomorrowSelected && styles.selected}`} onClick={handleSetTomorrow}>
  //           {t('tomorrow')}
  //         </div>
  //         <DatePickerInput aria-label={t('label')} placeholder={t('placeholder')} dropdownType="modal" onChange={handleSetDate} value={linesExplorerContext.entities.date} size="lg" />
  //       </div>
  //     </div>
  //   );

  //
}
