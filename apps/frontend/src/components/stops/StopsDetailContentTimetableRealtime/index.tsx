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

	const mostRecentPastTrip = stopsDetailContext.data.timetable?.filter(item => item.is_past).sort((a, b) => a.arrival_effective_ms - b.arrival_effective_ms)[0] ?? null;

	//
	// C. Handle actions

	const handleToggleShowPastTrips = () => {
		setShowPastTrips(prev => !prev);
	};

	//
	// C. Render components

	if ((!stopsDetailContext.data.timetable || stopsDetailContext.data.timetable?.length === 0)) {
		return (
			<NoDataLabel text={t('no_service')} withMinHeight />
		);
	}

	return (
		<>
			{/*
			<p className={styles.showPastTripsToggle} onClick={handleToggleShowPastTrips}>
				{showPastTrips ? t('show_past_trips_toggle.hide') : t('show_past_trips_toggle.show')}
			</p> */}

			{!showPastTrips && mostRecentPastTrip && (
				<div>
					<StopsDetailViewTimetableRow
						data={mostRecentPastTrip}
						withClock={false}
						// status="passed"
					/>
				</div>
			)}

			{showPastTrips && stopsDetailContext.data.timetable?.length && stopsDetailContext.data.timetable.map(tripData => (
				<div key={`${tripData.trip_ids[0]}-${tripData.stop_sequence}`}>
					<StopsDetailViewTimetableRow
						data={tripData}
						withClock={false}
						// status="passed"
					/>
				</div>
			))}

			<StopsDetailContentTimetableClock />

			{stopsDetailContext.data.timetable && stopsDetailContext.data.timetable.length > 0 && (
				<>
					{stopsDetailContext.data.timetable.map(tripData => (
						<StopsDetailViewTimetableRow
							key={`${tripData.trip_ids[0]}-${tripData.stop_sequence}`}
							data={tripData}
							withClock={false}
							// status={tripData.arrival_effective_ms ? 'realtime' : 'scheduled'}
						/>
					))}
					<NoDataLabel text={t('end_of_day')} withMinHeight />
				</>
			)}

		</>
	);

	//
}
