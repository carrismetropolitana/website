'use client';

/* * */

import type { GoApiResponse } from '@carrismetropolitana/website-shared-types';

import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { type HubVehicleMetadata } from '@/types/vehicles.types';
import { getMetadataVehicleIdFromPositionVehicleId } from '@/utils/vehicles.utils';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type HubVehiclePosition } from '@tmlmobilidade/go-types-public-info';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface VehiclesDetailContextState {
	data: {
		metadata: HubVehicleMetadata | null
		position: HubVehiclePosition | null
	}
	flags: {
		isLoading: boolean
	}
}

/* * */

const VehiclesDetailContext = createContext<undefined | VehiclesDetailContextState>(undefined);

export function useVehiclesDetailContext() {
	const context = useContext(VehiclesDetailContext);
	if (!context) {
		throw new Error('useVehiclesDetailContext must be used within a VehiclesDetailContextProvider');
	}
	return context;
}

/* * */

export function VehiclesDetailContextProvider({ children, vehicleId }: PropsWithChildren<{ vehicleId: null | string }>) {
	//

	//
	// A. Setup variables

	const vehiclesContext = useVehiclesContext();
	//
	// B. Fetch data

	const { data: allVehiclesMetadataResponse, isLoading: allVehiclesMetadataLoading } = useSWR<GoApiResponse<HubVehicleMetadata[]>>(`${getPublicVariable('go_api_url')}/hub/api/v1/realtime/vehicles/metadata`, { refreshInterval: 900_000 }); // 15 minutes

	//
	// C. Transform data

	const positionData = useMemo(() => {
		if (!vehicleId) return null;
		return vehiclesContext.data.vehicles.find(vehicle => vehicle.vehicle_id === vehicleId) ?? null;
	}, [vehicleId, vehiclesContext.data.vehicles]);

	const metadataData = useMemo(() => {
		if (!vehicleId || !allVehiclesMetadataResponse?.data) return null;

		const metadataVehicleId = getMetadataVehicleIdFromPositionVehicleId(vehicleId);
		return allVehiclesMetadataResponse.data.find(vehicle => vehicle.vehicle_id === metadataVehicleId) ?? null;
	}, [allVehiclesMetadataResponse?.data, vehicleId]);

	//
	// D. Define context value

	const contextValue: VehiclesDetailContextState = {
		data: {
			metadata: metadataData,
			position: positionData,
		},
		flags: {
			isLoading: vehiclesContext.flags.isLoading || allVehiclesMetadataLoading,
		},
	};

	//
	// E. Render components

	return (
		<VehiclesDetailContext.Provider value={contextValue}>
			{children}
		</VehiclesDetailContext.Provider>
	);

	//
}
