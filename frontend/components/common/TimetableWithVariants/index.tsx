import { Link } from '@/translations/navigation';
import composeTimetable from '@/utils/composeTimetable';
import { Pattern } from '@/utils/types';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

// patternGroups: PatternGroup[], stopId: string, stopSequence: number, mainPatternId: string
export default function TimetableWithVariants(
	{ date, mainPatternId, patternGroups, stopId, stopSequence }:
	{ date: Date, mainPatternId: string, patternGroups: Pattern[], stopId: string, stopSequence: number }) {
	// A. Setup variables
	const t = useTranslations('schedule');

	const newTimetable = useMemo(() => {
		return composeTimetable(patternGroups, stopId, stopSequence, mainPatternId, date);
	}, [date, mainPatternId, patternGroups, stopId, stopSequence]);

	//
	// C. Render components

	const Footer = newTimetable.exceptions.length > 0 && (
		<div className={styles.exceptionFooter}>
			{newTimetable.exceptions.map(exception => (
				exception.type == 'variant' && (
					<div key={exception.exception_id}>
						<span className={styles.exceptionTag}>
							{exception.exception_id})
						</span> {t('path')}&nbsp;{/* required for ESLint to play nice */}
						<Link className={styles.exceptionLink} href="#"><span className={styles.underline}>{exception.pattern_headsign}</span>
							<IconArrowUpRight size={12} />
						</Link>
					</div>
				)
			))}
		</div>
	);

	return newTimetable.hours.length > 0
		? (
			<div>

				<div className={styles.scheduleContainer}>
					<div className={styles.column}>
						<div className={styles.hour}>{t('hours')}</div>
						<div className={styles.minute}>{t('minutes')}</div>
					</div>
					{newTimetable.hours.map(schedule => (
						<div key={schedule.hour} className={styles.column}>
							<div className={styles.hour}>{schedule.hour.toString().padStart(2, '0')}</div>
							{schedule.minutes.map((minute, minuteIndex) => (
								<div key={minuteIndex} className={`${styles.minute} ${minute.exceptions_ids.length > 0 && styles.variant}`}>
									{minute.min.toString().padStart(2, '0')}{ minute.exceptions_ids.length > 0
									&& (
										<div className={styles.exceptions}>
											{minute.exceptions_ids.map(exception => (
												<span key={exception}>{exception}</span>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					))}
				</div>
				{Footer}
			</div>
		)
		: (
			<div className={styles.scheduleContainer}>
				<p className={styles.noData}>{t('no_data')}</p>
			</div>
		);
}
