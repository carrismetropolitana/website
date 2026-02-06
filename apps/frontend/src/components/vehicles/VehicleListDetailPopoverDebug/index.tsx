'use client';

/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { Vehicle } from '@carrismetropolitana/api-types/vehicles';

import styles from './styles.module.css';

/* * */

interface VehicleListDetailPopoverProps {
	data: undefined | Vehicle
}

export function VehicleListDetailPopoverDebug({ data }: VehicleListDetailPopoverProps) {
	//

	//
	// A. Setup variables

	const delay = Math.floor(Date.now() / 1000) - data.timestamp;
	const delayString = delay > 0 ? `+${delay} seconds` : `${delay} seconds`;
	const timestampString = new Date(data.timestamp * 1000).toLocaleString();

	//
	// B. Render Components

	return (
		<>
			{data && (
				<div className={styles.container}>
					<CopyBadge label={`Vehicle ID: ${data.id}`} value={data.id} />
					<CopyBadge label={`Timestamp: ${timestampString}`} value={timestampString} />
					<CopyBadge label={`Delay: ${delayString}`} value={delayString} />
					<CopyBadge label={`Trip ID: ${data.trip_id}`} value={data.trip_id} />
					<CopyBadge label={`Status: ${data.current_status} : ${data.stop_id}`} value={data.current_status} />
					<CopyBadge label={`Block ID: ${data.block_id}`} value={data.block_id} />
					<CopyBadge label={`Shift ID: ${data.shift_id}`} value={data.shift_id} />
				</div>
			)}
		</>
	);

	//
}
