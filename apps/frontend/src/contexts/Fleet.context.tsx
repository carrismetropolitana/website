'use client';

/* * */

import { type Vehicle } from '@carrismetropolitana/api-types/vehicles';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface FleetContextState {
	actions: {
		getAllActiveVehicles: () => undefined | Vehicle[]
		getAllVehicles: () => undefined | Vehicle[]
		getAllVehiclesByFilter: (filters: Partial<Vehicle>) => undefined | Vehicle[]
		getOperationalDate: () => Date
	}
	data: {
		vehicles: Vehicle[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const FleetContext = createContext<FleetContextState | undefined>(undefined);

export function useFleetContext() {
	const context = useContext(FleetContext);
	if (!context) {
		throw new Error('useFleetContext must be used within a FleetContextProvider');
	}
	return context;
}

/* * */

export const FleetContextProvider = ({ children }) => {
	//

	//
	// A. Fetch data

	const { data: fetchedVehiclesData, isLoading: allVehiclesLoading } = useSWR<Vehicle[], Error>(`${getPublicVariable('api_url')}/vehicles`, { refreshInterval: 5000 }); // 5 seconds

	const allVehiclesData = useMemo(() => {
		if (!fetchedVehiclesData) return [];
		return fetchedVehiclesData; // .filter((vehicle: Vehicle) => (vehicle.timestamp ?? 0) > now - 180); // We want ALL vehicles for our fleet page. Even those not in service/with no data
	}, [fetchedVehiclesData]);

	const allActiveVehiclesData = useMemo(() => {
		if (!fetchedVehiclesData) return [];
		const now = Date.now() / 1000;
		return fetchedVehiclesData.filter((vehicle: Vehicle) => (vehicle.timestamp ?? 0) > now - 180);
	}, [fetchedVehiclesData]);

	//
	// B. Handle actions

	const getAllVehicles = (): undefined | Vehicle[] => {
		return allVehiclesData;
	};

	const getAllActiveVehicles = (): undefined | Vehicle[] => {
		return allActiveVehiclesData;
	};

	const getAllVehiclesByFilter = (filters: Partial<Vehicle>): undefined | Vehicle[] => {
		return allVehiclesData.filter(vehicle =>
			(Object.keys(filters) as (keyof Vehicle)[])
				.every(filter => vehicle[filter] === filters[filter]),
		);
	};

	const getOperationalDate = (): Date => {
		const currentOperationalDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Lisbon' }));

		if (currentOperationalDate.getHours() < 4) {
			currentOperationalDate.setDate(currentOperationalDate.getDate() - 1); // The period between 00h00 and 03h59 falls under the previous operational date
		}

		currentOperationalDate.setHours(4, 0, 0, 0);

		return currentOperationalDate;
	};

	//
	// C. Define context value

	const contextValue: FleetContextState = {
		actions: {
			getAllActiveVehicles,
			getAllVehicles,
			getAllVehiclesByFilter,
			getOperationalDate,
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
		<FleetContext.Provider value={contextValue}>
			{children}
		</FleetContext.Provider>
	);

	//
};
