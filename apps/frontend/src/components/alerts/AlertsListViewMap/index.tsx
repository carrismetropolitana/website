'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { MapView } from '@/components/map/MapView';
import { MapViewStyleAlerts, MapViewStyleAlertsLayerId } from '@/components/map/MapViewStyleAlerts';
import { useAlertsListContext } from '@/contexts/AlertsList.context';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { centerMap } from '@/utils/map.utils';
import * as turf from '@turf/turf';
import { MapMouseEvent, useMap } from '@vis.gl/react-maplibre';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/* * */

export function AlertsListViewMap() {
	//

	//
	// A. Setup variables

	const { alertsListMap } = useMap();
	const router = useRouter();
	const alertsListContext = useAlertsListContext();
	const environmentContext = useEnvironmentContext();

	//
	// B. Handle actions

	useEffect(() => {
		// Exit early if there are no alerts or map
		if (!alertsListContext.data.filtered_fc || !alertsListContext.data.filtered_fc.features.length || !alertsListMap) return;

		// When there are search filters, center the map on the cluster with the most points
		const clusterPoints = turf.clustersKmeans(alertsListContext.data.filtered_fc, { mutate: true, numberOfClusters: 2 });
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
	}, [alertsListContext.data.filtered_fc, alertsListMap]);

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
					<MapViewStyleAlerts data={alertsListContext.data.filtered_fc} />
				</MapView>
			</div>
		</Surface>
	);

	//
}
