'use client';

/* * */

import type { Line } from '@/types/lines.types.js';

import { useProfileContext } from '@/contexts/ProfileContext';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getLineById: (lineId: string) => Line | null
		getLineIdFavoriteStatus: (lineId: string) => boolean | null
		updateFilterByAttribute: (value: string) => void
		updateFilterByCurrentView: (value: string) => void
		updateFilterByFacility: (value: string) => void
		updateFilterByMunicipalityOrLocality: (value: string) => void
		updateFilterBySearch: (value: string) => void
		updateLineIdFavoriteStatus: (lineId: string) => void
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
		by_current_view: string
		by_facility: null | string
		by_municipality_or_locality: null | string
		by_search: string
	}
	flags: {
		is_loading: boolean
	}
}

const initialContextState = {
	actions: {
		getLineById: () => null,
		getLineIdFavoriteStatus: () => null,
		updateFilterByAttribute: () => null,
		updateFilterByCurrentView: () => null,
		updateFilterByFacility: () => null,
		updateFilterByMunicipalityOrLocality: () => null,
		updateFilterBySearch: () => null,
		updateLineIdFavoriteStatus: () => null,
	},
	counters: {
		favorites: 0,
	},
	data: {
		favorites: [],
		filtered: [],
		raw: [],
	},
	filters: {
		by_attribute: null,
		by_current_view: 'all',
		by_facility: null,
		by_municipality_or_locality: null,
		by_search: '',
	},
	flags: {
		is_loading: true,
	},
};

const LinesContext = createContext<LinesContextState>(initialContextState);

export function useLinesContext() {
	return useContext(LinesContext);
}

/* * */

export const LinesContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();

	//
	// B. Setup state

	const [dataFilteredState, setDataFilteredState] = useState<Line[]>([]);
	const [dataFavoritedState, setDataFavoritedState] = useState<Line[]>([]);
	const [filtersState, setFiltersState] = useState<LinesContextState['filters']>(initialContextState.filters);

	//
	// C. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>('https://api.carrismetropolitana.pt/v2/lines');

	//
	// D. Transform data

	const applyFiltersToData = (allData: Line[] = []) => {
		//

		let filterResult = allData;

		//
		// Filter by_attribute

		if (filtersState.by_attribute) {
			filterResult = filterResult.filter((item) => {
				return true;
			});
		}

		//
		// Filter by_facility

		if (filtersState.by_municipality_or_locality) {
			filterResult = filterResult.filter((item) => {
				return true;
			});
		}

		//
		// Filter by by_municipality_or_locality

		if (filtersState.by_municipality_or_locality) {
			filterResult = filterResult.filter((line) => {
				return true; // line.municipality_id === filtersState.by_municipality;
			});
		}

		//
		// Filter by by_search

		if (filtersState.by_search) {
			// Give extra weight to favorite lines
			const boostedData = filterResult.map(line => ({ ...line, boost: profileContext.profile.favoriteLines.includes(line.line_id) }));
			const searchHook = createDocCollection(boostedData, {
				line_id: 3,
				localities: 1,
				long_name: 1,
				short_name: 1,
			});
			filterResult = searchHook.search(filtersState.by_search);
		}

		//
		// Return resulting items

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredData = applyFiltersToData(allLinesData);
		setDataFilteredState(filteredData);
	}, [allLinesData, filtersState]);

	useEffect(() => {
		const favoritesLinesData = allLinesData?.filter(line => profileContext.profile.favoriteLines.includes(line.line_id)) || [];
		setDataFavoritedState(favoritesLinesData);
	}, [allLinesData, profileContext.profile.favoriteLines]);

	//
	// E. Handle actions

	const getLineById = (lineId: string) => {
		return allLinesData?.find(line => line.line_id === lineId) || null;
	};

	const getLineIdFavoriteStatus = (lineId: string) => {
		return profileContext.profile.favoriteLines.includes(lineId);
	};

	const updateLineIdFavoriteStatus = (lineId: string) => {
		if (profileContext.profile.favoriteLines.includes(lineId)) {
			profileContext.setFavoriteLines(profileContext.profile.favoriteLines.filter(id => id !== lineId));
		}
		else {
			profileContext.setFavoriteLines([...profileContext.profile.favoriteLines, lineId]);
		}
	};

	const updateFilterByAttribute = (value: string) => {
		setFiltersState(prev => ({ ...prev, by_attribute: value }));
	};

	const updateFilterByCurrentView = (value: string) => {
		setFiltersState(prev => ({ ...prev, by_current_view: value }));
	};

	const updateFilterByFacility = (value: string) => {
		setFiltersState(prev => ({ ...prev, by_facility: value }));
	};

	const updateFilterByMunicipalityOrLocality = (value: string) => {
		setFiltersState(prev => ({ ...prev, by_municipality_or_locality: value }));
	};

	const updateFilterBySearch = (value?: string) => {
		setFiltersState(prev => ({ ...prev, by_search: value || '' }));
	};

	//
	// F. Render components

	return (
		<LinesContext.Provider value={{
			actions: {
				getLineById,
				getLineIdFavoriteStatus,
				updateFilterByAttribute,
				updateFilterByCurrentView,
				updateFilterByFacility,
				updateFilterByMunicipalityOrLocality,
				updateFilterBySearch,
				updateLineIdFavoriteStatus,
			},
			counters: {
				favorites: 0,
			},
			data: {
				favorites: dataFavoritedState,
				filtered: dataFilteredState,
				raw: allLinesData || [],
			},
			filters: filtersState,
			flags: {
				is_loading: allLinesLoading,
			},
		}}
		>
			{children}
		</LinesContext.Provider>
	);

	//
};
