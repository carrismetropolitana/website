'use client';

import { useTranslations } from 'next-intl';
import styles from './StopsExplorerTimetableCurrentAndFutureTrips.module.css';
import StopsExplorerTimetableRow from '@/components/StopsExplorerTimetableRow/StopsExplorerTimetableRow';

export default function StopsExplorerTimetableCurrentAndFutureTrips({ tripsData, selectedTripCode, onSelectTrip }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerTimetableCurrentAndFutureTrips');

  //
  // D. Render components

  return (
    <div className={styles.container}>
      {tripsData.map((trip) => (
        <StopsExplorerTimetableRow key={trip.trip_code} type={'current'} tripData={trip} selectedTripCode={selectedTripCode} onSelectTrip={onSelectTrip} />
      ))}
    </div>
  );
}
