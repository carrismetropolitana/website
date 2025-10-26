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
						'ACCIDENT', 'icon-car-crash',
						'TECHNICAL_PROBLEM', 'icon-car-crash',
						'CONSTRUCTION', 'icon-barrier-block',
						'DEMONSTRATION', 'icon-speakerphone',
						'STRIKE', 'icon-speakerphone',
						'HOLIDAY', 'icon-calendar-event',
						'MAINTENANCE', 'icon-tool',
						'MEDICAL_EMERGENCY', 'icon-ambulance',
						'POLICE_ACTIVITY', 'icon-ambulance',
						'WEATHER', 'icon-cloud-storm',
						'icon-info-triangle',
					],
					'icon-size': [
						'interpolate',
						['linear'],
						['zoom'],
						10, 0.25,
						20, 0.5,
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
