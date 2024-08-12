'use client';

/* * */

import { createContext, useContext, useEffect, useState } from 'react';

/* * */

const LOCAL_STORAGE_KEYS = {
	favorite_lines: 'profile|favorite_lines',
	favorite_stops: 'profile|favorite_stops',
};

/* * */

interface ProfileContextState {
	actions: {
		toggleFavoriteLine: (lineId: string) => void
		toggleFavoriteStop: (stopId: string) => void
	}
	counters: {
		favorite_lines: number
		favorite_stops: number
	}
	data: {
		favorite_lines: null | string[]
		favorite_stops: null | string[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const ProfileContext = createContext<ProfileContextState | undefined>(undefined);

export function useProfileContext() {
	const context = useContext(ProfileContext);
	if (!context) {
		throw new Error('useProfileContext must be used within a ProfileContextProvider');
	}
	return context;
}

/* * */

export const ProfileContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataFavoriteLinesState, setDataFavoriteLinesState] = useState<ProfileContextState['data']['favorite_lines']>(null);
	const [dataFavoriteStopsState, setDataFavoriteStopsState] = useState<ProfileContextState['data']['favorite_stops']>(null);

	//
	// B. Transform data

	useEffect(() => {
		// Get favorite lines from local storage
		if (typeof window === 'undefined') return;
		const favoriteLinesLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.favorite_lines);
		const favoriteLinesData = favoriteLinesLocal ? JSON.parse(favoriteLinesLocal) : null;
		setDataFavoriteLinesState(favoriteLinesData);
	}, []);

	useEffect(() => {
		// Save favorite lines to local storage
		if (typeof window === 'undefined' || dataFavoriteLinesState === null) return;
		const favoriteLinesTxt = JSON.stringify(dataFavoriteLinesState);
		localStorage.setItem(LOCAL_STORAGE_KEYS.favorite_lines, favoriteLinesTxt);
	}, [dataFavoriteLinesState]);

	useEffect(() => {
		// Get favorite stops from local storage
		if (typeof window === 'undefined') return;
		const favoriteStopsLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.favorite_stops);
		const favoriteStopsData = favoriteStopsLocal ? JSON.parse(favoriteStopsLocal) : null;
		setDataFavoriteStopsState(favoriteStopsData);
	}, []);

	useEffect(() => {
		// Save favorite stops to local storage
		if (typeof window === 'undefined' || dataFavoriteStopsState === null) return;
		const favoriteStopsTxt = JSON.stringify(dataFavoriteStopsState);
		localStorage.setItem(LOCAL_STORAGE_KEYS.favorite_stops, favoriteStopsTxt);
	}, [dataFavoriteStopsState]);

	//
	// C. Handle actions

	const toggleFavoriteLine = (lineId: string) => {
		if (dataFavoriteLinesState?.includes(lineId)) {
			setDataFavoriteLinesState(prev => prev && prev.filter(itemId => itemId !== lineId));
		}
		else {
			setDataFavoriteLinesState(prev => prev && [...prev, lineId]);
		}
	};

	const toggleFavoriteStop = (stopId: string) => {
		if (dataFavoriteStopsState?.includes(stopId)) {
			setDataFavoriteStopsState(prev => prev && prev.filter(itemId => itemId !== stopId));
		}
		else {
			setDataFavoriteStopsState(prev => prev && [...prev, stopId]);
		}
	};

	//
	// D. Define context value

	const contextValue: ProfileContextState = {
		actions: {
			toggleFavoriteLine,
			toggleFavoriteStop,
		},
		counters: {
			favorite_lines: dataFavoriteLinesState?.length || 0,
			favorite_stops: dataFavoriteStopsState?.length || 0,
		},
		data: {
			favorite_lines: dataFavoriteLinesState,
			favorite_stops: dataFavoriteStopsState,
		},
		flags: {
			is_loading: false,
		},
	};

	//
	// E. Render components

	return (
		<ProfileContext.Provider value={contextValue}>
			{children}
		</ProfileContext.Provider>
	);

	//
};
