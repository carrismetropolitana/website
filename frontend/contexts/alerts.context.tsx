'use client';

/* * */

import type { Alert } from '@/types/alerts.types.js';

import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface AlertsContextState {
	actions: {
		updateFilterByDate: (value: string) => void
		updateFilterByMunicipality: (value: string) => void
	}
	counters: {
		by_date: {
			open: number
		}
	}
	data: {
		filtered: Alert[]
		raw: Alert[]
	}
	filters: {
		by_date: string
		by_line: null | string
		by_municipality: null | string
	}
	flags: {
		is_loading: boolean
	}
}

const initialContextState = {
	actions: {
		updateFilterByDate: () => { /**/ },
		updateFilterByMunicipality: () => { /**/ },
	},
	counters: {
		by_date: {
			open: 0,
		},
	},
	data: {
		filtered: [],
		raw: [],
	},
	filters: {
		by_date: 'open',
		by_line: null,
		by_municipality: null,
	},
	flags: {
		is_loading: true,
	},
};

const AlertsContext = createContext<AlertsContextState>(initialContextState);

export function useAlertsContext() {
	return useContext(AlertsContext);
}

/* * */

export const AlertsContextProvider = ({ children }) => {
	//

	//
	// A. Setup state

	const [dataFilteredState, setDataFilteredState] = useState<Alert[]>([]);
	const [filtersState, setFiltersState] = useState<AlertsContextState['filters']>(initialContextState.filters);

	//
	// B. Fetch data

	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>('https://api.carrismetropolitana.pt/v2/alerts');

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult: Alert[] = allAlertsData || [];

		//
		// Filter by current_status
		if (filtersState.by_date !== 'all') {
			filterResult = filterResult.filter((alert) => {
				return true; // alert.current_status === filtersState.by_date;
			});
		}

		//
		// Filter by municipality_id
		if (filtersState.by_municipality) {
			filterResult = filterResult.filter((alert) => {
				return true; // alert.municipality_id === filtersState.by_municipality;
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
	}, [allAlertsData, filtersState]);

	// useEffect(() => {
	// 	if (!allAlertsData) return;
	// 	if (allAlertsData?.filter((item => item.current_status === 'open')).length === 0) {
	// 		setFiltersState(prev => ({ ...prev, by_date: 'all' }));
	// 	}
	// }, []);

	//
	// D. Handle actions

	const updateFilterByDate = (value: string) => {
		setFiltersState(prev => ({ ...prev, by_date: value }));
	};

	const updateFilterByMunicipality = (value?: string) => {
		setFiltersState(prev => ({ ...prev, by_municipality: value || null }));
	};

	//
	// E. Render components

	return (
		<AlertsContext.Provider value={{
			actions: {
				updateFilterByDate,
				updateFilterByMunicipality,
			},
			counters: {
				by_date: {
					open: 0, // allAlertsData?.filter((item => item.current_status === 'open')).length || 0,
				},
			},
			data: {
				filtered: dataFilteredState,
				raw: allAlertsData || [],
			},
			filters: filtersState,
			flags: {
				is_loading: allAlertsLoading,
			},
		}}
		>{children}
		</AlertsContext.Provider>
	);
};
