'use client';

/* * */

import { AlertsContextProvider } from '@/contexts/Alerts.context';
import { LinesContextProvider } from '@/contexts/Lines.context';
import { OperationalDayContextProvider } from '@/contexts/OperationalDay.context';
import { StopsContextProvider } from '@/contexts/Stops.context';
import { VehiclesContextProvider } from '@/contexts/Vehicles.context';

/* * */

export function DataProviders({ children }) {
	return (
		<OperationalDayContextProvider>
			<AlertsContextProvider>
				<StopsContextProvider>
					<LinesContextProvider>
						<VehiclesContextProvider>
							{children}
						</VehiclesContextProvider>
					</LinesContextProvider>
				</StopsContextProvider>
			</AlertsContextProvider>
		</OperationalDayContextProvider>
	);
}
