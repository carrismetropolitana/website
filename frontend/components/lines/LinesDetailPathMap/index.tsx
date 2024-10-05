'use client';

/* * */

import LiveIcon from '@/components/common/LiveIcon';
import { MapView } from '@/components/map/MapView';
import { MapViewStyleStopsInteractiveLayerId } from '@/components/map/MapViewStyleStops';
import { MapViewStyleVehicles } from '@/components/map/MapViewStyleVehicles';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { Path, PatternGroup } from '@/types/lines.types';
import { Stop } from '@/types/stops.types';
import { moveMap } from '@/utils/map.utils';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import { CircleLayer, Layer, LineLayer, Source, SymbolLayer, useMap } from 'react-map-gl/maplibre';

import styles from './styles.module.css';

/** Main component rendering the map and associated layers */
export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesDetailPathMap');

	const vehiclesContext = useVehiclesContext();
	const linesDetailContext = useLinesDetailContext();

	const { linesSingleMap } = useMap();

	//
	// C. Transform Data

	// Move map to selected stop
	useEffect(() => {
		if (!linesDetailContext.data.active_stop?.stop) return;
		if (!linesSingleMap) return;
		const coordinates = [Number(linesDetailContext.data.active_stop.stop.lon), Number(linesDetailContext.data.active_stop?.stop.lat)];
		if (coordinates.some(isNaN)) return;

		console.log('Moving map to selected stop', coordinates);

		moveMap(linesSingleMap, coordinates);
	}, [linesDetailContext.data.active_stop, linesSingleMap]);

	//
	// D. Handle Actions
	function handleLayerClick(event) {
		if (!linesSingleMap) return;
		const features = linesSingleMap.queryRenderedFeatures([event.point.x, event.point.y], {
			layers: ['stops'],
		});

		if (features.length === 0) return;
		const selectedStop = JSON.parse(features[0].properties.stop) as Stop;
		const selectedStopSequence = features[0].properties.sequence as number;

		linesDetailContext.actions.setActiveStop(selectedStopSequence, selectedStop);
	}

	//
	// E. Memoized GeoJSON Data

	// Vehicles on the map
	const activeVehiclesGeojson = useMemo(() => {
		if (!linesDetailContext.data.active_pattern_group?.pattern_id) return;
		return vehiclesContext.actions.getVehiclesByPatternIdGeoJsonFC(linesDetailContext.data.active_pattern_group?.pattern_id);
	}, [linesDetailContext.data.active_pattern_group, vehiclesContext.data.all]);

	// Stops on the route
	const stopsGeoJson = useMemo(() => generateStopsGeoJson(linesDetailContext.data.active_pattern_group?.path), [
		linesDetailContext.data.active_pattern_group?.path,
	]);

	// Selected stop data
	const selectedStopMapData = useMemo(() => {
		if (!linesDetailContext.data.active_stop || !linesDetailContext.data.active_pattern_group) return null;
		return generateSelectedStopGeoJson(linesDetailContext.data.active_stop.stop, linesDetailContext.data.active_pattern_group);
	}, [linesDetailContext.data.active_stop, linesDetailContext.data.active_pattern_group]);

	//
	// F. Layer styles
	const stopsStyle = generateStopsStyle(linesDetailContext.data.active_pattern_group ?? undefined);
	const shapeStyle = generateShapeStyle(linesDetailContext.data.line?.color);
	const shapeArrowStyle = generateShapeArrowStyle();
	const selectedStopBaseStyle = generateStopBaseStyle();
	const selectedStopStickStyle = generateStopStickStyle();

	//
	// G. Render Map and Layers
	return (
		<MapView
			id="linesSingleMap"
			interactiveLayerIds={[MapViewStyleStopsInteractiveLayerId]}
			onClick={handleLayerClick}
		>
			{/* Route Shape */}
			{linesDetailContext.data.active_shape?.geojson && (
				<Source data={linesDetailContext.data.active_shape.geojson} id="shape" type="geojson">
					<Layer {...shapeStyle} />
					<Layer {...shapeArrowStyle} />
				</Source>
			)}

			{/* Stops */}
			{stopsGeoJson && (
				<Source data={stopsGeoJson} id="stops" type="geojson">
					<Layer {...stopsStyle} />
				</Source>
			)}

			{/* Selected Stop */}
			{selectedStopMapData && (
				<Source data={selectedStopMapData} generateId={true} id="selected-stop" type="geojson">
					<Layer {...selectedStopBaseStyle} />
					<Layer {...selectedStopStickStyle} />
				</Source>
			)}

			{/* Vehicles */}
			{activeVehiclesGeojson && <MapViewStyleVehicles data={activeVehiclesGeojson} />}

			{/* Active vehicles counter */}
			{activeVehiclesGeojson?.features && activeVehiclesGeojson?.features.length > 0 && (
				<div className={styles.mapOverlay}>
					<LiveIcon />
					{t('active_vehicles_counter', { count: activeVehiclesGeojson.features.length })}
				</div>
			)}
		</MapView>
	);
}

/** Utility Functions **/

// Generates GeoJSON for stops
function generateStopsGeoJson(stops?: Path[]) {
	if (!stops) return null;
	return {
		features: stops.map(stop => ({
			geometry: { coordinates: [stop.stop.lon, stop.stop.lat], type: 'Point' },
			properties: { name: stop.stop.name, sequence: stop.stop_sequence, stop: stop.stop },
			type: 'Feature',
		})),
		type: 'FeatureCollection',
	};
}

// Generates GeoJSON for selected stop
function generateSelectedStopGeoJson(stop: Stop, pattern: PatternGroup) {
	if (!stop?.lon) return null;
	return {
		geometry: { coordinates: [stop.lon, stop.lat], type: 'Point' },
		properties: {
			color: pattern.color || '#000000',
			text_color: pattern.text_color || '#ffffff',
		},
		type: 'Feature',
	};
}

// Generates style for stops
function generateStopsStyle(pattern?: PatternGroup): CircleLayer {
	return {
		id: 'stops',
		paint: {
			'circle-color': pattern?.text_color || '#ffffff',
			'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, 5, 26, 18],
			'circle-stroke-color': pattern?.color || '#000000',
			'circle-stroke-width': 1,
		},
		source: 'stops',
		type: 'circle',
	};
}

// Generates style for route line
function generateShapeStyle(lineColor): LineLayer {
	return {
		id: 'point',
		layout: { 'line-cap': 'round', 'line-join': 'round' },
		paint: {
			'line-color': lineColor,
			'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 20, 12],
		},
		source: 'shape',
		type: 'line',
	};
}

// Generates style for route arrow
function generateShapeArrowStyle(): SymbolLayer {
	return {
		id: 'shape-arrows',
		layout: {
			'icon-image': 'shape-arrow-direction',
			'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.1, 20, 0.2],
			'symbol-placement': 'line',
		},
		paint: { 'icon-color': '#ffffff', 'icon-opacity': 0.8 },
		source: 'shape',
		type: 'symbol',
	};
}

// Generates style for selected stop base
function generateStopBaseStyle(): CircleLayer {
	return {
		id: 'selected-stop-base',
		paint: {
			'circle-color': ['get', 'text_color'],
			'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, 5, 26, 18],
			'circle-stroke-color': ['get', 'color'],
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
