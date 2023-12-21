'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import styles from './FrontendEncmItemOccupation.module.css';
import LiveIcon from '@/components/LiveIcon/LiveIcon';

export default function FrontendEncmItemOccupation({ currentlyWaiting, expectedWaitTime, activeCounters, isOpen }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendEncmItemOccupation');

  const [waitTimeString, setWaitTimeString] = useState('');

  //
  // C. Render components

  useEffect(() => {
    // When there are customers waiting
    if (currentlyWaiting > 0) {
      if (expectedWaitTime < 60) {
        // If wait time is less than a minute, then round it to the minute
        setWaitTimeString(t('expected_wait_time.available_soon'));
      } else if (expectedWaitTime < 3600) {
        // If wait time is less than an hour
        const minutes = Math.floor(expectedWaitTime / 60);
        setWaitTimeString(t('expected_wait_time.available_at_minutes', { minutes: minutes }));
      } else {
        // If wait time is more than an hour
        const hours = Math.floor(expectedWaitTime / 3600);
        const minutes = Math.floor((expectedWaitTime % 3600) / 60);
        setWaitTimeString(t('expected_wait_time.available_at_hours', { hours: hours, minutes: minutes }));
      }
    } else {
      setWaitTimeString(t('expected_wait_time.available_now'));
    }
  }, [currentlyWaiting, expectedWaitTime, t]);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        {t('title')} <LiveIcon color="#000000" />
      </h4>
      <div className={styles.row}>
        <p className={styles.label}>{t('currently_waiting.label')}</p>
        <p className={styles.text}>{currentlyWaiting}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.label}>{t('expected_wait_time.label')}</p>
        <p className={styles.text}>{waitTimeString}</p>
      </div>
    </div>
  );

  //
}
