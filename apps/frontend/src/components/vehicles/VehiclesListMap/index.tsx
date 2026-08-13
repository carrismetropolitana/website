'use client';

/* * */

import TextPopover from '@/components/common/TextPopover';
import { MapView } from '@/components/map/MapView';
import { MapViewStyleAlerts, MapViewStyleAlertsLayerId, MapViewStyleAlertsSourceId } from '@/components/map/MapViewStyleAlerts';
import { MapViewStylePath } from '@/components/map/MapViewStylePath';
import { MapViewStyleVehicles, MapViewStyleVehiclesInteractiveLayerId, MapViewStyleVehiclesPrimaryLayerId } from '@/components/map/MapViewStyleVehicles';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { transformVehicleDataIntoGeoJsonFeature, useVehiclesContext } from '@/contexts/Vehicles.context';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { useVehicleMetadata } from '@/hooks/useVehicleMetadata';
import { centerMap, getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Pattern, Shape } from '@carrismetropolitana/api-types/network';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useMap } from '@vis.gl/react-maplibre';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

export function VehiclesListMap() {
	//

	//
	// A. Setup variables

	const { vehiclesListMap } = useMap();

	const router = useRouter();
	const vehiclesListContext = useVehiclesListContext();
	const vehiclesContext = useVehiclesContext();
	const vehicleMetadata = useVehicleMetadata();
	const getVehicleMetadata = vehicleMetadata.actions.getMetadataForVehicleId;
	const stopsContext = useStopsContext();
	const alertsContext = useAlertsContext();
	const environmentContext = useEnvironmentContext();
	const operationalDateContext = useOperationalDateContext();

	const [isAutoZoom, setIsAutoZoom] = useState(false);
	const [activePatternData, setActivePatternData] = useState<Pattern | undefined>();
	const [activeShapeData, setActiveShapeData] = useState<Shape | undefined>();
	const [showAlerts, setShowAlerts] = useState(true);

	const t = useTranslations();

	//
	// B. Fetch data

	useEffect(() => {
		(async () => {
			if (!vehiclesListContext.data.selected?.pattern_id) {
				setActivePatternData(undefined);
				return;
			}

			const operationalDate = operationalDateContext.data.selected_date?.operational_date;
			if (!operationalDate) return;

			const fetchedPatternResponse = await fetch(`${getPublicVariable('go_api_url')}/hub/api/v1/network/patterns/${encodeURIComponent(vehiclesListContext.data.selected.pattern_id)}`);

			const fetchedPatternResponseData: { data?: Pattern[] } = await fetchedPatternResponse.json();
			const fetchedPatternData = fetchedPatternResponseData.data;
			if (!Array.isArray(fetchedPatternData) || fetchedPatternData.length === 0) {
				setActivePatternData(undefined);
				return;
			}

			const activePatternVersion = fetchedPatternData.find(item => item.valid_on?.includes(operationalDate)) ?? fetchedPatternData[0];
			setActivePatternData(activePatternVersion);
		})();
	}, [operationalDateContext.data.selected_date, vehiclesListContext.data.selected]);

	useEffect(() => {
		(async () => {
			if (!activePatternData?.shape_id) {
				setActiveShapeData(undefined);
				return;
			}

			const fetchedShapeResponse = await fetch(`${getPublicVariable('go_api_url')}/hub/api/v1/network/shapes/${encodeURIComponent(activePatternData.shape_id)}`);

			const fetchedShapeResponseData: { data?: Shape } = await fetchedShapeResponse.json();
			setActiveShapeData(fetchedShapeResponseData.data);
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
			const contactless = getVehicleMetadata(vehiclesListContext.data.selected.vehicle_id)?.contactless ?? false;
			collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehiclesListContext.data.selected, contactless));
		}
		else {
			vehiclesListContext.data.filtered.forEach((vehicle) => {
				const contactless = getVehicleMetadata(vehicle.vehicle_id)?.contactless ?? false;
				collection.features.push(transformVehicleDataIntoGeoJsonFeature(vehicle, contactless));
			});
		}
		return collection;
	}, [getVehicleMetadata, vehiclesListContext.data.filtered, vehiclesListContext.data.selected, vehiclesContext.data.vehicles]);

	//
	// D. Handle actions

	function handleLayerClick(event) {
		setIsAutoZoom(false);
		if (event.features.length !== 0 && event.features[0].source === 'default-source-vehicles') {
			vehiclesListContext.actions.updateSelectedVehicle(event.features[0].properties.vehicle_id);
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
			{showAlerts && <MapViewStyleAlerts data={alertsContext.data.fc} />}
			<MapViewStyleVehicles presentBeforeId={showAlerts ? MapViewStyleAlertsLayerId : undefined} showCounter="always" vehiclesData={activeVehiclesGeoJsonFC as GeoJSON.FeatureCollection<GeoJSON.Point> | undefined} />
			<MapViewStylePath presentBeforeId={MapViewStyleVehiclesPrimaryLayerId} shapeData={activePathShapeGeoJson} waypointsData={activePathWaypointsGeoJson} />
		</MapView>
	);

	//
}
