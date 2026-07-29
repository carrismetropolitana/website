'use client';

import type { GoApiResponse } from '@carrismetropolitana/website-shared-types';

import { useFilterByAgencyIds } from '@/hooks/useFilterByAgencyIds';
import { type CachedResource } from '@carrismetropolitana/api-types/common';
import { type ServiceMetrics } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type HubLine, type HubRoute } from '@tmlmobilidade/go-types-public-info';
import { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';

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

	const { data: linesResponse, isLoading: allLinesLoading } = useSWR<GoApiResponse<HubLine[]>, Error>(`${getPublicVariable('go_api_url')}/hub/api/v1/network/lines`, { refreshInterval: 900000 }); // 15 minutes
	const { data: routesResponse, isLoading: allRoutesLoading } = useSWR<GoApiResponse<HubRoute[]>, Error>(`${getPublicVariable('go_api_url')}/hub/api/v1/network/routes`, { refreshInterval: 900000 }); // 15 minutes
	const { data: serviceMetricsData, isLoading: serviceMetricsLoading } = useSWR<CachedResource<ServiceMetrics[]>, Error>(`${getPublicVariable('api_url')}/metrics/service/all`, { refreshInterval: 900000 }); // 15 minutes
	const linesData = useFilterByAgencyIds(linesResponse, { dataType: 'line' }).data;
	const routesData = useFilterByAgencyIds(routesResponse, { dataType: 'route' }).data;

	//
	// B. Handle actions

	const getLineDataById = (lineId: string) => {
		return linesData.find(line => line._id === lineId);
	};

	const getRouteDataById = (routeId: string) => {
		return routesData.find(route => route._id === routeId);
	};

	const getServiceMetricsByLineId = (lineId: string) => {
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
			lines: linesData,
			routes: routesData,
			service_metrics: serviceMetricsData?.data || [],
		},
		flags: {
			is_loading: allLinesLoading || allRoutesLoading || serviceMetricsLoading,
		},
	}), [
		linesData,
		allLinesLoading,
		routesData,
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
