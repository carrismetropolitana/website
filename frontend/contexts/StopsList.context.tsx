'use client';

/* * */

import type { Stop } from '@/types/stops.types';

import { useProfileContext } from '@/contexts/Profile.context';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { Routes } from '@/utils/routes';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface StopsListContextState {
	actions: {
		updateFilterByAttribute: (value: string) => void
		updateFilterByCurrentView: (value: string) => void
		updateFilterByFacility: (value: string) => void
		updateFilterByMunicipalityOrLocality: (value: string) => void
		updateFilterBySearch: (value: string) => void
	}
	counters: {
		favorites: number
	}
	data: {
		favorites: Stop[]
		filtered: Stop[]
		raw: Stop[]
	}
	filters: {
		by_attribute: null | string
		by_current_view: 'all' | 'favorites'
		by_facility: null | string
		by_municipality_or_locality: null | string
		by_search: string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const StopsListContext = createContext<StopsListContextState | undefined>(undefined);

export function useStopsListContext() {
	const context = useContext(StopsListContext);
	if (!context) {
		throw new Error('useStopsListContext must be used within a StopsListContextProvider');
	}
	return context;
}

/* * */

export const StopsListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();

	const [dataFilteredState, setDataFilteredState] = useState<Stop[]>([]);
	const [dataFavoritesState, setDataFavoritesState] = useState<Stop[]>([]);

	const [filterByAttributeState, setFilterByAttributeState] = useState <StopsListContextState['filters']['by_attribute']>(null);
	const [filterByCurrentViewState, setFilterByCurrentViewState] = useState <StopsListContextState['filters']['by_current_view']>('all');
	const [filterByFacilityState, setFilterByFacilityState] = useState <StopsListContextState['filters']['by_facility']>(null);
	const [filterByMunicipalityOrLocalityState, setFilterByMunicipalityOrLocalityState] = useState <StopsListContextState['filters']['by_municipality_or_locality']>(null);
	const [filterBySearchState, setFilterBySearchState] = useState <StopsListContextState['filters']['by_search']>('');

	//
	// B. Fetch data

	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<Stop[], Error>(`${Routes.API}/stops`);

	//
	// C. Transform data

	const applyFiltersToData = (allData: Stop[] = []) => {
		//

		let filterResult = allData;

		//
		// Filter by_attribute

		if (filterByAttributeState) {
			filterResult = filterResult.filter((item) => {
				return true;
			});
		}

		//
		// Filter by_facility

		if (filterByFacilityState) {
			filterResult = filterResult.filter((item) => {
				return true;
			});
		}

		//
		// Filter by by_municipality_or_locality

		if (filterByMunicipalityOrLocalityState) {
			filterResult = filterResult.filter((line) => {
				return true; // line.municipality_id === filtersState.by_municipality;
			});
		}

		//
		// Filter by by_search

		if (filterBySearchState) {
			// Give extra weight to favorite lines
			const boostedData = filterResult.map(stop => ({ ...stop, boost: profileContext.data.profile?.favorite_stops?.includes(stop.id) ? true : false }));
			const searchHook = createDocCollection(boostedData, {
				id: 5,
				locality: 2,
				name: 4,
				short_name: 3,
			});
			filterResult = searchHook.search(filterBySearchState);
		}

		//
		// Return resulting items

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredData = applyFiltersToData(allStopsData);
		setDataFilteredState(filteredData);
	}, [allStopsData, filterByAttributeState, filterByFacilityState, filterByMunicipalityOrLocalityState, filterBySearchState]);

	useEffect(() => {
		const favoritesStopsData = allStopsData?.filter(stop => profileContext.data.profile?.favorite_stops?.includes(stop.id)) || [];
		setDataFavoritesState(favoritesStopsData);
	}, [allStopsData, profileContext.data.profile?.favorite_stops]);

	//
	// D. Handle actions

	const updateFilterByAttribute = (value: StopsListContextState['filters']['by_attribute']) => {
		setFilterByAttributeState(value || null);
	};

	const updateFilterByCurrentView = (value: StopsListContextState['filters']['by_current_view']) => {
		setFilterByCurrentViewState(value);
	};

	const updateFilterByFacility = (value: StopsListContextState['filters']['by_facility']) => {
		setFilterByFacilityState(value || null);
	};

	const updateFilterByMunicipalityOrLocality = (value: StopsListContextState['filters']['by_municipality_or_locality']) => {
		setFilterByMunicipalityOrLocalityState(value || null);
	};

	const updateFilterBySearch = (value: StopsListContextState['filters']['by_search']) => {
		setFilterBySearchState(value);
	};

	//
	// E. Define context value

	const contextValue: StopsListContextState = {
		actions: {
			updateFilterByAttribute,
			updateFilterByCurrentView,
			updateFilterByFacility,
			updateFilterByMunicipalityOrLocality,
			updateFilterBySearch,
		},
		counters: {
			favorites: profileContext.counters.favorite_stops,
		},
		data: {
			favorites: dataFavoritesState,
			filtered: dataFilteredState,
			raw: allStopsData || [],
		},
		filters: {
			by_attribute: filterByAttributeState,
			by_current_view: filterByCurrentViewState,
			by_facility: filterByFacilityState,
			by_municipality_or_locality: filterByMunicipalityOrLocalityState,
			by_search: filterBySearchState,
		},
		flags: {
			is_loading: allStopsLoading,
		},
	};

	//
	// F. Render components

	return (
		<StopsListContext.Provider value={contextValue}>
			{children}
		</StopsListContext.Provider>
	);

	//
};
