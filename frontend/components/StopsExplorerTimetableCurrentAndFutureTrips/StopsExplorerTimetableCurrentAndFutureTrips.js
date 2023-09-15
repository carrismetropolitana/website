'use client';

import { useTranslations } from 'next-intl';
import styles from './StopsExplorerTimetableCurrentAndFutureTrips.module.css';
import StopsExplorerTimetableRow from '@/components/StopsExplorerTimetableRow/StopsExplorerTimetableRow';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';

export default function StopsExplorerTimetableCurrentAndFutureTrips({ tripsData, selectedTripCode, onSelectTrip }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerTimetableCurrentAndFutureTrips');

  //
  // D. Render components

  return (
    <div className={styles.container}>
      {tripsData.length > 0 ? (
        tripsData.map((trip, index) => <StopsExplorerTimetableRow key={`${trip.trip_code}_${index}`} rowType={'current'} tripData={trip} selectedTripCode={selectedTripCode} onSelectTrip={onSelectTrip} />)
      ) : (
        <NoDataLabel fill text={t('end_of_service')} />
      )}
    </div>
  );
}
