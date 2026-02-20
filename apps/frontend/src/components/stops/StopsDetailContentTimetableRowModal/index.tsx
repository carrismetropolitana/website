/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
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

	//
	// B. Handle actions

	const handleCloseClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClose();
	};

	console.log(arrivalData);

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
				<Table striped>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Trip ID</Table.Th>
							<Table.Th>Plan</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						<Table.Tr>
							<Table.Td>{arrivalData.trip_id}</Table.Td>
							<Table.Td>{arrivalData.trip_id.split(']')[0] + ']'}</Table.Td>
						</Table.Tr>
					</Table.Tbody>
				</Table>
			</div>
		</Modal>
	);

	//
}
