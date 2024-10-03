'use client';

/* * */

import type { Store } from '@/types/stores.types.js';

import { moveMap } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/dist/esm/exports-maplibre';
import useSWR from 'swr';

/* * */

interface StoresListContextState {
	actions: {
		updateFilterByMunicipality: (value: string) => void
		updateFilterCurrentStatus: (value: string) => void
		updateFilterOrderBy: (value: string) => void
		updateSelectedStore: (storeId: string) => void
	}
	counters: {
		by_current_status: {
			open: number
		}
	}
	data: {
		filtered: Store[]
		raw: Store[]
		selected: null | Store
	}
	filters: {
		by_current_status: 'all' | 'open'
		by_municipality: null | string
		order_by: 'municipality_name' | 'wait_time'
		selected_store: null | string
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

	const { storesListMap } = useMap();

	const [dataFilteredState, setDataFilteredState] = useState<Store[]>([]);
	const [dataSelectedState, setDataSelectedState] = useState<null | Store>(null);

	const [filterByCurrentStatusState, setFilterByCurrentStatusState] = useQueryState <StoresListContextState['filters']['by_current_status']>('open', parseAsStringLiteral(['all', 'open']).withDefault('open').withOptions({ clearOnDefault: true }));
	const [filterByMunicipalityState, setFilterByMunicipalityState] = useQueryState('municipality');
	const [filterOrderByState, setFilterOrderByState] = useQueryState <StoresListContextState['filters']['order_by']>('open', parseAsStringLiteral(['municipality_name', 'wait_time']).withDefault('municipality_name').withOptions({ clearOnDefault: true }));
	const [filterSelectedStoreState, setFilterSelectedStoreState] = useQueryState('store');

	//
	// B. Fetch data

	const { data: allStoresData, isLoading: allStoresLoading } = useSWR<Store[], Error>(`${Routes.API}/datasets/facilities/encm`);

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

		// if (filterByCurrentStatusState) updateFilterCurrentStatus(filterByCurrentStatusState);
		// if (filterOrderByState) updateFilterOrderBy(filterOrderByState);
		if (filterSelectedStoreState) updateSelectedStore(filterSelectedStoreState);
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

	const updateSelectedStore = (storeId: string) => {
		if (!allStoresData) return;
		// Search for store in filtered array
		let foundStoreData = dataFilteredState.find(item => item.id === storeId) || null;
		if (!foundStoreData) {
			foundStoreData = allStoresData.find(item => item.id === storeId) || null;
			if (!foundStoreData || !foundStoreData.id) return;
			setFilterByCurrentStatusState('all');
			moveMap(storesListMap, [foundStoreData.lon, foundStoreData.lat]);
			setTimeout(() => {
				if (!foundStoreData) return;
				document.getElementById(foundStoreData.id)?.scrollIntoView();
			}, 500);
			return;
		};
		setDataSelectedState(foundStoreData);
		setFilterSelectedStoreState(storeId);
		moveMap(storesListMap, [foundStoreData.lon, foundStoreData.lat]);
		document.getElementById(foundStoreData.id)?.scrollIntoView();
	};

	//
	// E. Define context value

	const contextValue: StoresListContextState = {
		actions: {
			updateFilterByMunicipality,
			updateFilterCurrentStatus,
			updateFilterOrderBy,
			updateSelectedStore,
		},
		counters: {
			by_current_status: {
				open: allStoresData?.filter((item => item.current_status === 'open')).length || 0,
			},
		},
		data: {
			filtered: dataFilteredState,
			raw: allStoresData || [],
			selected: dataSelectedState,
		},
		filters: {
			by_current_status: filterByCurrentStatusState,
			by_municipality: filterByMunicipalityState,
			order_by: filterOrderByState,
			selected_store: filterSelectedStoreState,
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
