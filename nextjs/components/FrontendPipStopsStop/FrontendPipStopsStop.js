/* * */

import useSWR from 'swr';
import { useFrontendPipContext } from '@/contexts/FrontendPipContext';
import styles from './FrontendPipStopsStop.module.css';
import Loader from '@/components/Loader/Loader';

/* * */

export default function FrontendPipStopsStop({ stopId }) {
	//

	//
	// A. Setup variables

	const frontendPipContext = useFrontendPipContext();

	//
	// B. Handle actions

	const { data: stopData } = useSWR(stopId && `https://api.carrismetropolitana.pt/stops/${stopId}`);

	//
	// B. Handle actions

	const handleSelectAnswer = () => {
		frontendPipContext.selectStop(stopId);
	};

	//
	// C. Render components

	return stopData ?
		<div className={styles.container} onClick={handleSelectAnswer}>
			<p className={styles.stopName}>{stopData.name}</p>
			<p className={styles.stopId}>{stopData.id}</p>
		</div> :
		<Loader visible />;

	//
}