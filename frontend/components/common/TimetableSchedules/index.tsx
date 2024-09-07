/* * */

import type { Timetable } from '@/types/timetables.types';

import TimetableSchedulesMinute from '@/components/common/TimetableSchedulesMinute';
import { useTranslations } from 'next-intl';

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
