'use client';

/* * */

import { ProfileContextProvider } from '@/contexts/Profile.context';

/* * */

export function ProfileProviders({ children }) {
	return (
		<ProfileContextProvider>
			{children}
		</ProfileContextProvider>
	);
}
