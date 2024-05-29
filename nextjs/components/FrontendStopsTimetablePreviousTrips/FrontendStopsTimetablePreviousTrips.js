'use client';

import FrontendStopsTimetableRow from '@/components/FrontendStopsTimetableRow/FrontendStopsTimetableRow';
import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import styles from './FrontendStopsTimetablePreviousTrips.module.css';

/* * */

export default function FrontendStopsTimetablePreviousTrips({ tripsData }) {
	//

	//
	// A. Setup variables

	const previousTripsShownByDefault = 1;

	const t = useTranslations('FrontendStopsTimetablePreviousTrips');

	const [showAllTrips, setShowAllTrips] = useState(false);

	const FrontendStopsContext = useFrontendStopsContext();

	//
	// B. Transform data

	const visibleTrips = useMemo(() => {
		if (showAllTrips) {
			return tripsData;
		}
		else {
			const selectedTripData = tripsData.find(item => item.trip_id === FrontendStopsContext.entities.trip_id);
			const tripsThatShouldBeVisible = tripsData.slice(tripsData.length - previousTripsShownByDefault, tripsData.length);
			const selectedTripIsAlreadyVisible = tripsThatShouldBeVisible.find(item => item.trip_id === FrontendStopsContext.entities.trip_id);
			if (selectedTripData && !selectedTripIsAlreadyVisible) tripsThatShouldBeVisible.push(selectedTripData);
			tripsThatShouldBeVisible.sort((a, b) => {
				const timeStringA = a.scheduled_arrival.split(':').join('');
				const timeStringB = b.scheduled_arrival.split(':').join('');
				return timeStringA - timeStringB;
			});
			return tripsThatShouldBeVisible;
		}
	}, [FrontendStopsContext.entities.trip_id, showAllTrips, tripsData]);

	//
	// C. Handle actions

	const handleToogleShowAllTrips = () => {
		setShowAllTrips(!showAllTrips);
	};

	//
	// D. Render components

	return (
		<div className={styles.container}>
			{tripsData.length > previousTripsShownByDefault
			&& (
				<div className={styles.toggle} onClick={handleToogleShowAllTrips}>
					{showAllTrips ? t('toggle.hide') : t('toggle.show')}
				</div>
			)}
			{visibleTrips.map(trip => <FrontendStopsTimetableRow key={`${trip.trip_id}_${trip.stop_sequence}`} rowType="previous" tripData={trip} />)}
			{showAllTrips && tripsData.length > previousTripsShownByDefault
			&& (
				<div className={styles.toggle} onClick={handleToogleShowAllTrips}>
					{showAllTrips ? t('toggle.hide') : t('toggle.show')}
				</div>
			)}
		</div>
	);
}
