'use client';

/* * */

import type { Line, Pattern, Route } from '@/types/lines.types.js';

import { useProfileContext } from '@/contexts/Profile.context';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface LinesSingleContextState {
	actions: {
		none: () => void
	}
	data: {
		line: Line | null
		pattern: Pattern | null
		route: Route | null
		timetable: string
	}
	filters: {
		none: null | string
	}
	flags: {
		is_favorite: boolean
		is_loading: boolean
	}
}

/* * */

const LinesSingleContext = createContext<LinesSingleContextState | undefined>(undefined);

export function useLinesSingleContext() {
	const context = useContext(LinesSingleContext);
	if (!context) {
		throw new Error('useLinesSingleContext must be used within a LinesSingleContextProvider');
	}
	return context;
}

/* * */

export const LinesSingleContextProvider = ({ children, lineId }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<boolean>(false);

	//
	// B. Fetch data

	const { data: lineData, isLoading: lineLoading } = useSWR<Line, Error>(`https://api.carrismetropolitana.pt/v2/lines/${lineId}`);
	const { data: routeData, isLoading: routeLoading } = useSWR<Route, Error>(`https://api.carrismetropolitana.pt/v2/routes/${lineId}`);
	const { data: patternData, isLoading: patternLoading } = useSWR<Pattern, Error>(`https://api.carrismetropolitana.pt/v2/patterns/${lineId}`);

	//
	// C. Transform data

	useEffect(() => {
		setFlagIsFavoriteState(profileContext.data.favorite_lines?.includes(lineId) ? true : false);
	}, [profileContext.data.favorite_lines, lineId]);

	//
	// D. Handle actions

	// const getLinePatternsDataByLineId = (lineId: string) => {
	// 	const lineData = getLineDataByLineId(lineId);
	// 	if (!lineData) return null;
	// 	return lineData.pattern_ids
	// 		.map((patternId) => {
	// 			const { data: patternData } = useSWR<Pattern>(`https://api.carrismetropolitana.pt/v2/patterns/${patternId}`);
	// 			return patternData;
	// 		})
	// 		.filter(item => item !== null && item !== undefined);
	// };

	//
	// E. Define context value

	const contextValue: LinesSingleContextState = {
		actions: {
			none: () => { /**/ },
		},
		data: {
			line: lineData || null,
			pattern: patternData || null,
			route: routeData || null,
			timetable: '',
		},
		filters: {
			none: null,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_loading: lineLoading || routeLoading || patternLoading,
		},
	};

	//
	// F. Render components

	return (
		<LinesSingleContext.Provider value={contextValue}>
			{children}
		</LinesSingleContext.Provider>
	);

	//
};
