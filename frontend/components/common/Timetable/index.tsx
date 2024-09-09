'use client';

/* * */

import type { Timetable } from '@/types/timetables.types';

import TimetableExceptions from '@/components/common/TimetableExceptions';
import TimetableSchedules from '@/components/common/TimetableSchedules';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	timetableData: Timetable
}

/* * */

export default function Component({ timetableData }: Props) {
	//

	//
	// A. Setup variables

	const [selectedExceptionIds, setSelectedExceptionIds] = useState<string[]>([]);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<TimetableSchedules selectedExceptionIds={selectedExceptionIds} setSelectedExceptionIds={setSelectedExceptionIds} timetableData={timetableData} />
			<TimetableExceptions selectedExceptionIds={selectedExceptionIds} setSelectedExceptionIds={setSelectedExceptionIds} timetableData={timetableData} />
		</div>
	);

	//
}
