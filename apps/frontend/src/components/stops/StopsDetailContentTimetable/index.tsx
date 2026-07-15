/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { StopsDetailContentTimetableSkeleton } from '@/components/stops/StopsDetailContentTimetableSkeleton';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

import { StopsDetailViewTimetableRow } from '../StopsDetailContentTimetableRow';

/* * */

export function StopsDetailContentTimetable() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailViewTimetable');

	const operationalDateContext = useOperationalDateContext();
	const stopsDetailContext = useStopsDetailContext();

	const [showPastArrivals, setShowPastArrivals] = useState(false);

	//
	// B. Transform data

	// const timetableClockIdInsert = useMemo(() => {
	// 	// Skip if no timetable data
	// 	if (!stopsDetailContext.data.timetable?.length) return;
	// 	// Skip if not today
	// 	if (!operationalDate.isTodaySelected) return;
	// 	// Get now in Unix timestamp
	// 	const now = Dates.now('Europe/Lisbon').unix_timestamp;
	// 	// Check if the timetable starts after now or ends before now
	// 	if (stopsDetailContext.data.timetable[0].arrival_effective_ms > now) return;
	// 	if (stopsDetailContext.data.timetable[stopsDetailContext.data.timetable.length - 1].arrival_effective_ms < now) return;
	// 	// Find the first item in the timetable that has a scheduled arrival time greater than now
	// 	const firstItemAfterNow = stopsDetailContext.data.timetable.find(item => item.arrival_effective_ms > now);
	// 	return firstItemAfterNow?._id;
	// }, [stopsDetailContext.data.timetable, operationalDate.isTodaySelected]);

	// const pastArrivals = useMemo(() => {
	// 	// Skip if no timetable data
	// 	if (!stopsDetailContext.data.timetable) return [];
	// 	// Filter all past arrivalss
	// 	const pastArrivals = stopsDetailContext.data.timetable.filter(item => item.is_past);
	// 	// If no past arrivals, return an empty array
	// 	if (!pastArrivals.length) return [];
	// 	// If show past arrivals is true, return all past arrivals
	// 	if (showPastArrivals) return pastArrivals;
	// 	// Otherwise, return the most recent past arrival
	// 	return [pastArrivals[pastArrivals.length - 1]];
	// }, [showPastArrivals, stopsDetailContext.data.timetable]);

	// const futureArrivals = useMemo(() => {
	// 	// Skip if no timetable data
	// 	if (!stopsDetailContext.data.timetable) return [];
	// 	// Filter all future arrivals
	// 	return stopsDetailContext.data.timetable.filter(item => !item.is_past);
	// }, [stopsDetailContext.data.timetable]);

	//
	// C. Handle Actions

	const toggleShowPastArrivals = () => {
		setShowPastArrivals(prev => !prev);
	};

	//
	// D. Render components

	// if (stopsDetailContext.flags.is_loading) {
	// 	return (
	// 		<StopsDetailContentTimetableSkeleton />
	// 	);
	// }

	return (
		<div className={styles.container}>
			{operationalDateContext.flags.is_today_selected &&	(
				<p className={styles.toggleShowPastArrivals} onClick={toggleShowPastArrivals}>
					{showPastArrivals ? t('show_past_trips_toggle.hide') : t('show_past_trips_toggle.show')}
				</p>
			)}

			<div className={styles.arrivalsWrapper}>
				{stopsDetailContext.data.timetable.filter(item => item.is_past).map(item => (
					<StopsDetailViewTimetableRow
						key={item._id}
						data={item}
						withClock={false}
					/>
				))}
			</div>

			<div className={styles.arrivalsWrapper}>
				{stopsDetailContext.data.timetable.filter(item => !item.is_past).map(item => (
					<StopsDetailViewTimetableRow
						key={item._id}
						data={item}
						withClock={false}
					/>
				))}
			</div>

			<NoDataLabel
				text={t('end_of_day')}
				withMinHeight
			/>
		</div>
	);

	//
}
