'use client';

import styles from './StopsExplorerTimetableFeedback.module.css';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useStopsExplorerContext } from '@/contexts/StopsExplorerContext';

/* * */

export default function StopsExplorerTimetableFeedback({ tripData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerTimetableFeedback');

  const stopsExplorerContext = useStopsExplorerContext();

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
          stop_id: stopsExplorerContext.entities.stop_id,
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
