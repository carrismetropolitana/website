'use client';

/* * */

import type { Stop } from '@/types/stops.types';

import { useProfileContext } from '@/contexts/Profile.context';
import { Routes } from '@/utils/routes';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface StopsContextState {
	actions: {
		getStopDataById: (stopId: string) => Stop | undefined
	}
	counters: {
		favorites: number
	}
	data: {
		favorites: Stop[]
		raw: Stop[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const StopsContext = createContext<StopsContextState | undefined>(undefined);

export function useStopsContext() {
	const context = useContext(StopsContext);
	if (!context) {
		throw new Error('useStopsContext must be used within a StopsContextProvider');
	}
	return context;
}

/* * */

export const StopsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();

	const [dataFavoritesState, setDataFavoritesState] = useState<Stop[]>([]);

	//
	// B. Fetch data

	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<Stop[], Error>(`${Routes.API}/v2/stops`);

	//
	// C. Transform data

	useEffect(() => {
		const favoritesStopsData = allStopsData?.filter(stop => profileContext.data.profile?.favorite_stops?.includes(stop.id)) || [];
		setDataFavoritesState(favoritesStopsData);
	}, [allStopsData, profileContext.data.profile?.favorite_stops]);

	//
	// D. Handle actions

	const getStopDataById = (stopId: string) => {
		return allStopsData?.find(stop => stop.id === stopId);
	};

	//
	// E. Define context value

	const contextValue: StopsContextState = {
		actions: {
			getStopDataById,
		},
		counters: {
			favorites: profileContext.counters.favorite_stops,
		},
		data: {
			favorites: dataFavoritesState,
			raw: allStopsData || [],
		},
		flags: {
			is_loading: allStopsLoading,
		},
	};

	//
	// E. Render components

	return (
		<StopsContext.Provider value={contextValue}>
			{children}
		</StopsContext.Provider>
	);

	//
};
