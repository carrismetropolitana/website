'use client';

/* * */

import { DateTime } from 'luxon';
import { createContext, useContext, useState } from 'react';

/* * */

interface OperationalDayContextState {
	actions: {
		updateSelectedDay: (value: string) => void
		updateSelectedDayToToday: () => void
		updateSelectedDayToTomorrow: () => void
	}
	data: {
		selected_day: null | string
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

	const [selectedDay, setSelectedDate] = useState<null | string>(null);

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

	//
	// C. Handle actions

	const updateSelectedDay = (value: string) => setSelectedDate(value);
	const updateSelectedDayToToday = () => setSelectedDate(todayDateString);
	const updateSelectedDayToTomorrow = () => setSelectedDate(tomorrowDateString);

	//
	// D. Define context value

	const contextValue: OperationalDayContextState = {
		actions: {
			updateSelectedDay,
			updateSelectedDayToToday,
			updateSelectedDayToTomorrow,
		},
		data: {
			selected_day: selectedDay,
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
