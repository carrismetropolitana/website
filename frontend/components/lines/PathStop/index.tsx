/* * */

import type { Path } from '@/types/lines.types';

import PathStopHeader from '@/components/lines/PathStopHeader';
import PathStopNextArrivals from '@/components/lines/PathStopNextArrivals';
import PathStopSpine from '@/components/lines/PathStopSpine';
import PathStopTimetable from '@/components/lines/PathStopTimetable';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivals: { type: 'realtime' | 'scheduled', unixTs: number }[]
	id?: string
	isFirstStop?: boolean
	isLastStop?: boolean
	isSelected: boolean
	path: Path
}

/* * */

export default function Component({ arrivals, id, isFirstStop, isLastStop, isSelected, path }: Props) {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();
	const operationalDayContext = useOperationalDayContext();

	const now = Date.now();

	//
	// B. Transform data

	const stop = path.stop;
	const stopSequence = path.stop_sequence;
	const nextArrivals = arrivals?.filter(arrival => arrival.unixTs > now) || [];
	const realtimeArrivals = nextArrivals.filter(arrival => arrival.type === 'realtime');
	const scheduledArrivals = nextArrivals.filter(arrival => arrival.type === 'scheduled');

	//
	// C. Handle actions

	const handleToggleStop = (event: React.MouseEvent<HTMLDivElement>) => {
		linesDetailContext.actions.setActiveStop(stopSequence, stop);
		event.stopPropagation();
	};

	//
	// D. Render components

	return (
		<div className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`} id={id} onClick={handleToggleStop}>
			<PathStopSpine
				backgroundColor={linesDetailContext.data.active_pattern_group?.color}
				foregroundColor={linesDetailContext.data.active_pattern_group?.text_color}
				isFirstStop={isFirstStop}
				isLastStop={isLastStop}
				isSelected={isSelected}
				stopId={stop.id}
			/>
			<div className={styles.detailsWrapper}>
				<PathStopHeader
					isFirstStop={isFirstStop}
					isLastStop={isLastStop}
					isSelected={isSelected}
					stopData={stop}
				/>
				{isSelected && operationalDayContext.flags.is_today_selected && (
					<PathStopNextArrivals
						realtimeArrivals={realtimeArrivals}
						scheduledArrivals={scheduledArrivals}
					/>
				)}
				{isSelected && (
					<PathStopTimetable />
				)}
			</div>
		</div>
	);

	//
}
