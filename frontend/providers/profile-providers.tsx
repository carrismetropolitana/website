'use client';

/* * */

import { AnalyticsContextProvider } from '@/contexts/Analytics.context';
import { ProfileContextProvider } from '@/contexts/Profile.context';

/* * */

export function ProfileProviders({ children }) {
	return (
		<AnalyticsContextProvider>
			<ProfileContextProvider>
				{children}
			</ProfileContextProvider>
		</AnalyticsContextProvider>
	);
}
