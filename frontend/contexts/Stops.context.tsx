'use client';

/* * */

import type { Stop } from '@/types/stops.types';

import { useProfileContext } from '@/contexts/Profile.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface StopsContextState {
	actions: {
		getAllStopsGeoJsonFC: () => GeoJSON.FeatureCollection
		getStopById: (stopId: string) => Stop | undefined
		getStopByIdGeoJsonFC: (stopId: string) => GeoJSON.FeatureCollection
	}
	counters: {
		favorites: number
	}
	data: {
		favorites: Stop[]
		raw: Stop[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const StopsContext = createContext<StopsContextState | undefined>(undefined);

export function useStopsContext() {
	const context = useContext(StopsContext);
	if (!context) {
		throw new Error('useStopsContext must be used within a StopsContextProvider');
	}
	return context;
}

/* * */

export const StopsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();

	const [dataFavoritesState, setDataFavoritesState] = useState<Stop[]>([]);

	//
	// B. Fetch data

	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<Stop[], Error>(`${Routes.API}/v2/stops`);

	//
	// C. Transform data

	useEffect(() => {
		const favoritesStopsData = allStopsData?.filter(stop => profileContext.data.profile?.favorite_stops?.includes(stop.id)) || [];
		setDataFavoritesState(favoritesStopsData);
	}, [allStopsData, profileContext.data.profile?.favorite_stops]);

	//
	// D. Handle actions

	const getAllStopsGeoJsonFC = (): GeoJSON.FeatureCollection => {
		const collection = getBaseGeoJsonFeatureCollection();
		if (!allStopsData) return collection;
		allStopsData.forEach(stop => collection.features.push(transformStopDataIntoGeoJsonFeature(stop)));
		return collection;
	};

	const getStopById = (stopId: string) => {
		return allStopsData?.find(stop => stop.id === stopId);
	};

	const getStopByIdGeoJsonFC = (stopId: string): GeoJSON.FeatureCollection => {
		const stop = getStopById(stopId);
		const collection = getBaseGeoJsonFeatureCollection();
		if (!stop) return collection;
		collection.features.push(transformStopDataIntoGeoJsonFeature(stop));
		return collection;
	};

	//
	// E. Define context value

	const contextValue: StopsContextState = {
		actions: {
			getAllStopsGeoJsonFC,
			getStopById,
			getStopByIdGeoJsonFC,
		},
		counters: {
			favorites: profileContext.counters.favorite_stops,
		},
		data: {
			favorites: dataFavoritesState,
			raw: allStopsData || [],
		},
		flags: {
			is_loading: allStopsLoading,
		},
	};

	//
	// E. Render components

	return (
		<StopsContext.Provider value={contextValue}>
			{children}
		</StopsContext.Provider>
	);

	//
};

/* * */

function transformStopDataIntoGeoJsonFeature(stopData: Stop): GeoJSON.Feature {
	return {
		geometry: {
			coordinates: [stopData.lon, stopData.lat],
			type: 'Point',
		},
		properties: {
			current_status: stopData.current_status,
			id: stopData.id,
			lat: stopData.lat,
			lon: stopData.lon,
			name: stopData.name,
		},
		type: 'Feature',
	};
}
