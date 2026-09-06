'use client';

/* * */

import type { GoApiResponse } from '@carrismetropolitana/website-shared-types';

import { useFilterByAgencyIds } from '@/hooks/useFilterByAgencyIds';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type HubV1ApiLine } from '@tmlmobilidade/go-types-hub';
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getLineDataById: (lineId: string) => HubV1ApiLine | undefined
	}
	data: {
		lines: HubV1ApiLine[]
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

	const { data: allLinesResponse, isLoading: allLinesLoading } = useSWR<GoApiResponse<HubV1ApiLine[]>, Error>(`${getPublicVariable('go_api_url')}/hub/api/v1/network/lines`, { refreshInterval: 900000 }); // 15 minutes
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
