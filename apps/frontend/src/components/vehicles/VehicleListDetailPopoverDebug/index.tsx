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
			<CopyBadge label={`ID: ${data.id}`} value={data.id} />
			<CopyBadge label={`Line ID: ${data.line_id}`} value={data.line_id} />
			<CopyBadge label={`Route ID: ${data.route_id}`} value={data.route_id} />
			<CopyBadge label={`Trip ID: ${data.trip_id}`} value={data.trip_id} />
			<CopyBadge label={`Status: ${data.current_status}`} value={data.current_status} />
			<CopyBadge label={`Speed: ${Math.round(data.speed * 3.6)} km/h`} value={String(Math.round(data.speed * 3.6))} />
		</div>
	);
}
