/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { type Arrival } from '@/types/stops.types';
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

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableRow.debug_modal');
	const stopsDetailContext = useStopsDetailContext();

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
			size="auto"
			title={t('title')}
		>
			<div className={styles.container}>
				<Table border={1} striped>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Trip ID</Table.Th>
							<Table.Th>Plan</Table.Th>
							<Table.Th>Service ID</Table.Th>
							<Table.Th>Headsign</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{stopsDetailContext.data.timetable_schedule?.map(item => (
							<Table.Tr key={item.trip_id}>
								<Table.Td><CopyBadge value={item.trip_id} /></Table.Td>
								<Table.Td><CopyBadge value={item.trip_id.split(']')[0] + ']'} /></Table.Td>
								<Table.Td><CopyBadge value={item.service_id || 'NULL'} /></Table.Td>
								<Table.Td><CopyBadge value={item.headsign || 'NULL'} /></Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</div>
		</Modal>
	);

	//
}
