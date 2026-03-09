'use client';

/* * */

import { useFleetContext } from '@/contexts//Fleet.context';
import { Vehicle } from '@carrismetropolitana/api-types/vehicles';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface FleetListContextState {
	actions: {
		updateFilterByAgency: (values: string[]) => void
		updateFilterByBikes: (value: string) => void
		updateFilterByContactless: (value: string) => void
		updateFilterByMakeAndModel: (values: string[]) => void
		updateFilterByPropulsion: (values: string[]) => void
		updateFilterBySearch: (value: string) => void
		updateFilterByVehicleState: (value: string) => void
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
		by_contactless: null | string
		by_make_and_model: null | string
		by_propulsion: null | string
		by_search: string
		by_vehicle_state: null | string
		by_wheelchair: null | string
		selected_vehicle: null | string
	}
	flags: {
		is_loading: boolean
	}
}

const FleetListContext = createContext<FleetListContextState | undefined>(undefined);

export function useFleetListContext() {
	const context = useContext(FleetListContext);
	if (!context) {
		throw new Error('useFleetListContext must be used within a VehiclesListContext');
	}
	return context;
}

export const FleetListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const fleetContext = useFleetContext();

	const [dataFilteredState, setDataFilteredState] = useState<FleetListContextState['data']['filtered']>([]);
	const [dataSelectedState, setDataSelectedState] = useState<FleetListContextState['data']['selected']>(null);

	const [filterByWheelchairState, setFilterByWheelchairState] = useQueryState('by_wheelchair', { clearOnDefault: true });
	const [filterByAgencyState, setFilterByAgencyState] = useQueryState('by_agency', { clearOnDefault: true });
	const [filterByBikesState, setByBikesState] = useQueryState('by_bikes', { clearOnDefault: true });
	const [filterByContactlessState, setByContactlessState] = useQueryState('by_contactless', { clearOnDefault: true });
	const [filterByMakeAndModelState, setFilterByMakeAndModelState] = useQueryState('by_make_and_model', { clearOnDefault: true });
	const [filterBySearchState, setFilterBySearchState] = useQueryState('by_search', { clearOnDefault: true, defaultValue: '' });
	const [filterByVehicleState, setFilterByVehicleState] = useQueryState('by_vehicle_state', { clearOnDefault: true, defaultValue: '' });

	const [filterByPropulsionState, setFilterByPropulsionState] = useQueryState('by_propulsion', { clearOnDefault: true });

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult = fleetContext.data.vehicles || [];

		// Apply the user filters

		const nowInUnixSeconds = new Date().getTime() / 1000;

		const operationalDayInUnixSeconds = fleetContext.actions.getOperationalDate().getTime() / 1000;

		if (filterByVehicleState) {
			switch (filterByVehicleState) {
				case 'active':
					filterResult = filterResult.filter(item => item.timestamp && nowInUnixSeconds - item.timestamp < 120);
					break;
				case 'active_1h':
					filterResult = filterResult.filter(item => item.timestamp && nowInUnixSeconds - item.timestamp < 3600);
					break;
				case 'active_7d':
					filterResult = filterResult.filter(item => item.timestamp && nowInUnixSeconds - item.timestamp < 604_800);
					break;
				case 'active_today':
					filterResult = filterResult.filter(item => item.timestamp && item.timestamp >= operationalDayInUnixSeconds);
					break;
				case 'inactive':
					filterResult = filterResult.filter(item => !item.trip_id || (item.timestamp && nowInUnixSeconds - item.timestamp >= 604_800));
					break;
				case 'no_data':
					filterResult = filterResult.filter(item => !item.trip_id);
					break;
				case 'no_service':
					filterResult = filterResult.filter(item => item.timestamp && nowInUnixSeconds - item.timestamp >= 120);
					break;
			}
		}

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

		if (filterByContactlessState) {
			filterResult = filterResult.filter(item => (item.contactless || false).toString() === filterByContactlessState);
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
					const [makeFilter, modelFilter] = val.split('-').map(s => s.trim().toLowerCase()); // Mercedes-Benz has a dash in the middle. Make/Model is formated as 'MAKE - MODEL' so its safe to include a space before/after the check
					const itemMake = item.make?.toLowerCase().replaceAll('-', '') || ''; // discards dashes in the make/model, to be inline with the makeFilter/modelFilter.
					const itemModel = item.model?.toLowerCase().replaceAll('-', '') || '';
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
	}, [filterBySearchState, filterByAgencyState, filterByBikesState, filterByVehicleState, filterByContactlessState, filterByMakeAndModelState, filterByPropulsionState, filterByWheelchairState, fleetContext.data.vehicles]);

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

	const updateFilterByContactless = (value: string) => {
		setByContactlessState(value);
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
		if (!fleetContext.data.vehicles) return;
		const foundVehicleData = fleetContext.data.vehicles.find(item => item.id === vehicleId);
		setDataSelectedState(foundVehicleData || null);
	};

	const updateFilterByVehicleState = (value: string) => {
		setFilterByVehicleState(value || null);
	};

	useEffect(() => {
		if (!dataSelectedState) return;
		updateSelectedVehicle(dataSelectedState.id);
	}, [fleetContext.data.vehicles, dataSelectedState]);

	//
	// E. Define context value

	const contextValue: FleetListContextState = {
		actions: {
			updateFilterByAgency,
			updateFilterByBikes,
			updateFilterByContactless,
			updateFilterByMakeAndModel,
			updateFilterByPropulsion,
			updateFilterBySearch,
			updateFilterByVehicleState,
			updateFilterByWheelchair,
			updateSelectedVehicle,
		},
		data: {
			filtered: dataFilteredState,
			raw: fleetContext.data.vehicles || [],
			selected: dataSelectedState,
		},
		filters: {
			by_agency: filterByAgencyState,
			by_bikes: filterByBikesState,
			by_contactless: filterByContactlessState,
			by_make_and_model: filterByMakeAndModelState,
			by_propulsion: filterByPropulsionState,
			by_search: filterBySearchState,
			by_vehicle_state: filterByVehicleState,
			by_wheelchair: filterByWheelchairState,
			selected_vehicle: dataSelectedState?.id || null,
		},
		flags: {
			is_loading: fleetContext.flags.is_loading,
		},
	};

	//
	// F. Render components

	return (
		<FleetListContext.Provider value={contextValue}>
			{children}
		</FleetListContext.Provider>
	);

	//
};
