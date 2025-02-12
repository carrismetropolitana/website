'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { MapViewStylePath } from '@/components/map/MapViewStylePath';
import { MapViewStyleVehicles, MapViewStyleVehiclesInteractiveLayerId, MapViewStyleVehiclesPrimaryLayerId } from '@/components/map/MapViewStyleVehicles';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { transformVehicleDataIntoGeoJsonFeature, useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import getOperationalDay from '@/utils/operation';
import { Routes } from '@/utils/routes';
import { Pattern, Shape } from '@carrismetropolitana/api-types/network';
import { useEffect, useMemo, useState } from 'react';

/* * */

export function VehiclesListMap() {
	//

	//
	// A. Setup variables

	const vehiclesListContext = useVehiclesListContext();
	const vehiclesContext = useVehiclesContext();
	const stopsContext = useStopsContext();

	const [activePatternData, setActivePatternData] = useState<Pattern | undefined>();
	const [activeShapeData, setActiveShapeData] = useState<Shape | undefined>();

	//
	// B. Fetch data

	useEffect(() => {
		(async () => {
			if (!vehiclesListContext.data.selected) return;
			if (vehiclesListContext.data.selected.pattern_id) {
				const todayOperationalDate = getOperationalDay();
				const fetchedPatternResponse = await fetch(`${Routes.API}/patterns/${vehiclesListContext.data.selected.pattern_id}`);
				const fetchedPatternData = await fetchedPatternResponse.json();
				const activePatternVersion = fetchedPatternData.find(item => item.valid_on.includes(todayOperationalDate));
				setActivePatternData(activePatternVersion);
			}
		})();
	}, [vehiclesListContext.data.selected]);

	useEffect(() => {
		(async () => {
			if (!activePatternData?.shape_id) {
				setActiveShapeData(undefined);
				return;
			}
			const fetchedShapeResponse = await fetch(`${Routes.API}/shapes/${activePatternData.shape_id}`);
			if (!fetchedShapeResponse.ok) return;
			const fetchedShapeData = await fetchedShapeResponse.json();
			setActiveShapeData(fetchedShapeData);
		})();
	}, [activePatternData]);

	//
	// C. Transform data

	const activePathWaypointsGeoJson = useMemo(() => {
		if (!activePatternData?.path) return;
		const collection = getBaseGeoJsonFeatureCollection();
		activePatternData.path.forEach((pathStop) => {
			const stopData = stopsContext.actions.getStopById(pathStop.stop_id);
			if (!stopData) return;
			const result = transformStopDataIntoGeoJsonFeature(stopData);
			result.properties = {
				...result.properties,
				color: activePatternData?.color,
				text_color: activePatternData?.text_color,
			};
			collection.features.push(result);
		});
		return collection;
	}, [activePatternData]);

	const activePathShapeGeoJson = useMemo(() => {
		if (!activePatternData || !activeShapeData) return;
		return { ...activeShapeData?.geojson, properties: { color: activePatternData.color } };
	}, [activePatternData, activeShapeData]);

	const activeVehiclesGeoJsonFC = useMemo(() => {
		const collection = getBaseGeoJsonFeatureCollection();
		if (vehiclesListContext.data.selected) {
			const vehicleGeoJsonFeature = transformVehicleDataIntoGeoJsonFeature(vehiclesListContext.data.selected);
			collection.features.push(vehicleGeoJsonFeature);
		}
		else {
			vehiclesListContext.data.filtered.forEach((vehicle) => {
				const vehicleGeoJsonFeature = transformVehicleDataIntoGeoJsonFeature(vehicle);
				collection.features.push(vehicleGeoJsonFeature);
			});
		}
		return collection;
	}, [vehiclesListContext.data.filtered, vehiclesListContext.data.selected, vehiclesContext.data.vehicles]);

	//
	// D. Handle actions

	function handleLayerClick(event) {
		if (event.features.length !== 0 && event.features[0].source === 'default-source-vehicles') {
			vehiclesListContext.actions.updateSelectedVehicle(event.features[0].properties.id);
		}
		else {
			setActivePatternData(undefined);
			setActiveShapeData(undefined);
			vehiclesListContext.actions.updateSelectedVehicle(null);
		}
	}

	//
	// E. Render components

	return (
		<MapView id="vehiclesListMap" interactiveLayerIds={[MapViewStyleVehiclesInteractiveLayerId]} onClick={handleLayerClick}>
			<MapViewStyleVehicles showCounter="always" vehiclesData={activeVehiclesGeoJsonFC} />
			<MapViewStylePath presentBeforeId={MapViewStyleVehiclesPrimaryLayerId} shapeData={activePathShapeGeoJson} waypointsData={activePathWaypointsGeoJson} />
		</MapView>
	);

	//
}
