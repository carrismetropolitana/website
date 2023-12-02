'use client';

import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import styles from './StopsExplorerTimetable.module.css';
import Loader from '@/components/Loader/Loader';
import { getMinutesFromOperationTimeString } from '@/services/parseRelativeTime';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import StopsExplorerTimetableHeader from '@/components/StopsExplorerTimetableHeader/StopsExplorerTimetableHeader';
import StopsExplorerTimetablePreviousTrips from '@/components/StopsExplorerTimetablePreviousTrips/StopsExplorerTimetablePreviousTrips';
import StopsExplorerTimetableCurrentAndFutureTrips from '@/components/StopsExplorerTimetableCurrentAndFutureTrips/StopsExplorerTimetableCurrentAndFutureTrips';
import StopsExplorerTimetableDividerLine from '@/components/StopsExplorerTimetableDividerLine/StopsExplorerTimetableDividerLine';
import { useStopsExplorerContext } from '@/contexts/StopsExplorerContext';

/* * */

export default function StopsExplorerTimetable() {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerTimetable');

  const stopsExplorerContext = useStopsExplorerContext();

  let previousTrips = [];
  let currentAndFutureTrips = [];

  //
  // B. Fetch data

  const { data: stopRealtimeData, isLoading: stopRealtimeLoading } = useSWR(stopsExplorerContext.entities.stop?.id && `https://api.carrismetropolitana.pt/stops/${stopsExplorerContext.entities.stop.id}/realtime`, {
    refreshInterval: 5000,
  });

  //
  // C. Transform data

  (() => {
    //

    // 1.
    // Return if data is not yet ready

    if (!stopRealtimeData) return;

    // 2.
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
        previousTrips.push(realtimeTrip);
        continue;
      }

      currentAndFutureTrips.push(realtimeTrip);
      continue;

      //
    }

    // 3.
    // Sort both arrays based on scheduled arrival

    previousTrips.sort((a, b) => {
      const timeStringA = a.scheduled_arrival.split(':').join('');
      const timeStringB = b.scheduled_arrival.split(':').join('');
      return timeStringA - timeStringB;
    });

    currentAndFutureTrips.sort((a, b) => {
      // Check if both `a` and `b` have estimated_arrival
      if (a.estimated_arrival && b.estimated_arrival) {
        // Both have estimated_arrival, compare them
        const timeStringA = a.estimated_arrival.split(':').join('');
        const timeStringB = b.estimated_arrival.split(':').join('');
        return timeStringA - timeStringB;
        //
      } else if (a.estimated_arrival) {
        // Only `a` has estimated_arrival, so it comes before `b`
        return -1;
        //
      } else if (b.estimated_arrival) {
        // Only `b` has estimated_arrival, so it comes before `a`
        return 1;
        //
      } else {
        // Both have only scheduled_arrival, compare them
        const timeStringA = a.scheduled_arrival.split(':').join('');
        const timeStringB = b.scheduled_arrival.split(':').join('');
        return timeStringA - timeStringB;
        //
      }
      //
    });

    //
  })();

  //
  // D. Handle actions

  return (
    <div className={styles.container}>
      {stopRealtimeLoading ? (
        <Loader visible maxed />
      ) : previousTrips.length > 0 || currentAndFutureTrips.length > 0 ? (
        <>
          <StopsExplorerTimetableHeader />
          <StopsExplorerTimetablePreviousTrips tripsData={previousTrips} />
          <StopsExplorerTimetableDividerLine />
          <StopsExplorerTimetableCurrentAndFutureTrips tripsData={currentAndFutureTrips} />
        </>
      ) : (
        <NoDataLabel text={t('no_service')} />
      )}
    </div>
  );

  //
}
