'use client';

/* * */

import { AlertsContextProvider } from '@/contexts/Alerts.context';
import { AnalyticsContextProvider } from '@/contexts/Analytics.context';
import { DebugContextProvider } from '@/contexts/Debug.context';
import { LinesListContextProvider } from '@/contexts/LinesList.context';
import { MapOptionsContextProvider } from '@/contexts/MapOptions.context';
import { OperationalDayContextProvider } from '@/contexts/OperationalDay.context';
import { ProfileContextProvider } from '@/contexts/Profile.context';
import { StopsListContextProvider } from '@/contexts/StopsList.context';
import websiteTheme from '@/themes/website/website.theme';
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
	// B. Setup Mantine Dates provider

	const mantineDatesSettings: Partial<DatesProviderValue> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		timezone: 'Europe/Lisbon',
		weekendDays: [6, 0],
	};

	//
	// C. Render providers

	return (
		<SWRConfig value={swrSettings}>
			<MantineProvider defaultColorScheme="auto" theme={websiteTheme}>
				<DatesProvider settings={mantineDatesSettings}>
					<ModalsProvider>
						<AnalyticsContextProvider>
							<ProfileContextProvider>
								<DebugContextProvider>
									<OperationalDayContextProvider>
										<MapOptionsContextProvider>
											<MapProvider>
												<AlertsContextProvider>
													<LinesListContextProvider>
														<StopsListContextProvider>
															{children}
														</StopsListContextProvider>
													</LinesListContextProvider>
												</AlertsContextProvider>
											</MapProvider>
										</MapOptionsContextProvider>
									</OperationalDayContextProvider>
								</DebugContextProvider>
							</ProfileContextProvider>
						</AnalyticsContextProvider>
					</ModalsProvider>
				</DatesProvider>
			</MantineProvider>
		</SWRConfig>
	);

	//
}
