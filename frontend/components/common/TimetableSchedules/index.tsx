/* * */

import type { Timetable } from '@/types/timetables.types';
import type { Minute } from '@/types/timetables.types';

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface TimetableSchedulesProps {
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
	timetableData: Timetable
}

/* * */

export default function TimetableSchedules({ selectedExceptionIds, setSelectedExceptionIds, timetableData }: TimetableSchedulesProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.TimetableSchedules');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.column}>
				<p className={styles.hour}>{t('hours')}</p>
				<p className={styles.minute}>{t('minutes')}</p>
			</div>
			{timetableData.hours.map(hourData => (
				<div key={hourData.hour_value} className={styles.column}>
					<p className={styles.hour}>{hourData.hour_label}</p>
					{hourData.minutes.map(minuteData => (
						<TimetableSchedulesMinute
							key={minuteData.minute_value}
							minuteData={minuteData}
							selectedExceptionIds={selectedExceptionIds}
							setSelectedExceptionIds={setSelectedExceptionIds}
						/>
					))}
				</div>
			))}
		</div>
	);

	//
}

/* * */

interface TimetableSchedulesMinuteProps {
	minuteData: Minute
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
}

/* * */

function TimetableSchedulesMinute({ minuteData, selectedExceptionIds, setSelectedExceptionIds }: TimetableSchedulesMinuteProps) {
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
			className={`${styles.minute} ${minuteData.exception_ids.length > 0 && styles.withException} ${isSelected && styles.isSelected} ${!isSelected && selectedExceptionIds.length > 0 && styles.isOthersSelected}`}
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
