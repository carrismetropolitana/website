'use client';

/* * */

import { AnalyticsContextProvider } from '@/contexts/Analytics.context';
import { ConsentContextProvider } from '@/contexts/Consent.context';
import { LocaleContextProvider } from '@/contexts/Locale.context';

/* * */

export function RootProviders({ children }) {
	return (
		<LocaleContextProvider>
			<ConsentContextProvider>
				<AnalyticsContextProvider>
					{children}
				</AnalyticsContextProvider>
			</ConsentContextProvider>
		</LocaleContextProvider>
	);
}
