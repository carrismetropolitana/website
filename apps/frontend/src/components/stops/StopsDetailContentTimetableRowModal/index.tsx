/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { type Arrival } from '@/types/stops.types';
import { Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivalData: Arrival
	onClose: () => void
	opened: boolean
}

/* * */

export function StopsDetailContentTimetableRowModal({ arrivalData, onClose, opened }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableRow.debug_modal');

	//
	// B. Handle actions

	const handleCloseClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClose();
	};

	//
	// B. Render Components

	return (
		<Modal
			closeButtonProps={{ onClick: handleCloseClick }}
			onClose={onClose}
			opened={opened}
			overlayProps={{ onClick: handleCloseClick }}
			size="md"
			title={t('title')}
		>
			<div className={styles.container}>
				{arrivalData.trip_id && <CopyBadge label={`Trip ID: ${arrivalData.trip_id}`} value={arrivalData.trip_id} />}
			</div>
		</Modal>
	);

	//
}
