/* * */

import type { Minute } from '@/types/timetables.types';

import styles from './styles.module.css';

/* * */

interface Props {
	minuteData: Minute
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
}

/* * */

export default function Component({ minuteData, selectedExceptionIds, setSelectedExceptionIds }: Props) {
	//

	//
	// A. Transform data

	const isSelected = selectedExceptionIds.some(exceptionId => minuteData.exception_ids.includes(exceptionId));

	//
	// B. Handle actions

	const handleMouseOverException = () => {
		setSelectedExceptionIds(minuteData.exception_ids);
	};

	const handleMouseOutException = () => {
		setSelectedExceptionIds([]);
	};

	//
	// C. Render components

	return (
		<p
			key={minuteData.minute_value}
			className={`${styles.container} ${minuteData.exception_ids.length > 0 && styles.withException} ${isSelected && styles.isSelected} ${!isSelected && selectedExceptionIds.length > 0 && styles.isOthersSelected}`}
			onMouseOut={handleMouseOutException}
			onMouseOver={handleMouseOverException}
		>
			{minuteData.minute_label}
			{minuteData.exception_ids.length > 0 && minuteData.exception_ids.map(exceptionId => (
				<span key={exceptionId} className={styles.exception}>
					{exceptionId}
				</span>
			))}
		</p>
	);

	//
}
