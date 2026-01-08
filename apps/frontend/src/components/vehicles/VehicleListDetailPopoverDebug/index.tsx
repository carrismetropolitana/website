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
			<CopyBadge label={`Timestamp: ${data.timestamp}`} value={data.timestamp} />
			<CopyBadge label={`Delay: ${data.timestamp - Date.now() / 1000}`} value={data.timestamp - Date.now() / 1000} />
			<CopyBadge label={`Speed: ${Math.round(data.speed * 3.6)} km/h`} value={String(Math.round(data.speed * 3.6))} />
			<CopyBadge label={`Trip ID: ${data.trip_id}`} value={data.trip_id} />
			<CopyBadge label={`Status: ${data.current_status}`} value={data.current_status} />
			<CopyBadge label={`Block ID: ${data.block_id}`} value={data.block_id} />
			<CopyBadge label={`Shift ID: ${data.shift_id}`} value={data.shift_id} />
		</div>
	);
}
