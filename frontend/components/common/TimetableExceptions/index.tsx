/* * */

import type { Timetable } from '@/types/timetables.types';

import TimetableExceptionsLink from '@/components/common/TimetableExceptionsLink';

import styles from './styles.module.css';

/* * */

interface Props {
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
	timetableData: Timetable
}

/* * */

export default function Component({ selectedExceptionIds, setSelectedExceptionIds, timetableData }: Props) {
	//

	if (!timetableData.exceptions.length) {
		return null;
	}

	return (
		<div className={styles.container}>
			{timetableData.exceptions.map(exceptionData => (
				<TimetableExceptionsLink key={exceptionData.exception_id} exceptionData={exceptionData} selectedExceptionIds={selectedExceptionIds} setSelectedExceptionIds={setSelectedExceptionIds} />
			))}
		</div>
	);

	//
}
