'use client';

/* * */

import { AlertsContextProvider } from '@/contexts/Alerts.context';
import { LinesContextProvider } from '@/contexts/Lines.context';
import { OperationalDateContextProvider } from '@/contexts/OperationalDate.context';
import { StopsContextProvider } from '@/contexts/Stops.context';

/* * */

export function DataProviders({ children }) {
	return (
		<OperationalDateContextProvider>
			<AlertsContextProvider>
				<StopsContextProvider>
					<LinesContextProvider>
						{children}
					</LinesContextProvider>
				</StopsContextProvider>
			</AlertsContextProvider>
		</OperationalDateContextProvider>
	);
}
