import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { Path } from '@/types/lines.types';

import SingleStopFullContent from '../SingleStopFullContent';
import SingleLineSimpleContent from '../SingleStopSimpleContent';
import styles from './styles.module.css';

export default function SingleStop({ arrivals, isSelected, path }: { arrivals: { type: 'realtime' | 'scheduled', unixTs: number }[], isSelected: boolean, path: Path }) {
	// A. Setup variables
	const linesDetailContext = useLinesDetailContext();
	const now = Date.now();

	// C. Transform data
	const stop = path.stop;
	const stopId = stop.id;
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

	// D. Render components

	return (
		<div
			key={stopId + stopSequence}
			className={styles.stop}
			data-selected={isSelected}
			onClick={() => {
				linesDetailContext.actions.setActiveStop(stopSequence, stop);
			}}
		>
			{/* line in the left side of the stop list */}
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
}
