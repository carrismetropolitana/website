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

  const handleClickPositive = async (e) => {
    e.stopPropagation();
    await handleSendFeedback(1);
  };

  const handleClickNegative = async (e) => {
    e.stopPropagation();
    await handleSendFeedback(0);
  };

  const handleSendFeedback = async (sentiment) => {
    //
    try {
      await fetch('https://stats.carrismetropolitana.pt/feedback/stopsExplorerRealtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          stop_id: selectedStopId,
          trip_id: tripData.trip_id,
          vehicle_id: tripData.vehicle_id,
          sentiment: sentiment,
          details: tripData,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    //
    setIsAnswered(true);
    setTimeout(() => setIsVisible(false), 10000);
  };

  //
  // c. Render components

  return !isAnswered ? (
    <div className={styles.container}>
      <div className={styles.message}>{t('message')}</div>
      <div className={styles.answers}>
        <div className={`${styles.positive} ${styles.hover}`} onClick={handleClickPositive}>
          {t('answers.positive')}
        </div>
        <div className={`${styles.negative} ${styles.hover}`} onClick={handleClickNegative}>
          {t('answers.negative')}
        </div>
      </div>
    </div>
  ) : (
    isVisible && <div className={styles.thankYou}>{t('thank_you')}</div>
  );
}
