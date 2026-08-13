'use client';

/* * */

import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { Vehicle } from '@carrismetropolitana/api-types/vehicles';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';

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
		filtered: Vehicle[]
		raw: Vehicle[]
		selected: null | Vehicle
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

	const [dataFilteredState, setDataFilteredState] = useState<VehiclesListContextState['data']['filtered']>([]);
	const [dataSelectedState, setDataSelectedState] = useState<VehiclesListContextState['data']['selected']>(null);

	const [filterByWheelchairState, setFilterByWheelchairState] = useQueryState('by_wheelchair', { clearOnDefault: true });
	const [filterByAgencyState, setFilterByAgencyState] = useQueryState('by_agency', { clearOnDefault: true });
	const [filterByBikesState, setByBikesState] = useQueryState('by_bikes', { clearOnDefault: true });
	const [filterByMakeAndModelState, setFilterByMakeAndModelState] = useQueryState('by_make_and_model', { clearOnDefault: true });
	const [filterBySearchState, setFilterBySearchState] = useQueryState('by_search', { clearOnDefault: true, defaultValue: '' });
	const [filterByPropulsionState, setFilterByPropulsionState] = useQueryState('by_propulsion', { clearOnDefault: true });

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult = vehiclesContext.data.vehicles || [];

		// Only include vehicles with active trips
		filterResult = filterResult.filter(item => item.trip_id);

		// Only include vehicles where timestamp is within the last 2 minutes
		const nowInUnixSeconds = new Date().getTime() / 1000;
		filterResult = filterResult.filter(item => item.timestamp && nowInUnixSeconds - item.timestamp < 120);

		// Apply the user filters

		if (filterBySearchState) {
			filterResult = filterResult.filter((item) => {
				const matchedVehicleId = item.id?.toLowerCase().includes(filterBySearchState.toLowerCase());
				const matchedLicensePlate = item.license_plate?.toLowerCase().includes(filterBySearchState.toLowerCase());
				return matchedVehicleId || matchedLicensePlate;
			});
		}

		if (filterByBikesState) {
			filterResult = filterResult.filter(item => item.bikes_allowed?.toString() === filterByBikesState);
		}

		if (filterByWheelchairState) {
			filterResult = filterResult.filter(item => item.wheelchair_accessible?.toString() === filterByWheelchairState);
		}

		if (filterByPropulsionState) {
			const propulsionValues = filterByPropulsionState.split(';').filter(Boolean);
			filterResult = filterResult.filter(item => item.propulsion && propulsionValues.includes(item.propulsion));
		}

		if (filterByAgencyState) {
			const agencyValues = filterByAgencyState.split(';').filter(Boolean);
			filterResult = filterResult.filter(item => agencyValues.includes(item.agency_id.toString()));
		}

		if (filterByMakeAndModelState) {
			const makeModelValues = filterByMakeAndModelState.split(';').filter(Boolean);
			filterResult = filterResult.filter((item) => {
				return makeModelValues.some((val) => {
					const [makeFilter, modelFilter] = val.split('-').map(s => s.trim().toLowerCase());
					const itemMake = item.make?.toLowerCase() || '';
					const itemModel = item.model?.toLowerCase() || '';
					return itemMake.includes(makeFilter) && itemModel.includes(modelFilter);
				});
			});
		}

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredVehicles = applyFiltersToData();
		setDataFilteredState(filteredVehicles);
	}, [filterBySearchState, filterByAgencyState, filterByBikesState, filterByMakeAndModelState, filterByPropulsionState, filterByWheelchairState, vehiclesContext.data.vehicles]);

	//
	// D. Handle actions

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
		const foundVehicleData = vehiclesContext.data.vehicles.find(item => item.id === vehicleId);
		setDataSelectedState(foundVehicleData || null);
	};

	useEffect(() => {
		if (!dataSelectedState) return;
		updateSelectedVehicle(dataSelectedState.id);
	}, [vehiclesContext.data.vehicles, dataSelectedState]);

	//
	// E. Define context value

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
			selected_vehicle: dataSelectedState?.id || null,
		},
		flags: {
			is_loading: vehiclesContext.flags.is_loading,
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
