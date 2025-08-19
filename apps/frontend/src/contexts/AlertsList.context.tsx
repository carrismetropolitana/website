'use client';

/* * */

import type { AlertCause, AlertEffect, SimplifiedAlert } from '@/types/alerts.types.js';

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { DateTime } from 'luxon';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useAlertsContext } from './Alerts.context';
import { useAnalyticsContext } from './Analytics.context';

/* * */

interface AlertsListContextState {
	actions: {
		updateFilterByCause: (value: AlertCause | null) => void
		updateFilterByDate: (value: string) => void
		updateFilterByEffect: (value: AlertEffect | null) => void
		updateFilterByLineId: (value: string) => void
		updateFilterBySearchQuery: (value: string) => void
		updateFilterByStopId: (value: string) => void
		// updateFilterByMunicipalityId: (value: string) => void
	}
	counters: {
		by_date: {
			current: number
			future: number
		}
	}
	data: {
		filtered: SimplifiedAlert[]
		filtered_fc: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>
		raw: SimplifiedAlert[]
	}
	filters: {
		by_date: 'current' | 'future' | 'map'
		cause: AlertCause | null
		effect: AlertEffect | null
		line_id: null | string
		search_query: null | string
		stop_id: null | string
		// municipality_id: null | string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const AlertsListContext = createContext<AlertsListContextState | undefined>(undefined);

export function useAlertsListContext() {
	const context = useContext(AlertsListContext);
	if (!context) {
		throw new Error('useAlertsListContext must be used within a AlertsListContextProvider');
	}
	return context;
}

/* * */

export const AlertsListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataFilteredState, setDataFilteredState] = useState<SimplifiedAlert[]>([]);
	const [dataFilteredGeojsonFCState, setDataFilteredGeojsonFCState] = useState<GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>>();

	const [filterByDateState, setFilterByDateState] = useState <AlertsListContextState['filters']['by_date']>('current');
	const [filterByLineIdState, setFilterByLineIdState] = useQueryState('line_id');
	const [filterBySearchQueryState, setFilterBySearchQueryState] = useQueryState('search_query');
	const [filterByStopIdState, setFilterByStopIdState] = useQueryState('stop_id');
	const [filterByCauseState, setFilterByCauseState] = useQueryState('cause', {
		parse: (value: string) => value as AlertCause | null,
		serialize: (value: AlertCause | null) => value as string,
	});
	const [filterByEffectState, setFilterByEffectState] = useQueryState('effect', {
		parse: (value: string) => value as AlertEffect | null,
		serialize: (value: AlertEffect | null) => value as string,
	});
	// const [filterByMunicipalityIdState, setFilterByMunicipalityIdState] = useQueryState('municipality_id');

	const [isLoading] = useState(false);

	//
	// B. Fetch data

	const alertsContext = useAlertsContext();
	const analyticsContext = useAnalyticsContext();

	const allAlertsData = useMemo(() => alertsContext.data.simplified, [alertsContext.data.simplified]);

	//
	// C. Transform data

	// Set Counters
	const currentWeekAlerts = allAlertsData?.filter((item) => {
		const oneWeekFromNowInUnixSeconds = DateTime.now().plus({ week: 1 }).endOf('day').toUnixInteger();
		const alertStartDateInSeconds = DateTime.fromJSDate(item.start_date).toUnixInteger();
		// If the alert start date is before one week from now, then the alert is considered 'current'.
		return alertStartDateInSeconds <= oneWeekFromNowInUnixSeconds;
	}).length;

	const applyFiltersToData = () => {
		//

		let filterResult: SimplifiedAlert[] = allAlertsData || [];

		//
		// Filter by_date

		const oneWeekFromNowInUnixSeconds = DateTime.now().plus({ week: 1 }).endOf('day').toUnixInteger();

		filterResult = filterResult.filter((item) => {
			const alertStartDateInSeconds = DateTime.fromJSDate(item.start_date).toUnixInteger();
			//
			if (filterByDateState === 'current') {
				// If the alert start date is before one week from now, then the alert is considered 'current'.
				return alertStartDateInSeconds <= oneWeekFromNowInUnixSeconds;
			}
			else {
				// If the alert start date is after one week from now, then the alert is considered 'future'.
				// Otherwise, it is considered 'current'.
				return alertStartDateInSeconds > oneWeekFromNowInUnixSeconds;
			}
		});

		if (filterByLineIdState) {
			filterResult = filterResult.filter(alert => alert.informed_entity.some(entity => entity.line_id === filterByLineIdState));
		}

		if (filterByStopIdState) {
			filterResult = filterResult.filter(alert => alert.informed_entity.some(entity => entity.stop_id === filterByStopIdState));
		}

		// TODO: municipalityId does not exist in the informed_entity, needs to be added in API
		// if (filterByMunicipalityIdState) {
		// 	filterResult = filterResult.filter(alert => alert.informed_entity.some(entity => entity.municipalityId === filterByMunicipalityIdState));
		// }

		if (filterBySearchQueryState) {
			filterResult = filterResult.filter((alert) => {
				const searchQuery = filterBySearchQueryState.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
				return (
					alert.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchQuery)
					|| alert.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchQuery)
				);
			});
		}

		if (filterByCauseState) {
			filterResult = filterResult.filter(alert => alert.cause === filterByCauseState);
		}

		if (filterByEffectState) {
			filterResult = filterResult.filter(alert => alert.effect === filterByEffectState);
		}

		//
		// Save filter result to state
		return filterResult;

		//
	};

	useEffect(() => {
		const filteredAlerts = applyFiltersToData();
		setDataFilteredState(filteredAlerts);
	}, [allAlertsData, filterByDateState, filterByLineIdState, filterBySearchQueryState, filterByStopIdState, filterByCauseState, filterByEffectState]);

	// Transform data into geojson
	useEffect(() => {
		const collection = getBaseGeoJsonFeatureCollection();
		allAlertsData.forEach((alert) => {
			const alertFC = transformAlertDataIntoGeoJsonFeature(alert);
			if (alertFC) collection.features.push(alertFC);
		});

		setDataFilteredGeojsonFCState(collection);
	}, [allAlertsData]);

	//
	// D. Handle actions

	const updateFilterByDate = (value: AlertsListContextState['filters']['by_date']) => {
		setFilterByDateState(value);
		analyticsContext.actions.capture(ampli => ampli.alertsFilterChanged({ filter_type: 'by_date', filter_value: value || '' }));
	};

	const updateFilterByLineId = (value: AlertsListContextState['filters']['line_id']) => {
		setFilterByLineIdState(value);
		analyticsContext.actions.capture(ampli => ampli.alertsFilterChanged({ filter_type: 'by_line_id', filter_value: value || '' }));
	};

	const updateFilterByStopId = (value: AlertsListContextState['filters']['stop_id']) => {
		setFilterByStopIdState(value);
		analyticsContext.actions.capture(ampli => ampli.alertsFilterChanged({ filter_type: 'by_stop_id', filter_value: value || '' }));
	};

	const updateFilterBySearchQuery = (value: AlertsListContextState['filters']['search_query']) => {
		setFilterBySearchQueryState(value);
		analyticsContext.actions.captureWithDelay(ampli => ampli.searchAlert({ search_value: value || '' }));
	};

	const updateFilterByCause = (value: AlertsListContextState['filters']['cause']) => {
		setFilterByCauseState(value);
		analyticsContext.actions.capture(ampli => ampli.alertsFilterChanged({ filter_type: 'by_cause', filter_value: value || '' }));
	};

	const updateFilterByEffect = (value: AlertsListContextState['filters']['effect']) => {
		setFilterByEffectState(value);
		analyticsContext.actions.capture(ampli => ampli.alertsFilterChanged({ filter_type: 'by_effect', filter_value: value || '' }));
	};

	//
	// E. Define context value

	const contextValue: AlertsListContextState = {
		actions: {
			updateFilterByCause,
			updateFilterByDate,
			updateFilterByEffect,
			updateFilterByLineId,
			updateFilterBySearchQuery,
			updateFilterByStopId,
		},
		counters: {
			by_date: {
				current: currentWeekAlerts,
				future: allAlertsData.length - currentWeekAlerts,
			},
		},
		data: {
			filtered: dataFilteredState,
			filtered_fc: dataFilteredGeojsonFCState,
			raw: allAlertsData || [],
		},
		filters: {
			by_date: filterByDateState,
			cause: filterByCauseState,
			effect: filterByEffectState,
			line_id: filterByLineIdState,
			search_query: filterBySearchQueryState,
			stop_id: filterByStopIdState,
		},
		flags: {
			is_loading: isLoading,
		},
	};

	//
	// F. Render components

	return (
		<AlertsListContext.Provider value={contextValue}>
			{children}
		</AlertsListContext.Provider>
	);

	//
};

/* * */

export function transformAlertDataIntoGeoJsonFeature(alertData: SimplifiedAlert): GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> {
	if (!alertData.coordinates) return null;
	return {
		geometry: {
			coordinates: [alertData.coordinates[1], alertData.coordinates[0]],
			type: 'Point',
		},
		properties: {
			cause: alertData.cause,
			effect: alertData.effect,
			id: alertData.alert_id,
		},
		type: 'Feature',
	};
}
