/* * */

import { StopsDetailContentTimetableRealtime } from '@/components/stops/StopsDetailContentTimetableRealtime';
import { StopsDetailContentTimetableSchedule } from '@/components/stops/StopsDetailContentTimetableSchedule';
import { StopsDetailContentTimetableSkeleton } from '@/components/stops/StopsDetailContentTimetableSkeleton';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';

import styles from './styles.module.css';

/* * */

export function StopsDetailContentTimetable() {
	//

	//
	// A. Setup variables

	const operationalDateContext = useOperationalDateContext();
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
			{operationalDateContext.flags.is_today_selected
				? <StopsDetailContentTimetableRealtime />
				: <StopsDetailContentTimetableSchedule />}
		</div>
	);

	//
}
