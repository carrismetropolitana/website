'use client';

import FrontendStopsTimetableRow from '@/components/FrontendStopsTimetableRow/FrontendStopsTimetableRow'
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel'
import { useTranslations } from 'next-intl'

import styles from './FrontendStopsTimetableCurrentAndFutureTrips.module.css'

/* * */

export default function FrontendStopsTimetableCurrentAndFutureTrips({ tripsData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendStopsTimetableCurrentAndFutureTrips');

  //
  // D. Render components

  return <div className={styles.container}>{tripsData.length > 0 ? tripsData.map(trip => <FrontendStopsTimetableRow key={`${trip.trip_id}_${trip.stop_sequence}`} rowType="current" tripData={trip} />) : <NoDataLabel fill text={t('end_of_service')} />}</div>;
}
