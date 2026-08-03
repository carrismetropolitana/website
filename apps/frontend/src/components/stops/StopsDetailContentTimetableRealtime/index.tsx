'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { StopsDetailContentTimetableClock } from '@/components/stops/StopsDetailContentTimetableClock';
import { StopsDetailViewTimetableRow } from '@/components/stops/StopsDetailContentTimetableRow';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export function StopsDetailContentTimetableRealtime() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableRealtime');
	const stopsDetailContext = useStopsDetailContext();

	const [showPastTrips, setShowPastTrips] = useState(false);

	//
	// B. Transform data

	const pastTrips = stopsDetailContext.data.timetable.filter(item => item.is_past);
	const futureTrips = stopsDetailContext.data.timetable.filter(item => !item.is_past);
	const mostRecentPastTrip = pastTrips[pastTrips.length - 1] ?? null;
	const tripsToRender = showPastTrips ? pastTrips : mostRecentPastTrip ? [mostRecentPastTrip] : [];

	//
	// C. Handle actions

	const handleToggleShowPastTrips = () => {
		setShowPastTrips(prev => !prev);
	};

	//
	// D. Render components

	if (!stopsDetailContext.data.timetable.length) {
		return (
			<NoDataLabel text={t('no_service')} withMinHeight />
		);
	}

	return (
		<>

			<p className={styles.showPastTripsToggle} onClick={handleToggleShowPastTrips}>
				{showPastTrips ? t('show_past_trips_toggle.hide') : t('show_past_trips_toggle.show')}
			</p>

			{tripsToRender.map(tripData => (
				<StopsDetailViewTimetableRow
					key={tripData._id}
					data={tripData}
					status="passed"
					withClock={false}
				/>
			))}

			<StopsDetailContentTimetableClock />

			{futureTrips.length > 0 && (
				<>
					{futureTrips.map(tripData => (
						<StopsDetailViewTimetableRow
							key={tripData._id}
							data={tripData}
							status={tripData.is_realtime ? 'realtime' : 'scheduled'}
							withClock={false}
						/>
					))}
					<NoDataLabel text={t('end_of_day')} withMinHeight />
				</>
			)}

		</>
	);

	//
}
