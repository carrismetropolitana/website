'use client';

/* * */

import LiveIcon from '@/components/common/LiveIcon';
import Map from '@/components/common/Map';
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';
import { VehiclePosition } from '@/utils/types';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { CircleLayer, Layer, LineLayer, Source, SymbolLayer, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const { linesSingleMap } = useMap();
	const linesSingleContext = useLinesSingleContext();
	const t = useTranslations('lines.LineMap');

	//
	// B. Fetch data

	const { data: allVehiclesData } = useSWR<VehiclePosition[]>('https://api.carrismetropolitana.pt/v2/vehicles', { refreshInterval: 10000 });

	//
	// C. Transform data

	const activeVehiclesGeojson: FeatureCollection<Geometry, GeoJsonProperties> | null = useMemo(() => {
		if (!allVehiclesData) return null;
		const activeVehicles = allVehiclesData.filter((vehicleItem) => {
			return vehicleItem.pattern_id === linesSingleContext.data.active_pattern_group?.pattern_id;
		});
		return {
			features: activeVehicles.map(vehicleItem => ({
				geometry: {
					coordinates: [vehicleItem.lon, vehicleItem.lat],
					type: 'Point',
				},
				properties: {
					bearing: vehicleItem.bearing,
					block_id: vehicleItem.block_id,
					current_status: vehicleItem.current_status,
					delay: Math.floor(Date.now() / 1000) - vehicleItem.timestamp,
					id: vehicleItem.id,
					line_id: vehicleItem.line_id,
					pattern_id: vehicleItem.pattern_id,
					route_id: vehicleItem.route_id,
					schedule_relationship: vehicleItem.schedule_relationship,
					shift_id: vehicleItem.shift_id,
					speed: vehicleItem.speed,
					stop_id: vehicleItem.stop_id,
					timeString: new Date(vehicleItem.timestamp * 1000).toLocaleString(),
					timestamp: vehicleItem.timestamp,
					trip_id: vehicleItem.trip_id,
				},
				type: 'Feature',
			})) ?? [],
			type: 'FeatureCollection',
		};
	}, [linesSingleContext.data.active_pattern_group, allVehiclesData]);

	const stopsGeoJson: FeatureCollection<Geometry, GeoJsonProperties> | null = useMemo(() => {
		if (!linesSingleContext.data.active_pattern_group?.path) return null;
		return {
			features: linesSingleContext.data.active_pattern_group?.path.map((stop) => {
				const { lat, lon } = stop.stop;
				return {
					geometry: {
						coordinates: [parseFloat(lon), parseFloat(lat)],
						type: 'Point',
					},
					properties: {
						name: stop.stop.name,
					},
					type: 'Feature',
				};
			}),
			type: 'FeatureCollection',
		};
	}, [linesSingleContext.data.active_pattern_group?.path]);

	const stopsStyle: CircleLayer = {
		id: 'stops',
		paint: {
			'circle-color': '#FFDD00',
			'circle-radius': 3,
			'circle-stroke-color': '#000',
			'circle-stroke-width': 1.5,
		},
		source: 'stops',
		type: 'circle',
	};
	const shapeStyle: LineLayer = {
		id: 'point',
		layout: {
			'line-cap': 'round',
			'line-join': 'round',
		},
		paint: {
			'line-color': linesSingleContext.data.line?.color,
			'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 20, 12],
		},

		source: 'shape',
		type: 'line',
	};
	const shapeArrowStyle: SymbolLayer = {
		id: 'shape-arrows',
		layout: {
			'icon-allow-overlap': true,
			'icon-anchor': 'center',
			'icon-ignore-placement': true,
			'icon-image': 'shape-arrow-direction',
			'icon-offset': [0, 0],
			'icon-rotate': 90,
			'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.1, 20, 0.2],
			'symbol-placement': 'line',
			'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 10, 2, 20, 30],
		},
		paint: {
			'icon-color': '#ffffff',
			'icon-halo-color': '#fff',
			'icon-opacity': 0.8,
			'text-color': '#fff',
		},
		source: 'shape',
		type: 'symbol',
	};

	const vehiclesStyle: SymbolLayer = {
		id: 'vehicles',
		layout: {
			'icon-allow-overlap': true,
			'icon-anchor': 'center',
			'icon-ignore-placement': true,
			'icon-image': 'cm-bus-regular',
			'icon-offset': [0, 0],
			'icon-rotate': ['get', 'bearing'],
			'icon-rotation-alignment': 'map',
			'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.05, 20, 0.15],
			'symbol-placement': 'point',
		},
		source: 'vehicles',
		type: 'symbol',
	};

	// const bounding = pathGeoJson ? bbox(pathGeoJson) : null;

	return (
		<Map mapObject={linesSingleMap}>
			{linesSingleContext.data.active_shape?.geojson && (
				<Source data={linesSingleContext.data.active_shape?.geojson} id="shape" type="geojson">
					<Layer {...shapeStyle} />
					<Layer {...shapeArrowStyle} />
				</Source>
			)}
			{stopsGeoJson && (
				<Source data={stopsGeoJson} id="stops" type="geojson">
					<Layer {...stopsStyle} />
				</Source>
			)}
			{activeVehiclesGeojson && (
				<Source data={activeVehiclesGeojson} id="vehicles" type="geojson">
					<Layer {...vehiclesStyle} />
				</Source>
			)}
			{activeVehiclesGeojson?.features && activeVehiclesGeojson?.features.length > 0 && (
				<div className={styles.mapOverlay}>
					<LiveIcon />
					{t('active_vehicles_counter', { count: activeVehiclesGeojson?.features.length })}
				</div>
			)}
		</Map>
	);
}
