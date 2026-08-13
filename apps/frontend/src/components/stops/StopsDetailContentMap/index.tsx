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
		if (!stopsDetailContext.data.stop) return;
		return stopsContext.actions.getStopByIdGeoJsonFC(String(stopsDetailContext.data.stop._id));
	}, [stopsDetailContext.data.stop, stopsContext.actions]);

	const activePathWaypointsGeoJson = useMemo(() => {
		if (!stopsDetailContext.data.highlighted_pattern?.path) return;
		const collection = getBaseGeoJsonFeatureCollection();
		stopsDetailContext.data.highlighted_pattern.path.forEach((pathStop) => {
			const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
			if (!stopData) return;
			const result = transformStopDataIntoGeoJsonFeature(stopData);
			result.properties = {
				...result.properties,
				color: stopsDetailContext.data.highlighted_pattern?.color,
				text_color: stopsDetailContext.data.highlighted_pattern?.text_color,
			};
			collection.features.push(result);
		});
		return collection;
	}, [stopsContext.actions, stopsDetailContext.data.highlighted_pattern]);

	const activePathShapeGeoJson = useMemo(() => {
		return stopsDetailContext.data.highlighted_shape?.geojson;
	}, [stopsDetailContext.data.highlighted_shape]);

	const activeVehicleGeoJson = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point> | undefined>(() => {
		if (!stopsDetailContext.data.highlighted_trip_id) return;
		return vehiclesContext.actions.getVehiclesByTripIdGeoJsonFC(stopsDetailContext.data.highlighted_trip_id) as GeoJSON.FeatureCollection<GeoJSON.Point> | undefined;
	}, [stopsDetailContext.data.highlighted_trip_id, vehiclesContext.actions, vehiclesContext.data.vehicles]);

	//
	// B. Transform Data

	useEffect(() => {
		if (!stopsDetailContext.data.stop || !stopsMap) return;
		const coordinates = [stopsDetailContext.data.stop.longitude, stopsDetailContext.data.stop.latitude];
		if (coordinates.some(isNaN)) return;
		moveMap(stopsMap, coordinates);
		if (stopsDetailContext.data.highlighted_trip_id) {
			// Create a feature collection with the vehicle and the stop
			const vehicleFC = vehiclesContext.actions.getVehiclesByTripIdGeoJsonFC(stopsDetailContext.data.highlighted_trip_id);
			const stopFC = stopsContext.actions.getStopByIdGeoJsonFC(String(stopsDetailContext.data.stop._id));
			if (!vehicleFC?.features.length || !stopFC?.features.length) return;
			centerMap(stopsMap, [vehicleFC.features[0], stopFC.features[0]], { padding: 70 });
		}
	}, [stopsDetailContext.data.stop, stopsDetailContext.data.highlighted_trip_id, stopsContext.actions, vehiclesContext.actions, vehiclesContext.data.vehicles, stopsMap]);

	//
	// C. Handle Actions

	function handleLayerClick(event) {
		if (!stopsMap) return;
		const features = stopsMap.queryRenderedFeatures(event.point);
		if (!features.length) return;
		for (const feature of features) {
			if (feature.properties.id === String(stopsDetailContext.data.stop?._id)) {
				continue;
			}
			else if (feature.layer.id !== MapViewStyleStopsInteractiveLayerId) {
				continue;
			}
			else {
				stopsDetailContext.actions.setActiveStopId(String(feature.properties.id));
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
				style={stopsDetailContext.data.highlighted_shape ? 'muted' : 'primary'}
			/>

		</MapView>
	);

	//
}
