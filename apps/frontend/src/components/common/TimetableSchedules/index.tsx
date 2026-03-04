/* * */

import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { type Timetable } from '@/types/timetables.types';
import { type Minute } from '@/types/timetables.types';
import { useColorScheme } from '@mantine/hooks';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface TimetableSchedulesMinuteProps {
	isHighlighted: boolean
	minuteData: Minute
	onClick?: () => void
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
}

interface TimetableSchedulesProps {
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
	timetableData: Timetable
}

/* * */

export function TimetableSchedules({ selectedExceptionIds, setSelectedExceptionIds, timetableData }: TimetableSchedulesProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.TimetableSchedules');
	const linesDetailContext = useLinesDetailContext();

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
							isHighlighted={Boolean(linesDetailContext.data.highlighted_trip_ids && minuteData.trip_ids.some(tripId => linesDetailContext.data.highlighted_trip_ids?.includes(tripId)))}
							minuteData={minuteData}
							onClick={() => linesDetailContext.actions.setHighlightedTripIds(minuteData.trip_ids)}
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

function TimetableSchedulesMinute({ isHighlighted, minuteData, onClick, selectedExceptionIds, setSelectedExceptionIds }: TimetableSchedulesMinuteProps) {
	//

	//
	// A. Transform data

	const isSelected = selectedExceptionIds.some(exceptionId => minuteData.exception_ids.includes(exceptionId));
	const isDark = useColorScheme();

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
			className={`${styles.minute} ${minuteData.exception_ids.length > 0 && styles.withException} ${isSelected && styles.isSelected} ${!isSelected && selectedExceptionIds.length > 0 && styles.isOthersSelected} ${isHighlighted && styles.isHighlighted}`}
			data-is-dark={isDark === 'dark' ? 'true' : 'false'}
			onClick={onClick}
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
