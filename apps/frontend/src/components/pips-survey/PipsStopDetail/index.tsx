/* * */

import { Loader } from '@/components/common/Loader';
import { usePipsContext } from '@/contexts/Pips.context';
import { useStopsContext } from '@/contexts/Stops.context';

import styles from './styles.module.css';

/* * */

interface PipsStopDetailProps {
	stopId: string
}

/* * */

export function PipsStopDetail({ stopId }: PipsStopDetailProps) {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();
	const stopsContext = useStopsContext();

	//
	// B. Handle actions

	const stop = stopsContext.actions.getStopById(String(stopId));

	//
	// B. Handle actions

	const handleSelectAnswer = () => {
		pipsContext.actions.selectStop(String(stopId));
	};

	//
	// C. Render components

	if (stop) {
		return (
			<div className={styles.container} onClick={handleSelectAnswer}>
				<p className={styles.stopName}>{stop.long_name}</p>
				<p className={styles.stopId}>{stop.id}</p>
			</div>
		);
	}

	if (pipsContext.flags.is_loading) {
		return <Loader visible />;
	}
}
