'use client';

import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import styles from './StopsExplorerTimetable.module.css';
import Loader from '@/components/Loader/Loader';
import { getMinutesFromOperationTimeString } from '@/services/parseRelativeTime';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import StopsExplorerTimetableHeader from '@/components/StopsExplorerTimetableHeader/StopsExplorerTimetableHeader';
import StopsExplorerTimetablePreviousTrips from '@/components/StopsExplorerTimetablePreviousTrips/StopsExplorerTimetablePreviousTrips';
import StopsExplorerTimetableCurrentAndFutureTrips from '@/components/StopsExplorerTimetableCurrentAndFutureTrips/StopsExplorerTimetableCurrentAndFutureTrips';
import StopsExplorerTimetableDividerLine from '../StopsExplorerTimetableDividerLine/StopsExplorerTimetableDividerLine';

export default function StopsExplorerTimetable({ selectedStopCode, selectedTripCode, onSelectTrip }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerTimetable');

  const [previousTrips, setPreviousTrips] = useState([]);
  const [currentAndFutureTrips, setCurrentAndFutureTrips] = useState([]);

  //
  // B. Fetch data

  const { data: stopRealtimeData, isLoading: stopRealtimeLoading } = useSWR(selectedStopCode && `https://api.carrismetropolitana.pt/stops/${selectedStopCode}/realtime`, { refreshInterval: 5000 });

  //
  // C. Transform data

  useEffect(() => {
    //

    // 1.
    // Return if data is not yet ready

    if (!stopRealtimeData) return;

    // 2.
    // Setup temporary variables

    let previousTrips_temp = [];
    let currentAndFutureTrips_temp = [];

    // 3.
    // Classify each trip for relevance

    for (const realtimeTrip of stopRealtimeData) {
      //
      // Regarding relevance:
      //    1. A trip is considered 'previous' if:
      //        1.1. there is an observed_arrival, or
      //        1.2. the scheduled_arrival is previous to the current time, and there is no estimated_arrival, or
      //        1.3. the estimated_arrival is previous to the current_time + 5 minutes
      //    2. A trip is considered 'currentOrFuture' otherwise.

      const tripHasObservedArrival = realtimeTrip.observed_arrival ? true : false;
      const tripScheduledArrivalIsInThePast = getMinutesFromOperationTimeString(realtimeTrip.scheduled_arrival) < 0;
      const tripHasEstimatedArrival = realtimeTrip.estimated_arrival ? true : false;
      const tripEstimatedArrivalIsInThePast = getMinutesFromOperationTimeString(realtimeTrip.estimated_arrival) < -5;

      if (tripHasObservedArrival || (tripScheduledArrivalIsInThePast && !tripHasEstimatedArrival) || tripEstimatedArrivalIsInThePast) {
        previousTrips_temp.push(realtimeTrip);
        continue;
      }

      currentAndFutureTrips_temp.push(realtimeTrip);
      continue;

      //
    }

    // 4.
    // Sort both arrays based on scheduled arrival

    previousTrips_temp.sort((a, b) => {
      const timeStringA = a.scheduled_arrival.split(':').join('');
      const timeStringB = b.scheduled_arrival.split(':').join('');
      return timeStringA - timeStringB;
    });

    currentAndFutureTrips_temp.sort((a, b) => {
      //
      let timeStringA;
      if (a.estimated_arrival) timeStringA = a.estimated_arrival.split(':').join('');
      else timeStringA = a.scheduled_arrival.split(':').join('');
      //
      let timeStringB;
      if (b.estimated_arrival) timeStringA = b.estimated_arrival.split(':').join('');
      else timeStringA = b.scheduled_arrival.split(':').join('');
      //
      return timeStringA - timeStringB;
    });

    // Set state
    setPreviousTrips(previousTrips_temp);
    setCurrentAndFutureTrips(currentAndFutureTrips_temp);

    //
  }, [stopRealtimeData]);

  //
  // D. Handle actions

  return stopRealtimeLoading ? (
    <Loader visible maxed />
  ) : previousTrips.length > 0 || currentAndFutureTrips.length > 0 ? (
    <div className={styles.container}>
      <StopsExplorerTimetableHeader />
      <StopsExplorerTimetablePreviousTrips tripsData={previousTrips} selectedTripCode={selectedTripCode} onSelectTrip={onSelectTrip} />
      <StopsExplorerTimetableDividerLine />
      <StopsExplorerTimetableCurrentAndFutureTrips tripsData={currentAndFutureTrips} selectedTripCode={selectedTripCode} onSelectTrip={onSelectTrip} />
    </div>
  ) : (
    <NoDataLabel text={t('no_service')} />
  );

  //
}
