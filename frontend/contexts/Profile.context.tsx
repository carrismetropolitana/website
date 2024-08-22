'use client';

/* * */
import { Profile } from '@/types/profile.type';
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
		toggleFavoriteLine: (lineId: string) => void
		toggleFavoriteStop: (stopId: string) => void
	}
	counters: {
		favorite_lines: number
		favorite_stops: number
	}
	data: {
		device_id: null | string
		profile: Profile | null
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
		// Fetch profile data from API on mount
		// If the profile data is not found, set the data to null
		const deviceIdLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.device_id);
		fetch(`/api/accounts/${deviceIdLocal}`).then((res) => {
			if (!res.ok) {
				setDataProfile(null);
				return;
			}

			res.json().then(profile => setDataProfile(profile));
		});
	}, [deviceId]);

	//
	// C. Handle actions
	const toggleFavoriteLine = async (lineId: string) => {
		const res = await fetch(`/api/accounts/${deviceId}/favorite-lines/${lineId}`, {
			method: 'POST',
		});

		if (!res.ok) {
			// TODO: Handle error, maybe show a toast
			console.error('Error toggling favorite line');
		}

		const profile: Profile = await res.json();
		setDataProfile(profile);
	};

	const toggleFavoriteStop = async (stopId: string) => {
		const res = await fetch(`/api/accounts/${deviceId}/favorite-stops/${stopId}`, {
			method: 'POST',
		});

		if (!res.ok) {
			// TODO: Handle error, maybe show a toast
			console.error('Error toggling favorite stop');
		}

		const profile: Profile = await res.json();
		setDataProfile(profile);
	};

	//
	// D. Define context value

	const contextValue: ProfileContextState = {
		actions: {
			toggleFavoriteLine,
			toggleFavoriteStop,
		},
		counters: {
			favorite_lines: dataProfile?.favorite_lines?.length || 0,
			favorite_stops: dataProfile?.favorite_stops?.length || 0,
		},
		data: {
			device_id: deviceId,
			profile: dataProfile,
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
