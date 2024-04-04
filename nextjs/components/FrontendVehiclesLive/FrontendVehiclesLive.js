'use client';

/* * */

import useSWR from 'swr';
import OSMMap from '@/components/OSMMap/OSMMap';
import styles from './FrontendVehiclesLive.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as turf from '@turf/turf';
import { useMap, Source, Layer, Popup, GeolocateControl } from 'react-map-gl/maplibre';
import { useDebugContext } from '@/contexts/DebugContext';
import generateUUID from '@/services/generateUUID';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import { useTranslations } from 'next-intl';
/* * */

const MAP_DEFAULT_OPTIONS = {
	speed: 4000,
	duration: 2000,
	zoom: 17,
	zoomMargin: 3,
	maxZoom: 16,
};

/* * */

export default function FrontendLinesLive() {
	//

	//
	// A. Setup variables

	const debugContext = useDebugContext();

	const { frontendLinesMap } = useMap();
	// const frontendLinesContext = useFrontendLinesContext();
	const [selectedVehicle, setSelectedVehicle] = useState(null);
	const t = useTranslations('FrontendVehiclesLive');

	//
	// B. Fetch data

	const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
	const { data: allVehiclesData } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
	// const { data: selectedShapeData } = useSWR(frontendLinesContext.entities?.pattern?.shape_id && `https://api.carrismetropolitana.pt/shapes/${frontendLinesContext.entities.pattern.shape_id}`);
	const { data: vehiclesInfo } = useSWR('/vehicles/info.json');

	//
	// C. Transform data
	let mappedVehiclesInfo = new Map;
	if (vehiclesInfo) {
		for (const vehicleInfo of vehiclesInfo) {
			let relevantInfo = {
				owner: vehicleInfo.owner,
				make: vehicleInfo.make,
				model: vehicleInfo.model,
				available_seats: vehicleInfo.available_seats,
				available_standing: vehicleInfo.available_standing,
				propulsion: t('propulsion.' + vehicleInfo.propulsion),
				climatization: !!vehicleInfo.climatization,
				wheelchair: vehicleInfo.wheelchair ? 'manual' : vehicleInfo.folding_system ? 'eletric' : null,
				bicycles: !!vehicleInfo.bicycles,
			};
			mappedVehiclesInfo.set(vehicleInfo.id, relevantInfo);
		}
	}
	// [  {
	//   "agency_id": 43,
	//   "vehicle_number": 2000,
	//   "id": "43|2000",
	//   "start_date": 20220901,
	//   "license_plate": "AS96CP",
	//   "make": "IVECO",
	//   "model": "Daily 70C21 Itrabus I",
	//   "owner": "TST",
	//   "registration_date": 20220901,
	//   "available_seats": 24,
	//   "available_standing": 9,
	//   "typology": 1,
	//   "vclass": 1,
	//   "propulsion": 2,
	//   "emission": 6,
	//   "new_seminew": 0,
	//   "ecological": 0,
	//   "climatization": 1,
	//   "wheelchair": 1,
	//   "corridor": 0,
	//   "lowered_floor": 0,
	//   "ramp": 1,
	//   "folding_system": 1,
	//   "kneeling": 0,
	//   "static_information": 1,
	//   "onboard_monitor": 1,
	//   "front_display": 1,
	//   "rear_display": 1,
	//   "side_display": 1,
	//   "internal_sound": 1,
	//   "external_sound": 1,
	//   "consumption_meter": 1,
	//   "bicycles": 1,
	//   "passenger_counting": 0,
	//   "video_surveillance": 0
	// },...]

	const selectedShapeData = null;

	const allStopsMapData = useMemo(() => {
		const geoJSON = { type: 'FeatureCollection', features: [] };
		if (allStopsData) {
			for (const stop of allStopsData) {
				geoJSON.features.push({
					type: 'Feature',
					geometry: { type: 'Point', coordinates: [stop.lon, stop.lat] },
					properties: {
						mapid: `${stop.id}|${generateUUID()}`,
						id: stop.id,
						name: stop.name,
						lat: stop.lat,
						lon: stop.lon,
					},
				});
			}
		}
		return geoJSON;
	}, [allStopsData]);

	// const patternStopsMapData = useMemo(() => {
	// 	if (!frontendLinesContext.entities.pattern?.path?.length) return null;
	// 	const geoJSON = { type: 'FeatureCollection', features: [] };
	// 	for (const patternPath of frontendLinesContext.entities.pattern.path) {
	// 		geoJSON.features.push({
	// 			type: 'Feature',
	// 			geometry: { type: 'Point', coordinates: [patternPath.stop.lon, patternPath.stop.lat] },
	// 			properties: {
	// 				mapid: `${patternPath.stop.id}|${generateUUID()}`,
	// 				id: patternPath.stop.id,
	// 				name: patternPath.stop.name,
	// 				lat: patternPath.stop.lat,
	// 				lon: patternPath.stop.lon,
	// 				stop_sequence: patternPath.stop_sequence,
	// 				color: frontendLinesContext.entities.pattern.color,
	// 				text_color: frontendLinesContext.entities.pattern.text_color,
	// 			},
	// 		});
	// 	}
	// 	return geoJSON;
	// }, [frontendLinesContext.entities.pattern]);

	// const selectedStopMapData = useMemo(() => {
	// 	if (!frontendLinesContext.entities.pattern?.color || !frontendLinesContext.entities.stop?.lon) return null;
	// 	return {
	// 		type: 'Feature',
	// 		geometry: {
	// 			type: 'Point',
	// 			coordinates: [frontendLinesContext.entities.stop.lon, frontendLinesContext.entities.stop.lat],
	// 		},
	// 		properties: {
	// 			color: frontendLinesContext.entities.pattern.color,
	// 			text_color: frontendLinesContext.entities.pattern.text_color,
	// 		},
	// 	};
	// }, [frontendLinesContext.entities.pattern, frontendLinesContext.entities.stop]);

	// const selectedShapeMapData = useMemo(() => {
	// 	if (!frontendLinesContext.entities.pattern?.color || !selectedShapeData) return null;
	// 	return {
	// 		...selectedShapeData.geojson,
	// 		properties: {
	// 			color: frontendLinesContext.entities.pattern.color || '#000000',
	// 			text_color: frontendLinesContext.entities.pattern.text_color || '#ffffff',
	// 		},
	// 	};
	// }, [frontendLinesContext.entities.pattern, selectedShapeData]);

	const selectedVehiclesMapData = useMemo(() => {
		if (!allVehiclesData) return null;
		const geoJSON = { type: 'FeatureCollection', features: [] };
		// console.log(allVehiclesData);
		geoJSON.features = allVehiclesData.map(vehicleData => {
			return {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [vehicleData.lon, vehicleData.lat],
				},
				properties: {
					id: vehicleData.id,
					timestamp: vehicleData.timestamp,
					timeString: new Date(vehicleData.timestamp * 1000).toLocaleString(),
					delay: Math.floor(Date.now() / 1000) - vehicleData.timestamp,
					schedule_relationship: vehicleData.schedule_relationship,
					trip_id: vehicleData.trip_id,
					pattern_id: vehicleData.pattern_id,
					route_id: vehicleData.route_id,
					line_id: vehicleData.line_id,
					stop_id: vehicleData.stop_id,
					current_status: vehicleData.current_status,
					block_id: vehicleData.block_id,
					shift_id: vehicleData.shift_id,
					bearing: vehicleData.bearing,
					speed: vehicleData.speed,
					selected: vehicleData.id === selectedVehicle,
				},
			};
		});
		return geoJSON;
	}, [allVehiclesData, selectedVehicle]);

	useEffect(() => {
		if (!frontendLinesMap) return;
		// Load direction arrows
		frontendLinesMap.loadImage('/icons/shape-arrow-direction.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('shape-arrow-direction', image, { sdf: true });
		});
		// Load vehicle symbol
		frontendLinesMap.loadImage('/icons/cm-bus-regular.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('cm-bus-regular', image, { sdf: false });
		});
		// Load vehicle symbol
		frontendLinesMap.loadImage('/icons/cm-bus-delay.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('cm-bus-delay', image, { sdf: false });
		});
		// Load stop selected symbol
		frontendLinesMap.loadImage('/icons/map-stop-selected.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('stop-selected', image, { sdf: false });
		});
		// Load pin symbol
		frontendLinesMap.loadImage('/icons/map-pin.png', (error, image) => {
			if (error) throw error;
			frontendLinesMap.addImage('map-pin', image, { sdf: false });
		});
	}, [frontendLinesMap]);

	// useEffect(() => {
	// 	if (selectedShapeMapData && frontendLinesContext.map.auto_zoom) {
	// 		// Get window width and height
	// 		let fitBoundsPadding = 100;
	// 		if (window.innerWidth < window.innerHeight) fitBoundsPadding = 50;
	// 		// Fit map
	// 		const collection = turf.featureCollection([selectedShapeMapData]);
	// 		const boundingBox = turf.bbox(collection);
	// 		frontendLinesMap.fitBounds(boundingBox, { duration: 2000, padding: fitBoundsPadding, bearing: frontendLinesMap.getBearing(), maxZoom: 16 });
	// 	}
	// }, [selectedShapeMapData, selectedVehiclesMapData, frontendLinesMap, frontendLinesContext.map.auto_zoom]);

	//
	// E. Helper functions

	const moveMap = useCallback(
		coordinates => {
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
				frontendLinesMap.easeTo({ center: coordinates, zoom: currentZoom, duration: MAP_DEFAULT_OPTIONS.speed * 0.25 });
			} else {
				// If the zoom is too far, or the given coordinates are not visible, then fly to it
				frontendLinesMap.flyTo({ center: coordinates, zoom: MAP_DEFAULT_OPTIONS.zoom, duration: MAP_DEFAULT_OPTIONS.speed });
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
		// if (!frontendLinesContext.map.auto_zoom) return;
		// // Check if there is a selected map feature
		// if (frontendLinesContext.map.selected_feature) return;
		// // Check if there is a selected stop id
		// if (!frontendLinesContext.entities.stop?.id) return;
		// // Find the corresponding map feature
		// const stopMapFeature = allStopsMapData?.features.find(f => f.properties?.id === frontendLinesContext.entities.stop?.id);
		// if (!stopMapFeature) return;
		// // Center the map and save the feature to state
		// moveMap(stopMapFeature.geometry?.coordinates);
		// frontendLinesContext.setSelectedFeature(stopMapFeature);
		//
	});

	const handleMapClick = event => {
		if (event?.features[0]?.properties?.id) {
			// const foundStopInPath = frontendLinesContext.entities.pattern.path.find(item => item.stop.id === event.features[0].properties.id && item.stop_sequence === event.features[0].properties.stop_sequence);
			// if (foundStopInPath) {
			// 	frontendLinesContext.selectStop(foundStopInPath.stop, foundStopInPath.stop_sequence);
			// 	moveMap(event.features[0].geometry?.coordinates);
			// }
			if (event.features[0].source === 'selected-vehicles') {
				// console.log('properties:', event.features[0].properties);
				setSelectedVehicle(event.features[0].properties.id);
			}
			// console.log(event.features);
		}
	};

	const handleMapMouseEnter = event => {
		if (event?.features[0]?.properties?.id) {
			frontendLinesMap.getCanvas().style.cursor = 'pointer';
		}
		// console.log(event);
	};

	const handleMapMouseLeave = event => {
		if (event?.features[0]?.properties?.id) {
			frontendLinesMap.getCanvas().style.cursor = 'default';
		}
	};

	const handleMapMove = () => {
		// frontendLinesContext.disableAutoZoom();
	};

	const renderedPopup = useMemo(() => {
		if (!selectedVehicle) return null;
		let fullVehicleInfo = selectedVehiclesMapData.features.find(vehicle => vehicle.properties.id === selectedVehicle);
		// console.log('relevantInfo:', relevantInfo);
		if (!fullVehicleInfo) return null;

		let relevantInfo = mappedVehiclesInfo.get(selectedVehicle);

		// Yes this magic seems necessary otherwise react won't rerender the popup in some cases, I don't know why.
		let child = '';
		if (!relevantInfo) child = t('info_not_available');
		else child = <>
			<div>{t('bus_info_sentence', {
				model: relevantInfo.model,
				make: relevantInfo.make,
				available_seats: relevantInfo.available_seats,
				available_standing: relevantInfo.available_standing,
				propulsion: relevantInfo.propulsion,
				climatization: t(relevantInfo.climatization ? 'with_ac' : 'without_ac'),
				wheelchair: relevantInfo.wheelchair ? t('wheelchair') : '',
			})}</div>
			<div>{relevantInfo.wheelchair}</div>
			<div>{relevantInfo.bicycles}</div>
		</>;

		//TODO make decent component
		return (
			<Popup className={styles.popupWrapper}
			// quality text wrapping and stretching
				style={{ whiteSpace: 'pre-wrap' }}
				closeButton={false} closeOnClick={false} latitude={fullVehicleInfo.geometry.coordinates[1]} longitude={fullVehicleInfo.geometry.coordinates[0]} anchor='bottom' maxWidth='240px' offset={15}>
				{child}
			</Popup>
		);
	}, [selectedVehicle, mappedVehiclesInfo, selectedVehiclesMapData?.features, t]);
	// useEffect(() => {
	// 	if (frontendLinesContext.entities.stop) {
	// 		moveMap([frontendLinesContext.entities.stop.lon, frontendLinesContext.entities.stop.lat]);
	// 	}
	// }, [frontendLinesContext.entities.stop, moveMap]);
	// console.log('renderedPopup:', renderedPopup);

	//
	// C. Render components

	return (
		<div style={{ height: '600px' }}>

			<OSMMap id='frontendLinesMap' mapStyle={'map'} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['selected-vehicles-normal', 'selected-vehicles-delay']}>
				<GeolocateControl />
				{(console.log('tried to render', renderedPopup), renderedPopup)}
				{selectedVehiclesMapData &&
				<Source id='selected-vehicles' type='geojson' data={selectedVehiclesMapData} generateId={true}>
					<Layer
						id='selected-vehicles-delay'
						source='selected-vehicles'
						type='symbol'
						layout={{
							'icon-allow-overlap': true,
							'icon-ignore-placement': true,
							'icon-anchor': 'center',
							'symbol-placement': 'point',
							'icon-rotation-alignment': 'map',
							'icon-image': 'cm-bus-delay',
							'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
							'icon-offset': [0, 0],
							'icon-rotate': ['get', 'bearing'],
						}}
						paint={{
							'icon-opacity': ['interpolate', ['linear', 0.5], ['get', 'delay'], 20, 0, 40, 1],
						}}
					/>
					<Layer
						id='selected-vehicles-normal'
						beforeId='selected-vehicles-delay'
						source='selected-vehicles'
						type='symbol'
						layout={{
							'icon-allow-overlap': true,
							'icon-ignore-placement': true,
							'icon-anchor': 'center',
							'symbol-placement': 'point',
							'icon-rotation-alignment': 'map',
							'icon-image': 'cm-bus-regular',
							'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
							'icon-offset': [0, 0],
							'icon-rotate': ['get', 'bearing'],
						}}
					/>
				</Source>}
				{/* {selectedStopMapData &&
				<Source id='selected-stop' type='geojson' data={selectedStopMapData} generateId={true}>
					<Layer
						id='selected-stop-stick'
						beforeId={selectedVehiclesMapData && 'selected-vehicles-normal'}
						source='selected-stop'
						type='symbol'
						layout={{
							'icon-allow-overlap': true,
							'icon-ignore-placement': true,
							'icon-anchor': 'bottom',
							'symbol-placement': 'point',
							'icon-image': 'stop-selected',
							'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.1, 20, 0.25],
							'icon-offset': [0, 5],
						}}
						paint={{
							'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 7, 0, 10, 1],
						}}
					/>
					<Layer
						id='selected-stop-base'
						beforeId='selected-stop-stick'
						source='selected-stop'
						type='circle'
						paint={{
							'circle-color': ['get', 'text_color'],
							'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, 5, 26, 18],
							'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 5],
							'circle-stroke-color': ['get', 'color'],
							'circle-pitch-alignment': 'map',
						}}
					/>
				</Source>
			}
			{patternStopsMapData &&
				<Source id='pattern-stops' type='geojson' data={patternStopsMapData} generateId={true}>
					<Layer
						id='pattern-stops'
						beforeId={selectedStopMapData ? 'selected-stop-base' : selectedVehiclesMapData && 'selected-vehicles-normal'}
						source='pattern-stops'
						type='circle'
						paint={{
							'circle-color': ['get', 'text_color'],
							'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 15],
							'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 7],
							'circle-stroke-color': ['get', 'color'],
							'circle-pitch-alignment': 'map',
						}}
					/>
				</Source>
			}
			{selectedShapeMapData &&
				<Source id='selected-shape' type='geojson' data={selectedShapeMapData} generateId={true}>
					<Layer
						id='selected-shape-direction'
						beforeId={patternStopsMapData && 'pattern-stops'}
						source='selected-shape'
						type='symbol'
						layout={{
							'icon-allow-overlap': true,
							'icon-ignore-placement': true,
							'icon-anchor': 'center',
							'symbol-placement': 'line',
							'icon-image': 'shape-arrow-direction',
							'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.1, 20, 0.2],
							'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 10, 2, 20, 30],
							'icon-offset': [0, 0],
							'icon-rotate': 90,
						}}
						paint={{
							'icon-color': ['get', 'text_color'],
							'icon-opacity': 0.8,
						}}
					/>
					<Layer
						id='selected-shape-line'
						beforeId='selected-shape-direction'
						source='selected-shape'
						type='line'
						layout={{
							'line-join': 'round',
							'line-cap': 'round',
						}}
						paint={{
							'line-color': ['get', 'color'],
							'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 20, 12],
						}}
					/>
				</Source>
			*/}
			</OSMMap>
		</div>
	);

	//
}