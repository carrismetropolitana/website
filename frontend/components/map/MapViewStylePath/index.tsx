'use client';

/* * */

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Layer, Source } from 'react-map-gl/maplibre';

/* * */

export const MapViewStylePathPrimaryLayerId = 'default-layer-path-shape-line';
export const MapViewStylePathInteractiveLayerId = 'default-layer-path-stops';

/* * */

interface Props {
	presentBeforeId?: string
	shapesData?: GeoJSON.FeatureCollection
	stopsData?: GeoJSON.FeatureCollection
}

/* * */

const baseGeoJsonFeatureCollection = getBaseGeoJsonFeatureCollection();

export function MapViewStylePath({ presentBeforeId, shapesData = baseGeoJsonFeatureCollection, stopsData = baseGeoJsonFeatureCollection }: Props) {
	return (
		<>

			<Source data={stopsData} generateId={true} id="default-source-path-stops" type="geojson">
				<Layer
					beforeId={presentBeforeId}
					id="default-layer-path-stops"
					source="default-source-path-stops"
					type="circle"
					paint={{
						'circle-color': ['get', 'text_color'],
						'circle-pitch-alignment': 'map',
						'circle-radius': [
							'interpolate',
							['linear'],
							['zoom'],
							9,
							1,
							26,
							15,
						],
						'circle-stroke-color': ['get', 'color'],
						'circle-stroke-width': ['interpolate',
							['linear'],
							['zoom'],
							9,
							1,
							26,
							7,
						],
					}}
				/>
			</Source>

			<Source data={shapesData} generateId={true} id="default-source-path-shape" type="geojson">
				<Layer
					beforeId={stopsData ? 'default-layer-path-stops' : presentBeforeId}
					id="default-layer-path-shape-direction"
					source="default-source-path-shape"
					type="symbol"
					layout={{
						'icon-allow-overlap': true,
						'icon-anchor': 'center',
						'icon-ignore-placement': true,
						'icon-image': 'cmet-shape-direction',
						'icon-offset': [0, 0],
						'icon-rotate': 90,
						'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.1, 20, 0.2],
						'symbol-placement': 'line',
						'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 10, 2, 20, 30],
					}}
					paint={{
						'icon-color': '#ffffff',
						'icon-opacity': 0.8,
					}}
				/>
				<Layer
					beforeId="default-layer-path-shape-direction"
					id="default-layer-path-shape-line"
					source="default-source-path-shape"
					type="line"
					layout={{
						'line-cap': 'round',
						'line-join': 'round',
					}}
					paint={{
						'line-color': ['get', 'color'],
						'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 20, 12],
					}}
				/>
			</Source>

		</>
	);
}
