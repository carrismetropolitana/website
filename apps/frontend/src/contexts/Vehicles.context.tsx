'use client';

import { useVehicleMetadata } from '@/hooks/useVehicleMetadata';
import { CARRIS_METROPOLITANA_AGENCY_IDS, getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { getBaseGeoJsonFeatureCollection } from '@tmlmobilidade/geo';
import { type HubV1ApiVehiclePosition } from '@tmlmobilidade/go-types-hub';
import { DateTime } from 'luxon';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import useSWR from 'swr';

interface VehiclesContextState {
	actions: {
		getVehicleById: (vehicleId: string) => HubV1ApiVehiclePosition | undefined
		getVehicleByIdGeoJsonFC: (vehicleId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByLineId: (lineId: string) => HubV1ApiVehiclePosition[]
		getVehiclesByLineIdGeoJsonFC: (lineId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByPatternId: (patternId: string) => HubV1ApiVehiclePosition[]
		getVehiclesByPatternIdGeoJsonFC: (patternId: string) => GeoJSON.FeatureCollection | undefined
		getVehiclesByTripId: (tripId: string) => HubV1ApiVehiclePosition[]
		getVehiclesByTripIdGeoJsonFC: (tripId: string) => GeoJSON.FeatureCollection | undefined
	}
	data: {
		fc: GeoJSON.FeatureCollection
		vehicles: HubV1ApiVehiclePosition[]
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

export const VehiclesContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Fetch data

	const vehicleMetadata = useVehicleMetadata();
	const getVehicleMetadata = vehicleMetadata.actions.getMetadataForVehicleId;
	const { data: allVehiclesPositionsResponse, isLoading: allVehiclesPositionsLoading } = useSWR<{ data: HubV1ApiVehiclePosition[] }>(`${getPublicVariable('go_api_url')}/hub/api/v1/vehicles/positions`, { refreshInterval: 5_000 }); // 5 seconds

	const allVehiclesData = useMemo(() => {
		if (!allVehiclesPositionsResponse?.data) return [];
		const now = DateTime.now().toUnixInteger();
		return allVehiclesPositionsResponse.data.filter((vehicle) => {
			if (!(CARRIS_METROPOLITANA_AGENCY_IDS as readonly string[]).includes(String(vehicle.agency_id))) return false;
			if (Math.floor((vehicle.received_at ?? 0) / 1000) <= now - 180) return false;
			if (!Number.isFinite(vehicle.latitude) || !Number.isFinite(vehicle.longitude)) return false;
			if (vehicle.latitude < 38 || vehicle.latitude > 39.5) return false;
			if (vehicle.longitude < -10 || vehicle.longitude > -8) return false;
			return true;
		});
	}, [allVehiclesPositionsResponse?.data]);

	//
	// B. Transform data

	const vehiclesGeoJsonFeatureCollection = useMemo(() => {
		const collection = getBaseGeoJsonFeatureCollection();
		allVehiclesData.forEach((vehicle) => {
			const contactless = getVehicleMetadata(vehicle.vehicle_id)?.contactless ?? false;
			collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle, contactless));
		});
		return collection;
	}, [allVehiclesData, getVehicleMetadata]);

	//
	// B. Handle actions

	const getVehicleById = (vehicleId: string): HubV1ApiVehiclePosition | undefined => {
		return allVehiclesData.find(vehicle => vehicle.vehicle_id === vehicleId || vehicle._id === vehicleId);
	};

	const getVehicleByIdGeoJsonFC = (vehicleId: string): GeoJSON.FeatureCollection | undefined => {
		const vehicle = getVehicleById(vehicleId);
		if (!vehicle) return;
		const contactless = getVehicleMetadata(vehicle.vehicle_id)?.contactless ?? false;
		const collection = getBaseGeoJsonFeatureCollection();
		collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle, contactless));
		return collection;
	};

	const getVehiclesByLineId = (lineId: string): HubV1ApiVehiclePosition[] => {
		return allVehiclesData.filter(vehicle => vehicle.route_short_name === lineId);
	};

	const getVehiclesByLineIdGeoJsonFC = (lineId: string): GeoJSON.FeatureCollection | undefined => {
		const vehicles = getVehiclesByLineId(lineId);
		if (!vehicles) return;
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach((vehicle) => {
			const contactless = getVehicleMetadata(vehicle.vehicle_id)?.contactless ?? false;
			collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle, contactless));
		});
		return collection;
	};

	const getVehiclesByPatternId = (patternId: string): HubV1ApiVehiclePosition[] => {
		return allVehiclesData.filter(vehicle => vehicle.pattern_id === patternId);
	};

	const getVehiclesByPatternIdGeoJsonFC = (patternId: string) => {
		const vehicles = getVehiclesByPatternId(patternId);
		if (!vehicles) return;
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach((vehicle) => {
			const contactless = getVehicleMetadata(vehicle.vehicle_id)?.contactless ?? false;
			collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle, contactless));
		});
		return collection;
	};

	const getVehiclesByTripId = (tripId: string): HubV1ApiVehiclePosition[] => {
		// Exact match first. Schedule trip_ids and vehicle trip_ids often differ by
		// calendar/service segment (e.g. …|7|2|1100 vs …|1|1|1100) while sharing the
		// same pattern + start time — fall back to that key when needed.
		const exactMatches = allVehiclesData.filter(vehicle => vehicle.trip_id === tripId);
		if (exactMatches.length > 0) return exactMatches;

		const matchKey = getTripIdMatchKey(tripId);
		if (!matchKey) return [];

		return allVehiclesData.filter((vehicle) => {
			if (!vehicle.trip_id) return false;
			return getTripIdMatchKey(vehicle.trip_id) === matchKey;
		});
	};

	const getVehiclesByTripIdGeoJsonFC = (tripId: string) => {
		const vehicles = getVehiclesByTripId(tripId);
		if (!vehicles) return;
		const collection = getBaseGeoJsonFeatureCollection();
		vehicles.forEach((vehicle) => {
			const contactless = getVehicleMetadata(vehicle.vehicle_id)?.contactless ?? false;
			collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle, contactless));
		});
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
			vehicles: allVehiclesData,
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

/**
 * Build a stable key for matching schedule vs realtime trip IDs.
 * Trip IDs look like `[PCN1R][BNA17]2794_0_1|7|2|1100` — strip leading `[…]`
 * tags, then keep `{pattern_id}|{start_time}` (first and last `|` segments).
 */
export function getTripIdMatchKey(tripId: string): null | string {
	const core = tripId.replace(/^(\[[^\]]+\])+/, '');
	const parts = core.split('|');
	if (parts.length < 2 || !parts[0] || !parts[parts.length - 1]) return null;
	return `${parts[0]}|${parts[parts.length - 1]}`;
}

/* * */

export function transformVehicleDataIntoGeoJsonFeature(vehicleData: HubV1ApiVehiclePosition, contactless = false): GeoJSON.Feature<GeoJSON.Point> {
	const receivedAt = vehicleData.received_at || 0;

	return {
		geometry: {
			coordinates: [vehicleData.longitude, vehicleData.latitude],
			type: 'Point',
		},
		id: String(vehicleData.vehicle_id),
		properties: {
			bearing: vehicleData.bearing,
			contactless,
			current_status: vehicleData.current_status,
			delay: Math.floor((Date.now() - receivedAt) / 1000),
			id: vehicleData.vehicle_id,
			line_id: vehicleData.route_short_name,
			pattern_id: vehicleData.pattern_id,
			shape_id: vehicleData.shape_id,
			speed: vehicleData.speed,
			stop_id: vehicleData.stop_id,
			timeString: receivedAt ? new Date(receivedAt).toLocaleString() : '',
			trip_id: vehicleData.trip_id,
			vehicle_id: vehicleData.vehicle_id,
		},
		type: 'Feature',
	};
}
