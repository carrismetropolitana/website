'use client';

/* * */

import { Layer, Source } from 'react-map-gl/maplibre';

/* * */

export const MapViewStyleStopsInteractiveLayerIds = ['default-layer-stops'];

/* * */

interface Props {
	data: GeoJSON.FeatureCollection
}

/* * */

export function MapViewStyleStops({ data }: Props) {
	return (
		<Source data={data} generateId={true} id="default-source-stops" type="geojson">

			<Layer
				id="default-layer-stops"
				source="default-source-stops"
				type="circle"
				paint={{
					'circle-color':
						['match',
							['get', 'current_status'],
							'inactive',
							'#e6e6e6',
							'#ffdd01',
						],
					'circle-pitch-alignment': 'map',
					'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 25, 20]],
					'circle-stroke-color':
						['match',
							['get', 'current_status'],
							'inactive',
							'#969696',
							'voided',
							'#cc5533',
							'#000000',
						],
					'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 9, 0.01, 26, ['case', ['boolean', ['feature-state', 'selected'], false], 8, 7]],
				}}
			/>

		</Source>
	);
}
