'use client';

/* * */

import { DebugContextProvider } from '@/contexts/Debug.context';
import { SWRConfig, SWRConfiguration } from 'swr';

/* * */

export function ConfigProviders({ children }) {
	//

	//
	// A. Setup variables

	const swrSettings: SWRConfiguration = {
		async fetcher(...args: Parameters<typeof fetch>) {
			const res = await fetch(...args);
			if (!res.ok) {
				const errorDetails = await res.json();
				const error = new Error(errorDetails.message || 'An error occurred while fetching data.');
				const customError = {
					...error,
					description: errorDetails.description || 'No additional information was provided by the API.',
					status: res.status,
				};
				throw customError;
			}
			return res.json();
		},
		refreshInterval: 10000, // 10 seconds
	};

	//
	// B. Render components

	return (
		<SWRConfig value={swrSettings}>
			<DebugContextProvider>
				{children}
			</DebugContextProvider>
		</SWRConfig>
	);

	//
}
