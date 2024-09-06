/* * */

import type { Stop } from '@/types/stops.types';

import FacilityIcon from '@/components/common/FacilityIcon';
import parseStopLocationName from '@/utils/parseStopLocationName';

import styles from './styles.module.css';

/* * */

interface Props {
	isFirstStop?: boolean
	isLastStop?: boolean
	isSelected: boolean
	stopData: Stop
}

/* * */

export default function SingleStop({ isFirstStop, isLastStop, isSelected, stopData }: Props) {
	//

	//
	// A. Transform data

	const stopLocation = parseStopLocationName(stopData.locality, stopData.municipality_name);

	//
	// B. Render components

	return (
		<div className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`}>
			<div className={styles.stopName}>{stopData.name}</div>
			<div className={styles.stopLocation}>{stopLocation}</div>
			{stopData.facilities.length > 0 && (
				<div className={styles.facilitiesWrapper}>
					{stopData.facilities.map(facilityKey => (
						<FacilityIcon key={facilityKey} name={facilityKey} />
					))}
				</div>
			)}
		</div>
	);

	//
}
