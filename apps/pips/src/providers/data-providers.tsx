'use client';

/* * */

import { AlertsContextProvider } from '@/contexts/Alerts.context';
import { LinesContextProvider } from '@/contexts/Lines.context';
import { LocationsContextProvider } from '@/contexts/Locations.context';
import { OperationalDateContextProvider } from '@/contexts/OperationalDate.context';
import { StopsContextProvider } from '@/contexts/Stops.context';

/* * */

export function DataProviders({ children }) {
	return (
		<OperationalDateContextProvider>
			<LocationsContextProvider>
				<AlertsContextProvider>
					<StopsContextProvider>
						<LinesContextProvider>
							{children}
						</LinesContextProvider>
					</StopsContextProvider>
				</AlertsContextProvider>
			</LocationsContextProvider>
		</OperationalDateContextProvider>
	);
}
