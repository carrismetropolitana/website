'use client';

/* * */

import useSWR from 'swr';
import { useMemo } from 'react';
import { useTranslations, useFormatter, useNow } from 'next-intl';
import styles from './LinesExplorerContentPatternPathStopRealtime.module.css';
import LiveIcon from '@/components/LiveIcon/LiveIcon';
import parseStringToDate from '@/services/parseStringToDate';
import parseTimeStringToDate from '@/services/parseTimeStringToDate';

/* * */

export default function LinesExplorerContentPatternPathStopRealtime({ patternId, stopId, stopSequence }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContentPatternPathStopRealtime');
  const format = useFormatter();
  const now = useNow({ updateInterval: 1000 });

  //
  // B. Fetch data

  const { data: realtimeData } = useSWR(stopId && `https://api.carrismetropolitana.pt/stops/${stopId}/realtime`, { fetchInterval: 1000 });

  //
  // C. Handle actions

  const nextEstimatedArrivals = useMemo(() => {
    // Return early if no data is available
    if (!realtimeData) return [];
    // Filter estimates for the current pattern
    const filteredNextRealtimeArrivals = realtimeData.filter((item) => {
      if (!item.estimated_arrival) return false;
      const isForCurrentPattern = item.pattern_id === patternId;
      const isForCurrentStopSequence = item.stop_sequence === stopSequence;
      const isInTheFuture = parseTimeStringToDate(item.estimated_arrival) >= new Date();
      return isForCurrentPattern && isForCurrentStopSequence && isInTheFuture;
    });
    // Sort by arrival_time
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedNextRealtimeArrivals = filteredNextRealtimeArrivals.sort((a, b) => collator.compare(a.estimated_arrival, b.estimated_arrival));
    // Return result
    return sortedNextRealtimeArrivals;
    //
  }, [realtimeData, patternId, stopSequence]);

  if (nextEstimatedArrivals.length > 0) console.log('filteredNextRealtimeArrivals', nextEstimatedArrivals);

  //   const estimatedNextArrivalTime = useMemo(() => {
  //     //
  //     if (!realtimeData) return '';
  //     // Filter estimates for the current pattern
  //     const filteredRealtimeData = realtimeData.filter((item) => {
  //       const isForCurrentPattern = item.pattern_id === patternId;
  //       return isForCurrentPattern;
  //     });
  //     // Sort by arrival_time
  //     const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
  //     const sortedRealtimeData = filteredRealtimeData.sort((a, b) => collator.compare(a.estimated_arrival, b.estimated_arrival));
  //     // Exit early if no estimate matches this stop and pattern
  //     if (!sortedRealtimeData.length) return '';
  //     // Parse absolute time to relative
  //     const relative = parseStringToDate(sortedRealtimeData[0].estimated_arrival);
  //     // console.log('sortedRealtimeData[0]', sortedRealtimeData[0]);
  //     // Return result
  //     return relative;
  //     //
  //   }, [patternId, realtimeData]);

  //   console.log(estimatedNextArrivalTime);

  //   function parseRelativeTime(eta) {
  //     // Skip if no eta
  //     if (!eta) return null;

  //     // Get current time
  //     var now = new Date();
  //     var currentHours = now.getHours();
  //     var currentMinutes = now.getMinutes();
  //     var currentSeconds = now.getSeconds();

  //     // Parse ETA
  //     var parts = eta.split(':');
  //     var etaHours = parseInt(parts[0]);
  //     var etaMinutes = parseInt(parts[1]);
  //     var etaSeconds = parseInt(parts[2]);

  //     // Calculate time difference
  //     var diffHours = etaHours - currentHours;
  //     var diffMinutes = etaMinutes - currentMinutes;
  //     var diffSeconds = etaSeconds - currentSeconds;

  //     // Convert time difference into minutes
  //     var totalDiffMinutes = diffHours * 60 + diffMinutes + diffSeconds / 60;

  //     // Calculate the relative time as a Date object
  //     var relativeTime = new Date();
  //     relativeTime.setMinutes(relativeTime.getMinutes() + totalDiffMinutes);
  //     return relativeTime;
  //   }

  //
  // C. Render components

  return (
    nextEstimatedArrivals.length > 0 && (
      <div className={styles.container}>
        {nextEstimatedArrivals.map((item, index) => (
          <div key={index} className={styles.container}>
            <LiveIcon />
            <p className={styles.estimate}>{item.estimated_arrival}</p>
          </div>
        ))}
      </div>
    )
  );

  //
}
