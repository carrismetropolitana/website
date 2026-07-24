'use client';

/* * */

import type { GoApiResponse } from '@carrismetropolitana/website-shared-types';

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings'; ;
import { useFilterByAgencyIds } from '@/hooks/useFilterByAgencyIds';
import { type HubLine } from '@tmlmobilidade/go-types-public-info';
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getLineDataById: (lineId: string) => HubLine | undefined
	}
	data: {
		lines: HubLine[]
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

	const { data: allLinesResponse, isLoading: allLinesLoading } = useSWR<GoApiResponse<HubLine[]>, Error>(`${getPublicVariable('go_api_url')}/hub/api/v1/network/lines`, { refreshInterval: 900000 }); // 15 minutes
	const allLinesData = useFilterByAgencyIds(allLinesResponse, { dataType: 'line' }).data;

	//
	// B. Handle actions

	const getLineDataById = (lineId: string) => {
		return allLinesData?.find(line => line._id === lineId);
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
