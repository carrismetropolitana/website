'use client';

/* * */

import { Layer, Source } from 'react-map-gl/maplibre';

/* * */

export const MapViewStyleStopsInteractiveLayerId = 'default-layer-stops-all';

/* * */

interface Props {
	allStopsGeoJsonData: GeoJSON.FeatureCollection
	selectedStopGeoJsonData: GeoJSON.FeatureCollection

}

/* * */

export function MapViewStyleStops({ allStopsGeoJsonData, selectedStopGeoJsonData }: Props) {
	return (
		<>

			{selectedStopGeoJsonData && (
				<Source data={selectedStopGeoJsonData} generateId={true} id="default-source-stops-selected" type="geojson">

					<Layer
						id="default-layer-stops-selected"
						source="default-source-stops-selected"
						type="symbol"
						layout={{
							'icon-allow-overlap': true,
							'icon-anchor': 'bottom',
							'icon-ignore-placement': true,
							'icon-image': 'cmet-stop-selected',
							'icon-offset': [0, 5],
							'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.1, 20, 0.25],
							'symbol-placement': 'point',
						}}
						paint={{
							'icon-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 10, 1],
						}}
					/>

				</Source>
			)}

			{allStopsGeoJsonData &&	(
				<Source data={allStopsGeoJsonData} generateId={true} id="default-source-stops-all" type="geojson">
					<Layer
						beforeId={selectedStopGeoJsonData && 'default-layer-stops-selected'}
						id="default-layer-stops-all"
						source="default-source-stops-all"
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
			)}

		</>
	);
}
