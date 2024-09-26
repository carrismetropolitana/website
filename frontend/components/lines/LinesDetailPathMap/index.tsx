'use client';

import LiveIcon from '@/components/common/LiveIcon';
import Map from '@/components/common/Map';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { Path, PatternGroup } from '@/types/lines.types';
import { Stop } from '@/types/stops.types';
import { IconsMap } from '@/utils/assets';
import { moveMap } from '@/utils/map';
import { Routes } from '@/utils/routes';
import { VehiclePosition } from '@/utils/types';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import { CircleLayer, Layer, LineLayer, Source, SymbolLayer, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './styles.module.css';

/** Main component rendering the map and associated layers */
export default function Component() {
	//
	// A. Setup variables
	const { linesSingleMap } = useMap();
	const linesDetailContext = useLinesDetailContext();
	const t = useTranslations('lines.LinesDetailPathMap');

	//
	// B. Fetch data (refreshes every 10 seconds)
	const { data: allVehiclesData } = useSWR<VehiclePosition[]>(`${Routes.API}/v2/vehicles`, {
		refreshInterval: 10000,
	});

	//
	// C. Transform Data

	// Move map to selected stop
	useEffect(() => {
		if (!linesDetailContext.data.active_stop?.stop) return;
		if (!linesSingleMap) return;
		const coordinates = [Number(linesDetailContext.data.active_stop.stop.lon), Number(linesDetailContext.data.active_stop?.stop.lat)];
		if (coordinates.some(isNaN)) return;

		moveMap(linesSingleMap, coordinates);
	}, [linesDetailContext.data.active_stop, linesSingleMap]);

	//
	useEffect(() => {
		if (!linesSingleMap) return;
		// Load direction arrows
		linesSingleMap.loadImage(IconsMap.MAP_SHAPE_ARROW_DIRECTION).then((image) => {
			linesSingleMap.addImage('shape-arrow-direction', image.data, { sdf: true });
		});

		// Load vehicle symbol
		linesSingleMap.loadImage(IconsMap.MAP_CM_BUS_REGULAR).then((image) => {
			linesSingleMap.addImage('cm-bus-regular', image.data, { sdf: false });
		});
		// Load vehicle symbol
		linesSingleMap.loadImage(IconsMap.MAP_CM_BUS_DELAY).then((image) => {
			linesSingleMap.addImage('cm-bus-delay', image.data, { sdf: false });
		});
		// Load stop selected symbol
		linesSingleMap.loadImage(IconsMap.MAP_STOP_SELECTED).then((image) => {
			linesSingleMap.addImage('stop-selected', image.data, { sdf: false });
		});
		// Load pin symbol
		linesSingleMap.loadImage(IconsMap.MAP_PIN).then((image) => {
			linesSingleMap.addImage('map-pin', image.data, { sdf: false });
		});
	}, [linesSingleMap]);

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
	const activeVehiclesGeojson = useMemo(() => generateActiveVehiclesGeojson(allVehiclesData, linesDetailContext.data.active_pattern_group), [
		linesDetailContext.data.active_pattern_group,
		allVehiclesData,
	]);

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
	const vehiclesStyle = generateVehiclesStyle();
	const selectedStopBaseStyle = generateStopBaseStyle();
	const selectedStopStickStyle = generateStopStickStyle();

	//
	// G. Render Map and Layers
	return (
		<Map
			id="linesSingleMap"
			interactiveLayerIds={['stops']}
			onClick={handleLayerClick}
		>
			{/* Route Shape */}
			{linesDetailContext.data.active_shape?.geojson && (
				<Source data={linesDetailContext.data.active_shape.geojson} id="shape" type="geojson">
					<Layer beforeId="stops" {...shapeStyle} />
					<Layer {...shapeArrowStyle} />
				</Source>
			)}

			{/* Selected Stop */}
			{selectedStopMapData && (
				<Source data={selectedStopMapData} generateId={true} id="selected-stop" type="geojson">
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

			{/* Vehicles */}
			{activeVehiclesGeojson && (
				<Source data={activeVehiclesGeojson} id="vehicles" type="geojson">
					<Layer {...vehiclesStyle} />
				</Source>
			)}

			{/* Active vehicles counter */}
			{activeVehiclesGeojson?.features && activeVehiclesGeojson?.features.length > 0 && (
				<div className={styles.mapOverlay}>
					<LiveIcon />
					{t('active_vehicles_counter', { count: activeVehiclesGeojson.features.length })}
				</div>
			)}
		</Map>
	);
}

/** Utility Functions **/

// Generates GeoJSON for active vehicles
function generateActiveVehiclesGeojson(allVehiclesData, activePatternGroup) {
	if (!allVehiclesData) return null;
	const activeVehicles = allVehiclesData.filter(vehicleItem => vehicleItem.pattern_id === activePatternGroup?.pattern_id);

	return {
		features: activeVehicles.map(vehicleItem => ({
			geometry: { coordinates: [vehicleItem.lon, vehicleItem.lat], type: 'Point' },
			properties: { ...vehicleItem, delay: Math.floor(Date.now() / 1000) - vehicleItem.timestamp },
			type: 'Feature',
		})),
		type: 'FeatureCollection',
	};
}

// Generates GeoJSON for stops
function generateStopsGeoJson(stops?: Path[]) {
	if (!stops) return null;
	return {
		features: stops.map(stop => ({
			geometry: { coordinates: [parseFloat(stop.stop.lon), parseFloat(stop.stop.lat)], type: 'Point' },
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

// Generates style for vehicles
function generateVehiclesStyle(): SymbolLayer {
	return {
		id: 'vehicles',
		layout: {
			'icon-image': 'cm-bus-regular',
			'icon-rotate': ['get', 'bearing'],
			'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.05, 20, 0.15],
		},
		source: 'vehicles',
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
