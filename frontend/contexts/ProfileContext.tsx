import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from 'react';

interface ProfileContextType {
	profile: Profile
	setFavoriteLines: Dispatch<SetStateAction<string[]>>
	setFavoriteStops: Dispatch<SetStateAction<string[]>>
}

interface Profile {
	favoriteLines: string[]
	favoriteStops: string[]
};

const ProfileContext = createContext<ProfileContextType>(
	{
		profile: {
			favoriteLines: [],
			favoriteStops: [],
		},
		setFavoriteLines: () => {
			// purposefully empty
		},
		setFavoriteStops: () => {
			// purposefully empty
		},
	},
);

export function useProfileContext() {
	return useContext(ProfileContext);
}

export function getInitialState() {
	const onServer = typeof window === 'undefined';
	const favoriteLines = onServer ? undefined : localStorage.getItem('favoriteLines');
	const favoriteStops = onServer ? undefined : localStorage.getItem('favoriteStops');
	return {
		favoriteLines: favoriteLines ? JSON.parse(favoriteLines) : [],
		favoriteStops: favoriteStops ? JSON.parse(favoriteStops) : [],
	};
}

export function ProfileContextProvider({ children }) {
	const initialState = useMemo(getInitialState, []);
	const [favoriteLines, setFavoriteLines] = useState<string[]>(initialState.favoriteLines);
	const [favoriteStops, setFavoriteStops] = useState<string[]>(initialState.favoriteStops);
	const profile = { favoriteLines, favoriteStops };

	useEffect(() => {
		localStorage.setItem('favoriteLines', JSON.stringify(favoriteLines));
	}, [favoriteLines]);
	useEffect(() => {
		localStorage.setItem('favoriteStops', JSON.stringify(favoriteStops));
	}, [favoriteStops]);

	return (
		<ProfileContext.Provider value={{ profile, setFavoriteLines, setFavoriteStops }}>
			{children}
		</ProfileContext.Provider>
	);
}
