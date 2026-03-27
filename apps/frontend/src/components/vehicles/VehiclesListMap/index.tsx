'use client';

/* * */

import TextPopover from '@/components/common/TextPopover';
import { MapView } from '@/components/map/MapView';
import { MapViewStyleAlerts, MapViewStyleAlertsLayerId, MapViewStyleAlertsSourceId } from '@/components/map/MapViewStyleAlerts';
import { MapViewStylePath } from '@/components/map/MapViewStylePath';
import { MapViewStyleVehicles, MapViewStyleVehiclesInteractiveLayerId, MapViewStyleVehiclesPrimaryLayerId } from '@/components/map/MapViewStyleVehicles';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { transformVehicleDataIntoGeoJsonFeature, useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { centerMap, getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import getOperationalDate from '@/utils/operation';
import { Pattern, Shape } from '@carrismetropolitana/api-types/network';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useMap } from '@vis.gl/react-maplibre';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function VehiclesListMap() {
	//

	//
	// A. Setup variables

	const { vehiclesListMap } = useMap();

	const router = useRouter();
	const vehiclesListContext = useVehiclesListContext();
	const vehiclesContext = useVehiclesContext();
	const stopsContext = useStopsContext();
	const alertsContext = useAlertsContext();
	const environmentContext = useEnvironmentContext();

	const [isAutoZoom, setIsAutoZoom] = useState(true);
	const [activePatternData, setActivePatternData] = useState<Pattern | undefined>();
	const [activeShapeData, setActiveShapeData] = useState<Shape | undefined>();
	const [showAlerts, setShowAlerts] = useState(true);

	const t = useTranslations();

	//
	// B. Fetch data

	useEffect(() => {
		(async () => {
			if (!vehiclesListContext.data.selected) return;
			if (vehiclesListContext.data.selected.pattern_id) {
				const todayOperationalDate = getOperationalDate();
				const fetchedPatternResponse = await fetch(`${getPublicVariable('api_url')}/patterns/${vehiclesListContext.data.selected.pattern_id}`);
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
			const fetchedShapeResponse = await fetch(`${getPublicVariable('api_url')}/shapes/${activePatternData.shape_id}`);
			if (!fetchedShapeResponse.ok) return;
			const fetchedShapeData = await fetchedShapeResponse.json();
			setActiveShapeData(fetchedShapeData);
		})();
	}, [activePatternData]);

	useEffect(() => {
		if (vehiclesListContext.data.selected) return;
		setActivePatternData(undefined);
		setActiveShapeData(undefined);
	}, [vehiclesListContext.data.selected]);

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
		setIsAutoZoom(false);
		if (event.features.length !== 0 && event.features[0].source === 'default-source-vehicles') {
			vehiclesListContext.actions.updateSelectedVehicle(event.features[0].properties.id);
		}
		else if (event.features.length !== 0 && event.features[0].source === MapViewStyleAlertsSourceId) {
			router.push(environmentContext.actions.getNormalizedHref(`/alerts/${event.features[0].properties.id}`));
		}
		else {
			setActivePatternData(undefined);
			setActiveShapeData(undefined);
			vehiclesListContext.actions.updateSelectedVehicle(null);
		}
	}

	function handleOnCenterMap() {
		if (!vehiclesListMap) return;
		if (!activeVehiclesGeoJsonFC?.features.length) return;
		centerMap(vehiclesListMap, activeVehiclesGeoJsonFC.features);
		setIsAutoZoom(true);
	}

	useEffect(() => {
		if (isAutoZoom) return;
		const timeout = setTimeout(() => setIsAutoZoom(true), 300_000);
		return () => clearTimeout(timeout);
	}, [isAutoZoom]);

	useEffect(() => {
		if (!isAutoZoom) return;
		if (!vehiclesListMap) return;
		if (!activeVehiclesGeoJsonFC?.features.length) return;
		centerMap(vehiclesListMap, activeVehiclesGeoJsonFC.features);
	}, [vehiclesListMap, activeVehiclesGeoJsonFC, isAutoZoom]);

	//
	// E. Render components

	const toolbarExtras = (
		<button className={styles.button} data-active={showAlerts} onClick={() => setShowAlerts(!showAlerts)}>
			<TextPopover text={showAlerts ? t('map.toolbar.hide_alerts') : t('map.toolbar.show_alerts')} textSize="md">
				<IconAlertTriangle />
			</TextPopover>
		</button>
	);

	return (
		<MapView
			autoZoom={isAutoZoom}
			id="vehiclesListMap"
			interactiveLayerIds={[MapViewStyleVehiclesInteractiveLayerId, MapViewStyleAlertsLayerId]}
			onCenterMap={handleOnCenterMap}
			onClick={handleLayerClick}
			onDrag={() => setIsAutoZoom(false)}
			showCenterButton={true}
			toolbarExtras={toolbarExtras}
		>
			{showAlerts && <MapViewStyleAlerts data={alertsContext.data.featureCollection} />}
			<MapViewStyleVehicles presentBeforeId={showAlerts ? MapViewStyleAlertsLayerId : undefined} showCounter="always" vehiclesData={activeVehiclesGeoJsonFC} />
			<MapViewStylePath presentBeforeId={MapViewStyleVehiclesPrimaryLayerId} shapeData={activePathShapeGeoJson} waypointsData={activePathWaypointsGeoJson} />
		</MapView>
	);

	//
}
