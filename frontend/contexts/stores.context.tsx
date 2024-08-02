'use client';

/* * */

import type { Store } from '@/types/stores.types.js';

import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

const initialFiltersState = {
	by_current_status: 'open',
	by_municipality_id: '',
	order_by: '',
};

/* * */

interface StoresContextState {
	actions: {
		updateFilterCurrentStatus: (value: string) => void
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
	filters: typeof initialFiltersState
	flags: {
		is_loading: boolean
	}
}

const StoresContext = createContext<StoresContextState>({
	actions: {
		updateFilterCurrentStatus: () => { /**/ },
	},
	counters: {
		by_current_status: {
			open: 0,
		},
	},
	data: {
		filtered: [],
		raw: [],
	},
	filters: initialFiltersState,
	flags: {
		is_loading: true,
	},
});

export function useStoresContext() {
	return useContext(StoresContext);
}

/* * */

export const StoresContextProvider = ({ children }) => {
	//

	//
	// A. Setup state

	const [dataFilteredState, setDataFilteredState] = useState<Store[]>([]);
	const [filtersState, setFiltersState] = useState(initialFiltersState);

	//
	// B. Fetch data

	const { data: allStoresData, isLoading: allStoresLoading } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/encm');

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult: Store[] = allStoresData || [];

		//
		// Filter by current_status
		if (filtersState.by_current_status !== 'all') {
			filterResult = filterResult.filter((store) => {
				return store.current_status === filtersState.by_current_status;
			});
		}

		//
		// Filter by municipality_id
		if (filtersState.by_municipality_id) {
			filterResult = filterResult.filter((store) => {
				return store.municipality_id === filtersState.by_municipality_id;
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
	}, [allStoresData, filtersState]);

	useEffect(() => {
		if (!allStoresData) return;
		if (allStoresData?.filter((item => item.current_status === 'open')).length === 0) {
			setFiltersState(prev => ({ ...prev, by_current_status: 'all' }));
		}
	}, []);

	//
	// D. Handle actions

	const updateFilterCurrentStatus = (value: string) => {
		console.log(value);
		setFiltersState(prev => ({ ...prev, by_current_status: value }));
	};

	//
	// E. Render components

	return (
		<StoresContext.Provider value={{
			actions: {
				updateFilterCurrentStatus,
			},
			counters: {
				by_current_status: {
					open: allStoresData?.filter((item => item.current_status === 'open')).length || 0,
				},
			},
			data: {
				filtered: dataFilteredState,
				raw: allStoresData,
			},
			filters: filtersState,
			flags: {
				is_loading: allStoresLoading,
			},
		}}
		>{children}
		</StoresContext.Provider>
	);
};
