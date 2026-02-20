/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { type Arrival } from '@/types/stops.types';
import { Modal } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivalData: Arrival
	onClose: () => void
	opened: boolean
}

/* * */

export function StopsDetailContentTimetableRowModal({ arrivalData, onClose, opened }: Props) {
	const handleCloseClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClose();
	};

	return (
		<Modal
			closeButtonProps={{ onClick: handleCloseClick }}
			onClose={onClose}
			opened={opened}
			overlayProps={{ onClick: handleCloseClick }}
			size="md"
			title="Trip IDs related to this arrival"
		>
			<div className={styles.container}>
				{arrivalData.trip_id && <CopyBadge label={`Trip ID: ${arrivalData.trip_id}`} value={arrivalData.trip_id} />}
			</div>
		</Modal>
	);
}
