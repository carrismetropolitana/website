/* * */

import type { Arrival } from '@/types/stops.types';

import { CopyBadge } from '@/components/common/CopyBadge';
import { Modal, Table } from '@mantine/core';
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
		e.stopPropagation();
		onClose();
	};

	//
	// C. Render Components

	return (
		<Modal
			closeButtonProps={{ onClick: handleCloseClick }}
			onClose={onClose}
			opened={opened}
			overlayProps={{ onClick: handleCloseClick }}
			size="auto"
			title={t('title')}
		>
			<div className={styles.container}>
				<Table border={2} striped>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Trip ID</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>

						{!arrivalData.related_trip_ids?.length && (
							<Table.Tr>
								<Table.Td><CopyBadge value={arrivalData.trip_id} /></Table.Td>
							</Table.Tr>
						)}

						{arrivalData.related_trip_ids && arrivalData.related_trip_ids.length > 1 && arrivalData.related_trip_ids.map((tripId) => {
							return (
								<Table.Tr key={tripId}>
									<Table.Td><CopyBadge value={tripId} /></Table.Td>
								</Table.Tr>
							);
						})}

						{!arrivalData.related_trip_ids?.length && !arrivalData.trip_id && (
							<Table.Tr>
								<Table.Td><CopyBadge value="NULL" /></Table.Td>
							</Table.Tr>
						)}

					</Table.Tbody>
				</Table>
			</div>
		</Modal>
	);

	//
}
