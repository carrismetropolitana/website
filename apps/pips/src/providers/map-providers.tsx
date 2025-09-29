'use client';

/* * */

import { MapOptionsContextProvider } from '@/contexts/MapOptions.context';
import { MapProvider } from '@vis.gl/react-maplibre';

/* * */

export function MapProviders({ children }) {
	return (
		<MapOptionsContextProvider>
			<MapProvider>
				{children}
			</MapProvider>
		</MapOptionsContextProvider>
	);
}
