'use client';

/* * */

import { DateTime } from 'luxon';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface OperationalDayContextState {
	actions: {
		updateSelectedDay: (value: string) => void
		updateSelectedDayFromJsDate: (value: Date) => void
		updateSelectedDayToToday: () => void
		updateSelectedDayToTomorrow: () => void
	}
	data: {
		/**
		 * yyyyMMdd
		 */
		selected_day: null | string
		selected_day_jsdate: Date | null
		today: null | string
		tomorrow: null | string
	}
	flags: {
		is_today_selected: boolean
		is_tomorrow_selected: boolean
	}
}

/* * */

const OperationalDayContext = createContext<OperationalDayContextState | undefined>(undefined);

export function useOperationalDayContext() {
	const context = useContext(OperationalDayContext);
	if (!context) {
		throw new Error('useOperationalDayContext must be used within a OperationalDayContextProvider');
	}
	return context;
}

/* * */

export const OperationalDayContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [selectedDayQuery, setSelectedDayQuery] = useQueryState('day');
	const [selectedDay, setSelectedDay] = useState<null | string>(selectedDayQuery);
	const [selectedDayJsDate, setSelectedDayJsDate] = useState<Date | null>(null);

	//
	// B. Transform data

	const todayDateString = (() => {
		const now = DateTime.now();
		if (now.get('hour') < 4) {
			return now.minus({ days: 1 }).toFormat('yyyyMMdd');
		}
		return now.toFormat('yyyyMMdd');
	})();

	const tomorrowDateString = (() => {
		const now = DateTime.now();
		if (now.get('hour') < 4) {
			return now.toFormat('yyyyMMdd');
		}
		return now.plus({ days: 1 }).toFormat('yyyyMMdd');
	})();

	useEffect(() => {
		if (!selectedDay) {
			setSelectedDay(todayDateString);
			setSelectedDayQuery(todayDateString);
		}

		setSelectedDayQuery(selectedDay);
	}, [selectedDay]);

	useEffect(() => {
		if (!selectedDay) {
			setSelectedDayJsDate(null);
		}
		else {
			setSelectedDayJsDate(DateTime.fromFormat(selectedDay, 'yyyyMMdd').toJSDate());
		}
	}, [selectedDay]);

	//
	// C. Handle actions

	const updateSelectedDay = (value: string) => {
		setSelectedDay(value);
	};

	const updateSelectedDayFromJsDate = (value: Date) => {
		const valueAsString = DateTime.fromJSDate(value).toFormat('yyyyMMdd');
		setSelectedDay(valueAsString);
	};

	const updateSelectedDayToToday = () => {
		setSelectedDay(todayDateString);
	};

	const updateSelectedDayToTomorrow = () => {
		setSelectedDay(tomorrowDateString);
	};

	//
	// D. Define context value

	const contextValue: OperationalDayContextState = {
		actions: {
			updateSelectedDay,
			updateSelectedDayFromJsDate,
			updateSelectedDayToToday,
			updateSelectedDayToTomorrow,
		},
		data: {
			selected_day: selectedDay,
			selected_day_jsdate: selectedDayJsDate,
			today: todayDateString,
			tomorrow: tomorrowDateString,
		},
		flags: {
			is_today_selected: selectedDay === todayDateString,
			is_tomorrow_selected: selectedDay === tomorrowDateString,
		},
	};

	//
	// E. Render components

	return (
		<OperationalDayContext.Provider value={contextValue}>
			{children}
		</OperationalDayContext.Provider>
	);

	//
};
