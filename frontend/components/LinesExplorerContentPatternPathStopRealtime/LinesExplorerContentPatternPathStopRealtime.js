'use client';

/* * */

import useSWR from 'swr';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContentPatternPathStopRealtime.module.css';
import LiveIcon from '@/components/LiveIcon/LiveIcon';
import parseTimeStringToDate from '@/services/parseTimeStringToDate';
import { IconClock } from '@tabler/icons-react';
import { convertOperationTimeStringTo24HourTimeString, getMinutesFromOperationTimeString } from '@/services/parseRelativeTime';

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
      if (!item.estimated_arrival) return false;
      // Skip if the estimated arrival is for a different pattern
      if (item.pattern_id !== patternId) return false;
      // Skip if the estimated arrival is for a different stop sequence
      if (item.stop_sequence !== stopSequence) return false;
      // Skip if the estimated arrival is in the past
      if (parseTimeStringToDate(item.estimated_arrival) < new Date()) return false;
      // else return true
      return true;
    });
    // Sort by arrival_time
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedNextEstimatedArrivals = filteredNextEstimatedArrivals.sort((a, b) => collator.compare(a.estimated_arrival, b.estimated_arrival));
    // Format the arrival times
    const formattedNextEstimatedArrivals = sortedNextEstimatedArrivals.map((item) => {
      return getMinutesFromOperationTimeString(item.scheduled_arrival);
    });
    // Limit array to the max amount of items
    const limitedNextEstimatedArrivals = formattedNextEstimatedArrivals.slice(0, 3);
    // Return result
    return limitedNextEstimatedArrivals;
    //
  }, [realtimeData, patternId, stopSequence]);

  const nextScheduledArrivals = useMemo(() => {
    // Return early if no data is available
    if (!realtimeData) return [];
    // Filter estimates for the current pattern
    const filteredNextScheduledArrivals = realtimeData.filter((item) => {
      // Skip if there is no scheduled arrival
      if (!item.scheduled_arrival) return false;
      // Skip if there is an estimated arrival
      if (item.estimated_arrival) return false;
      // Skip if the estimated arrival is for a different pattern
      if (item.pattern_id !== patternId) return false;
      // Skip if the estimated arrival is for a different stop sequence
      if (item.stop_sequence !== stopSequence) return false;
      // Skip if the estimated arrival is in the past
      if (parseTimeStringToDate(item.scheduled_arrival) < new Date()) return false;
      // else return true
      return true;
    });
    // Sort by arrival_time
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedNextScheduledArrivals = filteredNextScheduledArrivals.sort((a, b) => collator.compare(a.estimated_arrival, b.estimated_arrival));
    // Format the arrival times
    const formattedNextScheduledArrivals = sortedNextScheduledArrivals.map((item) => {
      return convertOperationTimeStringTo24HourTimeString(item.scheduled_arrival).substring(0, 5);
    });
    // Limit array to the max amount of items
    const limitedNextScheduledArrivals = formattedNextScheduledArrivals.slice(0, 3);
    // Return result
    return limitedNextScheduledArrivals;
    //
  }, [realtimeData, patternId, stopSequence]);

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
