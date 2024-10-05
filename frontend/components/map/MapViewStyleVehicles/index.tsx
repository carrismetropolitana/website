'use client';

import LiveIcon from '@/components/common/LiveIcon';
/* * */

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { useTranslations } from 'next-intl';
import { Layer, Source } from 'react-map-gl/maplibre';

import styles from './styles.module.css';

/* * */

export const MapViewStyleVehiclesPrimaryLayerId = 'default-layer-vehicles-regular';
export const MapViewStyleVehiclesInteractiveLayerId = '';

/* * */

interface Props {
	presentBeforeId?: string
	showCounter?: 'always' | 'positive'
	vehiclesData?: GeoJSON.FeatureCollection
}

/* * */

const baseGeoJsonFeatureCollection = getBaseGeoJsonFeatureCollection();

export function MapViewStyleVehicles({ presentBeforeId, showCounter, vehiclesData = baseGeoJsonFeatureCollection }: Props) {
//

	//
	// A. Setup variables

	const t = useTranslations('map.MapViewStyleVehicles');

	//
	// B. Render components

	return (
		<>

			<Source data={vehiclesData} generateId={true} id="default-source-vehicles" type="geojson">

				<Layer
					beforeId={presentBeforeId}
					id="default-layer-vehicles-delay"
					source="default-source-vehicles"
					type="symbol"
					layout={{
						'icon-allow-overlap': true,
						'icon-anchor': 'center',
						'icon-ignore-placement': true,
						'icon-image': 'cmet-bus-delay',
						'icon-offset': [0, 0],
						'icon-rotate': ['get', 'bearing'],
						'icon-rotation-alignment': 'map',
						'icon-size': ['interpolate',
							['linear'],
							['zoom'],
							10,
							0.05,
							20,
							0.15,
						],
						'symbol-placement': 'point',
					}}
					paint={{
						'icon-opacity': [
							'interpolate',
							['linear'],
							['get',
								'delay'],
							20,
							0,
							40,
							1,
						],
					}}
				/>

				<Layer
					beforeId="default-layer-vehicles-delay"
					id="default-layer-vehicles-regular"
					source="default-source-vehicles"
					type="symbol"
					layout={{
						'icon-allow-overlap': true,
						'icon-anchor': 'center',
						'icon-ignore-placement': true,
						'icon-image': 'cmet-bus-regular',
						'icon-offset': [0, 0],
						'icon-rotate': ['get', 'bearing'],
						'icon-rotation-alignment': 'map',
						'icon-size': ['interpolate',
							['linear'],
							['zoom'],
							10,
							0.05,
							20,
							0.15,
						],
						'symbol-placement': 'point',
					}}
				/>

			</Source>

			{showCounter === 'always' && (
				<div className={`${styles.vehiclesCounter} ${vehiclesData.features.length === 0 && styles.zeroCount}`}>
					<LiveIcon className={styles.vehiclesCounterIcon} color={vehiclesData.features.length === 0 ? 'var(--color-system-text-300)' : ''} />
					{t('vehicles_counter', { count: vehiclesData.features.length })}
				</div>
			)}

			{showCounter === 'positive' && vehiclesData.features.length > 0 && (
				<div className={styles.vehiclesCounter}>
					<LiveIcon />
					{t('vehicles_counter', { count: vehiclesData.features.length })}
				</div>
			)}

		</>
	);

	//
}
