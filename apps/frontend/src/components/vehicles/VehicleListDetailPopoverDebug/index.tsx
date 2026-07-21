'use client';

/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { IconEyeMinus, IconEyePlus } from '@tabler/icons-react';
import { type HubVehiclePosition } from '@tmlmobilidade/go-types-public-info';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface VehicleListDetailPopoverProps {
	data: HubVehiclePosition | undefined
}

export function VehicleListDetailPopoverDebug({ data }: VehicleListDetailPopoverProps) {
	//

	//
	// A. Setup variables

	const [expanded, setExpanded] = useState(false);

	const delay = data?.received_at ? Math.floor((Date.now() - data.received_at) / 1000) : 0;
	const delayString = delay > 0 ? `+${delay} seconds` : `${delay} seconds`;
	const timestampString = data?.received_at ? new Date(data.received_at).toLocaleString() : '';

	//
	// B. Render Components

	if (!data) return null;

	const renderExtraData = () => {
		return (
			<div className={styles.container}>
				<CopyBadge label={`Timestamp: ${timestampString}`} value={timestampString} />
				<CopyBadge label={`Delay: ${delayString}`} value={delayString} />
				<CopyBadge label={`Status: ${data.current_status ?? 'N/A'} : ${data.stop_id ?? 'N/A'}`} value={data.current_status ?? 'N/A'} />
				<CopyBadge label={`Pattern ID: ${data.pattern_id ?? 'N/A'}`} value={data.pattern_id ?? 'N/A'} />
				<CopyBadge label={`Line ID: ${data.line_id ?? 'N/A'}`} value={data.line_id ?? 'N/A'} />
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<CopyBadge label={`Vehicle ID: ${data.vehicle_id}`} value={data.vehicle_id} />
			<CopyBadge label={`Trip ID: ${data.trip_id}`} value={data.trip_id} />

			{expanded
				? <IconEyeMinus className={styles.expandButton} color="var(--color-debug)" onClick={() => setExpanded(prev => !prev)} size={20} />
				: <IconEyePlus className={styles.expandButton} color="var(--color-debug)" onClick={() => setExpanded(prev => !prev)} size={20} />}

			{expanded && renderExtraData()}
		</div>
	);
}
