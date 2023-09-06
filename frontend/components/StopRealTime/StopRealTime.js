import useSWR from 'swr';
import { useMemo } from 'react';
import styles from './StopRealTime.module.css';
import { useTranslations, useFormatter, useNow } from 'next-intl';
import LiveIcon from '../LiveIcon/LiveIcon';

export default function StopRealTime({ pattern_code, stop_code }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopRealTime');
  const format = useFormatter();
  const now = useNow({ updateInterval: 1000 });

  //
  // B. Fetch data

  const { data: realtimeData } = useSWR(stop_code && `https://api.carrismetropolitana.pt/stops/${stop_code}/realtime`);

  //
  // C. Handle actions

  const estimatedNextArrivalTime = useMemo(() => {
    //
    if (!realtimeData) return '';
    // Filter estimates for the current pattern
    const filteredRealtimeData = realtimeData.filter((item) => {
      const isForCurrentPattern = item.pattern_code === pattern_code;
      return isForCurrentPattern;
    });
    // Sort by arrival_time
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedRealtimeData = filteredRealtimeData.sort((a, b) => collator.compare(a.estimated_arrival, b.estimated_arrival));
    // Exit early if no estimate matches this stop and pattern
    if (!sortedRealtimeData.length) return '';
    // Parse absolute time to relative
    const relative = parseRelativeTime(sortedRealtimeData[0].estimated_arrival);
    // Return result
    return relative;

    //
  }, [pattern_code, realtimeData]);

  function parseRelativeTime(eta) {
    // Skip if no eta
    if (!eta) return null;

    // Get current time
    var now = new Date();
    var currentHours = now.getHours();
    var currentMinutes = now.getMinutes();
    var currentSeconds = now.getSeconds();

    // Parse ETA
    var parts = eta.split(':');
    var etaHours = parseInt(parts[0]);
    var etaMinutes = parseInt(parts[1]);
    var etaSeconds = parseInt(parts[2]);

    // Calculate time difference
    var diffHours = etaHours - currentHours;
    var diffMinutes = etaMinutes - currentMinutes;
    var diffSeconds = etaSeconds - currentSeconds;

    // Convert time difference into minutes
    var totalDiffMinutes = diffHours * 60 + diffMinutes + diffSeconds / 60;

    // Check if the time is in the future
    if (totalDiffMinutes >= 0) {
      // Calculate the relative time as a Date object
      var relativeTime = new Date();
      relativeTime.setMinutes(relativeTime.getMinutes() + totalDiffMinutes);
      return relativeTime;
    } else {
      // Return null for times that have already passed
      return null;
    }
  }

  //
  // C. Render components

  return estimatedNextArrivalTime ? (
    <div className={styles.container}>
      <LiveIcon />
      <p className={styles.estimate}>{estimatedNextArrivalTime > new Date() ? t('will_pass', { value: format.relativeTime(estimatedNextArrivalTime, now) }) : t('just_passed', { value: format.relativeTime(estimatedNextArrivalTime, now) })}</p>
    </div>
  ) : (
    <></>
  );

  //
}
