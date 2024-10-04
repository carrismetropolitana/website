'use client';

/* * */

import type { Stop } from '@/types/stops.types';

import { MapView } from '@/components/map/MapView';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { moveMap } from '@/utils/map.utils';
import { useEffect, useMemo } from 'react';
import { CircleLayer, Layer, Source, SymbolLayer, useMap } from 'react-map-gl/maplibre';

/* * */

export function StopsDetailContentMap() {
	//

	//
	// A. Setup variables

	const { stopsMap } = useMap();

	const stopListContext = useStopsListContext();
	const stopSingleContext = useStopsDetailContext();

	const stopsGeoJson = useMemo(() => {
		return generateStopsGeoJson(stopListContext.data.raw);
	}, [stopListContext.data.raw]);

	const selectedStopGeoJson = useMemo(() => {
		return generateSelectedStopGeoJson(stopSingleContext.data.stop);
	}, [stopSingleContext.data.stop]);

	//
	// B. Transform Data

	useEffect(() => {
		if (!stopSingleContext.data.stop || !stopsMap) return;
		const coordinates = [Number(stopSingleContext.data.stop.lon), Number(stopSingleContext.data.stop.lat)];
		if (coordinates.some(isNaN)) return;
		moveMap(stopsMap, coordinates);
	}, [stopSingleContext.data.stop, stopsMap]);

	//
	// C. Handle Actions

	function handleLayerClick(event) {
		if (!stopsMap) return;
		const features = stopsMap.queryRenderedFeatures(event.point, { layers: ['stops'] });

		if (!features.length) return;
		const stop = JSON.parse(features[0].properties.stop) as Stop;
		stopSingleContext.actions.setActiveStopId(stop.id);
	}

	//
	// D. Layer Styles

	const stopsStyle = generateStopsStyle();
	const selectedStopBaseStyle = generateStopBaseStyle();
	const selectedStopStickStyle = generateStopStickStyle();

	//
	// E. Render Components

	return (
		<MapView
			id="stopsMap"
			interactiveLayerIds={['stops']}
			onClick={handleLayerClick}
		>
			{/* Selected Stop */}
			{selectedStopGeoJson && (
				<Source data={selectedStopGeoJson} generateId={true} id="selected-stop" type="geojson">
					<Layer {...selectedStopStickStyle} />
					<Layer beforeId="selected-stop-stick" {...selectedStopBaseStyle} />
				</Source>
			)}

			{/* Stops */}
			{stopsGeoJson && (
				<Source data={stopsGeoJson} id="stops" type="geojson">
					<Layer beforeId="selected-stop-base" {...stopsStyle} />
				</Source>
			)}
		</MapView>
	);

	//
}

/** Utility Functions **/

// Generates GeoJSON for stops
function generateStopsGeoJson(stops?: Stop[]) {
	if (!stops) return null;
	return {
		features: stops.map(stop => ({
			geometry: { coordinates: [parseFloat(stop.lon), parseFloat(stop.lat)], type: 'Point' },
			properties: { name: stop.name, stop: stop },
			type: 'Feature',
		})),
		type: 'FeatureCollection',
	};
}

// Generates GeoJSON for selected stop
function generateSelectedStopGeoJson(stop?: Stop) {
	if (!stop) return null;
	return {
		geometry: { coordinates: [stop.lon, stop.lat], type: 'Point' },
		type: 'Feature',
	};
}

// Generates style for stops
function generateStopsStyle(): CircleLayer {
	return {
		id: 'stops',
		paint: {
			'circle-color': '#ffdd01',
			'circle-radius': [
				'interpolate', ['linear'], ['zoom'],
				// zoom is 5 (or less) -> circle radius will be 1px
				10, 1,
				// zoom is 10 (or greater) -> circle radius will be 5px
				16, 5,
				18, 10,
				20, 30,
			],
			'circle-stroke-color': '#000000',
			'circle-stroke-width': 1,
		},
		source: 'stops',
		type: 'circle',
	};
}

// Generates style for selected stop base
function generateStopBaseStyle(): CircleLayer {
	return {
		id: 'selected-stop-base',
		paint: {
			'circle-color': '#ffdd01',
			'circle-radius': [
				'interpolate', ['linear'], ['zoom'],
				// zoom is 5 (or less) -> circle radius will be 1px
				10, 1,
				// zoom is 10 (or greater) -> circle radius will be 5px
				16, 5,
				18, 10,
				20, 30,
			],
			'circle-stroke-color': '#000000',
			'circle-stroke-width': 2,
		},
		source: 'selected-stop',
		type: 'circle',
	};
}

// Generates style for selected stop stick
function generateStopStickStyle(): SymbolLayer {
	return {
		id: 'selected-stop-stick',
		layout: {
			'icon-allow-overlap': true,
			'icon-anchor': 'bottom',
			'icon-ignore-placement': true,
			'icon-image': 'stop-selected',
			'icon-offset': [0, 5],
			'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.1, 20, 0.25],
			'symbol-placement': 'point',
		},
		paint: {
			'icon-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 10, 1],
		},
		source: 'selected-stop',
		type: 'symbol',
	};
}
