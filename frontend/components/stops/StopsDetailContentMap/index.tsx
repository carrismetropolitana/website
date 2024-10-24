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
import { getBaseGeoJsonFeatureCollection, moveMap } from '@/utils/map.utils';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';

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

	const allStopsGeoJson = useMemo(() => {
		return stopsContext.actions.getAllStopsGeoJsonFC();
	}, [stopsContext.data.stops]);

	const activeStopGeoJson = useMemo(() => {
		return stopsContext.actions.getStopByIdGeoJsonFC(stopsDetailContext.data.active_stop_id);
	}, [stopsDetailContext.data.active_stop_id]);

	const activePathStopsGeoJson = useMemo(() => {
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
	}, [stopsDetailContext.data.stop, stopsMap]);

	//
	// C. Handle Actions

	function handleLayerClick(event) {
		if (!stopsMap) return;
		const features = stopsMap.queryRenderedFeatures(event.point);
		if (!features.length) return;
		for (const feature of features) {
			console.log(feature);
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
	// E. Render Components

	return (
		<MapView
			id="stopsMap"
			interactiveLayerIds={[MapViewStyleStopsInteractiveLayerId]}
			onClick={handleLayerClick}
		>

			<MapViewStyleStops
				presentBeforeId={MapViewStylePathPrimaryLayerId}
				stopsData={allStopsGeoJson}
				style={stopsDetailContext.data.active_shape ? 'muted' : 'primary'}
			/>

			<MapViewStylePath
				presentBeforeId={MapViewStyleActiveStopsPrimaryLayerId}
				shapesData={stopsDetailContext.data.active_shape?.geojson}
				stopsData={activePathStopsGeoJson}
			/>

			<MapViewStyleActiveStops
				presentBeforeId={MapViewStyleVehiclesPrimaryLayerId}
				stopsData={activeStopGeoJson}
			/>

			<MapViewStyleVehicles
				vehiclesData={activeVehicleGeoJson}
			/>

		</MapView>
	);

	//
}
