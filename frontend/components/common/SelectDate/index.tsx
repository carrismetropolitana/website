'use client';

/* * */

import { DatePickerInput } from '@mantine/dates';
import { IconCalendarFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import styles from './styles.module.css';

/* * */

/* * */
/* PARSE DATE TO STRING */
/* Explanation needed. */
/* * */

function dateToDayStr(dateObject: Date) {
	// Get date components
	const year = dateObject.getFullYear().toString();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
	const day = dateObject.getDate().toString().padStart(2, '0');
	// Return string in the 'YYYYMMDD' format
	return `${year}${month}${day}`;
}

export default function component({ setDate, value }: { setDate: (value: Date) => void, value: Date }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('line');

	//
	// B. Transform data

	const todayDate = useMemo(() => {
		// Get the current date and time
		const currentDate = new Date();
		const currentHour = currentDate.getHours();
		// If the current hour is after midnight and before 4AM, set the date to the previous day.
		if (currentHour >= 0 && currentHour < 4) currentDate.setDate(currentDate.getDate() - 1);
		// Return date for today
		return currentDate;
		//
	}, []);

	const tomorrowDate = useMemo(() => {
		// Get the current date and time
		const currentDate = new Date();
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

	const isTodaySelected = dateToDayStr(todayDate) === dateToDayStr(value);

	const isTomorrowSelected = dateToDayStr(tomorrowDate) === dateToDayStr(value);

	//
	// C. Handle actions

	const handleSetToday = useCallback(() => {
		setDate(todayDate);
	}, [todayDate]);

	const handleSetTomorrow = useCallback(() => {
		setDate(tomorrowDate);
	}, [tomorrowDate]);

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<div className={styles.innerWrapper} data-custom={!isTodaySelected && !isTomorrowSelected}>
				<div className={styles.button} data-selected={isTodaySelected} onClick={handleSetToday}>
					{t('today')}
				</div>
				<div className={styles.button} data-selected={isTomorrowSelected} onClick={handleSetTomorrow}>
					{t('tomorrow')}
				</div>
				<DatePickerInput
					classNames={styles}
					data-selected={!isTodaySelected && !isTomorrowSelected}
					dropdownType="modal"
					leftSection={<IconCalendarFilled size={20} />}
					onChange={setDate}
					value={value}
					valueFormat="DD MMM YYYY"
				/>
			</div>
		</div>
	);

	//
}
