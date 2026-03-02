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
	// B. Render Components

	return (
		<>
			{data && (
				<div className={styles.container}>
					<CopyBadge label={`Vehicle ID: ${data.id}`} value={data.id} />
					<CopyBadge label={`Trip ID: ${data.trip_id}`} value={data.trip_id} />
				</div>
			)}
		</>
	);

	//
}
