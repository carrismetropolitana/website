/* * */

import type { Stop } from '@/types/stops.types';

import styles from './styles.module.css';

/* * */

interface Props {
	stopData: Stop
}

/* * */

export default function SingleStop({ stopData }: Props) {
	//

	//
	// A. Setup variables

	//
	// B. Transform data

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<div className={styles.stopName}>{stopData.name}</div>
			<div className={styles.stopLocation}>{stopData.municipality_name}, {stopData.district_name}</div>
		</div>
	);

	//
}
