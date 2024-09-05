'use client';

/* * */

import { useCallback, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { DatePickerInput } from '@mantine/dates';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import styles from './FrontendLinesSelectDate.module.css';
import parseDateToString from '@/services/parseDateToString';
import { IconCalendar } from '@tabler/icons-react';

/* * */

export default function FrontendLinesSelectDate() {
	//

	//
	// A. Setup variables

	const frontendLinesContext = useFrontendLinesContext();
	const t = useTranslations('FrontendLinesSelectDate');

	//
	// B. Transform data

	const todayDate = useMemo(() => {
		// Get the current date and time
		const currentDate = new Date;
		const currentHour = currentDate.getHours();
		// If the current hour is after midnight and before 4AM, set the date to the previous day.
		if (currentHour >= 0 && currentHour < 4) currentDate.setDate(currentDate.getDate() - 1);
		// Return date for today
		return currentDate;
		//
	}, []);

	const tomorrowDate = useMemo(() => {
		// Get the current date and time
		const currentDate = new Date;
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

	const isTodaySelected = parseDateToString(todayDate) === frontendLinesContext.entities.date_string;

	const isTomorrowSelected = parseDateToString(tomorrowDate) === frontendLinesContext.entities.date_string;

	//
	// C. Handle actions

	const handleSetDate = useCallback(
		value => {
			frontendLinesContext.selectDate(value);
		},
		[frontendLinesContext],
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
		if (!frontendLinesContext.entities.date_string) handleSetToday();
		// IF date is after today then go to google.com
		if (frontendLinesContext.entities.date_string > '20240911' && frontendLinesContext.entities.route.id.startsWith('4')) {
			const year = frontendLinesContext.entities.date_string.slice(0, 4);
			const month = frontendLinesContext.entities.date_string.slice(4, 6);
			const day = frontendLinesContext.entities.date_string.slice(6, 8);
			const routeId = frontendLinesContext.entities.route.id;
			const routeShortName = frontendLinesContext.entities.route.short_name;
			const directionId = frontendLinesContext.entities.pattern.direction_id;
			window.location.href = `https://set24.carrismetropolitana.pt/horarios/?route_short_name=${routeShortName}&date=${year}-${month}-${day}&route_id=${routeId}&direction_id=${directionId}`;
		}
	}, [handleSetToday, frontendLinesContext.entities.date_string,frontendLinesContext.entities.route.id]);

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
					placeholder={t('placeholder')}
					dropdownType='modal'
					onChange={handleSetDate}
					value={frontendLinesContext.entities.date}
					valueFormat='DD MMM YYYY'
					classNames={{ input: `${styles.input} ${!isTodaySelected && !isTomorrowSelected && styles.isSelected}`, section: styles.inputSection }}
					leftSection={<IconCalendar size={14} />}
				/>
			</div>
		</div>
	);

	//
}