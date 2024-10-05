'use client';

/* * */

import type { Vehicle } from '@/types/vehicles.types';

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface VehiclesContextState {
	actions: {
		getVehicleById: (vehicleId: string) => undefined | Vehicle
		getVehicleByIdGeoJsonFC: (vehicleId: string) => GeoJSON.FeatureCollection
		getVehiclesByLineId: (tripId: string) => Vehicle[]
		getVehiclesByLineIdGeoJsonFC: (tripId: string) => GeoJSON.FeatureCollection
		getVehiclesByPatternId: (tripId: string) => Vehicle[]
		getVehiclesByPatternIdGeoJsonFC: (tripId: string) => GeoJSON.FeatureCollection
		getVehiclesByTripId: (tripId: string) => Vehicle[]
		getVehiclesByTripIdGeoJsonFC: (tripId: string) => GeoJSON.FeatureCollection
	}
	counters: {
		total: number
	}
	data: {
		all: Vehicle[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const VehiclesContext = createContext<undefined | VehiclesContextState>(undefined);

export function useVehiclesContext() {
	const context = useContext(VehiclesContext);
	if (!context) {
		throw new Error('useVehiclesContext must be used within a VehiclesContextProvider');
	}
	return context;
}

/* * */

export const VehiclesContextProvider = ({ children }) => {
	//

	//
	// A. Fetch data

	const { data: allVehiclesData, isLoading: allVehiclesLoading } = useSWR<Vehicle[], Error>(`${Routes.API}/v2/vehicles`, { refreshInterval: 3000 });

	//
	// B. Handle actions

	const getVehicleById = (vehicleId: string): undefined | Vehicle => {
		return allVehiclesData?.find(vehicle => vehicle.id === vehicleId);
	};

	const getVehicleByIdGeoJsonFC = (vehicleId: string): GeoJSON.FeatureCollection => {
		const vehicle = getVehicleById(vehicleId);
		const collection = getBaseGeoJsonFeatureCollection();
		if (!vehicle) return collection;
		collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle));
		return collection;
	};

	//

	const getVehiclesByLineId = (lineId: string): Vehicle[] => {
		return allVehiclesData?.filter(vehicle => vehicle.line_id === lineId) || [];
	};

	const getVehiclesByLineIdGeoJsonFC = (lineId: string): GeoJSON.FeatureCollection => {
		const vehicles = getVehiclesByLineId(lineId);
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	//

	const getVehiclesByPatternId = (patternId: string): Vehicle[] => {
		return allVehiclesData?.filter(vehicle => vehicle.pattern_id === patternId) || [];
	};

	const getVehiclesByPatternIdGeoJsonFC = (patternId: string): GeoJSON.FeatureCollection => {
		const vehicles = getVehiclesByPatternId(patternId);
		console.log('Vehicles by pattern', vehicles, patternId, allVehiclesData);
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	//

	const getVehiclesByTripId = (tripId: string): Vehicle[] => {
		return allVehiclesData?.filter(vehicle => vehicle.trip_id === tripId) || [];
	};

	const getVehiclesByTripIdGeoJsonFC = (tripId: string): GeoJSON.FeatureCollection => {
		const vehicles = getVehiclesByTripId(tripId);
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	//
	// C. Define context value

	const contextValue: VehiclesContextState = {
		actions: {
			getVehicleById,
			getVehicleByIdGeoJsonFC,
			getVehiclesByLineId,
			getVehiclesByLineIdGeoJsonFC,
			getVehiclesByPatternId,
			getVehiclesByPatternIdGeoJsonFC,
			getVehiclesByTripId,
			getVehiclesByTripIdGeoJsonFC,
		},
		counters: {
			total: allVehiclesData?.length || 0,
		},
		data: {
			all: allVehiclesData || [],
		},
		flags: {
			is_loading: allVehiclesLoading,
		},
	};

	//
	// D. Render components

	return (
		<VehiclesContext.Provider value={contextValue}>
			{children}
		</VehiclesContext.Provider>
	);

	//
};

/* * */

function transformVehicleDataIntoGeoJsonFeature(vehicleData: Vehicle): GeoJSON.Feature {
	return {
		geometry: {
			coordinates: [vehicleData.lon, vehicleData.lat],
			type: 'Point',
		},
		properties: {
			bearing: vehicleData.bearing,
			block_id: vehicleData.block_id,
			current_status: vehicleData.current_status,
			delay: Math.floor(Date.now() / 1000) - vehicleData.timestamp,
			id: vehicleData.id,
			line_id: vehicleData.line_id,
			pattern_id: vehicleData.pattern_id,
			route_id: vehicleData.route_id,
			schedule_relationship: vehicleData.schedule_relationship,
			shift_id: vehicleData.shift_id,
			speed: vehicleData.speed,
			stop_id: vehicleData.stop_id,
			timestamp: vehicleData.timestamp,
			timeString: new Date(vehicleData.timestamp * 1000).toLocaleString(),
			trip_id: vehicleData.trip_id,
		},
		type: 'Feature',
	};
}
