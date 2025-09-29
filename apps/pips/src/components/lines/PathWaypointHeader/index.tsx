/* * */

import type { Waypoint } from '@carrismetropolitana/api-types/network';

import { IconDisplay } from '@/components/common/IconDisplay';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useLocationsContext } from '@/contexts/Locations.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	isFirstStop?: boolean
	isLastStop?: boolean
	isSelected: boolean
	waypointData: Waypoint
}

/* * */

export function PathWaypointHeader({ isFirstStop, isLastStop, isSelected, waypointData }: Props) {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsContext();
	const locationsContext = useLocationsContext();
	const operationalDateContext = useOperationalDateContext();
	const analyticsContext = useAnalyticsContext();

	const stopIdClipboard = useClipboard();

	//
	// B. Fetch data

	const stopData = stopsContext.actions.getStopById(waypointData.stop_id);
	const localityData = stopData?.locality_id ? locationsContext.actions.getLocalityById(stopData.locality_id) : undefined;
	const municipalityData = stopData?.municipality_id ? locationsContext.actions.getMunicipalityById(stopData.municipality_id) : undefined;
	//
	// C. Handle actions

	const handleClickStopId = () => {
		if (!isSelected) return;
		stopIdClipboard.copy(waypointData.stop_id);
	};

	const handleOpenStopDetails = () => {
		analyticsContext.actions.capture((ampli, props) => {
			ampli.openedStopDetails({ ...props, stop_id: waypointData.stop_id });
		});
	};

	//
	// D. Render components

	if (!stopData) {
		return null;
	}

	return (
		<div className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`}>

			<p className={styles.stopName}>
				{stopData.long_name}
				{isSelected && (
					<Link
						className={styles.stopNameUrl}
						href={`/stops/${waypointData.stop_id}?day=${operationalDateContext.data.selected_date?.operational_date}`}
						target="_blank"
					>
						<IconArrowUpRight onClick={handleOpenStopDetails} size={16} />
					</Link>
				)}
			</p>

			<div className={styles.subHeaderWrapper}>
				<p className={styles.stopLocation}>{localityData?.display || municipalityData?.name}</p>
				<p className={`${styles.stopId} ${stopIdClipboard.copied && styles.isCopied}`} onClick={handleClickStopId}>
					#{stopData.id}
					{stopIdClipboard.copied ? <IconCheck className={styles.stopIdCopyIcon} /> : <IconCopy className={styles.stopIdCopyIcon} />}
				</p>
			</div>
			{isSelected && stopData.facilities.length > 0 && (
				<div className={styles.facilitiesWrapper}>
					{stopData.facilities.map(facility => (
						<IconDisplay key={facility} category="facilities" name={facility} />
					))}
				</div>
			)}
		</div>
	);

	//
}
