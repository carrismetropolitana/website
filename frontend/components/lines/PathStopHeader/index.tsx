/* * */

import type { Stop } from '@/types/stops.types';

import FacilityIcon from '@/components/common/FacilityIcon';
import parseStopLocationName from '@/utils/parseStopLocationName';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';

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
	// A. Setup variables

	const stopIdClipboard = useClipboard();

	//
	// B. Transform data

	const stopLocation = parseStopLocationName(stopData.locality, stopData.municipality_name);

	//
	// C. Handle actions

	const handleClickStopId = () => {
		if (!isSelected) return;
		stopIdClipboard.copy(stopData.id);
	};

	//
	// D. Render components

	return (
		<div className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`}>
			<p className={styles.stopName}>{stopData.name}</p>
			<div className={styles.subHeaderWrapper}>
				<p className={styles.stopLocation}>{stopLocation}</p>
				<p className={`${styles.stopId} ${stopIdClipboard.copied && styles.isCopied}`} onClick={handleClickStopId}>
					#{stopData.id}
					{stopIdClipboard.copied ? <IconCheck className={styles.stopIdCopyIcon} /> : <IconCopy className={styles.stopIdCopyIcon} />}
				</p>
			</div>
			{stopData.facilities.length > 0 && (
				<div className={styles.facilitiesWrapper}>
					{stopData.facilities.map(facility => (
						<FacilityIcon key={facility} name={facility} />
					))}
				</div>
			)}
		</div>
	);

	//
}
