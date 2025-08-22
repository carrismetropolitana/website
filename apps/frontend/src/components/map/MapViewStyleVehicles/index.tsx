'use client';

/* * */

import { LiveIcon } from '@/components/common/LiveIcon';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { Layer, Source } from '@vis.gl/react-maplibre';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

/* * */

export const MapViewStyleVehiclesPrimaryLayerId = 'default-layer-vehicles-regular';
export const MapViewStyleVehiclesInteractiveLayerId = 'default-layer-vehicles-regular';

/* * */

interface Props {
	presentBeforeId?: string
	showCounter?: 'always' | 'positive'
	vehiclesData?: GeoJSON.FeatureCollection<GeoJSON.Point>
}

/* * */

const baseGeoJsonFeatureCollection = getBaseGeoJsonFeatureCollection();

const ANIMATION_DURATION = 800; // ms

function ease(t: number): number {
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function interpolateCoords(start: number[], end: number[], t: number): number[] {
	return [
		start[0] + (end[0] - start[0]) * t,
		start[1] + (end[1] - start[1]) * t,
	];
}

function interpolateAngle(start: number, end: number, t: number): number {
	const delta = ((((end - start) % 360) + 540) % 360) - 180;
	return start + delta * t;
}

function interpolateProps(startFeature: GeoJSON.Feature<GeoJSON.Point> | undefined, endFeature: GeoJSON.Feature<GeoJSON.Point>, t: number): GeoJSON.Feature {
	const endCoords = endFeature.geometry.coordinates;

	const startCoords = startFeature
		? (startFeature.geometry as GeoJSON.Point).coordinates
		: endCoords;

	const interpolatedCoords = interpolateCoords(startCoords, endCoords, t);

	const endBearing = endFeature.properties?.bearing ?? 0;
	const startBearing = startFeature?.properties?.bearing ?? endBearing;
	const interpolatedBearing = interpolateAngle(startBearing, endBearing, t);

	const endDelay = endFeature.properties?.delay ?? 0;
	const startDelay = startFeature?.properties?.delay ?? endDelay;
	const interpolatedDelay = startDelay + (endDelay - startDelay) * t;

	// Fade in new features
	const interpolatedOpacity = startFeature ? 1 : t;

	return {
		...endFeature,
		geometry: {
			...endFeature.geometry,
			coordinates: interpolatedCoords,
		},
		properties: {
			...endFeature.properties,
			bearing: interpolatedBearing,
			delay: interpolatedDelay,
			opacity: interpolatedOpacity,
		},
	};
}

/* * */

export function MapViewStyleVehicles({ presentBeforeId, showCounter, vehiclesData = baseGeoJsonFeatureCollection }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('map.MapViewStyleVehicles');

	const [animatedData, setAnimatedData] = useState(vehiclesData);
	const previousDataRef = useRef<GeoJSON.FeatureCollection>(vehiclesData);
	const animationStart = useRef<null | number>(null);
	const animationFrame = useRef<null | number>(null);

	//
	// B. Transform data

	useEffect(() => {
		if (!vehiclesData || vehiclesData.features.length === 0) {
			setAnimatedData(vehiclesData);
			previousDataRef.current = vehiclesData;
			return;
		}

		const startMap = new Map<number | string, GeoJSON.Feature>();
		for (const f of previousDataRef.current.features) {
			if (f.id != null) startMap.set(f.id, f);
		}

		const animate = (timestamp: number) => {
			if (!animationStart.current) animationStart.current = timestamp;
			const elapsed = timestamp - animationStart.current;
			const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
			const easedProgress = ease(progress);

			const interpolatedFeatures = vehiclesData.features.map((endFeature) => {
				const id = endFeature.id;
				const startFeature = id != null ? startMap.get(id) as GeoJSON.Feature<GeoJSON.Point> : undefined;
				return interpolateProps(startFeature, endFeature, easedProgress);
			});

			setAnimatedData({
				...vehiclesData,
				features: interpolatedFeatures as GeoJSON.Feature<GeoJSON.Point>[],
			});

			if (progress < 1) {
				animationFrame.current = requestAnimationFrame(animate);
			}
			else {
				previousDataRef.current = vehiclesData;
				animationStart.current = null;
			}
		};

		if (animationFrame.current !== null) {
			cancelAnimationFrame(animationFrame.current);
		}
		animationFrame.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrame.current !== null) {
				cancelAnimationFrame(animationFrame.current);
			}
		};
	}, [vehiclesData]);

	//
	// B. Render components

	return (
		<>

			<Source data={animatedData} generateId={true} id="default-source-vehicles" type="geojson">

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
						'icon-image': [
							'match',
							['to-string', ['get', 'contactless']],
							'true', // now it's a string, valid branch label
							'cmet-bus-cut',
							'cmet-bus-regular',
						],
						'icon-offset': [0, 0],
						'icon-rotate': ['get', 'bearing'],
						'icon-rotation-alignment': 'map',
						'icon-size': [
							'interpolate',
							['linear'],
							['zoom'],
							10, ['match', ['to-string', ['get', 'contactless']], 'true', 0.1, 0.05],
							20, ['match', ['to-string', ['get', 'contactless']], 'true', 0.3, 0.15],
						],
						'symbol-placement': 'point',
					}}
					paint={{
						'icon-opacity': ['get', 'opacity'],
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
