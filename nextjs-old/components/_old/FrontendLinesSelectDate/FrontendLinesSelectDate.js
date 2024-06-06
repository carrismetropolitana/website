'use client';

/* * */

import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import parseDateToString from '@/services/parseDateToString';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo } from 'react';

import styles from './FrontendLinesSelectDate.module.css';

/* * */

export default function FrontendLinesSelectDate() {
	//

	//
	// A. Setup variables

	const FrontendLinesContext = useFrontendLinesContext();
	const t = useTranslations('FrontendLinesSelectDate');

	//
	// B. Transform data

	const todayDate = useMemo(() => {
		// Get the current date and time
		const currentDate = (new Date());
		const currentHour = currentDate.getHours();
		// If the current hour is after midnight and before 4AM, set the date to the previous day.
		if (currentHour >= 0 && currentHour < 4) currentDate.setDate(currentDate.getDate() - 1);
		// Return date for today
		return currentDate;
		//
	}, []);

	const tomorrowDate = useMemo(() => {
		// Get the current date and time
		const currentDate = (new Date());
		const currentHour = currentDate.getHours();
		// If the current hour is after midnight and before 4AM,
		// set the date to the previous day.
		if (!(currentHour >= 0 && currentHour < 4)) {
			currentDate.setDate(currentDate.getDate() + 1);
		}
		// Return date for tomorrow
		return currentDate;
		//
	}, []);

	const isTodaySelected = parseDateToString(todayDate) === FrontendLinesContext.entities.date_string;

	const isTomorrowSelected = parseDateToString(tomorrowDate) === FrontendLinesContext.entities.date_string;

	//
	// C. Handle actions

	const handleSetDate = useCallback(
		(value) => {
			FrontendLinesContext.selectDate(value);
		},
		[FrontendLinesContext],
	);

	const handleSetToday = useCallback(() => {
		handleSetDate(todayDate);
	}, [handleSetDate, todayDate]);

	const handleSetTomorrow = useCallback(() => {
		handleSetDate(tomorrowDate);
	}, [handleSetDate, tomorrowDate]);

	//
	// D. Render components

	useEffect(() => {
		if (!FrontendLinesContext.entities.date_string) handleSetToday();
	}, [handleSetToday, FrontendLinesContext.entities.date_string]);

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<div className={styles.innerWrapper}>
				<div className={`${styles.button} ${isTodaySelected && styles.isSelected}`} onClick={handleSetToday}>
					{t('today')}
				</div>
				<div className={`${styles.button} ${isTomorrowSelected && styles.isSelected}`} onClick={handleSetTomorrow}>
					{t('tomorrow')}
				</div>
				<DatePickerInput
					aria-label={t('label')}
					classNames={{ input: `${styles.input} ${!isTodaySelected && !isTomorrowSelected && styles.isSelected}`, section: styles.inputSection }}
					dropdownType="modal"
					leftSection={<IconCalendar size={14} />}
					onChange={handleSetDate}
					placeholder={t('placeholder')}
					value={FrontendLinesContext.entities.date}
					valueFormat="DD MMM YYYY"
				/>
			</div>
		</div>
	);

	//
}
