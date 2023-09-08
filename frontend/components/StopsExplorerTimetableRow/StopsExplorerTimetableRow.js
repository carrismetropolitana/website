'use client';

import useSWR from 'swr';
import styles from './StopsExplorerTimetableRow.module.css';
import LineDisplay from '@/components/LineDisplay/LineDisplay';
import { useEffect, useState } from 'react';
import { convertOperationTimeStringTo24HourTimeString, convertOperationTimeStringToDate, getMinutesFromOperationTimeString } from '@/services/parseRelativeTime';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import Loader from '@/components/Loader/Loader';

export default function StopsExplorerTimetableRow({ type, tripData, selectedTripCode, onSelectTrip }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerTimetableRow');
  const format = useFormatter();
  const now = useNow({ updateInterval: 1000 });

  const [tripEtaString, setTripEtaString] = useState('');
  const [tripEtaDate, setTripEtaDate] = useState();
  const [tripRealtimeStatus, setTripRealtimeStatus] = useState('scheduled');

  //
  // B. Fetch data

  const { data: patternData, error: patternError, isLoading: patternLoading } = useSWR(tripData?.pattern_code && `https://api.carrismetropolitana.pt/patterns/${tripData.pattern_code}`);

  //
  // B. Transform data

  useEffect(() => {
    //

    // 1.
    // Return if data is not yet ready

    if (!tripData || !patternData) return;

    // 2.
    // Setup temporary variables

    // 3.
    // Classify this trip for realtime status

    // Regarding realtime status:
    //    1. For 'previous' trips:
    //        1.1. A trip always displays its scheduled value;
    //    2. For 'current' trips:
    //        2.1. If estimated_arrival is available, show it as relative time;
    //        2.2. Otherwise show scheduled_arrival as absolute time.

    if (type === 'previous') {
      // Set the trip status
      setTripRealtimeStatus('scheduled');
      // Format the arrival estimate string
      const parsedArrivalEstimate = convertOperationTimeStringTo24HourTimeString(tripData.scheduled_arrival);
      const formattedArrivalEstimate = parsedArrivalEstimate.substring(0, 5);
      setTripEtaString(formattedArrivalEstimate);
      // Format the arrival estimate date object
      const dateObjectForArrivalEstimate = convertOperationTimeStringToDate(tripData.scheduled_arrival);
      setTripEtaDate(dateObjectForArrivalEstimate);
      //
      return;
    }

    if (type === 'current' || type === 'future') {
      //
      if (tripData.estimated_arrival) {
        // Format the arrival estimate string
        const parsedArrivalEstimate = convertOperationTimeStringTo24HourTimeString(tripData.estimated_arrival);
        const formattedArrivalEstimate = parsedArrivalEstimate.substring(0, 5);
        setTripEtaString(formattedArrivalEstimate);
        // Format the arrival estimate date object
        const dateObjectForArrivalEstimate = convertOperationTimeStringToDate(tripData.estimated_arrival);
        setTripEtaDate(dateObjectForArrivalEstimate);
        // Check how close the estimate is to now
        const estimatedMinutesUntilArrival = getMinutesFromOperationTimeString(tripData.estimated_arrival);
        if (estimatedMinutesUntilArrival < 1) setTripRealtimeStatus('arriving_now');
        else setTripRealtimeStatus('realtime');
        //
        return;
      }

      // Set the trip status
      setTripRealtimeStatus('scheduled');
      // Format the arrival estimate string
      const parsedArrivalEstimate = convertOperationTimeStringTo24HourTimeString(tripData.scheduled_arrival);
      const formattedArrivalEstimate = parsedArrivalEstimate.substring(0, 5);
      setTripEtaString(formattedArrivalEstimate);
      // Format the arrival estimate date object
      const dateObjectForArrivalEstimate = convertOperationTimeStringToDate(tripData.scheduled_arrival);
      setTripEtaDate(dateObjectForArrivalEstimate);
      //
      return;
    }

    //
  }, [patternData, tripData, type]);

  //
  // D. Handle actions

  const handleSelectTrip = () => {
    console.log(selectedTripCode === tripData.trip_code);
    if (selectedTripCode === tripData.trip_code) onSelectTrip();
    else onSelectTrip(tripData.trip_code, tripData.pattern_code, patternData.shape_code);
  };

  //
  // D. Render components

  return (
    <div className={`${styles.tableBodyRow} ${styles[tripRealtimeStatus]} ${selectedTripCode === tripData.trip_code ? styles.selectedTrip : ''}`} onClick={handleSelectTrip}>
      <div className={styles.tableBodyRowWrapper}>
        <div className={styles.tableBodyColumn}>
          <LineDisplay short_name={tripData.line_code} long_name={tripData.headsign} color={tripData.color} text_color={tripData.text_color} />
        </div>

        {tripRealtimeStatus === 'scheduled' && <div className={`${styles.tableBodyColumn} ${styles.bodyArrivalTime} ${styles.passed}`}>{tripEtaString}</div>}
        {tripRealtimeStatus === 'arriving_now' && <div className={`${styles.tableBodyColumn} ${styles.bodyArrivalTime} ${styles.realtime}`}>{t('trip_realtime_status.arriving_now')}</div>}
        {tripRealtimeStatus === 'realtime' && <div className={`${styles.tableBodyColumn} ${styles.bodyArrivalTime} ${styles.realtime}`}>{t('trip_realtime_status.realtime', { value: format.relativeTime(new Date(tripEtaDate), now) })}</div>}
      </div>

      {patternLoading && <Loader visible size={20} />}

      <div className={styles.tripAdditionalInfo}>
        <div className={styles.localitiesPerLine}>
          <p>Observado: {tripData.observed_arrival}</p>
          <p>Estimado: {tripData.estimated_arrival}</p>
          <p>Planeado: {tripData.scheduled_arrival}</p>
        </div>

        <div className={styles.localitiesPerLine}>
          <p>Passa por</p>
          {/* <div className={styles.localities}>
            {trip.localities.length > 0 &&
              trip.localities.map((locality, index) => (
                <div key={index}>
                  {index > 0 && '•'}
                  <p style={{ color: 'var(--gray7)' }}>{locality}</p>
                </div>
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
