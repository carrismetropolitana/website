'use client';

/* * */

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Layer, Source } from 'react-map-gl/maplibre';

/* * */

export const MapViewStyleStopsPrimaryLayerId = 'default-layer-stops-all';
export const MapViewStyleStopsInteractiveLayerId = 'default-layer-stops-all';

/* * */

interface Props {
	presentBeforeId?: string
	stopsData?: GeoJSON.FeatureCollection
	style?: 'muted' | 'primary'
}

/* * */

const baseGeoJsonFeatureCollection = getBaseGeoJsonFeatureCollection();

export function MapViewStyleStops({ presentBeforeId, stopsData = baseGeoJsonFeatureCollection, style = 'primary' }: Props) {
	return (
		<Source data={stopsData} generateId={true} id="default-source-stops-all" type="geojson">

			{style === 'primary' && (
				<Layer
					beforeId={presentBeforeId}
					id="default-layer-stops-all"
					source="default-source-stops-all"
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
							['case', ['boolean', ['feature-state', 'active'], false], 5, 1],
							26,
							['case', ['boolean', ['feature-state', 'active'], false], 25, 20],
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
							['case', ['boolean', ['feature-state', 'active'], false], 8, 7],
						],
					}}
				/>
			)}

			{style === 'muted' && (
				<Layer
					beforeId={presentBeforeId}
					id="default-layer-stops-all"
					source="default-source-stops-all"
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
							1,
							26,
							10,
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
							3,
						],
					}}
				/>
			)}

		</Source>
	);
}
