'use client';

/* * */

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Layer, Source } from '@vis.gl/react-maplibre';

/* * */

export const MapViewStyleAlertsLayerId = 'default-layer-alerts-all';
export const MapViewStyleAlertsSourceId = 'default-source-alerts-all';

/* * */

interface Props {
	data?: GeoJSON.FeatureCollection
	presentBeforeId?: string
}

/* * */

const baseGeoJsonFeatureCollection = getBaseGeoJsonFeatureCollection();

/* * */

export function MapViewStyleAlerts({ data = baseGeoJsonFeatureCollection, presentBeforeId }: Props) {
	return (
		<Source data={data} generateId={true} id={MapViewStyleAlertsSourceId} type="geojson">
			<Layer
				beforeId={presentBeforeId}
				id={MapViewStyleAlertsLayerId}
				source={MapViewStyleAlertsSourceId}
				type="symbol"
				layout={{
					'icon-allow-overlap': true,
					'icon-anchor': 'center',
					'icon-ignore-placement': true,
					'icon-image': [
						'match',
						['get', 'cause'],
						'ABUSIVE_PARKING', 'map-alert-icon-barrier',
						'ACCIDENT', 'map-alert-icon-accident',
						'CONSTRUCTION', 'map-alert-icon-barrier',
						'DEMONSTRATION', 'map-alert-icon-megaphone',
						'DRIVER_ABSENCE', 'map-alert-icon-tool',
						'DRIVER_ISSUE', 'map-alert-icon-tool',
						'HIGH_PASSENGER_LOAD', 'map-alert-icon-info',
						'MEDICAL_EMERGENCY', 'map-alert-icon-emergency',
						'NETWORK_UPDATE', 'map-alert-icon-tool',
						'POLICE_ACTIVITY', 'map-alert-icon-emergency',
						'PUBLIC_DISORDER', 'map-alert-icon-megaphone',
						'ROAD_ISSUE', 'map-alert-icon-barrier',
						'STRIKE', 'map-alert-icon-megaphone',
						'TECHNICAL_ISSUE', 'map-alert-icon-tool',
						'TRAFFIC_JAM', 'map-alert-icon-barrier',
						'VEHICLE_ISSUE', 'map-alert-icon-tool',
						'WEATHER', 'map-alert-icon-storm',
						'map-alert-icon-info',
					],
					'icon-size': [
						'interpolate',
						['linear'],
						['zoom'],
						10, 0.14,
						20, 0.28,
					],
				}}
				paint={{
					'icon-color': '#fff',
					'icon-halo-blur': 1,
					'icon-halo-color': 'white',
					'icon-halo-width': 1,
				}}
			/>
		</Source>
	);
}
