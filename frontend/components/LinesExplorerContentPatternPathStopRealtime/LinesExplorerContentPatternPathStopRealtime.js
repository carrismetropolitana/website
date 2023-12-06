'use client';

/* * */

import useSWR from 'swr';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContentPatternPathStopRealtime.module.css';
import LiveIcon from '@/components/LiveIcon/LiveIcon';
import { IconClock } from '@tabler/icons-react';
import { DateTime } from 'luxon';

/* * */

export default function LinesExplorerContentPatternPathStopRealtime({ patternId, stopId, stopSequence, showScheduledArrivals = true, maxEstimatedArrivals = 3, maxScheduledArrivals = 3 }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContentPatternPathStopRealtime');

  //
  // B. Fetch data

  const { data: realtimeData } = useSWR(stopId && `https://api.carrismetropolitana.pt/stops/${stopId}/realtime`, { refreshInterval: 10000 });

  //
  // C. Transform data

  const nextEstimatedArrivals = useMemo(() => {
    // Return early if no data is available
    if (!realtimeData) return [];
    // Filter estimates for the current pattern
    const filteredNextEstimatedArrivals = realtimeData.filter((item) => {
      // Skip if no estimated arrival is available
      if (!item.estimated_arrival_unix) return false;
      // Skip if the estimated arrival is for a different pattern
      if (item.pattern_id !== patternId) return false;
      // Skip if the estimated arrival is for a different stop sequence
      if (item.stop_sequence !== stopSequence) return false;
      // Skip if the estimated arrival is in the past
      if (new Date(item.estimated_arrival_unix * 1000) < new Date()) return false;
      // else return true
      return true;
    });
    // Sort by arrival_time
    const sortedNextEstimatedArrivals = filteredNextEstimatedArrivals.sort((a, b) => a.estimated_arrival_unix - b.estimated_arrival_unix);
    // Format the arrival times
    const formattedNextEstimatedArrivals = sortedNextEstimatedArrivals.map((item) => {
      const timeDifferenceBetweenEstimateAndNow = new Date(item.scheduled_arrival_unix * 1000) - new Date();
      return Math.floor(timeDifferenceBetweenEstimateAndNow / 1000 / 60);
    });
    // Limit array to the max amount of items
    const limitedNextEstimatedArrivals = formattedNextEstimatedArrivals.slice(0, maxEstimatedArrivals);
    // Return result
    return limitedNextEstimatedArrivals;
    //
  }, [realtimeData, maxEstimatedArrivals, patternId, stopSequence]);

  const nextScheduledArrivals = useMemo(() => {
    // Return early if no data is available
    if (!realtimeData) return [];
    // Filter estimates for the current pattern
    const filteredNextScheduledArrivals = realtimeData.filter((item) => {
      // Skip if there is no scheduled arrival
      if (!item.scheduled_arrival_unix) return false;
      // Skip if there is an estimated arrival
      if (item.estimated_arrival_unix) return false;
      // Skip if the estimated arrival is for a different pattern
      if (item.pattern_id !== patternId) return false;
      // Skip if the estimated arrival is for a different stop sequence
      if (item.stop_sequence !== stopSequence) return false;
      // Skip if the estimated arrival is in the past
      if (new Date(item.scheduled_arrival_unix * 1000) < new Date()) return false;
      // else return true
      return true;
    });
    // Sort by arrival_time
    const sortedNextScheduledArrivals = filteredNextScheduledArrivals.sort((a, b) => a.scheduled_arrival_unix - b.scheduled_arrival_unix);
    // Format the arrival times
    const formattedNextScheduledArrivals = sortedNextScheduledArrivals.map((item) => {
      const dateTimeObject = DateTime.fromSeconds(item.scheduled_arrival_unix, { zone: 'UTC' });
      return `${dateTimeObject.toFormat('HH', { zone: 'Europe/Lisbon' })}:${dateTimeObject.toFormat('mm', { zone: 'Europe/Lisbon' })}`;
    });
    // Limit array to the max amount of items
    const limitedNextScheduledArrivals = formattedNextScheduledArrivals.slice(0, maxScheduledArrivals);
    // Return result
    return limitedNextScheduledArrivals;
    //
  }, [realtimeData, maxScheduledArrivals, patternId, stopSequence]);

  //
  // D. Render components

  return (
    <div className={styles.container}>
      {nextEstimatedArrivals.length > 0 && (
        <div className={styles.row}>
          <LiveIcon />
          {nextEstimatedArrivals.map((item, index) => (
            <p key={index} className={styles.estimatedArrival}>
              {t('estimated_arrival', { value: item })}
            </p>
          ))}
        </div>
      )}
      {(showScheduledArrivals || !nextEstimatedArrivals.length) && nextScheduledArrivals.length > 0 && (
        <div className={styles.row}>
          <IconClock size={14} stroke={2.5} />
          {nextScheduledArrivals.map((item, index) => (
            <p key={index} className={styles.scheduledArrival}>
              {t('scheduled_arrival', { value: item })}
            </p>
          ))}
        </div>
      )}
      {!nextEstimatedArrivals.length && !nextScheduledArrivals.length && showScheduledArrivals && <p>-</p>}
    </div>
  );

  //
}
