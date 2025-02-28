'use client';

/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { type Stop } from '@carrismetropolitana/api-types/network';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

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
		filtered_fc: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>
	}
	filters: {
		by_attribute: null | string
		by_current_view: 'favorites' | 'list' | 'map'
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
	const stopsContext = useStopsContext();
	const analyticsContext = useAnalyticsContext();

	const [dataFilteredState, setDataFilteredState] = useState<Stop[]>([]);
	const [dataFilteredGeojsonFCState, setDataFilteredGeojsonFCState] = useState<GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>>();
	const [dataFavoritesState, setDataFavoritesState] = useState<Stop[]>([]);

	const [filterByAttributeState, setFilterByAttributeState] = useState <StopsListContextState['filters']['by_attribute']>(null);
	const [filterByCurrentViewState, setFilterByCurrentViewState] = useState <StopsListContextState['filters']['by_current_view']>('map');
	const [filterByFacilityState, setFilterByFacilityState] = useState <StopsListContextState['filters']['by_facility']>(null);
	const [filterByMunicipalityOrLocalityState, setFilterByMunicipalityOrLocalityState] = useState <StopsListContextState['filters']['by_municipality_or_locality']>(null);
	const [filterBySearchState, setFilterBySearchState] = useState <StopsListContextState['filters']['by_search']>('');

	//
	// B. Transform data

	const searchHook = useMemo(() => {
		// Prepare data for search function
		const preparedSearchCollection = stopsContext.data.stops.map((item) => {
			const isFavorite = profileContext.data.favorite_stops?.includes(item.id) ? true : false;
			return {
				...item,
				boost: isFavorite,
			};
		});
		return createDocCollection(preparedSearchCollection, {
			id: 2,
			// locality_name: 1.5,
			long_name: 1,
			short_name: 1,
			tts_name: 1.5,
		}, {
			threshold: 1.7,
		});
	}, [stopsContext.data.stops, profileContext.data.favorite_stops]);

	const applyFiltersToData = (allData: Stop[] = []) => {
		//

		let filterResult = allData;

		//
		// Filter by by_search

		if (filterBySearchState) {
			// Give extra weight to favorite lines
			filterResult = searchHook.search(filterBySearchState) || filterResult;
		}

		//
		// Filter by_attribute

		if (filterByAttributeState) {
			filterResult = filterResult.filter(() => {
				return true;
			});
		}

		//
		// Filter by_facility

		if (filterByFacilityState) {
			filterResult = filterResult.filter(() => {
				return true;
			});
		}

		//
		// Filter by by_municipality_or_locality

		if (filterByMunicipalityOrLocalityState) {
			filterResult = filterResult.filter(() => {
				return true; // line.municipality_id === filtersState.by_municipality;
			});
		}

		//
		// Return resulting items

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredData = applyFiltersToData(stopsContext.data.stops);
		setDataFilteredState(filteredData);
	}, [stopsContext.data.stops, filterByAttributeState, filterByFacilityState, filterByMunicipalityOrLocalityState, filterBySearchState]);

	useEffect(() => {
		const favoritesStopsData = stopsContext.data.stops?.filter(stop => profileContext.data.favorite_stops?.includes(stop.id)) || [];
		setDataFavoritesState(favoritesStopsData);
	}, [stopsContext.data.stops, profileContext.data.favorite_stops]);

	useEffect(() => {
		// Check if all data is available
		if (!dataFilteredState) return;
		// Initialize worker if not already initialized
		const collection = getBaseGeoJsonFeatureCollection();
		dataFilteredState.forEach((stop) => {
			const stopFC = transformStopDataIntoGeoJsonFeature(stop);
			if (stopFC) collection.features.push(stopFC);
		});
		// Set state value
		setDataFilteredGeojsonFCState(collection);
		//
	}, [dataFilteredState]);

	//
	// C. Handle actions

	const updateFilterByAttribute = (value: StopsListContextState['filters']['by_attribute']) => {
		setFilterByAttributeState(value || null);
	};

	const updateFilterByCurrentView = (value: StopsListContextState['filters']['by_current_view']) => {
		setFilterByCurrentViewState(value);
		analyticsContext.actions.capture(ampli => ampli.changeStopsViewType({ view_type: value }));
	};

	const updateFilterByFacility = (value: StopsListContextState['filters']['by_facility']) => {
		setFilterByFacilityState(value || null);
	};

	const updateFilterByMunicipalityOrLocality = (value: StopsListContextState['filters']['by_municipality_or_locality']) => {
		setFilterByMunicipalityOrLocalityState(value || null);
	};

	const updateFilterBySearch = (value: StopsListContextState['filters']['by_search']) => {
		setFilterBySearchState(value);
		analyticsContext.actions.captureWithDelay(ampli => ampli.searchStop({ search_value: value }));
	};

	//
	// D. Define context value

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
			filtered_fc: dataFilteredGeojsonFCState || getBaseGeoJsonFeatureCollection(),
		},
		filters: {
			by_attribute: filterByAttributeState,
			by_current_view: filterByCurrentViewState,
			by_facility: filterByFacilityState,
			by_municipality_or_locality: filterByMunicipalityOrLocalityState,
			by_search: filterBySearchState,
		},
		flags: {
			is_loading: stopsContext.flags.is_loading,
		},
	};

	//
	// E. Render components

	return (
		<StopsListContext.Provider value={contextValue}>
			{children}
		</StopsListContext.Provider>
	);

	//
};
