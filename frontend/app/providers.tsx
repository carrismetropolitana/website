'use client';

/* * */

import { AppAnalyticsContextProvider } from '@/contexts/AppAnalyticsContext';
import { DebugContextProvider } from '@/contexts/DebugContext';
import { OperationalDayContextProvider } from '@/contexts/OperationalDay.context';
import { ProfileContextProvider } from '@/contexts/ProfileContext';
import { theme } from '@/styles/theme';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import 'dayjs/locale/pt';
import { DatesProviderValue } from 'node_modules/@mantine/dates/lib/components/DatesProvider/DatesProvider';
import { MapProvider } from 'react-map-gl/maplibre';
import { SWRConfig, SWRConfiguration } from 'swr';

/* * */

export default function Providers({ children }) {
	//

	//
	// A. Setup SWR provider

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
		refreshInterval: 10000, // 10 seconds
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
							<ProfileContextProvider>
								<DebugContextProvider>
									<OperationalDayContextProvider>
										<MapProvider>{children}</MapProvider>
									</OperationalDayContextProvider>
								</DebugContextProvider>
							</ProfileContextProvider>
						</AppAnalyticsContextProvider>
					</ModalsProvider>
				</DatesProvider>
			</MantineProvider>
		</SWRConfig>
	);

	//
}
