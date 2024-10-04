'use client';

/* * */

import type { Vehicle } from '@/types/vehicles.types';

import { useProfileContext } from '@/contexts/Profile.context';
import { Routes } from '@/utils/routes';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface VehiclesContextState {
	actions: {
		getVehicleById: (vehicleId: string) => undefined | Vehicle
		getVehiclesByLineId: (tripId: string) => Vehicle[]
		getVehiclesByPatternId: (tripId: string) => Vehicle[]
		getVehiclesByTripId: (tripId: string) => Vehicle[]
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

	const { data: allVehiclesData, isLoading: allVehiclesLoading } = useSWR<Vehicle[], Error>(`${Routes.API}/v2/stops`, { refreshInterval: 3000 });

	//
	// B. Handle actions

	const getVehicleById = (vehicleId: string) => {
		return allVehiclesData?.find(vehicle => vehicle.id === vehicleId);
	};

	const getVehiclesByLineId = (lineId: string) => {
		return allVehiclesData?.filter(vehicle => vehicle.line_id === lineId) || [];
	};

	const getVehiclesByPatternId = (patternId: string) => {
		return allVehiclesData?.filter(vehicle => vehicle.pattern_id === patternId) || [];
	};

	const getVehiclesByTripId = (tripId: string) => {
		return allVehiclesData?.filter(vehicle => vehicle.trip_id === tripId) || [];
	};

	//
	// C. Define context value

	const contextValue: VehiclesContextState = {
		actions: {
			getVehicleById,
			getVehiclesByLineId,
			getVehiclesByPatternId,
			getVehiclesByTripId,
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
