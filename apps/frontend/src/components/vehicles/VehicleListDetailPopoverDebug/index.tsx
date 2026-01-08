'use client';

/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { Vehicle } from '@carrismetropolitana/api-types/vehicles';

import styles from './styles.module.css';

/* * */

interface VehicleListDetailPopoverProps {
	data: undefined | Vehicle
}

export default function VehicleListDetailPopoverDebug({ data }: VehicleListDetailPopoverProps) {
	if (!data) return null;

	return (
		<div className={styles.container}>
			<CopyBadge label={`Vehicle ID: ${data.id}`} value={data.id} />
			<CopyBadge label={`Timestamp: ${new Date(data.timestamp * 1000).toLocaleString()}`} value={new Date(data.timestamp * 1000).toLocaleString()} />
			<CopyBadge label={`Delay: ${Math.floor(Date.now() / 1000) - data.timestamp} seconds`} value={Math.floor(Date.now() / 1000) - data.timestamp} />
			<CopyBadge label={`Trip ID: ${data.trip_id}`} value={data.trip_id} />
			<CopyBadge label={`Status: ${data.current_status} : ${data.stop_id}`} value={data.current_status} />
			<CopyBadge label={`Block ID: ${data.block_id}`} value={data.block_id} />
			<CopyBadge label={`Shift ID: ${data.shift_id}`} value={data.shift_id} />
		</div>
	);
}
