'use client';

/* * */

import CopyBadge from '@/components/CopyBadge/CopyBadge';
import OSMMap from '@/components/OSMMap/OSMMap';
import { useDebugContext } from '@/contexts/DebugContext';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import generateUUID from '@/services/generateUUID';
import * as turf from '@turf/turf';
import { useCallback, useEffect, useMemo } from 'react';
import { GeolocateControl, Layer, Popup, Source, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './FrontendLinesMap.module.css';

/* * */

const MAP_DEFAULT_OPTIONS = {
	duration: 2000,
	maxZoom: 16,
	speed: 4000,
	zoom: 17,
	zoomMargin: 3,
};

/* * */

export default function FrontendLinesMap() {
	//

	//
	// A. Setup variables

	const debugContext = useDebugContext();

	const { frontendLinesMap } = useMap();
	const frontendLinesContext = useFrontendLinesContext();

	//
	// B. Fetch data

	const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
	const { data: allVehiclesData } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
	const { data: selectedShapeData } = useSWR(frontendLinesContext.entities?.pattern?.shape_id && `https://api.carrismetropolitana.pt/shapes/${frontendLinesContext.entities.pattern.shape_id}`);

	//
	// C. Transform data

	const allStopsMapData = useMemo(() => {
		const geoJSON = { features: [], type: 'FeatureCollection' };
		if (allStopsData) {
			for (const stop of allStopsData) {
				geoJSON.features.push({
					geometry: { coordinates: [stop.lon, stop.lat], type: 'Point' },
					properties: {
						id: stop.id,
						lat: stop.lat,
						lon: stop.lon,
						mapid: `${stop.id}|${generateUUID()}`,
						name: stop.name,
					},
					type: 'Feature',
				});
			}
		}
		return geoJSON;
	}, [allStopsData]);

	const patternStopsMapData = useMemo(() => {
		if (!frontendLinesContext.entities.pattern?.path?.length) return null;
		const geoJSON = { features: [], type: 'FeatureCollection' };
		for (const patternPath of frontendLinesContext.entities.pattern.path) {
			geoJSON.features.push({
				geometry: { coordinates: [patternPath.stop.lon, patternPath.stop.lat], type: 'Point' },
				properties: {
					color: frontendLinesContext.entities.pattern.color,
					id: patternPath.stop.id,
					lat: patternPath.stop.lat,
					lon: patternPath.stop.lon,
					mapid: `${patternPath.stop.id}|${generateUUID()}`,
					name: patternPath.stop.name,
					stop_sequence: patternPath.stop_sequence,
					text_color: frontendLinesContext.entities.pattern.text_color,
				},
				type: 'Feature',
			});
		}
		return geoJSON;
	}, [frontendLinesContext.entities.pattern]);

	const selectedStopMapData = useMemo(() => {
		if (!frontendLinesContext.entities.pattern?.color || !frontendLinesContext.entities.stop?.lon) return null;
		return {
			geometry: {
				coordinates: [frontendLinesContext.entities.stop.lon, frontendLinesContext.entities.stop.lat],
				type: 'Point',
			},
			properties: {
				color: frontendLinesContext.entities.pattern.color,
				text_color: frontendLinesContext.entities.pattern.text_color,
			},
			type: 'Feature',
		};
	}, [frontendLinesContext.entities.pattern, frontendLinesContext.entities.stop]);

	const selectedShapeMapData = useMemo(() => {
		if (!frontendLinesContext.entities.pattern?.color || !selectedShapeData) return null;
		return {
			...selectedShapeData.geojson,
			properties: {
				color: frontendLinesContext.entities.pattern.color || '#000000',
				text_color: frontendLinesContext.entities.pattern.text_color || '#ffffff',
			},
		};
	}, [frontendLinesContext.entities.pattern, selectedShapeData]);

	const selectedVehiclesMapData = useMemo(() => {
		if (!allVehiclesData || !frontendLinesContext.entities.pattern?.id) return null;
		const geoJSON = { features: [], type: 'FeatureCollection' };
		const selectedVehiclesData = allVehiclesData.filter(item => item.pattern_id === frontendLinesContext.entities.pattern.id);
		geoJSON.features = selectedVehiclesData.map((vehicleData) => {
			return {
				geometry: {
					coordinates: [vehicleData.lon, vehicleData.lat],
					type: 'Point',
				},
				properties: {
					bearing: vehicleData.bearing,
					block_id: vehicleData.block_id,
					current_status: vehicleData.current_status,
					delay: Math.floor(Date.now() / 1000) - vehicleData.timestamp,
					id: vehicleData.id,
					line_id: vehicleData.line_id,
					pattern_id: vehicleData.pattern_id,
					route_id: vehicleData.route_id,
					schedule_relationship: vehicleData.schedule_relationship,
					shift_id: vehicleData.shift_id,
					speed: vehicleData.speed,
					stop_id: vehicleData.stop_id,
					timeString: new Date(vehicleData.timestamp * 1000).toLocaleString(),
					timestamp: vehicleData.timestamp,
					trip_id: vehicleData.trip_id,
				},
				type: 'Feature',
			};
		});
		return geoJSON;
	}, [allVehiclesData, frontendLinesContext.entities.pattern?.id]);

	useEffect(() => {
		if (!frontendLinesMap) return;
		// Load direction arrows
		frontendLinesMap.loadImage('https://beta.carrismetropolitana.pt/icons/shape-arrow-direction.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('shape-arrow-direction', image, { sdf: true });
		});
		// Load vehicle symbol
		frontendLinesMap.loadImage('https://beta.carrismetropolitana.pt/icons/cm-bus-regular.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('cm-bus-regular', image, { sdf: false });
		});
		// Load vehicle symbol
		frontendLinesMap.loadImage('https://beta.carrismetropolitana.pt/icons/cm-bus-delay.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('cm-bus-delay', image, { sdf: false });
		});
		// Load stop selected symbol
		frontendLinesMap.loadImage('https://beta.carrismetropolitana.pt/icons/map-stop-selected.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('stop-selected', image, { sdf: false });
		});
		// Load pin symbol
		frontendLinesMap.loadImage('https://beta.carrismetropolitana.pt/icons/map-pin.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('map-pin', image, { sdf: false });
		});
	}, [frontendLinesMap]);

	useEffect(() => {
		if (selectedShapeMapData && frontendLinesContext.map.auto_zoom) {
			// Get window width and height
			let fitBoundsPadding = 100;
			if (window.innerWidth < window.innerHeight) fitBoundsPadding = 50;
			// Fit map
			const collection = turf.featureCollection([selectedShapeMapData]);
			const boundingBox = turf.bbox(collection);
			frontendLinesMap.fitBounds(boundingBox, { bearing: frontendLinesMap.getBearing(), duration: 2000, maxZoom: 16, padding: fitBoundsPadding });
		}
	}, [selectedShapeMapData, selectedVehiclesMapData, frontendLinesMap, frontendLinesContext.map.auto_zoom]);

	//
	// E. Helper functions

	const moveMap = useCallback(
		(coordinates) => {
			if (!frontendLinesMap) return;
			// Get map current zoom level
			const currentZoom = frontendLinesMap.getZoom();
			const currentZoomWithMargin = currentZoom + MAP_DEFAULT_OPTIONS.zoomMargin;
			// Check if the given coordinates are inside the currently rendered map bounds
			const currentMapBounds = frontendLinesMap.getBounds().toArray();
			const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));
			// If the given coordinates are visible and the zoom is not too far back (plus a little margin)...
			if (isInside && currentZoomWithMargin > MAP_DEFAULT_OPTIONS.zoom) {
				// ...then simply ease to it.
				frontendLinesMap.easeTo({ center: coordinates, duration: MAP_DEFAULT_OPTIONS.speed * 0.25, zoom: currentZoom });
			}
			else {
				// If the zoom is too far, or the given coordinates are not visible, then fly to it
				frontendLinesMap.flyTo({ center: coordinates, duration: MAP_DEFAULT_OPTIONS.speed, zoom: MAP_DEFAULT_OPTIONS.zoom });
			}
		},
		[frontendLinesMap],
	);

	//
	// C. Render components

	useEffect(() => {
		// Check if map is ready
		if (frontendLinesMap && frontendLinesMap?.getSource('all-stops') === undefined) return;
		// Check if auto zoom is enabled
		if (!frontendLinesContext.map.auto_zoom) return;
		// Check if there is a selected map feature
		if (frontendLinesContext.map.selected_feature) return;
		// Check if there is a selected stop id
		if (!frontendLinesContext.entities.stop?.id) return;
		// Find the corresponding map feature
		const stopMapFeature = allStopsMapData?.features.find(f => f.properties?.id === frontendLinesContext.entities.stop?.id);
		if (!stopMapFeature) return;
		// Center the map and save the feature to state
		moveMap(stopMapFeature.geometry?.coordinates);
		frontendLinesContext.setSelectedFeature(stopMapFeature);
		//
	});

	const handleMapClick = (event) => {
		if (event?.features[0]?.properties?.id) {
			const foundStopInPath = frontendLinesContext.entities.pattern.path.find(item => item.stop.id === event.features[0].properties.id && item.stop_sequence === event.features[0].properties.stop_sequence);
			if (foundStopInPath) {
				frontendLinesContext.selectStop(foundStopInPath.stop, foundStopInPath.stop_sequence);
				moveMap(event.features[0].geometry?.coordinates);
			}
		}
	};

	const handleMapMouseEnter = (event) => {
		if (event?.features[0]?.properties?.id) {
			frontendLinesMap.getCanvas().style.cursor = 'pointer';
		}
	};

	const handleMapMouseLeave = (event) => {
		if (event?.features[0]?.properties?.id) {
			frontendLinesMap.getCanvas().style.cursor = 'default';
		}
	};

	const handleMapMove = () => {
		frontendLinesContext.disableAutoZoom();
	};

	useEffect(() => {
		if (frontendLinesContext.entities.stop) {
			moveMap([frontendLinesContext.entities.stop.lon, frontendLinesContext.entities.stop.lat]);
		}
	}, [frontendLinesContext.entities.stop, moveMap]);

	//
	// C. Render components

	return (
		<OSMMap id="frontendLinesMap" interactiveLayerIds={['pattern-stops']} mapStyle={frontendLinesContext.map.style} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove}>
			<GeolocateControl />
			{selectedVehiclesMapData
			&& debugContext.isDebug
			&& selectedVehiclesMapData.features.map(vehicle => (
				<Popup key={vehicle.properties.id} anchor="bottom" className={styles.popupWrapper} closeButton={false} closeOnClick={false} latitude={vehicle.geometry.coordinates[1]} longitude={vehicle.geometry.coordinates[0]} maxWidth="none" offset={15}>
					<CopyBadge label={`Vehicle ID: ${vehicle.properties.id}`} value={vehicle.properties.id} />
					<CopyBadge label={`Timestamp: ${vehicle.properties.timeString}`} value={vehicle.properties.timeString} />
					<CopyBadge label={`Delay: ${vehicle.properties.delay} seconds`} value={vehicle.properties.delay} />
					<CopyBadge label={`Trip ID: ${vehicle.properties.trip_id}`} value={vehicle.properties.trip_id} />
					<CopyBadge label={`Status: ${vehicle.properties.current_status}: ${vehicle.properties.stop_id}`} value={vehicle.properties.current_status} />
					<CopyBadge label={`Block ID: ${vehicle.properties.block_id}`} value={vehicle.properties.block_id} />
					<CopyBadge label={`Shift ID: ${vehicle.properties.shift_id}`} value={vehicle.properties.shift_id} />
				</Popup>
			),

			)}
			{selectedVehiclesMapData
			&& (
				<Source data={selectedVehiclesMapData} generateId={true} id="selected-vehicles" type="geojson">
					<Layer
						id="selected-vehicles-delay"
						source="selected-vehicles"
						type="symbol"
						layout={{
							'icon-allow-overlap': true,
							'icon-anchor': 'center',
							'icon-ignore-placement': true,
							'icon-image': 'cm-bus-delay',
							'icon-offset': [0, 0],
							'icon-rotate': ['get', 'bearing'],
							'icon-rotation-alignment': 'map',
							'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
							'symbol-placement': 'point',
						}}
						paint={{
							'icon-opacity': ['interpolate', ['linear', 0.5], ['get', 'delay'], 20, 0, 40, 1],
						}}
					/>
					<Layer
						beforeId="selected-vehicles-delay"
						id="selected-vehicles-normal"
						source="selected-vehicles"
						type="symbol"
						layout={{
							'icon-allow-overlap': true,
							'icon-anchor': 'center',
							'icon-ignore-placement': true,
							'icon-image': 'cm-bus-regular',
							'icon-offset': [0, 0],
							'icon-rotate': ['get', 'bearing'],
							'icon-rotation-alignment': 'map',
							'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
							'symbol-placement': 'point',
						}}
					/>
				</Source>
			)}
			{selectedStopMapData
			&& (
				<Source data={selectedStopMapData} generateId={true} id="selected-stop" type="geojson">
					<Layer
						beforeId={selectedVehiclesMapData && 'selected-vehicles-normal'}
						id="selected-stop-stick"
						source="selected-stop"
						type="symbol"
						layout={{
							'icon-allow-overlap': true,
							'icon-anchor': 'bottom',
							'icon-ignore-placement': true,
							'icon-image': 'stop-selected',
							'icon-offset': [0, 5],
							'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.1, 20, 0.25],
							'symbol-placement': 'point',
						}}
						paint={{
							'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 7, 0, 10, 1],
						}}
					/>
					<Layer
						beforeId="selected-stop-stick"
						id="selected-stop-base"
						source="selected-stop"
						type="circle"
						paint={{
							'circle-color': ['get', 'text_color'],
							'circle-pitch-alignment': 'map',
							'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, 5, 26, 18],
							'circle-stroke-color': ['get', 'color'],
							'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 5],
						}}
					/>
				</Source>
			)}
			{patternStopsMapData
			&& (
				<Source data={patternStopsMapData} generateId={true} id="pattern-stops" type="geojson">
					<Layer
						beforeId={selectedStopMapData ? 'selected-stop-base' : selectedVehiclesMapData && 'selected-vehicles-normal'}
						id="pattern-stops"
						source="pattern-stops"
						type="circle"
						paint={{
							'circle-color': ['get', 'text_color'],
							'circle-pitch-alignment': 'map',
							'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 15],
							'circle-stroke-color': ['get', 'color'],
							'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 7],
						}}
					/>
				</Source>
			)}
			{selectedShapeMapData
			&& (
				<Source data={selectedShapeMapData} generateId={true} id="selected-shape" type="geojson">
					<Layer
						beforeId={patternStopsMapData && 'pattern-stops'}
						id="selected-shape-direction"
						source="selected-shape"
						type="symbol"
						layout={{
							'icon-allow-overlap': true,
							'icon-anchor': 'center',
							'icon-ignore-placement': true,
							'icon-image': 'shape-arrow-direction',
							'icon-offset': [0, 0],
							'icon-rotate': 90,
							'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.1, 20, 0.2],
							'symbol-placement': 'line',
							'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 10, 2, 20, 30],
						}}
						paint={{
							'icon-color': ['get', 'text_color'],
							'icon-opacity': 0.8,
						}}
					/>
					<Layer
						beforeId="selected-shape-direction"
						id="selected-shape-line"
						source="selected-shape"
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
			)}
		</OSMMap>
	);

	//
}
