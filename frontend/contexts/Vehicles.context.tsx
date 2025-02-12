'use client';

/* * */

import type { Vehicle } from '@carrismetropolitana/api-types/vehicles';

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Routes } from '@/utils/routes';
import { DateTime } from 'luxon';
import { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface VehiclesContextState {
	actions: {
		getAllVehicles: () => undefined | Vehicle[]
		getAllVehiclesGeoJsonFC: () => GeoJSON.FeatureCollection | undefined
		getVehicleById: (vehicleId: string) => undefined | Vehicle
		getVehicleByIdGeoJsonFC: (vehicleId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByLineId: (lineId: string) => Vehicle[]
		getVehiclesByLineIdGeoJsonFC: (lineId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByPatternId: (patternId: string) => Vehicle[]
		getVehiclesByPatternIdGeoJsonFC: (patternId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByTripId: (tripId: string) => Vehicle[]
		getVehiclesByTripIdGeoJsonFC: (tripId: string) => GeoJSON.FeatureCollection | undefined
	}
	data: {
		vehicles: Vehicle[]
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

	const { data: fetchedVehiclesData, isLoading: allVehiclesLoading } = useSWR<Vehicle[], Error>(`${Routes.API}/vehicles`, { refreshInterval: 5000 });

	const allVehiclesData = useMemo(() => {
		const now = DateTime.now().toSeconds();
		return fetchedVehiclesData?.filter((vehicle: Vehicle) => vehicle.timestamp ?? 0 > now - 180) || [];
	}, [fetchedVehiclesData]);

	//
	// B. Handle actions

	const getVehicleById = (vehicleId: string): undefined | Vehicle => {
		return allVehiclesData?.find(vehicle => vehicle.id === vehicleId);
	};

	const getVehicleByIdGeoJsonFC = (vehicleId: string): GeoJSON.FeatureCollection | undefined => {
		const vehicle = getVehicleById(vehicleId);
		if (!vehicle) return;
		const collection = getBaseGeoJsonFeatureCollection();
		collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle));
		return collection;
	};

	const getAllVehicles = (): undefined | Vehicle[] => {
		return allVehiclesData;
	};

	const getAllVehiclesGeoJsonFC = (): GeoJSON.FeatureCollection | undefined => {
		const collection = getBaseGeoJsonFeatureCollection();
		allVehiclesData.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	const getVehiclesByLineId = (lineId: string): Vehicle[] => {
		return allVehiclesData?.filter(vehicle => vehicle.line_id === lineId) || [];
	};

	const getVehiclesByLineIdGeoJsonFC = (lineId: string): GeoJSON.FeatureCollection | undefined => {
		const vehicles = getVehiclesByLineId(lineId);
		if (!vehicles) return;
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	const getVehiclesByPatternId = (patternId: string): Vehicle[] => {
		return allVehiclesData?.filter(vehicle => vehicle.pattern_id === patternId) || [];
	};

	const getVehiclesByPatternIdGeoJsonFC = (patternId: string): GeoJSON.FeatureCollection | undefined => {
		const vehicles = getVehiclesByPatternId(patternId);
		if (!vehicles) return;
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	const getVehiclesByTripId = (tripId: string): Vehicle[] => {
		return allVehiclesData?.filter(vehicle => vehicle.trip_id === tripId) || [];
	};

	const getVehiclesByTripIdGeoJsonFC = (tripId: string): GeoJSON.FeatureCollection | undefined => {
		const vehicles = getVehiclesByTripId(tripId);
		if (!vehicles) return;
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	//
	// C. Define context value

	const contextValue: VehiclesContextState = {
		actions: {
			getAllVehicles,
			getAllVehiclesGeoJsonFC,
			getVehicleById,
			getVehicleByIdGeoJsonFC,
			// getVehicleBySearch,
			getVehiclesByLineId,
			getVehiclesByLineIdGeoJsonFC,
			getVehiclesByPatternId,
			getVehiclesByPatternIdGeoJsonFC,
			getVehiclesByTripId,
			getVehiclesByTripIdGeoJsonFC,
		},
		data: {
			vehicles: allVehiclesData || [],
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

export function transformVehicleDataIntoGeoJsonFeature(vehicleData: Vehicle): GeoJSON.Feature<GeoJSON.Point> {
	return {
		geometry: {
			coordinates: [vehicleData.lon || 0, vehicleData.lat || 0],
			type: 'Point',
		},
		properties: {
			bearing: vehicleData.bearing,
			block_id: vehicleData.block_id,
			current_status: vehicleData.current_status,
			delay: Math.floor(Date.now() / 1000) - (vehicleData.timestamp || 0),
			id: vehicleData.id,
			line_id: vehicleData.line_id,
			pattern_id: vehicleData.id,
			route_id: vehicleData.route_id,
			schedule_relationship: vehicleData.schedule_relationship,
			shift_id: vehicleData.shift_id,
			speed: vehicleData.speed,
			stop_id: vehicleData.stop_id,
			timestamp: vehicleData.timestamp,
			timeString: new Date((vehicleData.timestamp || 0) * 1000).toLocaleString(),
			trip_id: vehicleData.trip_id,
		},
		type: 'Feature',
	};
}
