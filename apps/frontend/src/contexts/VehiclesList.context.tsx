'use client';

/* * */

import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehicleMetadata } from '@/hooks/useVehicleMetadata';
import { type HubVehicleMetadata } from '@/types/vehicles.types';
import { type HubVehiclePosition } from '@tmlmobilidade/go-types-public-info';
import { DateTime } from 'luxon';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/* * */

interface VehiclesListContextState {
	actions: {
		updateFilterByAgency: (values: string[]) => void
		updateFilterByBikes: (value: string) => void
		updateFilterByMakeAndModel: (values: string[]) => void
		updateFilterByPropulsion: (values: string[]) => void
		updateFilterBySearch: (value: string) => void
		updateFilterByWheelchair: (value: string) => void
		updateSelectedVehicle: (value: null | string) => void
	}
	data: {
		filtered: HubVehiclePosition[]
		metadata: HubVehicleMetadata[]
		raw: HubVehiclePosition[]
		selected: HubVehiclePosition | null
	}
	filters: {
		by_agency: null | string
		by_bikes: null | string
		by_make_and_model: null | string
		by_propulsion: null | string
		by_search: string
		by_wheelchair: null | string
		selected_vehicle: null | string
	}
	flags: {
		is_loading: boolean
	}
}

const VehiclesListContext = createContext<undefined | VehiclesListContextState>(undefined);

export function useVehiclesListContext() {
	const context = useContext(VehiclesListContext);
	if (!context) {
		throw new Error('useVehiclesListContext must be used within a VehiclesListContext');
	}
	return context;
}

export const VehiclesListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const vehiclesContext = useVehiclesContext();
	const vehicleMetadata = useVehicleMetadata();
	const getVehicleMetadata = vehicleMetadata.actions.getMetadataForVehicleId;

	const [dataSelectedState, setDataSelectedState] = useState<VehiclesListContextState['data']['selected']>(null);

	const [filterByWheelchairState, setFilterByWheelchairState] = useQueryState('by_wheelchair', { clearOnDefault: true });
	const [filterByAgencyState, setFilterByAgencyState] = useQueryState('by_agency', { clearOnDefault: true });
	const [filterByBikesState, setByBikesState] = useQueryState('by_bikes', { clearOnDefault: true });
	const [filterByMakeAndModelState, setFilterByMakeAndModelState] = useQueryState('by_make_and_model', { clearOnDefault: true });
	const [filterBySearchState, setFilterBySearchState] = useQueryState('by_search', { clearOnDefault: true, defaultValue: '' });
	const [filterByPropulsionState, setFilterByPropulsionState] = useQueryState('by_propulsion', { clearOnDefault: true });

	//
	// B. Transform data

	const dataFilteredState = useMemo(() => {
		let filterResult = vehiclesContext.data.vehicles || [];

		// Only include vehicles with active trips
		filterResult = filterResult.filter(item => item.trip_id);

		// Only include vehicles where timestamp is within the last 2 minutes
		const nowInUnixSeconds = DateTime.now().toUnixInteger();
		filterResult = filterResult.filter(item => item.received_at && nowInUnixSeconds - Math.floor(item.received_at / 1000) < 120);

		if (filterBySearchState) {
			filterResult = filterResult.filter((item) => {
				const metadata = getVehicleMetadata(item.vehicle_id);
				const matchedVehicleId = item.vehicle_id?.toLowerCase().includes(filterBySearchState.toLowerCase());
				const matchedTripId = item.trip_id?.toLowerCase().includes(filterBySearchState.toLowerCase());
				const matchedLicensePlate = metadata?.license_plate?.toLowerCase().includes(filterBySearchState.toLowerCase());
				return matchedVehicleId || matchedTripId || matchedLicensePlate;
			});
		}

		if (filterByBikesState) {
			filterResult = filterResult.filter((item) => {
				const metadata = getVehicleMetadata(item.vehicle_id);
				return String(metadata?.bicycles) === filterByBikesState;
			});
		}

		if (filterByWheelchairState) {
			filterResult = filterResult.filter((item) => {
				const metadata = getVehicleMetadata(item.vehicle_id);
				return String(metadata?.wheelchair) === filterByWheelchairState;
			});
		}

		if (filterByPropulsionState) {
			const propulsionValues = filterByPropulsionState.split(';').filter(Boolean);
			filterResult = filterResult.filter((item) => {
				const metadata = getVehicleMetadata(item.vehicle_id);
				return metadata?.propulsion && propulsionValues.includes(metadata.propulsion);
			});
		}

		if (filterByAgencyState) {
			const agencyValues = filterByAgencyState.split(';').filter(Boolean);
			filterResult = filterResult.filter(item => agencyValues.includes(item.agency_id.toString()));
		}

		if (filterByMakeAndModelState) {
			const makeModelValues = filterByMakeAndModelState.split(';').filter(Boolean);
			filterResult = filterResult.filter((item) => {
				const metadata = getVehicleMetadata(item.vehicle_id);
				if (!metadata?.make || !metadata?.model) return false;
				return makeModelValues.includes(`${metadata.make}-${metadata.model}`);
			});
		}

		return filterResult;
	}, [
		filterByAgencyState,
		filterByBikesState,
		filterByMakeAndModelState,
		filterByPropulsionState,
		filterBySearchState,
		filterByWheelchairState,
		getVehicleMetadata,
		vehiclesContext.data.vehicles,
	]);

	//
	// C. Handle actions

	const updateFilterBySearch = (value: string) => {
		setFilterBySearchState(value);
	};

	const updateFilterByAgency = (values: string[]) => {
		if (values.length === 0) setFilterByAgencyState(null);
		else setFilterByAgencyState(values.sort((a, b) => a.localeCompare(b)).join(';'));
	};

	const updateFilterByBikes = (value: string) => {
		setByBikesState(value);
	};

	const updateFilterByWheelchair = (value: string) => {
		setFilterByWheelchairState(value);
	};

	const updateFilterByMakeAndModel = (values: string[]) => {
		if (values.length === 0) setFilterByMakeAndModelState(null);
		else setFilterByMakeAndModelState(values.sort((a, b) => a.localeCompare(b)).join(';'));
	};

	const updateFilterByPropulsion = (values: string[]) => {
		if (values.length === 0) setFilterByPropulsionState(null);
		else setFilterByPropulsionState(values.sort((a, b) => a.localeCompare(b)).join(';'));
	};

	const updateSelectedVehicle = (vehicleId: null | string) => {
		if (!vehicleId) setDataSelectedState(null);
		if (!vehiclesContext.data.vehicles) return;
		const foundVehicleData = vehiclesContext.data.vehicles.find(item => item.vehicle_id === vehicleId);
		setDataSelectedState(foundVehicleData || null);
	};

	useEffect(() => {
		if (!dataSelectedState) return;
		updateSelectedVehicle(dataSelectedState.vehicle_id);
	}, [vehiclesContext.data.vehicles, dataSelectedState]);

	//
	// D. Define context value

	const contextValue: VehiclesListContextState = {
		actions: {
			updateFilterByAgency,
			updateFilterByBikes,
			updateFilterByMakeAndModel,
			updateFilterByPropulsion,
			updateFilterBySearch,
			updateFilterByWheelchair,
			updateSelectedVehicle,
		},
		data: {
			filtered: dataFilteredState,
			metadata: vehicleMetadata.data.metadata,
			raw: vehiclesContext.data.vehicles || [],
			selected: dataSelectedState,
		},
		filters: {
			by_agency: filterByAgencyState,
			by_bikes: filterByBikesState,
			by_make_and_model: filterByMakeAndModelState,
			by_propulsion: filterByPropulsionState,
			by_search: filterBySearchState,
			by_wheelchair: filterByWheelchairState,
			selected_vehicle: dataSelectedState?.vehicle_id || null,
		},
		flags: {
			is_loading: vehiclesContext.flags.isLoading || vehicleMetadata.flags.isLoading,
		},
	};

	//
	// F. Render components

	return (
		<VehiclesListContext.Provider value={contextValue}>
			{children}
		</VehiclesListContext.Provider>
	);

	//
};
