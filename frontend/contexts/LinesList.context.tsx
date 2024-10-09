'use client';

/* * */

import type { Line } from '@/types/lines.types.js';

import { useProfileContext } from '@/contexts/Profile.context';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { Routes } from '@/utils/routes';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface LinesListContextState {
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
		favorites: Line[]
		filtered: Line[]
		raw: Line[]
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

const LinesListContext = createContext<LinesListContextState | undefined>(undefined);

export function useLinesListContext() {
	const context = useContext(LinesListContext);
	if (!context) {
		throw new Error('useLinesListContext must be used within a LinesListContextProvider');
	}
	return context;
}

/* * */

export const LinesListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();

	const [dataFilteredState, setDataFilteredState] = useState<Line[]>([]);
	const [dataFavoritesState, setDataFavoritesState] = useState<Line[]>([]);

	const [filterByAttributeState, setFilterByAttributeState] = useState <LinesListContextState['filters']['by_attribute']>(null);
	const [filterByCurrentViewState, setFilterByCurrentViewState] = useState <LinesListContextState['filters']['by_current_view']>('all');
	const [filterByFacilityState, setFilterByFacilityState] = useState <LinesListContextState['filters']['by_facility']>(null);
	const [filterByMunicipalityOrLocalityState, setFilterByMunicipalityOrLocalityState] = useState <LinesListContextState['filters']['by_municipality_or_locality']>(null);
	const [filterBySearchState, setFilterBySearchState] = useState <LinesListContextState['filters']['by_search']>('');

	//
	// B. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>(`${Routes.API}/lines`);

	//
	// C. Transform data

	const applyFiltersToData = (allData: Line[] = []) => {
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
			const boostedData = filterResult.map(line => ({ ...line, boost: profileContext.data.profile?.favorite_lines?.includes(line.line_id) ? true : false }));
			const searchHook = createDocCollection(boostedData, {
				line_id: 4,
				localities: 1,
				long_name: 2,
				short_name: 4,
				tts_name: 3,
			});
			filterResult = searchHook.search(filterBySearchState);
		}

		//
		// Return resulting items

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredData = applyFiltersToData(allLinesData);
		setDataFilteredState(filteredData);
	}, [allLinesData, filterByAttributeState, filterByFacilityState, filterByMunicipalityOrLocalityState, filterBySearchState]);

	useEffect(() => {
		const favoritesLinesData = allLinesData?.filter(line => profileContext.data.profile?.favorite_lines?.includes(line.line_id)) || [];
		setDataFavoritesState(favoritesLinesData);
	}, [allLinesData, profileContext.data.profile]);

	useEffect(() => {
		if (dataFavoritesState.length > 0) {
			setFilterByCurrentViewState('favorites');
		}
	}, [dataFavoritesState.length]);

	//
	// D. Handle actions

	const updateFilterByAttribute = (value: LinesListContextState['filters']['by_attribute']) => {
		setFilterByAttributeState(value || null);
	};

	const updateFilterByCurrentView = (value: LinesListContextState['filters']['by_current_view']) => {
		setFilterByCurrentViewState(value);
	};

	const updateFilterByFacility = (value: LinesListContextState['filters']['by_facility']) => {
		setFilterByFacilityState(value || null);
	};

	const updateFilterByMunicipalityOrLocality = (value: LinesListContextState['filters']['by_municipality_or_locality']) => {
		setFilterByMunicipalityOrLocalityState(value || null);
	};

	const updateFilterBySearch = (value: LinesListContextState['filters']['by_search']) => {
		setFilterBySearchState(value);
	};

	//
	// E. Define context value

	const contextValue: LinesListContextState = {
		actions: {
			updateFilterByAttribute,
			updateFilterByCurrentView,
			updateFilterByFacility,
			updateFilterByMunicipalityOrLocality,
			updateFilterBySearch,
		},
		counters: {
			favorites: profileContext.counters.favorite_lines,
		},
		data: {
			favorites: dataFavoritesState,
			filtered: dataFilteredState,
			raw: allLinesData || [],
		},
		filters: {
			by_attribute: filterByAttributeState,
			by_current_view: filterByCurrentViewState,
			by_facility: filterByFacilityState,
			by_municipality_or_locality: filterByMunicipalityOrLocalityState,
			by_search: filterBySearchState,
		},
		flags: {
			is_loading: allLinesLoading,
		},
	};

	//
	// F. Render components

	return (
		<LinesListContext.Provider value={contextValue}>
			{children}
		</LinesListContext.Provider>
	);

	//
};
