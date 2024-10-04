'use client';

/* * */

import type { AlertCause, AlertEffect, SimplifiedAlert } from '@/types/alerts.types.js';

import { DateTime } from 'luxon';
import { useLocale } from 'next-intl';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useAlertsContext } from './Alerts.context';

/* * */

interface AlertsListContextState {
	actions: {
		updateFilterByCause: (value: AlertCause | null) => void
		updateFilterByDate: (value: string) => void
		updateFilterByEffect: (value: AlertEffect | null) => void
		updateFilterByLineId: (value: string) => void
		updateFilterBySearchQuery: (value: string) => void
		updateFilterByStopId: (value: string) => void
		// updateFilterByMunicipalityId: (value: string) => void
	}
	counters: {
		by_date: {
			current: number
			future: number
		}
	}
	data: {
		filtered: SimplifiedAlert[]
		raw: SimplifiedAlert[]
	}
	filters: {
		by_date: 'current' | 'future'
		cause: AlertCause | null
		effect: AlertEffect | null
		line_id: null | string
		search_query: null | string
		stop_id: null | string
		// municipality_id: null | string
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

	const [dataFilteredState, setDataFilteredState] = useState<SimplifiedAlert[]>([]);

	const [filterByDateState, setFilterByDateState] = useState <AlertsListContextState['filters']['by_date']>('current');
	const [filterByLineIdState, setFilterByLineIdState] = useQueryState('line_id');
	const [filterBySearchQueryState, setFilterBySearchQueryState] = useQueryState('search_query');
	const [filterByStopIdState, setFilterByStopIdState] = useQueryState('stop_id');
	const [filterByCauseState, setFilterByCauseState] = useQueryState('cause', {
		parse: (value: string) => value as AlertCause | null,
		serialize: (value: AlertCause | null) => value as string,
	});
	const [filterByEffectState, setFilterByEffectState] = useQueryState('effect', {
		parse: (value: string) => value as AlertEffect | null,
		serialize: (value: AlertEffect | null) => value as string,
	});
	// const [filterByMunicipalityIdState, setFilterByMunicipalityIdState] = useQueryState('municipality_id');

	const [isLoading, setIsLoading] = useState(false);

	//
	// B. Fetch data

	const alertsContext = useAlertsContext();

	const allAlertsData = useMemo(() => alertsContext.data.simplified, [alertsContext.data.simplified]);

	//
	// C. Transform data

	// Set Counters
	const currentWeekAlerts = allAlertsData?.filter((item) => {
		const oneWeekFromNowInUnixSeconds = DateTime.now().plus({ week: 1 }).endOf('day').toSeconds();
		const nowInUnixSeconds = DateTime.now().startOf('day').toSeconds();
		const alertStartDateInSeconds = DateTime.fromJSDate(item.start_date).toSeconds();
		const alertEndDate = DateTime.fromJSDate(item.end_date).toSeconds();
		//
		if (alertStartDateInSeconds <= oneWeekFromNowInUnixSeconds && alertEndDate >= nowInUnixSeconds) {
			return true;
		}
		return false;
	}).length;

	const applyFiltersToData = () => {
		//

		let filterResult: SimplifiedAlert[] = allAlertsData || [];

		//
		// Filter by_date
		const nowInUnixSeconds = DateTime.now().startOf('day').toSeconds();
		const oneWeekFromNowInUnixSeconds = DateTime.now().plus({ week: 1 }).endOf('day').toSeconds();

		filterResult = filterResult.filter((item) => {
			const alertStartDateInSeconds = DateTime.fromJSDate(item.start_date).toSeconds();
			const alertEndDate = DateTime.fromJSDate(item.end_date).toSeconds();
			//
			if (filterByDateState === 'current') {
				// If the alert start date is before one week from now, and if the end date is after or equal to today
				// then the alert is considered 'current'.
				if (alertStartDateInSeconds <= oneWeekFromNowInUnixSeconds && alertEndDate >= nowInUnixSeconds) {
					return true;
				}
				return false;
			}
			else {
				// If the alert start date is before one week from now, and if the end date is after or equal to today
				// then the alert is considered 'current'.
				if (alertStartDateInSeconds <= oneWeekFromNowInUnixSeconds && alertEndDate >= nowInUnixSeconds) {
					return false;
				}
				return true;
			}
		});

		if (filterByLineIdState) {
			filterResult = filterResult.filter(alert => alert.informed_entity.some(entity => entity.lineId === filterByLineIdState));
		}

		if (filterByStopIdState) {
			filterResult = filterResult.filter(alert => alert.informed_entity.some(entity => entity.stopId === filterByStopIdState));
		}

		// TODO: municipalityId does not exist in the informed_entity, needs to be added in API
		// if (filterByMunicipalityIdState) {
		// 	filterResult = filterResult.filter(alert => alert.informed_entity.some(entity => entity.municipalityId === filterByMunicipalityIdState));
		// }

		if (filterBySearchQueryState) {
			filterResult = filterResult.filter((alert) => {
				const searchQuery = filterBySearchQueryState.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				return (
					alert.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchQuery)
					|| alert.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchQuery)
				);
			});
		}

		if (filterByCauseState) {
			filterResult = filterResult.filter(alert => alert.cause === filterByCauseState);
		}

		if (filterByEffectState) {
			filterResult = filterResult.filter(alert => alert.effect === filterByEffectState);
		}

		//
		// Save filter result to state
		return filterResult;

		//
	};

	useEffect(() => {
		const filteredAlerts = applyFiltersToData();
		setDataFilteredState(filteredAlerts);
	}, [allAlertsData, filterByDateState, filterByLineIdState, filterBySearchQueryState, filterByStopIdState, filterByCauseState, filterByEffectState]);

	//
	// D. Handle actions

	const updateFilterByDate = (value: AlertsListContextState['filters']['by_date']) => {
		setFilterByDateState(value);
	};

	const updateFilterByLineId = (value: AlertsListContextState['filters']['line_id']) => {
		setFilterByLineIdState(value);
	};

	const updateFilterByStopId = (value: AlertsListContextState['filters']['stop_id']) => {
		setFilterByStopIdState(value);
	};

	const updateFilterBySearchQuery = (value: AlertsListContextState['filters']['search_query']) => {
		setFilterBySearchQueryState(value);
	};

	const updateFilterByCause = (value: AlertsListContextState['filters']['cause']) => {
		setFilterByCauseState(value);
	};

	const updateFilterByEffect = (value: AlertsListContextState['filters']['effect']) => {
		setFilterByEffectState(value);
	};

	//
	// E. Define context value

	const contextValue: AlertsListContextState = {
		actions: {
			updateFilterByCause,
			updateFilterByDate,
			updateFilterByEffect,
			updateFilterByLineId,
			updateFilterBySearchQuery,
			updateFilterByStopId,
		},
		counters: {
			by_date: {
				current: currentWeekAlerts,
				future: allAlertsData.length - currentWeekAlerts,
			},
		},
		data: {
			filtered: dataFilteredState,
			raw: allAlertsData || [],
		},
		filters: {
			by_date: filterByDateState,
			cause: filterByCauseState,
			effect: filterByEffectState,
			line_id: filterByLineIdState,
			search_query: filterBySearchQueryState,
			stop_id: filterByStopIdState,
		},
		flags: {
			is_loading: isLoading,
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
