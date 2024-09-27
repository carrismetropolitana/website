'use client';

/* * */

import CopyBadge from '@/components/common/CopyBadge/';
import { useDebugContext } from '@/contexts/Debug.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { IconsMap } from '@/settings/assets.settings';
import { Shape } from '@/types/lines.types';
import { Stop } from '@/types/stops.types';
import { Routes } from '@/utils/routes';
import { VehiclePosition } from '@/utils/types';
import * as turf from '@turf/turf';
import { FeatureCollection } from 'geojson';
import { useCallback, useEffect, useMemo } from 'react';
import Map, { GeolocateControl, Layer, Popup, Source, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

const MAP_DEFAULT_OPTIONS = {
	duration: 2000,
	maxZoom: 16,
	speed: 4000,
	zoom: 17,
	zoomMargin: 3,
};

/* * */

export default function FrontendStopsMap() {
	//

	//
	// A. Setup variables

	const debugContext = useDebugContext();

	const { frontendStopsMap } = useMap();
	const stopsSingleContext = useStopsSingleContext();

	//
	// B. Fetch data

	const { data: allStopsData } = useSWR<Stop[]>(`${Routes.API}/stops`);
	const { data: allVehiclesData } = useSWR<VehiclePosition[]>(`${Routes.API}/vehicles`, { refreshInterval: 5000 });
	// const { data: selectedPatternData } = useSWR<Pattern>(frontendStopsContext.data.active_pattern_group?.pattern_id && `${Routes.API}/v2/patterns/${frontendStopsContext.data.active_pattern_group.pattern_id}`);
	const selectedPatternData = stopsSingleContext.data.active_pattern_group;
	// console.log(frontendStopsContext.data.active_pattern_group, selectedPatternData);
	const { data: selectedShapeData } = useSWR<Shape>(stopsSingleContext.data.active_pattern_group?.shape_id && `${Routes.API}/shapes/${stopsSingleContext.data.active_pattern_group.shape_id}`);

	//
	// C. Transform data

	const allStopsMapData = useMemo(() => {
		const geoJSON: FeatureCollection = { features: [], type: 'FeatureCollection' };
		if (allStopsData) {
			for (const stop of allStopsData) {
				let currentStatus: string;
				switch (stop.operational_status) {
					default:
					case 'ACTIVE':
					case 'VOIDED':
						currentStatus = stop.operational_status;
						break;
					case 'SEASONAL':
					case 'PROVISIONAL':
						if (!stop.lines.length) currentStatus = 'inactive';
						else currentStatus = 'active';
						break;
				}
				geoJSON.features.push({
					geometry: {
						coordinates: [parseFloat(stop.lon), parseFloat(stop.lat)],
						type: 'Point',
					},
					properties: {
						current_status: currentStatus,
						id: stop.id,
						lat: stop.lat,
						lon: stop.lon,
						mapid: `${stop.id}`,
						name: stop.name,
					},
					type: 'Feature',
				});
			}
		}
		return geoJSON;
	}, [allStopsData]);

	const selectedStopMapData: {
		geometry: {
			coordinates: [number, number]
			type: 'Point'
		}
		properties: {
			id: string
		}
		type: 'Feature'
	} | undefined = useMemo(() => {
		if (stopsSingleContext.data.stop) {
			return {
				geometry: {
					coordinates: [parseFloat(stopsSingleContext.data.stop.lon), parseFloat(stopsSingleContext.data.stop.lat)],
					type: 'Point',
				},
				properties: {
					id: stopsSingleContext.data.stop.id,
				},
				type: 'Feature',
			};
		}
	}, [stopsSingleContext.data.stop]);

	const selectedShapeMapData = useMemo(() => {
		if (selectedPatternData && selectedShapeData) {
			return {
				...selectedShapeData.geojson,
				properties: {
					color: selectedPatternData.color,
					text_color: selectedPatternData.text_color,
				},
			};
		}
		return null;
	}, [selectedPatternData, selectedShapeData]);

	const selectedVehicleMapData: { geometry: { coordinates: [number, number], type: 'Point' } } & GeoJSON.Feature<GeoJSON.Geometry, {
		bearing: number
		block_id: string
		current_status: string
		delay: number
		id: string
		line_id: string
		pattern_id: string
		route_id: string
		schedule_relationship: string
		shift_id: string
		speed: number
		stop_id: string
		timestamp: number
		timeString: string
		trip_id: string
	}> | null = useMemo(() => {
		if (allVehiclesData && stopsSingleContext.data.active_trip_id) {
			const selectedVehicleData = allVehiclesData.find(item => item.trip_id && item.trip_id === stopsSingleContext.data.active_trip_id);
			if (selectedVehicleData) {
				return {
					geometry: {
						coordinates: [selectedVehicleData.lon, selectedVehicleData.lat],
						type: 'Point',
					},
					properties: {
						bearing: selectedVehicleData.bearing,
						block_id: selectedVehicleData.block_id,
						current_status: selectedVehicleData.current_status,
						delay: Math.floor(Date.now() / 1000) - selectedVehicleData.timestamp,
						id: selectedVehicleData.id,
						line_id: selectedVehicleData.line_id,
						pattern_id: selectedVehicleData.pattern_id,
						route_id: selectedVehicleData.route_id,
						schedule_relationship: selectedVehicleData.schedule_relationship,
						shift_id: selectedVehicleData.shift_id,
						speed: selectedVehicleData.speed,
						stop_id: selectedVehicleData.stop_id,
						timestamp: selectedVehicleData.timestamp,
						timeString: new Date(selectedVehicleData.timestamp * 1000).toLocaleString(),
						trip_id: selectedVehicleData.trip_id,
					},
					type: 'Feature',
				};
			}
		}
		return null;
	}, [allVehiclesData, stopsSingleContext.data.active_pattern_group?.trips, stopsSingleContext.data.active_trip_id]);

	// const selectedCoordinatesMapData = useMemo(() => {
	// 	if (frontendStopsContext.map.selected_coordinates) {
	// 		return {
	// 			geometry: {
	// 				coordinates: frontendStopsContext.map.selected_coordinates,
	// 				type: 'Point',
	// 			},
	// 			type: 'Feature',
	// 		};
	// 	}
	// 	return null;
	// }, [frontendStopsContext.map.selected_coordinates]);

	//
	// D. Handle actions

	useEffect(() => {
		if (!frontendStopsMap) return;
		const loadImage = async (id: string, url: string) => {
			const response = await frontendStopsMap.loadImage(url);
			frontendStopsMap.addImage(id, response.data);
		};
		const images = [
			{ id: 'shape-arrow-direction', url: IconsMap.shape_direction },
			{ id: 'cm-bus-regular', url: IconsMap.bus_regular },
			{ id: 'cm-bus-delay', url: IconsMap.bus_delay },
			{ id: 'stop-selected', url: IconsMap.stop_selected },
			{ id: 'map-pin', url: IconsMap.pin },
		];

		Promise.all(images.map(image => loadImage(image.id, image.url)));
		// Load direction arrows
	}, [frontendStopsMap]);

	useEffect(() => {
		if (selectedStopMapData && selectedVehicleMapData && frontendStopsMap) {
			// Get window width and height
			let fitBoundsPadding = 100;
			if (window.innerWidth < window.innerHeight) fitBoundsPadding = 50;
			// Fit map
			const collection = turf.featureCollection([selectedStopMapData, selectedVehicleMapData]);
			const boundingBox = turf.bbox(collection) as [number, number, number, number];
			frontendStopsMap.fitBounds(boundingBox, { bearing: frontendStopsMap.getBearing(), duration: 1000, maxZoom: 15, padding: fitBoundsPadding });
		}
	}, [selectedStopMapData, selectedVehicleMapData, frontendStopsMap]);

	//
	// E. Helper functions

	const moveMap = useCallback(
		(coordinates: [number, number]) => {
			if (!frontendStopsMap) return;
			// Get map current zoom level
			const currentZoom = frontendStopsMap.getZoom();
			const currentZoomWithMargin = currentZoom + MAP_DEFAULT_OPTIONS.zoomMargin;
			// Check if the given coordinates are inside the currently rendered map bounds
			const currentMapBounds = frontendStopsMap.getBounds().toArray();
			const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));
			// If the given coordinates are visible and the zoom is not too far back (plus a little margin)...
			if (isInside && currentZoomWithMargin > MAP_DEFAULT_OPTIONS.zoom) {
				// ...then simply ease to it.
				frontendStopsMap.easeTo({ center: coordinates, duration: MAP_DEFAULT_OPTIONS.speed * 0.25, zoom: currentZoom });
			}
			else {
				// If the zoom is too far, or the given coordinates are not visible, then fly to it
				frontendStopsMap.flyTo({ center: coordinates, duration: MAP_DEFAULT_OPTIONS.speed, zoom: MAP_DEFAULT_OPTIONS.zoom });
			}
		},
		[frontendStopsMap],
	);

	//
	// F. Handle actions

	// useEffect(() => {
	// 	// Check if map is ready
	// 	if (frontendStopsMap?.getSource('all-stops') === undefined) return;
	// 	// Check if auto zoom is enabled
	// 	if (!frontendStopsContext.map.auto_zoom) return;
	// 	// Check if there is a selected map feature
	// 	if (frontendStopsContext.map.selected_feature) return;
	// 	// Check if there is a selected stop id
	// 	if (!frontendStopsContext.entities.stop?.id) return;
	// 	// Find the corresponding map feature
	// 	const stopMapFeature = allStopsMapData?.features.find(f => f.properties?.id === frontendStopsContext.entities.stop?.id);
	// 	if (!stopMapFeature) return;
	// 	// Center the map and save the feature to state
	// 	moveMap(stopMapFeature.geometry?.coordinates);
	// 	frontendStopsContext.setSelectedFeature(stopMapFeature);
	// 	//
	// });

	// useEffect(() => {
	// 	if (frontendStopsContext.map.selected_coordinates) {
	// 		moveMap(frontendStopsContext.map.selected_coordinates);
	// 	}
	// }, [moveMap, frontendStopsContext.map.selected_coordinates]);

	const handleMapClick = (event) => {
		if (event?.features[0]?.properties?.id) {
			stopsSingleContext.actions.setStopId(event.features[0].properties.id);
			// frontendStopsContext.setSelectedFeature(event.features[0]);
			moveMap(event.features[0].geometry?.coordinates);
		}
	};

	const handleMapMouseEnter = (event) => {
		if (event?.features[0]?.properties?.id) {
			if (!frontendStopsMap) return;
			frontendStopsMap.getCanvas().style.cursor = 'pointer';
		}
	};

	const handleMapMouseLeave = (event) => {
		if (event?.features[0]?.properties?.id) {
			if (!frontendStopsMap) return;
			frontendStopsMap.getCanvas().style.cursor = 'default';
		}
	};

	// const handleMapMove = () => {
	// 	// Get all currently rendered features and mark all of them as unselected
	// 	const allRenderedFeatures = frontendStopsMap.queryRenderedFeatures();
	// 	allRenderedFeatures.forEach(function (f) {
	// 		frontendStopsMap.setFeatureState({ id: f.id, source: 'all-stops' }, { selected: false });
	// 	});
	// 	// Then mark the selected one as selected
	// 	if (frontendStopsContext.map.selected_feature) {
	// 		frontendStopsMap.setFeatureState({ id: frontendStopsContext.map.selected_feature.properties.mapid, source: 'all-stops' }, { selected: true });
	// 	}
	// };

	//
	// G. Render components

	return (
		<div className={styles.map}>
			{ stopsSingleContext.data.stop
			&& (

				<Map
					id="frontendStopsMap"
					interactiveLayerIds={['all-stops']}
					mapStyle="https://maps.carrismetropolitana.pt/styles/default/style.json"
					onClick={handleMapClick}
					onMouseEnter={handleMapMouseEnter}
					onMouseLeave={handleMapMouseLeave}
					style={{ height: '100%', width: '100%' }}
					initialViewState={{
						latitude: parseFloat(stopsSingleContext.data.stop.lat),
						longitude: parseFloat(stopsSingleContext.data.stop.lon),
						zoom: 15,
					}}
				>
					<GeolocateControl />
					{selectedVehicleMapData && debugContext.flags.is_debug_mode
					&& (
						<Popup anchor="bottom" className={styles.popupWrapper} closeButton={false} closeOnClick={false} latitude={selectedVehicleMapData.geometry.coordinates[1]} longitude={selectedVehicleMapData.geometry.coordinates[0]} maxWidth="none">
							<CopyBadge label={`Vehicle ID: ${selectedVehicleMapData.properties.id}`} value={selectedVehicleMapData.properties.id} />
							<CopyBadge label={`Timestamp: ${selectedVehicleMapData.properties.timeString}`} value={selectedVehicleMapData.properties.timeString} />
							<CopyBadge label={`Delay: ${selectedVehicleMapData.properties.delay} seconds`} value={selectedVehicleMapData.properties.delay} />
							<CopyBadge label={`Trip ID: ${selectedVehicleMapData.properties.trip_id}`} value={selectedVehicleMapData.properties.trip_id} />
							<CopyBadge label={`Status: ${selectedVehicleMapData.properties.current_status}: ${selectedVehicleMapData.properties.stop_id}`} value={selectedVehicleMapData.properties.current_status} />
							<CopyBadge label={`Block ID: ${selectedVehicleMapData.properties.block_id}`} value={selectedVehicleMapData.properties.block_id} />
							<CopyBadge label={`Shift ID: ${selectedVehicleMapData.properties.shift_id}`} value={selectedVehicleMapData.properties.shift_id} />
						</Popup>
					)}
					{selectedVehicleMapData
					&& (
						<Source data={selectedVehicleMapData} generateId={true} id="selected-vehicle" type="geojson">
							<Layer
								id="selected-vehicle"
								source="selected-vehicle"
								type="symbol"
								layout={{
									'icon-allow-overlap': true,
									'icon-anchor': 'center',
									'icon-ignore-placement': true,
									'icon-image': 'cm-bus-regular',
									'icon-offset': [0, 0],
									'icon-rotate': ['get', 'bearing'],
									'icon-rotation-alignment': 'map',
									'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.05, 20, 0.15],
									'symbol-placement': 'point',
								}}
							/>
							<Layer
								id="selected-vehicle-dead"
								source="selected-vehicle"
								type="symbol"
								layout={{
									'icon-allow-overlap': true,
									'icon-anchor': 'center',
									'icon-ignore-placement': true,
									'icon-image': 'cm-bus-delay',
									'icon-offset': [0, 0],
									'icon-rotate': ['get', 'bearing'],
									'icon-rotation-alignment': 'map',
									'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.05, 20, 0.15],
									'symbol-placement': 'point',
								}}
								paint={{
									'icon-opacity': ['interpolate', ['linear'], ['get', 'delay'], 20, 0, 40, 1],
								}}
							/>
						</Source>
					)}
					{/* {frontendStopsContext.map.selected_coordinates != null
			&& (
				<Source data={selectedCoordinatesMapData} generateId={true} id="selected-coordinates" type="geojson">
					<Layer
						id="selected-coordinates-pin"
						source="selected-coordinates"
						type="symbol"
						layout={{
							'icon-allow-overlap': true,
							'icon-anchor': 'bottom',
							'icon-ignore-placement': true,
							'icon-image': 'map-pin',
							'icon-offset': [0, 5],
							'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.25, 20, 0.35],
							'symbol-placement': 'point',
						}}
						paint={{
							'icon-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 10, 1],
						}}
					/>
				</Source>
			)} */}
					{selectedStopMapData
					&& (
						<Source data={selectedStopMapData} generateId={true} id="selected-stop" type="geojson">
							<Layer
								beforeId={(selectedVehicleMapData && 'selected-vehicle') || undefined}
								id="selected-stop"
								source="selected-stop"
								type="symbol"
								layout={{
									'icon-allow-overlap': true,
									'icon-anchor': 'bottom',
									'icon-ignore-placement': true,
									'icon-image': 'stop-selected',
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
					{allStopsMapData
					&& (
						<Source data={allStopsMapData} generateId={false} id="all-stops" promoteId="mapid" type="geojson">
							<Layer
								beforeId={selectedStopMapData && 'selected-stop'}
								id="all-stops"
								source="all-stops"
								type="circle"
								paint={{
									'circle-color':
									['match',
										['get', 'current_status'],
										'inactive',
										'#e6e6e6',
										'#ffdd01'],
									'circle-pitch-alignment': 'map',
									'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 25, 20]],
									'circle-stroke-color':
									['match',
										['get', 'current_status'],
										'inactive',
										'#969696',
										'voided',
										'#cc5533',
										'#000000'],
									'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 9, 0.01, 26, ['case', ['boolean', ['feature-state', 'selected'], false], 8, 7]],
								}}
							/>
						</Source>
					)}
					{selectedShapeMapData
					&& (
						<Source data={selectedShapeMapData} generateId={true} id="selected-shape" type="geojson">
							<Layer
								beforeId="all-stops"
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
				</Map>
			)}
		</div>
	);

	//
}
