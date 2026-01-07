'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { MapViewStyleActiveStops, MapViewStyleActiveStopsPrimaryLayerId } from '@/components/map/MapViewStyleActiveStops';
import { MapViewStylePath, MapViewStylePathPrimaryLayerId } from '@/components/map/MapViewStylePath';
import { MapViewStyleStops, MapViewStyleStopsInteractiveLayerId } from '@/components/map/MapViewStyleStops';
import { MapViewStyleVehicles, MapViewStyleVehiclesPrimaryLayerId } from '@/components/map/MapViewStyleVehicles';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { centerMap, getBaseGeoJsonFeatureCollection, moveMap } from '@/utils/map.utils';
import { useMap } from '@vis.gl/react-maplibre';
import { useEffect, useMemo } from 'react';

/* * */

export function StopsDetailContentMap() {
	//

	//
	// A. Setup variables

	const { stopsMap } = useMap();

	const stopsContext = useStopsContext();
	const vehiclesContext = useVehiclesContext();
	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Fetch data

	const activeStopGeoJson = useMemo(() => {
		return stopsContext.actions.getStopByIdGeoJsonFC(stopsDetailContext.data.active_stop_id);
	}, [stopsDetailContext.data.active_stop_id, stopsDetailContext.data.stop]);

	const activePathWaypointsGeoJson = useMemo(() => {
		if (!stopsDetailContext.data.active_pattern_group?.path) return;
		const collection = getBaseGeoJsonFeatureCollection();
		stopsDetailContext.data.active_pattern_group.path.forEach((pathStop) => {
			const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
			if (!stopData) return;
			const result = transformStopDataIntoGeoJsonFeature(stopData);
			result.properties = {
				...result.properties,
				color: stopsDetailContext.data.active_pattern_group?.color,
				text_color: stopsDetailContext.data.active_pattern_group?.text_color,
			};
			collection.features.push(result);
		});
		return collection;
	}, [stopsDetailContext.data.active_trip_id, vehiclesContext.data.vehicles]);

	const activePathShapeGeoJson = useMemo(() => {
		if (!stopsDetailContext.data.active_shape) return;
		return stopsDetailContext.data.active_shape?.geojson;
	}, [stopsDetailContext.data.active_shape]);

	const activeVehicleGeoJson = useMemo(() => {
		if (!stopsDetailContext.data.active_trip_id) return;
		return vehiclesContext.actions.getVehiclesByTripIdGeoJsonFC(stopsDetailContext.data.active_trip_id);
	}, [stopsDetailContext.data.active_trip_id, vehiclesContext.data.vehicles]);

	//
	// B. Transform Data

	useEffect(() => {
		if (!stopsDetailContext.data.stop || !stopsMap) return;
		const coordinates = [stopsDetailContext.data.stop.lon, stopsDetailContext.data.stop.lat];
		if (coordinates.some(isNaN)) return;
		moveMap(stopsMap, coordinates);
		if (stopsDetailContext.data.active_trip_id) {
			// Create a feature collection with the vehicle and the stop
			const vehicleFC = vehiclesContext.actions.getVehiclesByTripIdGeoJsonFC(stopsDetailContext.data.active_trip_id);
			const stopFC = stopsContext.actions.getStopByIdGeoJsonFC(stopsDetailContext.data.active_stop_id);
			if (!vehicleFC?.features.length || !stopFC?.features.length) return;
			centerMap(stopsMap, [vehicleFC.features[0], stopFC.features[0]], { padding: 70 });
		}
	}, [stopsDetailContext.data.stop, stopsDetailContext.data.active_trip_id, vehiclesContext.data.vehicles, stopsMap]);

	//
	// C. Handle Actions

	function handleLayerClick(event) {
		if (!stopsMap) return;
		const features = stopsMap.queryRenderedFeatures(event.point);
		if (!features.length) return;
		for (const feature of features) {
			if (feature.properties.id === stopsDetailContext.data.active_stop_id) {
				continue;
			}
			else if (feature.layer.id !== MapViewStyleStopsInteractiveLayerId) {
				continue;
			}
			else {
				stopsDetailContext.actions.setActiveStopId(feature.properties.id);
				return;
			}
		}
	}

	//
	// E. Render components

	return (
		<MapView
			id="stopsMap"
			interactiveLayerIds={[MapViewStyleStopsInteractiveLayerId]}
			onClick={handleLayerClick}
		>

			<MapViewStyleVehicles
				vehiclesData={activeVehicleGeoJson}
			/>

			<MapViewStyleActiveStops
				presentBeforeId={MapViewStyleVehiclesPrimaryLayerId}
				stopsData={activeStopGeoJson}
			/>

			<MapViewStylePath
				presentBeforeId={MapViewStyleActiveStopsPrimaryLayerId}
				shapeData={activePathShapeGeoJson}
				waypointsData={activePathWaypointsGeoJson}
			/>

			<MapViewStyleStops
				presentBeforeId={MapViewStylePathPrimaryLayerId}
				stopsData={stopsContext.data.stops_fc}
				style={stopsDetailContext.data.active_shape ? 'muted' : 'primary'}
			/>

		</MapView>
	);

	//
}
