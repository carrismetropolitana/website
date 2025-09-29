/* * */

import type { Waypoint } from '@carrismetropolitana/api-types/network';

import { PathWaypointHeader } from '@/components/lines/PathWaypointHeader';
import { PathWaypointNextArrivals } from '@/components/lines/PathWaypointNextArrivals';
import { PathWaypointSpine } from '@/components/lines/PathWaypointSpine';
import { PathWaypointTimetable } from '@/components/lines/PathWaypointTimetable';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivals: { type: 'realtime' | 'scheduled', unixTs: number }[]
	id?: string
	isFirstStop?: boolean
	isLastStop?: boolean
	isSelected: boolean
	waypointData: Waypoint
}

/* * */

export function PathWaypoint({ arrivals, id, isFirstStop, isLastStop, isSelected, waypointData }: Props) {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();
	const operationalDateContext = useOperationalDateContext();

	const now = Date.now();

	//
	// B. Transform data

	const nextArrivals = arrivals?.filter(arrival => arrival.unixTs > now) || [];
	const realtimeArrivals = nextArrivals.filter(arrival => arrival.type === 'realtime');
	const scheduledArrivals = nextArrivals.filter(arrival => arrival.type === 'scheduled');

	//
	// C. Handle actions

	const handleToggleStop = (event: React.MouseEvent<HTMLDivElement>) => {
		linesDetailContext.actions.setActiveWaypoint(waypointData.stop_id, waypointData.stop_sequence);
		event.stopPropagation();
	};

	//
	// D. Render components

	return (
		<div className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`} id={id} onClick={handleToggleStop}>
			<PathWaypointSpine
				backgroundColor={linesDetailContext.data.active_pattern?.color}
				foregroundColor={linesDetailContext.data.active_pattern?.text_color}
				isFirstStop={isFirstStop}
				isLastStop={isLastStop}
				isSelected={isSelected}
				stopId={waypointData.stop_id}
				stopSequence={waypointData.stop_sequence}
			/>
			<div className={styles.detailsWrapper}>
				<PathWaypointHeader
					isFirstStop={isFirstStop}
					isLastStop={isLastStop}
					isSelected={isSelected}
					waypointData={waypointData}
				/>

				{isSelected && operationalDateContext.flags.is_today_selected && (
					<PathWaypointNextArrivals
						realtimeArrivals={realtimeArrivals}
						scheduledArrivals={scheduledArrivals}
					/>
				)}

				{isSelected && (
					<PathWaypointTimetable />
				)}
			</div>
		</div>
	);

	//
}
