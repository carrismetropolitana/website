'use client';

/* * */

import { type CachedResource } from '@carrismetropolitana/api-types/common';
import { type DemandMetricsByLine, type ServiceMetrics } from '@carrismetropolitana/api-types/metrics';
import { type Line, type Route } from '@carrismetropolitana/api-types/network';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getDemandMetricsByLineId: (lineId: string) => DemandMetricsByLine | undefined
		getLineDataById: (lineId: string) => Line | undefined
		getRouteDataById: (routeId: string) => Route | undefined
		getServiceMetricsByLineId: (lineId: string) => ServiceMetrics[] | undefined
	}
	data: {
		demand_metrics: DemandMetricsByLine[]
		lines: Line[]
		routes: Route[]
		service_metrics: ServiceMetrics[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const LinesContext = createContext<LinesContextState | undefined>(undefined);

export function useLinesContext() {
	const context = useContext(LinesContext);
	if (!context) {
		throw new Error('useLinesContext must be used within a LinesContextProvider');
	}
	return context;
}

/* * */

export const LinesContextProvider = ({ children }) => {
	//

	//
	// A. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>(`${getPublicVariable('api_url')}/lines`, { refreshInterval: 900000 }); // 15 minutes
	const { data: allRoutesData, isLoading: allRoutesLoading } = useSWR<Route[], Error>(`${getPublicVariable('api_url')}/routes`, { refreshInterval: 900000 }); // 15 minutes
	const { data: demandByLineData, isLoading: demandByLineDataLoading } = useSWR<DemandMetricsByLine[], Error>(`${getPublicVariable('api_url')}/metrics/demand/by_line`, { refreshInterval: 300000 }); // 5 minutes
	const { data: serviceMetricsData, isLoading: serviceMetricsLoading } = useSWR<CachedResource<ServiceMetrics[]>, Error>(`${getPublicVariable('api_url')}/metrics/service/all`, { refreshInterval: 900000 }); // 15 minutes

	//
	// B. Handle actions

	const getLineDataById = (lineId: string) => {
		return allLinesData?.find(line => line.id === lineId);
	};

	const getRouteDataById = (routeId: string) => {
		return allRoutesData?.find(route => route.id === routeId);
	};

	const getDemandMetricsByLineId = (lineId: string) => {
		return demandByLineData?.find(demandMetrics => demandMetrics.line_id === lineId);
	};

	const getServiceMetricsByLineId = (lineId: string) => {
		return serviceMetricsData?.data.filter(serviceMetrics => String(serviceMetrics.line_id) === String(lineId));
	};

	//
	// C. Define context value

	const contextValue: LinesContextState = useMemo(() => ({
		actions: {
			getDemandMetricsByLineId,
			getLineDataById,
			getRouteDataById,
			getServiceMetricsByLineId,
		},
		data: {
			demand_metrics: demandByLineData || [],
			lines: allLinesData || [],
			routes: allRoutesData || [],
			service_metrics: serviceMetricsData?.data || [],
		},
		flags: {
			is_loading: allLinesLoading || allRoutesLoading || demandByLineDataLoading || serviceMetricsLoading,
		},
	}), [
		allLinesData,
		allLinesLoading,
		allRoutesData,
		allRoutesLoading,
		demandByLineData,
		demandByLineDataLoading,
		serviceMetricsData,
		serviceMetricsLoading,
	]);

	//
	// D. Render components

	return (
		<LinesContext.Provider value={contextValue}>
			{children}
		</LinesContext.Provider>
	);

	//
};
