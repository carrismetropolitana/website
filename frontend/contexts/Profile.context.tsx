'use client';

/* * */

import type { ServerActionResult } from '@/types/actions.types';
import type { Profile } from '@/types/profile.type';

import { toggleFavoriteLine as favoriteLineAction, toggleFavoriteStop as favoriteStopAction, getProfile, updateProfile as updateProfileAction } from '@/actions/account.actions';
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

/* * */

const LOCAL_STORAGE_KEYS = {
	device_id: 'profile|device_id',
	profile: 'profile',
};

/* * */

interface ProfileContextState {
	actions: {
		toggleFavoriteLine: (lineId: string) => Promise<void>
		toggleFavoriteStop: (stopId: string) => Promise<void>
		updateFilterByFavorite: (value: ProfileContextState['filters']['favorites']) => void
		updateProfile: (profile: Partial<Profile>) => Promise<void>
	}
	counters: {
		favorite_lines: number
		favorite_stops: number
	}
	data: {
		device_id: null | string
		profile: Profile | null
	}
	filters: {
		favorites: 'lines' | 'stops'
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

	const [deviceId, setDeviceId] = useState<ProfileContextState['data']['device_id']>(null);
	const [dataProfile, setDataProfile] = useState<ProfileContextState['data']['profile']>(null);
	const [filterByFavorite, setFilterByFavorite] = useState <ProfileContextState['filters']['favorites']>('lines');
	const [flagIsLoading, setFlagIsLoading] = useState <ProfileContextState['flags']['is_loading']>(true);

	//
	// B. Transform data

	useEffect(() => {
		// Get device id from local storage
		// If no device id is found then generate a new one
		if (typeof window === 'undefined') return;
		const deviceIdLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.device_id);

		if (!deviceIdLocal) {
			const id = uuid();
			setDeviceId(id);
			localStorage.setItem(LOCAL_STORAGE_KEYS.device_id, id);
		}

		setDeviceId(deviceIdLocal);
	}, []);

	useEffect(() => {
		setFlagIsLoading(true);
		// Fetch profile data from API on mount
		const deviceIdLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.device_id);
		// Get profile data from Server Action
		getProfile(deviceIdLocal || '')
			.then((profile: ServerActionResult<Profile>) => {
				setDataProfile(profile.success ? profile.value : null);
			})
			.catch(() => {
				// If no profile data was found, set the data to null
				setDataProfile(null);
			})
			.finally(() => {
				setFlagIsLoading(false);
			});
	}, [deviceId]);

	//
	// C. Handle actions

	const toggleFavoriteLine = async (lineId: string) => {
		const profile: ServerActionResult<Profile> = await favoriteLineAction(lineId, deviceId || '');
		if (!profile.success) throw new Error(profile.error);
		setDataProfile(profile.value);
	};

	const toggleFavoriteStop = async (stopId: string) => {
		const profile: ServerActionResult<Profile> = await favoriteStopAction(stopId, deviceId || '');
		if (!profile.success) throw new Error(profile.error);
		setDataProfile(profile.value);
	};

	const updateFilterByFavorite = (value: ProfileContextState['filters']['favorites']) => {
		setFilterByFavorite(value);
	};

	const updateProfile = async (profile: Partial<Profile>) => {
		if (!dataProfile) return;
		const res = await updateProfileAction(profile, deviceId || '');
		setDataProfile({ ...dataProfile, ...res });
	};

	//
	// D. Define context value

	const contextValue: ProfileContextState = {
		actions: {
			toggleFavoriteLine,
			toggleFavoriteStop,
			updateFilterByFavorite,
			updateProfile,
		},
		counters: {
			favorite_lines: dataProfile?.favorite_lines?.length || 0,
			favorite_stops: dataProfile?.favorite_stops?.length || 0,
		},
		data: {
			device_id: deviceId,
			profile: dataProfile,
		},
		filters: {
			favorites: filterByFavorite,
		},
		flags: {
			is_loading: flagIsLoading,
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
