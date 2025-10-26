/* * */

import { NextArrivals } from '@/components/common/NextArrivals';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { Arrival, ArrivalStatus } from '@/types/stops.types';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivalData: Arrival
	size?: 'lg' | 'md'
	status: ArrivalStatus
}

/* * */

export function StopsDetailContentTimetableRow({ arrivalData, size, status }: Props) {
	//

	//
	// A. Setup variables

	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Transform data

	// This is needed to avoid rerendering the component when the time changes
	const thisPattern = stopsDetailContext.data.valid_pattern_groups?.find(pattern => pattern.id === arrivalData.pattern_id);

	//
	// C. Handle actions

	//
	// D. Render components

	if (!thisPattern) {
		return null;
	}

	return (
		<div className={`${styles.container} ${styles[status]}`}>

			<div className={styles.summary}>
				<LineDisplay
					color={thisPattern.color}
					longName={thisPattern.headsign}
					shortName={thisPattern.line_id}
					size={size}
					textColor={thisPattern.text_color}
				/>
				<NextArrivals
					arrivals={[arrivalData.estimated_arrival_unix || arrivalData.scheduled_arrival_unix]}
					size={size}
					status={status}
					withIcon={true}
				/>
			</div>

		</div>
	);
}
