/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { StopsDetailContentTimetableRowModal } from '@/components/stops/StopsDetailContentTimetableRowModal';
import { type Arrival } from '@/types/stops.types';
import { useDisclosure } from '@mantine/hooks';
import { IconEyePlus } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivalData: Arrival
}

/* * */

export function StopsDetailContentTimetableRowDebug({ arrivalData }: Props) {
	//

	//
	// A. Setup variables

	const [isModalOpen, { close, open }] = useDisclosure(false);

	//
	// B. Handle actions
	const handleCloseModal = () => {
		close();
	};

	const handleOpenModal = (e: React.MouseEvent<SVGSVGElement>) => {
		e.stopPropagation();
		open();
	};

	//
	// C. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.seeMore}>
				<CopyBadge label={`Trip ID: ${arrivalData.trip_id || 'NULL'}`} value={arrivalData.trip_id || 'NULL'} />
				<IconEyePlus className={styles.seeMoreIcon} color="var(--color-system-text-300)" onClick={e => handleOpenModal(e)} size={16} />
			</div>
			<CopyBadge label={`Stop Sequence: ${typeof arrivalData.stop_sequence === 'number' ? arrivalData.stop_sequence : 'NULL'}`} value={arrivalData.stop_sequence || 'NULL'} />
			<CopyBadge label={`Vehicle ID: ${arrivalData.vehicle_id || 'NULL'}`} value={arrivalData.vehicle_id || 'NULL'} />
			<CopyBadge label={`Planeado: ${arrivalData.scheduled_arrival || 'NULL'} (${arrivalData.scheduled_arrival_unix || 'NULL'})`} value={arrivalData.scheduled_arrival_unix || 'NULL'} />
			<CopyBadge label={`Estimado: ${arrivalData.estimated_arrival || 'NULL'} (${arrivalData.estimated_arrival_unix || 'NULL'})`} value={arrivalData.estimated_arrival_unix || 'NULL'} />
			<CopyBadge label={`Observado: ${arrivalData.observed_arrival || 'NULL'} (${arrivalData.observed_arrival_unix || 'NULL'})`} value={arrivalData.observed_arrival_unix || 'NULL'} />

			<StopsDetailContentTimetableRowModal arrivalData={arrivalData} onClose={handleCloseModal} opened={isModalOpen} />
		</div>
	);

	//
}
