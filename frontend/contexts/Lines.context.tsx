'use client';

/* * */

import type { Line, Route } from '@/types/lines.types.js';

import { Routes } from '@/utils/routes';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getLineDataById: (lineId: string) => Line | undefined
		getRouteDataById: (routeId: string) => Route | undefined
	}
	data: {
		lines: Line[]
		routes: Route[]
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

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>(`${Routes.API}/lines`);
	const { data: allRoutesData, isLoading: allRoutesLoading } = useSWR<Route[], Error>(`${Routes.API}/routes`);

	//
	// B. Handle actions

	const getLineDataById = (lineId: string) => {
		return allLinesData?.find(line => line.id === lineId);
	};

	const getRouteDataById = (routeId: string) => {
		return allRoutesData?.find(route => route.id === routeId);
	};

	//
	// C. Define context value

	const contextValue: LinesContextState = {
		actions: {
			getLineDataById,
			getRouteDataById,
		},
		data: {
			lines: allLinesData || [],
			routes: allRoutesData || [],
		},
		flags: {
			is_loading: allLinesLoading || allRoutesLoading,
		},
	};

	//
	// D. Render components

	return (
		<LinesContext.Provider value={contextValue}>
			{children}
		</LinesContext.Provider>
	);

	//
};
