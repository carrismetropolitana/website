'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { MapViewStyleActiveStops } from '@/components/map/MapViewStyleActiveStops';
import { MapViewStylePath, MapViewStylePathInteractiveLayerId } from '@/components/map/MapViewStylePath';
import { MapViewStyleVehicles } from '@/components/map/MapViewStyleVehicles';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { transformStopDataIntoGeoJsonFeature } from '@/contexts/Stops.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { getBaseGeoJsonFeatureCollection, moveMap } from '@/utils/map.utils';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

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
		const features = linesSingleMap.queryRenderedFeatures(event.point, { layers: [MapViewStylePathInteractiveLayerId] });
		if (!features.length) return;
		for (const feature of features) {
			if (feature.properties.id === linesDetailContext.data.active_stop?.stop.id) {
				continue;
			}
			else {
				linesDetailContext.actions.setActiveStopByStopId(feature.properties.sequence, feature.properties.id);
				return;
			}
		}
	}

	//
	// E. Memoized GeoJSON Data

	const activeVehiclesGeojson = useMemo(() => {
		if (!linesDetailContext.data.active_pattern_group?.pattern_id) return;
		return vehiclesContext.actions.getVehiclesByPatternIdGeoJsonFC(linesDetailContext.data.active_pattern_group?.pattern_id);
	}, [linesDetailContext.data.active_pattern_group, vehiclesContext.data.all]);

	const activePathStopsGeoJson = useMemo(() => {
		if (!linesDetailContext.data.active_pattern_group?.path) return;
		const collection = getBaseGeoJsonFeatureCollection();
		linesDetailContext.data.active_pattern_group.path.forEach((pathStop) => {
			const result = transformStopDataIntoGeoJsonFeature(pathStop.stop);
			result.properties = {
				...result.properties,
				color: linesDetailContext.data.active_pattern_group?.color,
				text_color: linesDetailContext.data.active_pattern_group?.text_color,
			};
			collection.features.push(result);
		});
		return collection;
	}, [linesDetailContext.data.active_pattern_group, vehiclesContext.data.all]);

	const activeStopGeoJson = useMemo(() => {
		if (!linesDetailContext.data.active_stop || !linesDetailContext.data.active_pattern_group) return;
		const collection = getBaseGeoJsonFeatureCollection();
		const result = transformStopDataIntoGeoJsonFeature(linesDetailContext.data.active_stop.stop);
		result.properties = {
			...result.properties,
			color: linesDetailContext.data.active_pattern_group.color,
			text_color: linesDetailContext.data.active_pattern_group.text_color,
		};
		collection.features.push(result);
		return collection;
	}, [linesDetailContext.data.active_stop, linesDetailContext.data.active_pattern_group]);

	//
	// G. Render copmonents

	return (
		<MapView
			id="linesSingleMap"
			interactiveLayerIds={[MapViewStylePathInteractiveLayerId]}
			onClick={handleLayerClick}
		>

			<MapViewStylePath
				shapesData={linesDetailContext.data.active_shape?.geojson}
				stopsData={activePathStopsGeoJson}
			/>

			<MapViewStyleActiveStops
				stopsData={activeStopGeoJson}
			/>

			<MapViewStyleVehicles
				showCounter="always"
				vehiclesData={activeVehiclesGeojson}
			/>

		</MapView>
	);

	//
}
