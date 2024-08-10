'use client';

/* * */

import type { Store } from '@/types/stores.types.js';

import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface StoresListContextState {
	actions: {
		updateFilterByMunicipality: (value: string) => void
		updateFilterCurrentStatus: (value: string) => void
		updateFilterOrderBy: (value: string) => void
	}
	counters: {
		by_current_status: {
			open: number
		}
	}
	data: {
		filtered: Store[]
		raw: Store[]
	}
	filters: {
		by_current_status: 'all' | 'open'
		by_municipality: null | string
		order_by: 'municipality_name' | 'wait_time'
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const StoresListContext = createContext<StoresListContextState | undefined>(undefined);

export function useStoresListContext() {
	const context = useContext(StoresListContext);
	if (!context) {
		throw new Error('useStoresListContext must be used within a StoresListContextProvider');
	}
	return context;
}

/* * */

export const StoresListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataFilteredState, setDataFilteredState] = useState<Store[]>([]);

	const [filterByCurrentStatusState, setFilterByCurrentStatusState] = useState <StoresListContextState['filters']['by_current_status']>('open');
	const [filterByMunicipalityState, setFilterByMunicipalityState] = useState <StoresListContextState['filters']['by_municipality']>(null);
	const [filterOrderByState, setFilterOrderByState] = useState <StoresListContextState['filters']['order_by']>('municipality_name');

	//
	// B. Fetch data

	const { data: allStoresData, isLoading: allStoresLoading } = useSWR<Store[], Error>('https://api.carrismetropolitana.pt/datasets/facilities/encm');

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult: Store[] = allStoresData || [];

		//
		// Filter by current_status
		if (filterByCurrentStatusState !== 'all') {
			filterResult = filterResult.filter((store) => {
				return store.current_status === filterByCurrentStatusState;
			});
		}

		//
		// Filter by municipality_id
		if (filterByMunicipalityState) {
			filterResult = filterResult.filter((store) => {
				return store.municipality_id === filterByMunicipalityState;
			});
		}

		//
		// Filter Order by
		if (filterOrderByState) {
			filterResult = filterResult.sort((a, b) => {
				return a[filterOrderByState] > b[filterOrderByState] ? 1 : -1;
			});
		}

		//
		// Save filter result to state
		return filterResult;

		//
	};

	useEffect(() => {
		const filteredStores = applyFiltersToData();
		setDataFilteredState(filteredStores);
	}, [allStoresData, filterByCurrentStatusState, filterByMunicipalityState, filterOrderByState]);

	useEffect(() => {
		if (!allStoresData) return;
		if (allStoresData?.filter((item => item.current_status === 'open')).length === 0) {
			setFilterByCurrentStatusState('all');
		}
	}, [allStoresData]);

	//
	// D. Handle actions

	const updateFilterCurrentStatus = (value: StoresListContextState['filters']['by_current_status']) => {
		setFilterByCurrentStatusState(value);
	};

	const updateFilterByMunicipality = (value: StoresListContextState['filters']['by_municipality']) => {
		setFilterByMunicipalityState(value || null);
	};

	const updateFilterOrderBy = (value: StoresListContextState['filters']['order_by']) => {
		setFilterOrderByState(value);
	};

	//
	// E. Define context value

	const contextValue: StoresListContextState = {
		actions: {
			updateFilterByMunicipality,
			updateFilterCurrentStatus,
			updateFilterOrderBy,
		},
		counters: {
			by_current_status: {
				open: allStoresData?.filter((item => item.current_status === 'open')).length || 0,
			},
		},
		data: {
			filtered: dataFilteredState,
			raw: allStoresData || [],
		},
		filters: {
			by_current_status: filterByCurrentStatusState,
			by_municipality: filterByMunicipalityState,
			order_by: filterOrderByState,
		},
		flags: {
			is_loading: allStoresLoading,
		},
	};

	//
	// F. Render components

	return (
		<StoresListContext.Provider value={contextValue}>
			{children}
		</StoresListContext.Provider>
	);

	//
};
