'use client';

/* * */

import { Layer, Source } from 'react-map-gl/maplibre';

/* * */

export const MapViewStyleVehiclesInteractiveLayerId = '';

/* * */

interface Props {
	data: GeoJSON.FeatureCollection
}

/* * */

export function MapViewStyleVehicles({ data }: Props) {
	return (
		<Source data={data} generateId={true} id="default-source-vehicles" type="geojson">

			<Layer
				id="default-layer-vehicles-delay"
				source="default-source-vehicles"
				type="symbol"
				layout={{
					'icon-allow-overlap': true,
					'icon-anchor': 'center',
					'icon-ignore-placement': true,
					'icon-image': 'cmet-bus-delay',
					'icon-offset': [0, 0],
					'icon-rotate': ['get', 'bearing'],
					'icon-rotation-alignment': 'map',
					'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.05, 20, 0.15],
					'symbol-placement': 'point',
				}}
				paint={{
					'icon-opacity': ['interpolate', ['linear'], ['get', 'delay'], 20, 0, 40, 1],
				}}
			/>

			<Layer
				beforeId="default-layer-vehicles-delay"
				id="default-layer-vehicles-regular"
				source="default-source-vehicles"
				type="symbol"
				layout={{
					'icon-allow-overlap': true,
					'icon-anchor': 'center',
					'icon-ignore-placement': true,
					'icon-image': 'cmet-bus-regular',
					'icon-offset': [0, 0],
					'icon-rotate': ['get', 'bearing'],
					'icon-rotation-alignment': 'map',
					'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.05, 20, 0.15],
					'symbol-placement': 'point',
				}}
			/>

		</Source>
	);
}
