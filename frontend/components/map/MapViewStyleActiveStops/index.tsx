'use client';

/* * */

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Layer, Source } from 'react-map-gl/maplibre';

/* * */

export const MapViewStyleActiveStopsPrimaryLayerId = 'default-layer-active-stops-circle';
export const MapViewStyleActiveStopsInteractiveLayerId = '';

/* * */

interface Props {
	presentBeforeId?: string
	stopsData?: GeoJSON.FeatureCollection
}

/* * */

const baseGeoJsonFeatureCollection = getBaseGeoJsonFeatureCollection();

export function MapViewStyleActiveStops({ presentBeforeId, stopsData = baseGeoJsonFeatureCollection }: Props) {
	return (
		<Source data={stopsData} generateId={true} id="default-source-active-stops" type="geojson">

			<Layer
				beforeId={presentBeforeId}
				id="default-layer-active-stops-pole"
				source="default-source-active-stops"
				type="symbol"
				layout={{
					'icon-allow-overlap': true,
					'icon-anchor': 'bottom',
					'icon-ignore-placement': true,
					'icon-image': 'cmet-stop-selected',
					'icon-offset': [0, 5],
					'icon-size': [
						'interpolate',
						['linear'],
						['zoom'],
						10,
						0.1,
						20,
						0.25,
					],
					'symbol-placement': 'point',
				}}
				paint={{
					'icon-opacity': [
						'interpolate',
						['linear'],
						['zoom'],
						7,
						0,
						10,
						1,
					],
				}}
			/>

			<Layer
				beforeId="default-layer-active-stops-pole"
				id="default-layer-active-stops-circle"
				source="default-source-active-stops"
				type="circle"
				paint={{
					'circle-color': [
						'match',
						['get', 'current_status'],
						'inactive',
						'#e6e6e6',
						'#ffdd01',
					],
					'circle-pitch-alignment': 'map',
					'circle-radius': [
						'interpolate',
						['linear'],
						['zoom'],
						9,
						3,
						26,
						20,
					],
					'circle-stroke-color': [
						'match',
						['get', 'current_status'],
						'inactive',
						'#969696',
						'voided',
						'#cc5533',
						'#000000',
					],
					'circle-stroke-width': [
						'interpolate',
						['linear'],
						['zoom'],
						9,
						0.01,
						26,
						7,
					],
				}}
			/>

		</Source>
	);
}
