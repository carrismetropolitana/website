'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './EstimatedArrival.module.css';
import LiveIcon from '@/components/LiveIcon/LiveIcon';

/* * */

export default function EstimatedArrival({ estimatedArrivalInMinutes, showLiveIcon = true }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('EstimatedArrival');

  //
  // B. Render components

  if (typeof estimatedArrivalInMinutes !== 'number') return;

  if (estimatedArrivalInMinutes <= 1) {
    return (
      <div className={styles.container}>
        {showLiveIcon && <LiveIcon />}
        <p className={styles.estimatedArrival}>{t('arriving_now')}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {showLiveIcon && <LiveIcon />}
      <p className={styles.estimatedArrival}>{t('arriving_soon', { value: estimatedArrivalInMinutes })}</p>
    </div>
  );

  //
}
