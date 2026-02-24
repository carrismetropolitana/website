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
	// B. Transform data

	const parseTripId = (tripId: string) => {
		const plan = tripId.includes('[') && tripId.includes(']') ? tripId.substring(tripId.indexOf('[') + 1, tripId.indexOf(']')) : 'NULL';
		const serviceId = tripId.split('|')[1] || 'NULL';
		return { plan, serviceId };
	};

	//
	// C. Handle actions

	const handleCloseClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClose();
	};

	//
	// D. Render Components

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
							<Table.Th>Plan</Table.Th>
							<Table.Th>Service ID</Table.Th>
							<Table.Th>Headsign</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{arrivalData.related_trip_ids?.map((tripId) => {
							const { plan, serviceId } = parseTripId(tripId);
							return (
								<Table.Tr key={tripId}>
									<Table.Td><CopyBadge value={tripId} /></Table.Td>
									<Table.Td><CopyBadge value={plan} /></Table.Td>
									<Table.Td><CopyBadge value={serviceId} /></Table.Td>
									<Table.Td><CopyBadge value={arrivalData.headsign || 'NULL'} /></Table.Td>
								</Table.Tr>
							);
						})}
					</Table.Tbody>
				</Table>
			</div>
		</Modal>
	);

	//
}
