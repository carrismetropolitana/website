'use client';

/* * */

import { type Line } from '@carrismetropolitana/api-types/network';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getLineDataById: (lineId: string) => Line | undefined
	}
	data: {
		lines: Line[]
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

export const LinesContextProvider = ({ children }: { children: ReactNode }) => {
	//

	//
	// A. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>(`${getPublicVariable('api_url')}/lines`, { refreshInterval: 900000 }); // 15 minutes

	//
	// B. Handle actions

	const getLineDataById = (lineId: string) => {
		return allLinesData?.find(line => line.id === lineId);
	};

	//
	// C. Define context value

	const contextValue: LinesContextState = useMemo(() => ({
		actions: {
			getLineDataById,
		},
		data: {
			lines: allLinesData || [],
		},
		flags: {
			is_loading: allLinesLoading,
		},
	}), [allLinesData, allLinesLoading]);

	//
	// D. Render components

	return (
		<LinesContext.Provider value={contextValue}>
			{children}
		</LinesContext.Provider>
	);

	//
};
