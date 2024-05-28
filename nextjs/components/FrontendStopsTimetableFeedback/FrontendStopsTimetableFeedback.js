'use client';

import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import styles from './FrontendStopsTimetableFeedback.module.css'

/* * */

export default function FrontendStopsTimetableFeedback({ tripData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendStopsTimetableFeedback');

  const FrontendStopsContext = useFrontendStopsContext();

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
      await fetch('https://stats.carrismetropolitana.pt/collector/feedback/stopsRealtime', {
        body: JSON.stringify({
          details: tripData,
          sentiment: sentiment,
          stop_id: FrontendStopsContext.entities.stop.id,
          trip_id: tripData.trip_id,
          vehicle_id: tripData.vehicle_id,
        }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'POST',
      });
    }
 catch (error) {
      console.log(error);
    }

    //
    setIsAnswered(true);
    setTimeout(() => setIsVisible(false), 10000);
  };

  //
  // c. Render components

  return !isAnswered ?
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
    </div> :
		isVisible && <div className={styles.thankYou}>{t('thank_you')}</div>;
}
