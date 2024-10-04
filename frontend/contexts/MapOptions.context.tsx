'use client';

import { MapStyle } from '@/components/map/MapView';
import { MapRef } from 'react-map-gl/maplibre';
/* * */

import * as turf from '@turf/turf';
import maplibregl from 'maplibre-gl';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

const LOCAL_STORAGE_KEYS = {
	viewport_height: 'map|viewport_height',
};

const DEFAULT_OPTIONS = {
	viewport_height: { max: 600, min: 300 },
};

/* * */

interface MapOptionsContextState {
	actions: {
		centerMap: (source?: string) => void
		setMap: (map: MapRef) => void
		setStyle: (value: MapStyle) => void
		setViewportHeight: (value: number) => void
	}
	data: {
		map: MapRef | undefined
		style: string
		viewport_height: null | number
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const MapOptionsContext = createContext<MapOptionsContextState | undefined>(undefined);

export function useMapOptionsContext() {
	const context = useContext(MapOptionsContext);
	if (!context) {
		throw new Error('useMapOptionsContext must be used within a MapOptionsContextProvider');
	}
	return context;
}

/* * */

export const MapOptionsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataViewportHeightState, setDataViewportHeightState] = useState<MapOptionsContextState['data']['viewport_height']>(null);
	const [dataStyleState, setDataStyleState] = useState<MapOptionsContextState['data']['style']>('map');
	const [dataMapState, setDataMapState] = useState<MapOptionsContextState['data']['map']>(undefined);

	//
	// B. Transform data

	useEffect(() => {
		// Get viewport height from local storage
		if (typeof window === 'undefined') return;
		const viewportHeightLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.viewport_height);
		if (viewportHeightLocal) {
			setDataViewportHeightState(Number(viewportHeightLocal));
		}
	}, []);

	useEffect(() => {
		// Save viewport height to local storage
		if (typeof window === 'undefined' || dataViewportHeightState === null) return;
		const viewportHeightTxt = String(dataViewportHeightState);
		localStorage.setItem(LOCAL_STORAGE_KEYS.viewport_height, viewportHeightTxt);
	}, [dataViewportHeightState]);

	//
	// C. Handle actions

	const setViewportHeight = (value: number) => {
		if (value < DEFAULT_OPTIONS.viewport_height.min) value = DEFAULT_OPTIONS.viewport_height.min;
		if (value > DEFAULT_OPTIONS.viewport_height.max) value = DEFAULT_OPTIONS.viewport_height.max;
		setDataViewportHeightState(value);
	};

	const setStyle = (value: MapStyle) => {
		setDataStyleState(value);
	};

	const setMap = (map: MapRef) => {
		setDataMapState(map);
	};

	const centerMap = (source = 'stops') => {
		if (!dataMapState) return;
		const stops = dataMapState.getSource(source);
		if (!stops) return;

		const combine = turf.combine(stops.serialize().data);
		const coordinates = combine.features[0].geometry.coordinates;

		// Calculate bounds
		const bounds = coordinates.reduce((bounds, coord) => {
			return bounds.extend(coord as [number, number]);
		}, new maplibregl.LngLatBounds(coordinates[0] as [number, number], coordinates[0] as [number, number]));

		dataMapState.fitBounds(
			bounds,
			{ padding: 130 },
		);

		return;
	};

	//
	// D. Define context value

	const contextValue: MapOptionsContextState = {
		actions: {
			centerMap,
			setMap,
			setStyle,
			setViewportHeight,
		},
		data: {
			map: dataMapState,
			style: dataStyleState,
			viewport_height: dataViewportHeightState,
		},
		flags: {
			is_loading: false,
		},
	};

	//
	// E. Render components

	return (
		<MapOptionsContext.Provider value={contextValue}>
			{children}
		</MapOptionsContext.Provider>
	);

	//
};
