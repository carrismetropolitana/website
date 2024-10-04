/* * */
import { Select } from '@mantine/core';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

/* * */

export interface SortButtonOption {
	label: string
	value: string
}

interface SortButtonProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
	onDirectionChange: (direction: 'asc' | 'desc') => void
	onOptionChange: (option: string) => void
	options: SortButtonOption[]
	selectedOption: SortButtonOption['value']
}

export default function Component({ onDirectionChange, onOptionChange, options, selectedOption }: SortButtonProps) {
	//
	// A. Setup variables
	const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

	//
	// C. Handle functions
	const handleDirectionChange = () => {
		setDirection(direction === 'asc' ? 'desc' : 'asc');
		onDirectionChange(direction === 'asc' ? 'desc' : 'asc');
	};

	//
	// B. Render components
	return (
		<Select
			data={options.map(option => ({ label: option.label, value: option.value }))}
			onChange={onOptionChange}
			rightSectionPointerEvents="inherit"
			rightSectionProps={{ className: styles.sortButton }}
			value={selectedOption}
			rightSection={(
				<div className={styles.sortButton} onClick={handleDirectionChange}>
					{direction === 'desc' ? <IconSortAscending /> : <IconSortDescending />}
				</div>
			)}
		/>

	);
}
