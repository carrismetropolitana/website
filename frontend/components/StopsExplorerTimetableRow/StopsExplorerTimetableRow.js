'use client';

import useSWR from 'swr';
import styles from './StopsExplorerTimetableRow.module.css';
import LineDisplay from '@/components/LineDisplay/LineDisplay';
import { useEffect, useState } from 'react';
import { convertOperationTimeStringTo24HourTimeString, getMinutesFromOperationTimeString } from '@/services/parseRelativeTime';
import { useTranslations } from 'next-intl';
import LiveIcon from '@/components/LiveIcon/LiveIcon';
import { Divider } from '@mantine/core';

export default function StopsExplorerTimetableRow({ rowType, tripData, selectedTripId, onSelectTrip }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerTimetableRow');

  const [tripEtaMinutes, setTripEtaMinutes] = useState();
  const [tripEtaString, setTripEtaString] = useState('');
  const [tripRealtimeStatus, setTripRealtimeStatus] = useState('scheduled');

  //
  // B. Fetch data

  const { data: patternData, error: patternError, isLoading: patternLoading } = useSWR(tripData?.pattern_id && `https://api.carrismetropolitana.pt/patterns/${tripData.pattern_id}`);

  //
  // B. Transform data

  useEffect(() => {
    //

    // Re-render estimates on an interval

    function calculateArrivalEstimate() {
      //

      // 1.
      // Return if data is not yet ready

      if (!tripData || !patternData) return;

      // 2.
      // Classify this trip for realtime status

      // Regarding realtime status:
      //    1. For 'previous' trips:
      //        1.1. A trip always displays its scheduled value;
      //    2. For 'current' trips:
      //        2.1. If estimated_arrival is available, show it as relative time;
      //        2.2. Otherwise show scheduled_arrival as absolute time.

      if (rowType === 'previous') {
        // Set the trip status
        setTripRealtimeStatus('passed');
        // Format the arrival estimate string
        const parsedArrivalEstimate = convertOperationTimeStringTo24HourTimeString(tripData.scheduled_arrival);
        const formattedArrivalEstimate = parsedArrivalEstimate.substring(0, 5);
        setTripEtaString(formattedArrivalEstimate);
        // Set minutes from now until arrival
        const minutesToArrivalFromNow = getMinutesFromOperationTimeString(tripData.scheduled_arrival);
        setTripEtaMinutes(minutesToArrivalFromNow);
        //
        return;
      }

      if (rowType === 'current' || rowType === 'future') {
        //
        if (tripData.estimated_arrival) {
          // Format the arrival estimate string
          const parsedArrivalEstimate = convertOperationTimeStringTo24HourTimeString(tripData.estimated_arrival);
          const formattedArrivalEstimate = parsedArrivalEstimate.substring(0, 5);
          setTripEtaString(formattedArrivalEstimate);
          // Set minutes from now until arrival
          const minutesToArrivalFromNow = getMinutesFromOperationTimeString(tripData.estimated_arrival);
          setTripEtaMinutes(minutesToArrivalFromNow);
          // Check how close the estimate is to now
          if (minutesToArrivalFromNow <= 1) setTripRealtimeStatus('arriving_now');
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
        // Set minutes from now until arrival
        const minutesToArrivalFromNow = getMinutesFromOperationTimeString(tripData.scheduled_arrival);
        setTripEtaMinutes(minutesToArrivalFromNow);
        //
        return;
      }

      //
    }

    // Run once
    calculateArrivalEstimate();

    // Run on an interval
    const intervalId = setInterval(() => calculateArrivalEstimate(), 1000 * 10 /* milli * seconds */);

    // Clear interval on exit
    return () => clearInterval(intervalId);

    //
  }, [patternData, rowType, tripData]);

  //
  // D. Handle actions

  const handleSelectTrip = () => {
    if (!tripData || !patternData) return;
    if (selectedTripId === tripData.trip_id) onSelectTrip();
    else onSelectTrip(tripData.trip_id, tripData.pattern_id, patternData.shape_id, tripData.vehicle_id);
  };

  //
  // D. Render components

  return (
    <div className={`${styles.container} ${styles[tripRealtimeStatus]} ${selectedTripId === tripData.trip_id && styles.selected}`} onClick={handleSelectTrip}>
      <div className={styles.tripSummary}>
        <LineDisplay short_name={tripData.line_id} long_name={patternData?.headsign} color={patternData?.color} text_color={patternData?.text_color} />
        {tripRealtimeStatus === 'passed' && (
          <div className={styles.arrivalEstimate}>
            <p>{t('trip_realtime_status.passed', { value: tripEtaString })}</p>
          </div>
        )}
        {tripRealtimeStatus === 'arriving_now' && (
          <div className={styles.arrivalEstimate}>
            <LiveIcon />
            <p>{t('trip_realtime_status.arriving_now')}</p>
          </div>
        )}
        {tripRealtimeStatus === 'realtime' && (
          <div className={styles.arrivalEstimate}>
            <LiveIcon />
            <p>{t('trip_realtime_status.realtime', { value: tripEtaMinutes })}</p>
          </div>
        )}
        {tripRealtimeStatus === 'scheduled' && (
          <div className={styles.arrivalEstimate}>
            <p>{t('trip_realtime_status.scheduled', { value: tripEtaString })}</p>
          </div>
        )}
      </div>

      <div className={styles.tripDetails}>
        <div className={styles.testData} onClick={(e) => e.stopPropagation()}>
          <p>trip: {tripData.trip_id}</p>
          <p>vehicle: {tripData.vehicle_id}</p>
          <p>Observado: {tripData.observed_arrival}</p>
          <p>Estimado: {tripData.estimated_arrival}</p>
          <p>Planeado: {tripData.scheduled_arrival}</p>
        </div>

        <Divider />

        <div className={styles.localitiesPerLine}>
          <p>Passa por</p>
          <div className={styles.localities}>
            {patternData?.localities?.length > 0 &&
              patternData.localities.map((locality, index) => (
                <div key={index}>
                  {index > 0 && '•'}
                  <p style={{ color: 'var(--gray7)' }}>{locality}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
