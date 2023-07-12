'use client';

import { useTranslations } from 'next-intl';
import { DatePickerInput } from '@mantine/dates';
import styles from './LinePatternDateSelector.module.css';
import { useLineFormContext } from '@/forms/LineForm';
import parseDateToString from '@/services/parseDateToString';
import { useMemo, useState } from 'react';

export default function LinePatternDateSelector() {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternDateSelector');

  //
  // C. Handle actions

  const todayDate = useMemo(() => {
    // Get the current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    // If the current hour is after midnight and before 4AM,
    // set the date to the previous day.
    if (currentHour >= 0 && currentHour < 4) {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    // Return date for today
    return currentDate;
    //
  }, []);

  const isTodaySelected = useMemo(() => {
    const todayDateString = parseDateToString(todayDate);
    return todayDateString === lineForm.values.date_string;
  }, [lineForm.values.date_string, todayDate]);

  //
  //
  //

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
    return tomorrowDateString === lineForm.values.date_string;
  }, [lineForm.values.date_string, tomorrowDate]);

  //
  // C. Handle actions

  const handleSetToday = () => {
    // Set the date value for today
    handleSetDate(todayDate);
  };

  const handleSetTomorrow = () => {
    // Set the date value for tomorrow
    handleSetDate(tomorrowDate);
  };

  const handleSetDate = (value) => {
    // Set the date value for tomorrow
    lineForm.setFieldValue('date', value);
    lineForm.setFieldValue('date_string', parseDateToString(value));
  };

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={`${styles.button} ${isTodaySelected && styles.selected}`} onClick={handleSetToday}>
          {t('today')}
        </div>
        <div className={`${styles.button} ${isTomorrowSelected && styles.selected}`} onClick={handleSetTomorrow}>
          {t('tomorrow')}
        </div>
        <DatePickerInput
          aria-label={t('form.date.label')}
          placeholder={t('form.date.placeholder')}
          dropdownType='modal'
          {...lineForm.getInputProps('date')}
          onChange={handleSetDate}
          size='lg'
          classNames={{ input: `${styles.input} ${!isTodaySelected && !isTomorrowSelected && styles.selected}` }}
        />
      </div>
    </div>
  );
}
