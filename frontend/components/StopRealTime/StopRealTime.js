import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import styles from './StopRealTime.module.css';
import { IconFileDownload } from '@tabler/icons-react';
import Loader from '../Loader/Loader';

export default function StopRealTime({ pattern_code, stop_code }) {
  //

  //
  // A. Setup variables

  const [isLoading, setIsLoading] = useState(true);
  const [realTimeEstimate, setRealTimeEstimate] = useState();

  //
  // B. Fetch data

  const { data: realtimeData } = useSWR(stop_code && `https://api.carrismetropolitana.pt/stops/${stop_code}/realtime`);

  //
  // C. Handle actions

  const estimatedNextArrivalTime = useMemo(() => {
    //
    setIsLoading(true);
    if (!realtimeData) return '';
    // Filter estimates for the current pattern
    const filteredRealtimeData = realtimeData.filter((item) => {
      const isForCurrentPattern = item.patternId === pattern_code;
      return isForCurrentPattern;
    });
    // Sort by arrival_time
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedRealtimeData = filteredRealtimeData.sort((a, b) => collator.compare(a.estimatedArrivalTime, b.estimatedArrivalTime));
    //
    console.log(sortedRealtimeData);
    setIsLoading(false);
    if (sortedRealtimeData.length) return sortedRealtimeData[0].estimatedArrivalTime;
    else return '';
    //
  }, [pattern_code, realtimeData]);

  //
  // C. Render components

  return estimatedNextArrivalTime ? (
    <div className={styles.container}>
      <div className={styles.pulse} />
      <p className={styles.estimate}>{estimatedNextArrivalTime}</p>
    </div>
  ) : (
    <></>
  );

  //
}
