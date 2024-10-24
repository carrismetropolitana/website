'use client';

/* * */

import 'dayjs/locale/pt';
import { SWRConfig } from 'swr';
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import { MapProvider } from 'react-map-gl/maplibre';
import { DebugContextProvider } from '@/contexts/DebugContext';
import { AppAnalyticsContextProvider } from '@/contexts/AppAnalyticsContext';
import { ModalsProvider } from '@mantine/modals';
import { DatesProvider } from '@mantine/dates';

/* * */

export default function Providers({ children, session }) {
	//

	//
	// A. Setup SWR provider

	const swrSettings = {
		//
		refreshInterval: 300000, // 5 minutes
		//
		fetcher: async (...args) => {
			const res = await fetch(...args);
			if (!res.ok) {
				const errorDetails = await res.json();
				const error = new Error(errorDetails.message || 'An error occurred while fetching data.');
				error.description = errorDetails.description || 'No additional information was provided by the API.';
				error.status = res.status;
				throw error;
			}
			return res.json();
		},
		//
	};

	//
	// A. Setup Mantine Dates provider

	const mantineDatesSettings = {
		locale: 'pt',
		firstDayOfWeek: 1,
		weekendDays: [7, 0],
		timezone: 'Europe/Lisbon',
	};

	//
	// B. Render providers

	return (
		<SessionProvider session={session} refetchInterval={15}>
			<SWRConfig value={swrSettings}>
				<MantineProvider withGlobalStyles withNormalizeCSS>
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
		</SessionProvider>
	);

	//
}