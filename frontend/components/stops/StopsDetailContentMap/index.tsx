'use client';

/* * */

import type { Stop } from '@/types/stops.types';

import { MapView } from '@/components/map/MapView';
import { MapViewStyleStops, MapViewStyleStopsInteractiveLayerIds } from '@/components/map/MapViewStyleStops';
import { useStopsContext } from '@/contexts/Stops.context';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { moveMap } from '@/utils/map.utils';
import { useEffect, useMemo } from 'react';
import { CircleLayer, Layer, Source, SymbolLayer, useMap } from 'react-map-gl/maplibre';

/* * */

export function StopsDetailContentMap() {
	//

	//
	// A. Setup variables

	const { stopsMap } = useMap();

	const stopsContext = useStopsContext();
	const stopSingleContext = useStopsDetailContext();

	const allStopsGeoJson = useMemo(() => {
		return stopsContext.actions.getAllStopsGeoJsonFC();
	}, [stopsContext.data.raw]);

	const selectedStopGeoJson = useMemo(() => {
		return generateSelectedStopGeoJson(stopSingleContext.data.stop);
	}, [stopSingleContext.data.stop]);

	//
	// B. Transform Data

	useEffect(() => {
		if (!stopSingleContext.data.stop || !stopsMap) return;
		const coordinates = [stopSingleContext.data.stop.lon, stopSingleContext.data.stop.lat];
		if (coordinates.some(isNaN)) return;
		moveMap(stopsMap, coordinates);
	}, [stopSingleContext.data.stop, stopsMap]);

	//
	// C. Handle Actions

	function handleLayerClick(event) {
		if (!stopsMap) return;
		const features = stopsMap.queryRenderedFeatures(event.point);
		if (!features.length) return;
		stopSingleContext.actions.setActiveStopId(features[0].properties.id);
	}

	//
	// D. Layer Styles

	const selectedStopBaseStyle = generateStopBaseStyle();
	const selectedStopStickStyle = generateStopStickStyle();

	//
	// E. Render Components

	return (
		<MapView
			id="stopsMap"
			interactiveLayerIds={[...MapViewStyleStopsInteractiveLayerIds]}
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
			{allStopsGeoJson && <MapViewStyleStops data={allStopsGeoJson} />}

		</MapView>
	);

	//
}

/** Utility Functions **/

// Generates GeoJSON for selected stop
function generateSelectedStopGeoJson(stop?: Stop) {
	if (!stop) return null;
	return {
		geometry: { coordinates: [stop.lon, stop.lat], type: 'Point' },
		type: 'Feature',
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
