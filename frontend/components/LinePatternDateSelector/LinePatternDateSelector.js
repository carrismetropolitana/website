'use client';

import { useTranslations } from 'next-intl';
import { DatePickerInput } from '@mantine/dates';
import styles from './LinePatternDateSelector.module.css';
import { useLineFormContext } from '@/forms/LineForm';

export default function LinePatternDateSelector() {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternDateSelector');

  //
  // C. Handle actions

  const handleSetToday = () => {
    // Get the current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    // If the current hour is after midnight and before 4AM,
    // set the date to the previous day.
    if (currentHour >= 0 && currentHour < 4) {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    // Set the date value for today
    lineForm.setFieldValue('date', currentDate);
  };

  const handleSetTomorrow = () => {
    // Get the current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    // If the current hour is after midnight and before 4AM,
    // set the date to the previous day.
    if (!(currentHour >= 0 && currentHour < 4)) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // Set the date value for today
    lineForm.setFieldValue('date', currentDate);
  };

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <div className={`${styles.button}`} onClick={handleSetToday}>
        {t('today')}
      </div>
      <div className={`${styles.button}`} onClick={handleSetTomorrow}>
        {t('tomorrow')}
      </div>
      <DatePickerInput aria-label={t('form.date.label')} placeholder={t('form.date.placeholder')} dropdownType='modal' {...lineForm.getInputProps('date')} size='lg' />
    </div>
  );
}
