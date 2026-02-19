/* * */

import { StopsDetailContentTimetableRowModal } from '@/components/stops/StopsDetailContentTimetableRowModal';
import { Button } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconEyePlus } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	hasBorder?: boolean
	label?: string
	size?: 'lg' | 'md'
	value: number | string
}

/* * */

export function CopyBadge({ hasBorder = true, label, size = 'md', value }: Props) {
	//

	//
	// A. Setup variables

	const clipboard = useClipboard({ timeout: 600 });
	const [isModalOpen, setIsModalOpen] = useState(false);
	//
	// B. Handle actions

	const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		clipboard.copy(value);
	};

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		console.log('isModalOpen', isModalOpen);
		setIsModalOpen(!isModalOpen);
	};
	//
	// C. Render components

	return (
		<>
			<div className={`${styles.container} ${hasBorder && styles.hasBorder} ${styles[size]}`} onClick={handleCopy}>
				{clipboard.copied ? 'Copied' : label ? label : value}

			</div>
			{label?.includes('Trip ID') && !clipboard.copied && (
				<Button onClick={e => handleOpenModal(e)}><IconEyePlus color="var(--color-system-text-300)" size={16} /></Button>
			)}
			<StopsDetailContentTimetableRowModal onClose={() => setIsModalOpen(false)} opened={isModalOpen} />
		</>
	);

	//
}
