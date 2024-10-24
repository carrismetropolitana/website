'use client';

/* * */

import { MapOptionsContextProvider } from '@/contexts/MapOptions.context';
import { MapProvider } from 'react-map-gl/maplibre';

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
