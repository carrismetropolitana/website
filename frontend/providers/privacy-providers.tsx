'use client';

/* * */

import { AnalyticsContextProvider } from '@/contexts/Analytics.context';
import { ConsentContextProvider } from '@/contexts/Consent.context';

/* * */

export function PrivacyProviders({ children }) {
	return (
		<ConsentContextProvider>
			<AnalyticsContextProvider>
				{children}
			</AnalyticsContextProvider>
		</ConsentContextProvider>
	);
}
