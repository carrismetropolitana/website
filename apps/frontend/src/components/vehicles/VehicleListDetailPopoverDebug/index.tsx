'use client';

/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { Vehicle } from '@carrismetropolitana/api-types/vehicles';
import { IconEyeMinus, IconEyePlus } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface VehicleListDetailPopoverProps {
	data: undefined | Vehicle
}

export function VehicleListDetailPopoverDebug({ data }: VehicleListDetailPopoverProps) {
	//

	//
	// A. Setup variables

	const [expanded, setExpanded] = useState(false);

	const delay = data ? Math.floor(Date.now() / 1000) - data.timestamp : 0;
	const delayString = delay > 0 ? `+${delay} seconds` : `${delay} seconds`;
	const timestampString = data ? new Date(data.timestamp * 1000).toLocaleString() : '';

	//
	// B. Render Components

	if (!data) return null;

	const renderExtraData = () => {
		return (
			<div className={styles.container}>
				<CopyBadge label={`Timestamp: ${timestampString}`} value={timestampString} />
				<CopyBadge label={`Delay: ${delayString}`} value={delayString} />
				<CopyBadge label={`Status: ${data.current_status} : ${data.stop_id}`} value={data.current_status} />
				<CopyBadge label={`Block ID: ${data.block_id}`} value={data.block_id} />
				<CopyBadge label={`Shift ID: ${data.shift_id}`} value={data.shift_id} />
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<CopyBadge label={`Vehicle ID: ${data.id}`} value={data.id} />
			<CopyBadge label={`Trip ID: ${data.trip_id}`} value={data.trip_id} />

			{expanded
				? <IconEyeMinus className={styles.expandButton} color="var(--color-debug)" onClick={() => setExpanded(prev => !prev)} size={20} />
				: <IconEyePlus className={styles.expandButton} color="var(--color-debug)" onClick={() => setExpanded(prev => !prev)} size={20} />}

			{expanded && renderExtraData()}
		</div>
	);
}
