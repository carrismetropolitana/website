/* * */

import type { Arrival } from '@/types/stops.types';

import { CopyBadge } from '@/components/common/CopyBadge';
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
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableRow.debug_modal');

	//
	// B. Handle actions

	const handleCloseClick = (e: React.MouseEvent) => {
		e.preventDefault();
		onClose();
	};

	//
	// C. Render Components

	return (
		<Modal
			centered={true}
			classNames={{ title: styles.title }}
			closeButtonProps={{ onClick: handleCloseClick }}
			onClose={onClose}
			opened={opened}
			size="md"
			title={t('title')}
		>

			<div className={styles.list}>

				{/* If there are no related trip IDs, show the trip ID */}
				{!arrivalData.related_trip_ids?.length && arrivalData.trip_id && (
					<CopyBadge value={arrivalData.trip_id} />
				)}

				{/* If there are related trip IDs, show them */}
				{arrivalData.related_trip_ids && arrivalData.related_trip_ids.length > 1 && arrivalData.related_trip_ids.map(tripId => (
					<CopyBadge key={tripId} value={tripId} />
				))}

				{/* If there are no related trip IDs and no trip ID, show NULL */}
				{!arrivalData.related_trip_ids?.length && !arrivalData.trip_id && (
					<CopyBadge value="NULL" />
				)}

			</div>

		</Modal>
	);

	//
}
