/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { type Arrival } from '@/types/stops.types';
import { Modal } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	onClose: () => void
	opened: boolean
}

/* * */

export function StopsDetailContentTimetableRowModal({ onClose, opened }: Props) {
	return (
		<Modal
			onClose={onClose}
			opened={opened}
			size="lg"
			title="Trip IDs related to this arrival"
		>
			<div className={styles.container}>
				<p>Trip IDs related to this arrival</p>
				{/* <CopyBadge label={`Trip ID: ${arrivalData.trip_id || 'NULL'}`} value={arrivalData.trip_id || 'NULL'} /> */}
			</div>
		</Modal>
	);
}
