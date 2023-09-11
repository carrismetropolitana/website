'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import styles from './StopsExplorerTimetablePreviousTrips.module.css';
import StopsExplorerTimetableRow from '@/components/StopsExplorerTimetableRow/StopsExplorerTimetableRow';

export default function StopsExplorerTimetablePreviousTrips({ tripsData, selectedTripCode, onSelectTrip }) {
  //

  //
  // A. Setup variables

  const previousTripsShownByDefault = 1;

  const t = useTranslations('StopsExplorerTimetablePreviousTrips');

  const [showAllTrips, setShowAllTrips] = useState(false);

  //
  // B. Transform data

  const visibleTrips = useMemo(() => {
    if (showAllTrips) return tripsData;
    else return tripsData.slice(tripsData.length - previousTripsShownByDefault, tripsData.length);
  }, [showAllTrips, tripsData]);

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
      {visibleTrips.map((trip, index) => (
        <StopsExplorerTimetableRow key={`${trip.trip_code}_${index}`} rowType={'previous'} tripData={trip} selectedTripCode={selectedTripCode} onSelectTrip={onSelectTrip} />
      ))}
      {showAllTrips && tripsData.length > previousTripsShownByDefault && (
        <div className={styles.toggle} onClick={handleToogleShowAllTrips}>
          {showAllTrips ? t('toggle.hide') : t('toggle.show')}
        </div>
      )}
    </div>
  );
}
