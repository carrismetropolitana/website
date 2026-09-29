'use client';

/* * */

import { OperationalDateIntSchema } from '@tmlmobilidade/go-types-shared';
import { Dates } from '@tmlmobilidade/go-utils-dates';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useMemo } from 'react';

/* * */

interface OperationalDateContextState {
	actions: {
		updateSelectedDate: (value: string) => void
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

	const defaultDate = useMemo(() => Dates.now('Europe/Lisbon').operational_date_int, []);

	const [selectedDateQuery, setSelectedDateQuery] = useQueryState('date', { defaultValue: String(defaultDate) });

	//
	// B. Transform data

	const todayDate = Dates
		.now('Europe/Lisbon');

	const tomorrowDate = Dates
		.now('Europe/Lisbon')
		.plus({ days: 1 });

	const selectedDate = useMemo(() => {
		const parsedDate = OperationalDateIntSchema.safeParse(selectedDateQuery);
		if (!parsedDate.success) return;
		return Dates.fromOperationalDateInt(parsedDate.data, 'Europe/Lisbon');
	}, [selectedDateQuery]);

	//
	// C. Handle actions

	const updateSelectedDate = (value: string) => {
		const dateValue = Dates
			.fromOperationalDateInt(value, 'Europe/Lisbon')
			.set({ hour: 15 });
		setSelectedDateQuery(String(dateValue.operational_date_int));
	};

	const updateSelectedDateFromFormat = (value: string, format = 'yyyy-MM-dd') => {
		const dateValue = Dates
			.fromFormat(value, format, 'Europe/Lisbon')
			.set({ hour: 15 });
		setSelectedDateQuery(String(dateValue.operational_date_int));
	};

	const updateSelectedDateFromJsDate = (value: Date) => {
		const dateValue = Dates
			.fromJSDate(value)
			.set({ hour: 15 });
		setSelectedDateQuery(String(dateValue.operational_date_int));
	};

	const updateSelectedDateToToday = () => {
		setSelectedDateQuery(String(todayDate.operational_date_int));
	};

	const updateSelectedDateToTomorrow = () => {
		setSelectedDateQuery(String(tomorrowDate.operational_date_int));
	};

	const updateSelectedDateToPlusOneDay = () => {
		if (!selectedDate) return;
		const dateValue = selectedDate?.plus({ days: 1 });
		setSelectedDateQuery(String(dateValue.operational_date_int));
	};

	const updateSelectedDateToLessOneDay = () => {
		if (!selectedDate) return;
		const dateValue = selectedDate?.minus({ days: 1 });
		setSelectedDateQuery(String(dateValue.operational_date_int));
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
			is_today_selected: selectedDate?.operational_date_int === todayDate.operational_date_int,
			is_tomorrow_selected: selectedDate?.operational_date_int === tomorrowDate.operational_date_int,
		},
	};

	//
	// E. Render components

	return (
		<OperationalDateContext.Provider value={contextValue}>
			{children}
		</OperationalDateContext.Provider>
	);
};
