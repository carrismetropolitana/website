'use client';

/* * */

import type { Alert, SimplifiedAlert } from '@/types/alerts.types.js';

import convertToSimplifiedAlert from '@/utils/convertToSimplifiedAlert';
import { DateTime } from 'luxon';
import { useLocale } from 'next-intl';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface AlertsListContextState {
	actions: {
		getSimplifiedAlertById: (alertId: string) => null | SimplifiedAlert
		updateFilterByDate: (value: string) => void
		updateFilterByMunicipality: (value: string) => void
	}
	counters: {
		by_date: {
			future: number
		}
	}
	data: {
		filtered: Alert[]
		raw: Alert[]
	}
	filters: {
		by_date: 'current' | 'future'
		by_line: null | string
		by_municipality: null | string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const AlertsListContext = createContext<AlertsListContextState | undefined>(undefined);

export function useAlertsListContext() {
	const context = useContext(AlertsListContext);
	if (!context) {
		throw new Error('useAlertsListContext must be used within a AlertsListContextProvider');
	}
	return context;
}

/* * */

export const AlertsListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const currentLocale = useLocale();

	const [dataFilteredState, setDataFilteredState] = useState<Alert[]>([]);

	const [filterByDateState, setFilterByDateState] = useState <AlertsListContextState['filters']['by_date']>('current');
	const [filterByLineState, setFilterByLineState] = useState <AlertsListContextState['filters']['by_line']>(null);
	const [filterByMunicipalityState, setFilterByMunicipalityState] = useState <AlertsListContextState['filters']['by_municipality']>(null);

	//
	// B. Fetch data

	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>('https://api.carrismetropolitana.pt/v2/alerts');

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult: Alert[] = allAlertsData || [];

		//
		// Filter by_date
		const nowInUnixSeconds = DateTime.now().startOf('day').toSeconds();
		const oneWeekFromNowInUnixSeconds = DateTime.now().plus({ week: 1 }).endOf('day').toSeconds();

		filterResult = filterResult.filter((item) => {
			const alertStartDate = item.activePeriod[0].start || -Infinity;
			const alertEndDate = item.activePeriod[0].end || +Infinity;
			//
			if (filterByDateState === 'current') {
				// If the alert start date is before one week from now, and if the end date is after or equal to today
				// then the alert is considered 'current'.
				if (alertStartDate <= oneWeekFromNowInUnixSeconds && alertEndDate >= nowInUnixSeconds) {
					return true;
				}
				return false;
			}
			else {
				// If the alert start date is before one week from now, and if the end date is after or equal to today
				// then the alert is considered 'current'.
				if (alertStartDate <= oneWeekFromNowInUnixSeconds && alertEndDate >= nowInUnixSeconds) {
					return false;
				}
				return true;
			}
		});

		//
		// Filter by municipality_id
		if (filterByMunicipalityState) {
			filterResult = filterResult.filter(() => {
				return true; // alert.municipality_id === filterByMunicipalityState;
			});
		}

		//
		// Save filter result to state
		return filterResult;

		//
	};

	useEffect(() => {
		const filteredAlerts = applyFiltersToData();
		setDataFilteredState(filteredAlerts);
	}, [allAlertsData, filterByDateState, filterByMunicipalityState]);

	//
	// D. Handle actions

	const updateFilterByDate = (value: AlertsListContextState['filters']['by_date']) => {
		setFilterByDateState(value);
	};

	const updateFilterByLine = (value: AlertsListContextState['filters']['by_line']) => {
		setFilterByLineState(value || null);
	};

	const updateFilterByMunicipality = (value: AlertsListContextState['filters']['by_municipality']) => {
		setFilterByMunicipalityState(value || null);
	};

	const getSimplifiedAlertById = (alertId: string): null | SimplifiedAlert => {
		//
		if (!allAlertsData) return null;
		// Find the alert by ID
		const alertData = allAlertsData.find(item => item.alert_id === alertId);
		if (!alertData) return null;
		//
		return convertToSimplifiedAlert(alertData);
		//
	};

	//
	// E. Define context value

	const contextValue: AlertsListContextState = {
		actions: {
			getSimplifiedAlertById,
			updateFilterByDate,
			updateFilterByMunicipality,
		},
		counters: {
			by_date: {
				future: 0, // allAlertsData?.filter((item => item.current_status === 'open')).length || 0,
			},
		},
		data: {
			filtered: dataFilteredState,
			raw: allAlertsData || [],
		},
		filters: {
			by_date: filterByDateState,
			by_line: filterByLineState,
			by_municipality: filterByMunicipalityState,
		},
		flags: {
			is_loading: allAlertsLoading,
		},
	};

	//
	// F. Render components

	return (
		<AlertsListContext.Provider value={contextValue}>
			{children}
		</AlertsListContext.Provider>
	);

	//
};
