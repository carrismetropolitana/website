'use client';

/* * */

import { useLocationsContext } from '@/contexts/Locations.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { type ExtendStopsWorkerData } from '@/workers/extend-stops.worker';
import { type Stop } from '@carrismetropolitana/api-types/network';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

/* * */

export interface ExtendedStop extends Stop {
	locality_name?: string
	municipality_name?: string
}

interface StopsContextState {
	actions: {
		getStopById: (stopId: string) => Stop | undefined
		getStopByIdGeoJsonFC: (stopId: string) => GeoJSON.FeatureCollection | undefined
	}
	data: {
		stops: ExtendedStop[]
		stops_fc: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties> | undefined
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

	const locationsContext = useLocationsContext();

	const workerRef = useRef<null | Worker>(null);

	const [dataStopsState, setDataStopsState] = useState<StopsContextState['data']['stops']>([]);
	const [dataStopsFCState, setDataStopsFCState] = useState<StopsContextState['data']['stops_fc']>();

	//
	// B. Fetch data

	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<Stop[]>(`${Routes.API}/stops`);

	//
	// C. Transform data

	useEffect(() => {
		// Check if all data is available
		if (!locationsContext.data.localitites || !allStopsData) return;
		// Initialize worker if not already initialized
		if (!workerRef.current) {
			workerRef.current = new Worker(new URL('../workers/extend-stops.worker.ts', import.meta.url));
			workerRef.current.onmessage = (event: MessageEvent<ExtendedStop[]>) => setDataStopsState(event.data);
			workerRef.current.onerror = error => console.error('Worker error:', error);
		}
		// Extend data for worker and send message
		const eventMessage: ExtendStopsWorkerData = {
			localities: locationsContext.data.localitites,
			municipalities: locationsContext.data.municipalities,
			stops: allStopsData,
		};
		workerRef.current.postMessage(eventMessage);
		// Cleanup worker
		return () => {
			workerRef.current?.terminate();
			workerRef.current = null;
		};
	}, [locationsContext.data.localitites, allStopsData]);

	useEffect(() => {
		// Check if all data is available
		if (!dataStopsState) return;
		// Transform data into GeoJSON FeatureCollection
		const collection = getBaseGeoJsonFeatureCollection();
		dataStopsState.forEach((stop) => {
			const stopFC = transformStopDataIntoGeoJsonFeature(stop);
			if (stopFC) collection.features.push(stopFC);
		});
		// Set state value
		setDataStopsFCState(collection);
		//
	}, [dataStopsState]);

	//
	// D. Handle actions

	const getStopById = (stopId: string): Stop | undefined => {
		return allStopsData?.find(stop => stop.id === stopId);
	};

	const getStopByIdGeoJsonFC = (stopId: string): GeoJSON.FeatureCollection | undefined => {
		const stop = getStopById(stopId);
		if (!stop) return;
		const collection = getBaseGeoJsonFeatureCollection();
		const stopFC = transformStopDataIntoGeoJsonFeature(stop);
		if (stopFC) collection.features.push(stopFC);
		return collection;
	};

	//
	// E. Define context value

	const contextValue: StopsContextState = {
		actions: {
			getStopById,
			getStopByIdGeoJsonFC,
		},
		data: {
			stops: dataStopsState,
			stops_fc: dataStopsFCState,
		},
		flags: {
			is_loading: allStopsLoading,
		},
	};

	//
	// F. Render components

	return (
		<StopsContext.Provider value={contextValue}>
			{children}
		</StopsContext.Provider>
	);

	//
};

/* * */

export function transformStopDataIntoGeoJsonFeature(stopData: Stop): GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> {
	return {
		geometry: {
			coordinates: [stopData.lon, stopData.lat],
			type: 'Point',
		},
		properties: {
			current_status: stopData.operational_status,
			id: stopData.id,
			lat: stopData.lat,
			lon: stopData.lon,
			long_name: stopData.long_name,
		},
		type: 'Feature',
	};
}
