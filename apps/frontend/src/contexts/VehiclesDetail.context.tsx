'use client';

/* * */

import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehicleMetadata } from '@/hooks/useVehicleMetadata';
import { type HubVehicleMetadata } from '@/types/vehicles.types';
import { type HubVehiclePosition } from '@tmlmobilidade/go-types-public-info';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';

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
	const vehicleMetadata = useVehicleMetadata();
	const getVehicleMetadata = vehicleMetadata.actions.getMetadataForVehicleId;

	//
	// B. Transform data

	const positionData = useMemo(() => {
		if (!vehicleId) return null;
		return vehiclesContext.data.vehicles.find(vehicle => vehicle.vehicle_id === vehicleId) ?? null;
	}, [vehicleId, vehiclesContext.data.vehicles]);

	const metadataData = useMemo(() => {
		if (!vehicleId) return null;
		return getVehicleMetadata(vehicleId) ?? null;
	}, [getVehicleMetadata, vehicleId]);

	//
	// C. Define context value

	const contextValue: VehiclesDetailContextState = {
		data: {
			metadata: metadataData,
			position: positionData,
		},
		flags: {
			isLoading: vehiclesContext.flags.isLoading || vehicleMetadata.flags.isLoading,
		},
	};

	//
	// D. Render components

	return (
		<VehiclesDetailContext.Provider value={contextValue}>
			{children}
		</VehiclesDetailContext.Provider>
	);

	//
}
