/* * */

import { StopsDetailContentListRealtime } from '@/components/stops/StopsDetailContentListRealtime';
import { StopsDetailContentListSchedule } from '@/components/stops/StopsDetailContentListSchedule';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';

import styles from './styles.module.css';

/* * */

export function StopsDetailContentList() {
	//

	//
	// A. Setup variables

	const operationalDayContext = useOperationalDayContext();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{operationalDayContext.flags.is_today_selected
				? <StopsDetailContentListRealtime />
				: <StopsDetailContentListSchedule />}
		</div>
	);

	//
}
