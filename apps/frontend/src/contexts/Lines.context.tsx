'use client';

/* * */

import { type CachedResource } from '@carrismetropolitana/api-types/common';
import { type ServiceMetrics } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type HubLine, type HubRoute } from '@tmlmobilidade/go-types-public-info';
import { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getLineDataById: (lineId: string) => HubLine | undefined
		getRouteDataById: (routeId: string) => HubRoute | undefined
		getServiceMetricsByLineId: (lineId: string) => ServiceMetrics[] | undefined
	}
	data: {
		lines: HubLine[]
		routes: HubRoute[]
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

	const { data: linesResponse, isLoading: allLinesLoading } = useSWR<HubLine[], Error>(`${getPublicVariable('go_api_url')}/network/lines`, { refreshInterval: 900000 }); // 15 minutes
	const { data: routesResponse, isLoading: allRoutesLoading } = useSWR<HubRoute[], Error>(`${getPublicVariable('go_api_url')}/network/routes`, { refreshInterval: 900000 }); // 15 minutes
	const { data: serviceMetricsData, isLoading: serviceMetricsLoading } = useSWR<CachedResource<ServiceMetrics[]>, Error>(`${getPublicVariable('api_url')}/metrics/service/all`, { refreshInterval: 900000 }); // 15 minutes

	//
	// B. Handle actions

	const getLineDataById = (lineId: string) => {
		if (!allLinesLoading) return;
		return linesResponse.find(line => line._id === lineId);
	};

	const getRouteDataById = (routeId: string) => {
		if (!allRoutesLoading) return;
		return routesResponse.find(route => route._id === routeId);
	};

	const getServiceMetricsByLineId = (lineId: string) => {
		if (!serviceMetricsLoading) return;
		return serviceMetricsData?.data.filter(serviceMetrics => String(serviceMetrics.line_id) === String(lineId));
	};

	//
	// C. Define context value

	const contextValue: LinesContextState = useMemo(() => ({
		actions: {
			getLineDataById,
			getRouteDataById,
			getServiceMetricsByLineId,
		},
		data: {
			lines: linesResponse,
			routes: routesResponse,
			service_metrics: serviceMetricsData?.data || [],
		},
		flags: {
			is_loading: allLinesLoading || allRoutesLoading || serviceMetricsLoading,
		},
	}), [
		linesResponse,
		allLinesLoading,
		routesResponse,
		allRoutesLoading,
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
