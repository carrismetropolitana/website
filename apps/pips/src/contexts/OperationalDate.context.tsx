'use client';

/* * */

import { Dates } from '@tmlmobilidade/dates';
import { type OperationalDate } from '@tmlmobilidade/types';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useMemo } from 'react';

/* * */

interface OperationalDateContextState {
	actions: {
		updateSelectedDate: (value: OperationalDate) => void
		updateSelectedDateFromFormat: (value: string, format?: string) => void
		updateSelectedDateFromJsDate: (value: Date) => void
		updateSelectedDateToLessOneDay: () => void
		updateSelectedDateToPlusOneDay: () => void
		updateSelectedDateToToday: () => void
		updateSelectedDateToTomorrow: () => void
	}
	data: {
		selected_date: Dates | null
		today: Dates
		tomorrow: Dates
	}
	flags: {
		is_today_selected: boolean
		is_tomorrow_selected: boolean
	}
}

/* * */

const OperationalDateContext = createContext<OperationalDateContextState | undefined>(undefined);

export function useOperationalDateContext() {
	const context = useContext(OperationalDateContext);
	if (!context) {
		throw new Error('useOperationalDateContext must be used within a OperationalDateContextProvider');
	}
	return context;
}

/* * */

export const OperationalDateContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [selectedDateQuery, setSelectedDateQuery] = useQueryState('date', { defaultValue: useMemo(() => Dates.now('Europe/Lisbon').operational_date, []) });

	//
	// B. Transform data

	const todayDate = Dates
		.now('Europe/Lisbon');

	const tomorrowDate = Dates
		.now('Europe/Lisbon')
		.plus({ days: 1 });

	const selectedDate = useMemo(() => {
		return Dates.fromOperationalDate(selectedDateQuery, 'Europe/Lisbon');
	}, [selectedDateQuery]);

	//
	// C. Handle actions

	const updateSelectedDate = (value: string) => {
		const dateValue = Dates
			.fromOperationalDate(value, 'Europe/Lisbon')
			.set({ hour: 15 });
		setSelectedDateQuery(dateValue.operational_date);
	};

	const updateSelectedDateFromFormat = (value: string, format = 'yyyy-MM-dd') => {
		const dateValue = Dates
			.fromFormat(value, format, 'Europe/Lisbon')
			.set({ hour: 15 });
		setSelectedDateQuery(dateValue.operational_date);
	};

	const updateSelectedDateFromJsDate = (value: Date) => {
		const dateValue = Dates
			.fromJSDate(value)
			.set({ hour: 15 });
		setSelectedDateQuery(dateValue.operational_date);
	};

	const updateSelectedDateToToday = () => {
		setSelectedDateQuery(todayDate.operational_date);
	};

	const updateSelectedDateToTomorrow = () => {
		setSelectedDateQuery(tomorrowDate.operational_date);
	};

	const updateSelectedDateToPlusOneDay = () => {
		if (!selectedDate) return;
		const dateValue = selectedDate?.plus({ days: 1 });
		setSelectedDateQuery(dateValue.operational_date);
	};

	const updateSelectedDateToLessOneDay = () => {
		if (!selectedDate) return;
		const dateValue = selectedDate?.minus({ days: 1 });
		setSelectedDateQuery(dateValue.operational_date);
	};

	//
	// D. Define context value

	const contextValue: OperationalDateContextState = {
		actions: {
			updateSelectedDate,
			updateSelectedDateFromFormat,
			updateSelectedDateFromJsDate,
			updateSelectedDateToLessOneDay,
			updateSelectedDateToPlusOneDay,
			updateSelectedDateToToday,
			updateSelectedDateToTomorrow,
		},
		data: {
			selected_date: selectedDate,
			today: todayDate,
			tomorrow: tomorrowDate,
		},
		flags: {
			is_today_selected: selectedDate?.operational_date === todayDate.operational_date,
			is_tomorrow_selected: selectedDate?.operational_date === tomorrowDate.operational_date,
		},
	};

	//
	// E. Render components

	return (
		<OperationalDateContext.Provider value={contextValue}>
			{children}
		</OperationalDateContext.Provider>
	);

	//
};
