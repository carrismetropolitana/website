'use client';

import Map from '@/components/common/map/Map';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { IconsMap } from '@/settings/assets.settings';
import { Stop } from '@/types/stops.types';
import { moveMap } from '@/utils/map.utils';
import { useEffect, useMemo } from 'react';
import { CircleLayer, Layer, Source, SymbolLayer, useMap } from 'react-map-gl/maplibre';

/** Main component rendering the map and associated layers */
export default function Component() {
	//
	// A. Setup variables
	const { stopsMap } = useMap();
	const stopListContext = useStopsListContext();
	const stopSingleContext = useStopsSingleContext();

	const stopsGeoJson = useMemo(() => generateStopsGeoJson(stopListContext.data.raw), [
		stopListContext.data.raw,
	]);

	const selectedStop = useMemo(() => stopSingleContext.data.stop, [
		stopSingleContext.data.stop,
	]);

	const selectedStopGeoJson = useMemo(() => generateSelectedStopGeoJson(selectedStop ?? undefined), [
		selectedStop,
	]);

	//
	// B. Transform Data

	useEffect(() => {
		if (!stopsMap) return;
		// Load stop selected symbol
		stopsMap.loadImage(IconsMap.stop_selected).then((image) => {
			stopsMap.addImage('stop-selected', image.data, { sdf: false });
		});

		// Load pin symbol
		stopsMap.loadImage(IconsMap.pin).then((image) => {
			stopsMap.addImage('map-pin', image.data, { sdf: false });
		});
	}, [stopsMap]);

	// Move map to selected stop
	useEffect(() => {
		console.log('==>Selected stop', selectedStop);
		if (!selectedStop) return;
		if (!stopsMap) return;
		const coordinates = [Number(selectedStop.lon), Number(selectedStop.lat)];
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
		stopSingleContext.actions.setStopId(stop.id);
	}

	//
	// D. Layer Styles
	const stopsStyle = generateStopsStyle();
	const selectedStopBaseStyle = generateStopBaseStyle();
	const selectedStopStickStyle = generateStopStickStyle();

	//
	// E. Render Components
	return (
		<>
			<Map
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
			</Map>
		</>
	);
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
