'use client';

import { useState } from 'react';
import styles from './StopsExplorerTimetableFeedback.module.css';
import { useTranslations } from 'next-intl';

export default function StopsExplorerTimetableFeedback({ tripData, selectedStopId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerTimetableFeedback');

  const [isVisible, setIsVisible] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);

  //
  // B. Handle actions

  const handleClickAnswer = (e) => {
    e.stopPropagation();
    setIsAnswered(true);
    setTimeout(() => setIsVisible(false), 10000);
  };

  //
  // c. Render components

  return !isAnswered ? (
    <div className={styles.container}>
      <div className={styles.message}>{t('message')}</div>
      <div className={styles.answers}>
        <div className={`${styles.positive} ${styles.hover}`} onClick={handleClickAnswer}>
          {t('answers.positive')}
        </div>
        <div className={`${styles.negative} ${styles.hover}`} onClick={handleClickAnswer}>
          {t('answers.negative')}
        </div>
      </div>
    </div>
  ) : (
    isVisible && <div className={styles.thankYou}>{t('thank_you')}</div>
  );
}
