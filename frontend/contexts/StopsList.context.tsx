'use client';

/* * */

import type { Stop } from '@carrismetropolitana/api-types/network';

import { useLocationsContext } from '@/contexts/Locations.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { useAnalyticsContext } from './Analytics.context';

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
		filtered_geojson_fc: GeoJSON.FeatureCollection
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
	const locationsContext = useLocationsContext();
	const analyticsContext = useAnalyticsContext();

	const searchHook = useRef<{ search: (query: string) => Stop[] }>(undefined);

	const [dataFilteredState, setDataFilteredState] = useState<Stop[]>([]);
	const [dataFilteredGeojsonFCState, setDataFilteredGeojsonFCState] = useState<GeoJSON.FeatureCollection>();
	const [dataFavoritesState, setDataFavoritesState] = useState<Stop[]>([]);

	const [filterByAttributeState, setFilterByAttributeState] = useState <StopsListContextState['filters']['by_attribute']>(null);
	const [filterByCurrentViewState, setFilterByCurrentViewState] = useState <StopsListContextState['filters']['by_current_view']>('map');
	const [filterByFacilityState, setFilterByFacilityState] = useState <StopsListContextState['filters']['by_facility']>(null);
	const [filterByMunicipalityOrLocalityState, setFilterByMunicipalityOrLocalityState] = useState <StopsListContextState['filters']['by_municipality_or_locality']>(null);
	const [filterBySearchState, setFilterBySearchState] = useState <StopsListContextState['filters']['by_search']>('');

	//
	// B. Transform data

	useEffect(() => {
		if (!stopsContext.data.stops.length) return;

		const scheduleTask = (callback) => {
			if ('requestIdleCallback' in window) {
				return requestIdleCallback(callback);
			}
			else {
				return setTimeout(callback, 0); // Fallback for Safari
			}
		};

		const cancelTask = (id) => {
			if ('cancelIdleCallback' in window) {
				cancelIdleCallback(id);
			}
			else {
				clearTimeout(id);
			}
		};

		const taskId = scheduleTask(() => {
			console.log('Running expensive computation asynchronously');
			// Prepare data for search function
			const preparedSearchCollection = stopsContext.data.stops.map((item) => {
				const isFavorite = profileContext.data.favorite_stops?.includes(item.id) ?? false;
				const localityData = locationsContext.actions.getLocalityById(item.locality_id);
				return {
					...item,
					boost: isFavorite,
					locality_display: localityData?.display ?? '',
				};
			});
			searchHook.current = createDocCollection(preparedSearchCollection, {
				id: 2,
				locality_display: 1.5,
				long_name: 1,
				short_name: 1,
				tts_name: 1.5,
			}, {
				threshold: 1.7,
			});
		});

		return () => cancelTask(taskId); // Cleanup on unmount
	}, [stopsContext.data.stops, profileContext.data.favorite_stops]);

	// const searchHook = useMemo(() => {
	// 	// Prepare data for search function
	// 	const preparedSearchCollection = stopsContext.data.stops.map((item) => {
	// 		const isFavorite = profileContext.data.favorite_stops?.includes(item.id) ? true : false;
	// 		const localityData = locationsContext.actions.getLocalityById(item.locality_id);
	// 		return {
	// 			...item,
	// 			boost: isFavorite,
	// 			locality_display: localityData?.display ?? '',
	// 		};
	// 	});
	// 	return createDocCollection(preparedSearchCollection, {
	// 		id: 2,
	// 		locality_display: 1.5,
	// 		long_name: 1,
	// 		short_name: 1,
	// 		tts_name: 1.5,
	// 	}, {
	// 		threshold: 1.7,
	// 	});
	// }, [stopsContext.data.stops, profileContext.data.favorite_stops]);

	const applyFiltersToData = (allData: Stop[] = []) => {
		//

		let filterResult = allData;

		//
		// Filter by by_search

		if (filterBySearchState) {
			// Give extra weight to favorite lines
			filterResult = searchHook.current?.search(filterBySearchState) || filterResult;
		}

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

	//
	// D. Handle actions

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
			filtered_geojson_fc: dataFilteredGeojsonFCState || getBaseGeoJsonFeatureCollection(),
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
	// F. Render components

	return (
		<StopsListContext.Provider value={contextValue}>
			{children}
		</StopsListContext.Provider>
	);

	//
};
