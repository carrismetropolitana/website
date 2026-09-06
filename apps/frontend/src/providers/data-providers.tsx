'use client';

/* * */

import { AlertsContextProvider } from '@/contexts/Alerts.context';
import { LinesContextProvider } from '@/contexts/Lines.context';
import { OperationalDateContextProvider } from '@/contexts/OperationalDate.context';
import { StopsContextProvider } from '@/contexts/Stops.context';
import { VehiclesContextProvider } from '@/contexts/Vehicles.context';

/* * */

export function DataProviders({ children }) {
	return (
		<OperationalDateContextProvider>
			<AlertsContextProvider>
				<StopsContextProvider>
					<LinesContextProvider>
						<VehiclesContextProvider>
							{children}
						</VehiclesContextProvider>
					</LinesContextProvider>
				</StopsContextProvider>
			</AlertsContextProvider>
		</OperationalDateContextProvider>
	);
}
