'use client';

/* * */

import type { Line, Stop } from '@carrismetropolitana/api-types/network';

import { useLinesContext } from '@/contexts/Lines.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface ProfileListContextState {
	actions: {
		updateFilterByCurrentView: (value: string) => void
	}
	counters: {
		favorites: number
	}
	data: {
		favorite_lines: Line[]
		favorite_stops: Stop[]
	}
	filters: {
		by_current_view: 'lines' | 'stops'
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const ProfileListContext = createContext<ProfileListContextState | undefined>(undefined);

export function useProfileListContext() {
	const context = useContext(ProfileListContext);
	if (!context) {
		throw new Error('useProfileListContext must be used within a ProfileListContextProvider');
	}
	return context;
}

/* * */

export const ProfileListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();
	const linesContext = useLinesContext();
	const stopsContext = useStopsContext();

	const [dataFavoriteLinesState, setDataFavoriteLinesState] = useState<Line[]>([]);
	const [dataFavoriteStopsState, setDataFavoriteStopsState] = useState<Stop[]>([]);

	const [filterByCurrentViewState, setFilterByCurrentViewState] = useState <ProfileListContextState['filters']['by_current_view']>('lines');

	//
	// B. Fetch data

	useEffect(() => {
		if (linesContext.data.lines) {
			setDataFavoriteLinesState(linesContext.data.lines.filter(lineData => profileContext.data.favorite_lines?.includes(lineData.id)));
		}
		if (stopsContext.data.stops) {
			setDataFavoriteStopsState(stopsContext.data.stops.filter(stopData => profileContext.data.favorite_stops?.includes(stopData.id)));
		}
	}, []);

	//
	// D. Handle actions

	const updateFilterByCurrentView = (value: ProfileListContextState['filters']['by_current_view']) => {
		setFilterByCurrentViewState(value);
	};

	//
	// E. Define context value

	const contextValue: ProfileListContextState = {
		actions: {
			updateFilterByCurrentView,
		},
		counters: {
			favorites: profileContext.counters.favorite_stops,
		},
		data: {
			favorite_lines: dataFavoriteLinesState,
			favorite_stops: dataFavoriteStopsState,
		},
		filters: {
			by_current_view: filterByCurrentViewState,
		},
		flags: {
			is_loading: linesContext.flags.is_loading || stopsContext.flags.is_loading || profileContext.flags.is_loading,
		},
	};

	//
	// F. Render components

	return (
		<ProfileListContext.Provider value={contextValue}>
			{children}
		</ProfileListContext.Provider>
	);

	//
};
