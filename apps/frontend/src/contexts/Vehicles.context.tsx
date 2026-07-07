'use client';

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { CARRIS_METROPOLITANA_AGENCY_IDS, CarrisMetropolitanaAgencyId } from '@carrismetropolitana/website-shared-settings';
import { API_ROUTES } from '@tmlmobilidade/consts';
import { type HubVehiclePosition } from '@tmlmobilidade/go-types-public-info';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface VehiclesContextState {
	actions: {
		getVehicleById: (vehicleId: string) => HubVehiclePosition | undefined
		getVehicleByIdGeoJsonFC: (vehicleId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByLineId: (lineId: string) => HubVehiclePosition[]
		getVehiclesByLineIdGeoJsonFC: (lineId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByPatternId: (patternId: string) => HubVehiclePosition[]
		getVehiclesByPatternIdGeoJsonFC: (patternId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByTripId: (tripId: string) => HubVehiclePosition[]
		getVehiclesByTripIdGeoJsonFC: (tripId: string) => GeoJSON.FeatureCollection | undefined
	}
	data: {
		fc: GeoJSON.FeatureCollection
		vehicles: HubVehiclePosition[]
	}
	flags: {
		isLoading: boolean
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

export function VehiclesContextProvider({ children }: PropsWithChildren) {
	//

	//
	// A. Fetch data

	const { data: allVehiclesPositionsData, isLoading: allVehiclesPositionsLoading } = useSWR<HubVehiclePosition[], Error>({ credentials: 'omit', url: API_ROUTES.hub.REALTIME_VEHICLES_POSITIONS }, { refreshInterval: 5_000 }); // 5 seconds

	//
	// B. Transform data

	const vehiclesGeoJsonFeatureCollection = useMemo(() => {
		const collection = getBaseGeoJsonFeatureCollection();
		allVehiclesPositionsData?.forEach((vehicle) => {
			// Skip if vehicle position is not from an allowed agency
			if (!CARRIS_METROPOLITANA_AGENCY_IDS.includes(vehicle.agency_id as CarrisMetropolitanaAgencyId)) return;
			// Add the vehicle position to the collection
			collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle));
		});
		return collection;
	}, [allVehiclesPositionsData]);

	//
	// B. Handle actions

	const getVehicleById = (vehicleId: string): HubVehiclePosition | undefined => {
		return allVehiclesPositionsData?.find(vehicle => vehicle._id === vehicleId);
	};

	const getVehicleByIdGeoJsonFC = (vehicleId: string): GeoJSON.FeatureCollection | undefined => {
		const vehicle = getVehicleById(vehicleId);
		if (!vehicle) return;
		const collection = getBaseGeoJsonFeatureCollection();
		collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle));
		return collection;
	};

	const getVehiclesByLineId = (lineId: string): HubVehiclePosition[] => {
		return allVehiclesPositionsData?.filter(vehicle => vehicle.trip_id === lineId) || [];
	};

	const getVehiclesByLineIdGeoJsonFC = (lineId: string): GeoJSON.FeatureCollection | undefined => {
		const vehicles = getVehiclesByLineId(lineId);
		if (!vehicles) return;
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	const getVehiclesByPatternId = (patternId: string): HubVehiclePosition[] => {
		return allVehiclesPositionsData?.filter(vehicle => vehicle.trip_id === patternId) || [];
	};

	const getVehiclesByPatternIdGeoJsonFC = (patternId: string) => {
		const vehicles = getVehiclesByPatternId(patternId);
		if (!vehicles) return;
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach(vehicle => collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle)));
		return collection;
	};

	const getVehiclesByTripId = (tripId: string): HubVehiclePosition[] => {
		return allVehiclesPositionsData?.filter(vehicle => vehicle.trip_id === tripId) || [];
	};

	const getVehiclesByTripIdGeoJsonFC = (tripId: string) => {
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
			getVehicleById,
			getVehicleByIdGeoJsonFC,
			getVehiclesByLineId,
			getVehiclesByLineIdGeoJsonFC,
			getVehiclesByPatternId,
			getVehiclesByPatternIdGeoJsonFC,
			getVehiclesByTripId,
			getVehiclesByTripIdGeoJsonFC,
		},
		data: {
			fc: vehiclesGeoJsonFeatureCollection,
			vehicles: allVehiclesPositionsData || [],
		},
		flags: {
			isLoading: allVehiclesPositionsLoading,
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

export function transformVehicleDataIntoGeoJsonFeature(vehicleData: HubVehiclePosition): GeoJSON.Feature<GeoJSON.Point, HubVehiclePosition> {
	return {
		geometry: {
			coordinates: [vehicleData.longitude || 0, vehicleData.latitude || 0],
			type: 'Point',
		},
		id: String(vehicleData.vehicle_id),
		properties: vehicleData,
		type: 'Feature',
	};
}
