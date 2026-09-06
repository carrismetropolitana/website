/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { formatStopLocation } from '@/utils/formatStopLocation';
import { useClipboard } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { IconArrowUpRight } from '@tabler/icons-react';
import { HubV1ApiPatternWaypoint } from '@tmlmobilidade/go-types-hub';
import Link from 'next/link';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	isFirstStop?: boolean
	isLastStop?: boolean
	isSelected: boolean
	waypointData: HubV1ApiPatternWaypoint
}

/* * */

export function PathWaypointHeader({ isFirstStop, isLastStop, isSelected, waypointData }: Props) {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsContext();
	const operationalDateContext = useOperationalDateContext();
	const analyticsContext = useAnalyticsContext();
	const linesDetailContext = useLinesDetailContext();

	const stopIdClipboard = useClipboard();

	//
	// B. Fetch data

	const stopData = stopsContext.actions.getStopById(waypointData.stop_id);

	const stopFlagForAgency = useMemo(() => {
		if (!stopData?.flags) return null;
		if (!linesDetailContext.data.line?.agency_id) return null;
		return stopData.flags.find(flag => flag.agency_id === linesDetailContext.data.line?.agency_id);
	}, [stopData, linesDetailContext.data.line?.agency_id]);

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

	if (!stopData || !stopFlagForAgency) {
		return null;
	}

	return (
		<div className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`}>

			<p className={styles.stopName}>
				{stopData.name}
				{isSelected && (
					<Link
						className={styles.stopNameUrl}
						href={`/stops/${waypointData.stop_id}?date=${operationalDateContext.data.selected_date?.operational_date_int}`}
						target="_blank"
					>
						<IconArrowUpRight onClick={handleOpenStopDetails} size={16} />
					</Link>
				)}
			</p>

			<div className={styles.subHeaderWrapper}>
				<p className={styles.stopLocation}>{formatStopLocation(stopData.locality_name, stopData.municipality_name)}</p>
				<p className={`${styles.stopId} ${stopIdClipboard.copied && styles.isCopied}`} onClick={handleClickStopId}>
					#{stopFlagForAgency.stop_id}
					{stopIdClipboard.copied ? <IconCheck className={styles.stopIdCopyIcon} /> : <IconCopy className={styles.stopIdCopyIcon} />}
				</p>
			</div>

		</div>
	);
}
