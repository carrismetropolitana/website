'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { MapView } from '@/components/map/MapView';
import { MapViewStyleAlerts, MapViewStyleAlertsLayerId } from '@/components/map/MapViewStyleAlerts';
import { transformAlertDataIntoGeoJsonFeature } from '@/contexts/Alerts.context';
import { useAlertsListContext } from '@/contexts/AlertsList.context';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { centerMap, getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import * as turf from '@turf/turf';
import { MapMouseEvent, useMap } from '@vis.gl/react-maplibre';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

/* * */

export function AlertsListViewMap() {
	//

	//
	// A. Setup variables

	const { alertsListMap } = useMap();
	const router = useRouter();
	const alertsListContext = useAlertsListContext();
	const environmentContext = useEnvironmentContext();

	const filteredFeatureCollection = useMemo(() => {
		const collection = getBaseGeoJsonFeatureCollection();

		alertsListContext.data.filtered.forEach((alert) => {
			const feature = transformAlertDataIntoGeoJsonFeature(alert);
			if (feature) collection.features.push(feature);
		});

		return collection;
	}, [alertsListContext.data.filtered]);
	//
	// B. Handle actions

	useEffect(() => {
		// Exit early if there are no alerts or map
		if (!filteredFeatureCollection.features.length || !alertsListMap) return;

		// When there are search filters, center the map on the cluster with the most points
		const clusterPoints = turf.clustersKmeans(filteredFeatureCollection, { mutate: true, numberOfClusters: 2 });
		const clusterPointsCount = clusterPoints.features.reduce((acc, feature) => {
			if (typeof feature.properties.cluster !== 'number') return acc;
			const clusterId = feature.properties.cluster;
			if (!acc[clusterId]) acc[clusterId] = 0;
			acc[clusterId]++;
			return acc;
		}, {});
		const clusterId = Object.keys(clusterPointsCount).reduce((a, b) => (clusterPointsCount[a] > clusterPointsCount[b] ? a : b));
		const filteredClusterPoints = clusterPoints.features.filter(feature => feature.properties.cluster === Number(clusterId));
		centerMap(alertsListMap, filteredClusterPoints);
		//
	}, [filteredFeatureCollection, alertsListMap]);

	function handleLayerClick(event: MapMouseEvent) {
		const feature = event.features?.[0];
		if (!feature) return;
		const alertId = feature.properties.id;
		router.push(environmentContext.actions.getNormalizedHref(`/alerts/${alertId}`));
	}

	//
	// C. Render components

	return (
		<Surface variant="persistent" forceOverflow>
			<div style={{ height: 600 }}>
				<MapView
					id="alertsListMap"
					interactiveLayerIds={[MapViewStyleAlertsLayerId]}
					onClick={handleLayerClick}
				>
					<MapViewStyleAlerts data={filteredFeatureCollection} />
				</MapView>
			</div>
		</Surface>
	);

	//
}
