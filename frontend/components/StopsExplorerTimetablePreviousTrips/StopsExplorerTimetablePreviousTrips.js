'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import styles from './StopsExplorerTimetablePreviousTrips.module.css';
import StopsExplorerTimetableRow from '@/components/StopsExplorerTimetableRow/StopsExplorerTimetableRow';
import { useStopsExplorerContext } from '@/contexts/StopsExplorerContext';

/* * */

export default function StopsExplorerTimetablePreviousTrips({ tripsData }) {
  //

  //
  // A. Setup variables

  const previousTripsShownByDefault = 1;

  const t = useTranslations('StopsExplorerTimetablePreviousTrips');

  const [showAllTrips, setShowAllTrips] = useState(false);

  const stopsExplorerContext = useStopsExplorerContext();

  //
  // B. Transform data

  const visibleTrips = useMemo(() => {
    if (showAllTrips) {
      return tripsData;
    } else {
      const selectedTripData = tripsData.find((item) => item.trip_id === stopsExplorerContext.values.selected_trip_id);
      const tripsThatShouldBeVisible = tripsData.slice(tripsData.length - previousTripsShownByDefault, tripsData.length);
      const selectedTripIsAlreadyVisible = tripsThatShouldBeVisible.find((item) => item.trip_id === stopsExplorerContext.values.selected_trip_id);
      if (selectedTripData && !selectedTripIsAlreadyVisible) tripsThatShouldBeVisible.push(selectedTripData);
      tripsThatShouldBeVisible.sort((a, b) => {
        const timeStringA = a.scheduled_arrival.split(':').join('');
        const timeStringB = b.scheduled_arrival.split(':').join('');
        return timeStringA - timeStringB;
      });
      return tripsThatShouldBeVisible;
    }
  }, [stopsExplorerContext.values.selected_trip_id, showAllTrips, tripsData]);

  //
  // C. Handle actions

  const handleToogleShowAllTrips = () => {
    setShowAllTrips(!showAllTrips);
  };

  //
  // D. Render components

  return (
    <div className={styles.container}>
      {tripsData.length > previousTripsShownByDefault && (
        <div className={styles.toggle} onClick={handleToogleShowAllTrips}>
          {showAllTrips ? t('toggle.hide') : t('toggle.show')}
        </div>
      )}
      {visibleTrips.map((trip) => (
        <StopsExplorerTimetableRow key={`${trip.trip_id}_${trip.stop_sequence}`} rowType={'previous'} tripData={trip} />
      ))}
      {showAllTrips && tripsData.length > previousTripsShownByDefault && (
        <div className={styles.toggle} onClick={handleToogleShowAllTrips}>
          {showAllTrips ? t('toggle.hide') : t('toggle.show')}
        </div>
      )}
    </div>
  );
}
