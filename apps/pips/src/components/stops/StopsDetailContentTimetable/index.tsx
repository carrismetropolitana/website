/* * */

import { StopsDetailContentTimetableRealtime } from '@/components/stops/StopsDetailContentTimetableRealtime';
import { StopsDetailContentTimetableSkeleton } from '@/components/stops/StopsDetailContentTimetableSkeleton';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';

import styles from './styles.module.css';

/* * */

export function StopsDetailContentTimetable({ size }) {
	//

	//
	// A. Setup variables

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
			<StopsDetailContentTimetableRealtime size={size} />
		</div>
	);

	//
}
