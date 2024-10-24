'use client';

/* * */

import type { Stop } from '@/types/stops.types';

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface StopsContextState {
	actions: {
		getAllStopsGeoJsonFC: () => GeoJSON.FeatureCollection | undefined
		getStopById: (stopId: string) => Stop | undefined
		getStopByIdGeoJsonFC: (stopId: string) => GeoJSON.FeatureCollection | undefined
	}
	data: {
		stops: Stop[]
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
	// A. Fetch data

	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<Stop[], Error>(`${Routes.API}/stops`);

	//
	// B. Handle actions

	const getStopById = (stopId: string): Stop | undefined => {
		return allStopsData?.find(stop => stop.id === stopId);
	};

	const getAllStopsGeoJsonFC = (): GeoJSON.FeatureCollection | undefined => {
		if (!allStopsData) return;
		const collection = getBaseGeoJsonFeatureCollection();
		allStopsData.forEach(stop => collection.features.push(transformStopDataIntoGeoJsonFeature(stop)));
		return collection;
	};

	const getStopByIdGeoJsonFC = (stopId: string): GeoJSON.FeatureCollection | undefined => {
		const stop = getStopById(stopId);
		if (!stop) return;
		const collection = getBaseGeoJsonFeatureCollection();
		collection.features.push(transformStopDataIntoGeoJsonFeature(stop));
		return collection;
	};

	//
	// C. Define context value

	const contextValue: StopsContextState = {
		actions: {
			getAllStopsGeoJsonFC,
			getStopById,
			getStopByIdGeoJsonFC,
		},
		data: {
			stops: allStopsData || [],
		},
		flags: {
			is_loading: allStopsLoading,
		},
	};

	//
	// D. Render components

	return (
		<StopsContext.Provider value={contextValue}>
			{children}
		</StopsContext.Provider>
	);

	//
};

/* * */

export function transformStopDataIntoGeoJsonFeature(stopData: Stop): GeoJSON.Feature {
	if (!stopData) return {} as GeoJSON.Feature;
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
