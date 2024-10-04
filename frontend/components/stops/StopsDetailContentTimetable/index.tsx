/* * */

import { StopsDetailContentTimetableRealtime } from '@/components/stops/StopsDetailContentTimetableRealtime';
import { StopsDetailContentTimetableSchedule } from '@/components/stops/StopsDetailContentTimetableSchedule';
import { StopsDetailContentTimetableSkeleton } from '@/components/stops/StopsDetailContentTimetableSkeleton';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';

import styles from './styles.module.css';

/* * */

export function StopsDetailContentTimetable() {
	//

	//
	// A. Setup variables

	const operationalDayContext = useOperationalDayContext();
	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Render components

	if (stopsDetailContext.flags.is_loading_timetable) {
		return (
			<StopsDetailContentTimetableSkeleton />
		);
	}

	return (
		<div className={styles.container}>
			{operationalDayContext.flags.is_today_selected
				? <StopsDetailContentTimetableRealtime />
				: <StopsDetailContentTimetableSchedule />}
		</div>
	);

	//
}
