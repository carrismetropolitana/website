/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { StopsDetailContentTimetableRowModal } from '@/components/stops/StopsDetailContentTimetableRowModal';
import { type Arrival } from '@/types/stops.types';
import { IconEyePlus } from '@tabler/icons-react';
import { useState } from 'react';

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

	const [isModalOpen, setIsModalOpen] = useState(false);

	//
	// B. Handle actions

	const handleOpenModal = (e: React.MouseEvent<SVGSVGElement>) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	//
	// C. Render Components

	return (
		<div className={styles.container}>
			<IconEyePlus color="var(--color-system-text-300)" onClick={e => handleOpenModal(e)} size={16} />
			<CopyBadge label={`Trip ID: ${arrivalData.trip_id || 'NULL'}`} value={arrivalData.trip_id || 'NULL'} />
			<CopyBadge label={`Stop Sequence: ${typeof arrivalData.stop_sequence === 'number' ? arrivalData.stop_sequence : 'NULL'}`} value={arrivalData.stop_sequence || 'NULL'} />
			<CopyBadge label={`Vehicle ID: ${arrivalData.vehicle_id || 'NULL'}`} value={arrivalData.vehicle_id || 'NULL'} />
			<CopyBadge label={`Planeado: ${arrivalData.scheduled_arrival || 'NULL'} (${arrivalData.scheduled_arrival_unix || 'NULL'})`} value={arrivalData.scheduled_arrival_unix || 'NULL'} />
			<CopyBadge label={`Estimado: ${arrivalData.estimated_arrival || 'NULL'} (${arrivalData.estimated_arrival_unix || 'NULL'})`} value={arrivalData.estimated_arrival_unix || 'NULL'} />
			<CopyBadge label={`Observado: ${arrivalData.observed_arrival || 'NULL'} (${arrivalData.observed_arrival_unix || 'NULL'})`} value={arrivalData.observed_arrival_unix || 'NULL'} />
			<StopsDetailContentTimetableRowModal arrivalData={arrivalData} onClose={() => setIsModalOpen(false)} opened={isModalOpen} />
		</div>
	);

	//
}
