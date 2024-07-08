'use client';

/* * */

import { AppAnalyticsContextProvider } from '@/contexts/AppAnalyticsContext';
import { DebugContextProvider } from '@/contexts/DebugContext';
import { theme } from '@/styles/theme';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
// import { useCacheProvider } from '@piotr-cz/swr-idb-cache';
import 'dayjs/locale/pt';
import { DatesProviderValue } from 'node_modules/@mantine/dates/lib/components/DatesProvider/DatesProvider';
import { MapProvider } from 'react-map-gl/maplibre';
import { SWRConfig, SWRConfiguration } from 'swr';

/* * */

export default function Providers({ children }) {
	//

	//
	// A. Setup SWR provider

	// const cacheProvider = useCacheProvider({
	// 	dbName: 'alpha-cmetropolitana',
	// 	storeName: 'swr-store',
	// });

	const swrSettings: SWRConfiguration = {
		//
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
		// provider: cacheProvider,
		//
		refreshInterval: 300000, // 5 minutes
		//
	};

	//
	// A. Setup Mantine Dates provider

	const mantineDatesSettings: Partial<DatesProviderValue> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		timezone: 'Europe/Lisbon',
		weekendDays: [6, 0],
	};

	//
	// B. Render providers

	return (
		<SWRConfig value={swrSettings}>
			<MantineProvider defaultColorScheme="auto" theme={theme}>
				<DatesProvider settings={mantineDatesSettings}>
					<ModalsProvider>
						<AppAnalyticsContextProvider>
							<DebugContextProvider>
								<MapProvider>{children}</MapProvider>
							</DebugContextProvider>
						</AppAnalyticsContextProvider>
					</ModalsProvider>
				</DatesProvider>
			</MantineProvider>
		</SWRConfig>
	);

	//
}
