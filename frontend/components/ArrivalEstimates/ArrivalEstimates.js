import { useMemo } from 'react';
import styles from './ArrivalEstimates.module.css';
import { useTranslations } from 'next-intl';
import LiveIcon from '@/components/LiveIcon/LiveIcon';

export default function ArrivalEstimates({ realtime, scheduled }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('ArrivalEstimates');

  //
  // B. Transform data

  const formattedRealtimeEstimates = useMemo(() => {
    return [];
  }, []);

  const formattedScheduledEstimates = useMemo(() => {
    return [];
  }, []);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <div className={styles.realtimeContainer}>
        <LiveIcon />
        {formattedRealtimeEstimates.map((realtime, realtimeIndex) => (
          <p key={realtimeIndex} className={styles.estimate}>
            realtime
          </p>
        ))}
      </div>
      <div className={styles.scheduledContainer}>
        <LiveIcon />
        {formattedScheduledEstimates.map((scheduled, scheduledIndex) => (
          <p key={scheduledIndex} className={styles.estimate}>
            scheduled
          </p>
        ))}
      </div>
    </div>
  );

  //
}
