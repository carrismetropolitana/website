'use client';

/* * */

import { AppAnalyticsContextProvider } from '@/contexts/AppAnalyticsContext';
import { DebugContextProvider } from '@/contexts/DebugContext';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import 'dayjs/locale/pt';
import { MapProvider } from 'react-map-gl/maplibre';
import { SWRConfig } from 'swr';

/* * */

export default function Providers({ children }) {
	//

	//
	// A. Setup SWR provider

	const swrSettings = {
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
		refreshInterval: 300000, // 5 minutes
		//
	};

	//
	// A. Setup Mantine Dates provider

	const mantineDatesSettings = {
		firstDayOfWeek: 1,
		locale: 'pt',
		timezone: 'Europe/Lisbon',
		weekendDays: [7, 0],
	};

	//
	// B. Render providers

	return (
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
	);

	//
}
