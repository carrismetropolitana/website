/* * */

import type { Path } from '@/types/lines.types';

import SingleStopFullContent from '@/components/lines/SingleStopFullContent';
import SingleLineSimpleContent from '@/components/lines/SingleStopSimpleContent';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivals: { type: 'realtime' | 'scheduled', unixTs: number }[]
	isFirstStop?: boolean
	isLastStop?: boolean
	isSelected: boolean
	path: Path
}

/* * */

export default function SingleStop({ arrivals, isFirstStop, isLastStop, isSelected, path }: Props) {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();
	const now = Date.now();

	//
	// B. Transform data

	const stop = path.stop;
	const stopSequence = path.stop_sequence;
	const nextArrivals = arrivals?.filter(arrival => arrival.unixTs > now) || [];
	const nextArrival = nextArrivals?.[0];
	const realtimeArrivals = nextArrivals.filter(arrival => arrival.type === 'realtime');
	const scheduledArrivals = nextArrivals.filter(arrival => arrival.type === 'scheduled');
	// if (isSelected) {
	// 	if (linesDetailContext.data.valid_pattern_groups && operationalDayContext.data.selected_day && linesDetailContext.data.active_pattern_group) {
	// 		console.log('valid_pattern_groups', linesDetailContext.data.valid_pattern_groups);
	// 		const tt = composeTimetable(linesDetailContext.data.valid_pattern_groups, stopId, linesDetailContext.data.active_pattern_group.pattern_id);

	// 		// eslint-disable-next-line perfectionist/sort-objects
	// 		console.table(tt.hours.flatMap(h => h.minutes.map(m => ({ hour: h.hour, minute: m.min, exceptions: JSON.stringify(m.exceptions_ids) }))));
	// 		console.log(tt);
	// 	}
	// }

	//
	// C. Handle actions

	const handleToggleStop = () => {
		if (linesDetailContext.data.active_stop?.stop === stop && linesDetailContext.data.active_stop?.sequence === stopSequence) {
			// linesDetailContext.actions.setActiveStop();
		}
		else {
			linesDetailContext.actions.setActiveStop(stopSequence, stop);
		}
	};

	//
	// D. Render components

	return (
		<div className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`} onClick={handleToggleStop}>
			<div className={styles.spineLine} style={{ backgroundColor: linesDetailContext.data.active_pattern_group?.color }}>
				<div style={{ backgroundColor: linesDetailContext.data.active_pattern_group?.text_color }} />
			</div>
			<div className={styles.stopInfo}>
				<div className={styles.name}>{stop.name}</div>
				<div className={styles.location}>{stop.municipality_name}, {stop.district_name}</div>
				{ !isSelected
					? <SingleLineSimpleContent nextArrival={nextArrival} />
					: <SingleStopFullContent realtimeArrivals={realtimeArrivals} scheduledArrivals={scheduledArrivals} stop={stop} stopSequence={stopSequence} />}
			</div>
		</div>
	);

	//
}
