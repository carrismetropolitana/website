'use client';

import { useTranslations } from 'next-intl';
import styles from './HelpdeskItemOccupation.module.css';

export default function HelpdeskItemOccupation({ currentlyWaiting, expectedWaitTime }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdeskItemOccupation');

  //
  // C. Render components

  return (
    <>
      <div className={styles.container}>
        <p className={styles.text}>{t('currently_waiting.label', { value: currentlyWaiting })}</p>
      </div>
      <div className={styles.container}>
        <p className={styles.text}>{t('expected_wait_time.label', { value: expectedWaitTime })}</p>
      </div>
    </>
  );

  //
}
