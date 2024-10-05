'use client';

/* * */

import type { Line } from '@/types/lines.types.js';

import { useProfileContext } from '@/contexts/Profile.context';
import { Routes } from '@/utils/routes';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface LinesContextState {
	actions: {
		getLineDataById: (lineId: string) => Line | undefined
	}
	counters: {
		favorites: number
	}
	data: {
		favorites: Line[]
		raw: Line[]
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
	// A. Setup variables

	const profileContext = useProfileContext();

	const [dataFavoritesState, setDataFavoritesState] = useState<Line[]>([]);

	//
	// B. Fetch data

	const { data: allLinesData, isLoading: allLinesLoading } = useSWR<Line[], Error>(`${Routes.API}/v2/lines`);

	//
	// C. Transform data

	useEffect(() => {
		const favoritesLinesData = allLinesData?.filter(line => profileContext.data.profile?.favorite_lines?.includes(line.line_id)) || [];
		setDataFavoritesState(favoritesLinesData);
	}, [allLinesData, profileContext.data.profile]);

	//
	// D. Handle actions

	const getLineDataById = (lineId: string) => {
		return allLinesData?.find(line => line.line_id === lineId);
	};

	//
	// E. Define context value

	const contextValue: LinesContextState = {
		actions: {
			getLineDataById,
		},
		counters: {
			favorites: profileContext.counters.favorite_lines,
		},
		data: {
			favorites: dataFavoritesState,
			raw: allLinesData || [],
		},
		flags: {
			is_loading: allLinesLoading,
		},
	};

	//
	// F. Render components

	return (
		<LinesContext.Provider value={contextValue}>
			{children}
		</LinesContext.Provider>
	);

	//
};
