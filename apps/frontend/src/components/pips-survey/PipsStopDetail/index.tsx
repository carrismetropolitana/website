/* * */

import { Loader } from '@/components/common/Loader';
import { usePipsContext } from '@/contexts/Pips.context';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import useSWR from 'swr';

import styles from './FrontendPipStopsStop.module.css';

/* * */

interface PipsStopDetailProps {
	stopId: string
}

/* * */

export default function FrontendPipStopsStop({ stopId }: PipsStopDetailProps) {
	//

	//
	// A. Setup variables

	const pipsContext = usePipsContext();
	//
	// B. Handle actions

	const { data: stopData } = useSWR(stopId && `${getPublicVariable('api_url')}/v2/stops/${stopId}`);

	//
	// B. Handle actions

	const handleSelectAnswer = () => {
		pipsContext.actions.selectStop(stopId);
	};

	//
	// C. Render components

	if (stopData) {
		<div className={styles.container} onClick={handleSelectAnswer}>
			<p className={styles.stopName}>{stopData.name}</p>
			<p className={styles.stopId}>{stopData.id}</p>
		</div>;
	}

	if (pipsContext.flags.is_loading) {
		return <Loader visible />;
	}

	//
}
