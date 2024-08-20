import LiveIcon from '@/components/common/LiveIcon';
import { Pattern, Shape, VehiclePosition } from '@/utils/types';
import { bbox } from '@turf/turf';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import Map, { CircleLayer, Layer, LineLayer, Source, SymbolLayer, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './styles.module.css';

export default function Component({ pattern }: { pattern: Pattern }) {
	const { map } = useMap();

	const t = useTranslations('line');
	const { data: shape } = useSWR<Shape>('https://api.carrismetropolitana.pt/shapes/' + pattern.shape_id);
	const { data: allVehiclesData } = useSWR<VehiclePosition[]>('https://api.carrismetropolitana.pt/vehicles', {
		refreshInterval: 10000,
	});
	const relevantVehiclesGeoJson: FeatureCollection<Geometry, GeoJsonProperties> = useMemo(() => {
		const relevantVehicles = realTime?.filter(vehicle => vehicle.pattern_id === pattern.pattern_id);
		return {
			features: relevantVehicles?.map(vehicle => ({
				geometry: {
					coordinates: [vehicle.lon, vehicle.lat],
					type: 'Point',
				},
				properties: {
					bearing: vehicle.bearing,
					block_id: vehicle.block_id,
					current_status: vehicle.current_status,
					delay: Math.floor(Date.now() / 1000) - vehicle.timestamp,
					id: vehicle.id,
					line_id: vehicle.line_id,
					pattern_id: vehicle.pattern_id,
					route_id: vehicle.route_id,
					schedule_relationship: vehicle.schedule_relationship,
					shift_id: vehicle.shift_id,
					speed: vehicle.speed,
					stop_id: vehicle.stop_id,
					timeString: new Date(vehicle.timestamp * 1000).toLocaleString(),
					timestamp: vehicle.timestamp,
					trip_id: vehicle.trip_id,
				},
				type: 'Feature',
			})) ?? [],
			type: 'FeatureCollection',
		};
	}, [pattern.pattern_id, realTime]);
	const nActiveVehicles = relevantVehiclesGeoJson.features.length;

	const pathGeoJson = shape?.geojson;
	const stopsGeoJson: FeatureCollection<Geometry, GeoJsonProperties> = useMemo(() => ({
		features: pattern.path.map((stop) => {
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
	}), [pattern.pattern_id]);

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
			'line-color': pattern.color,
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

	useEffect(() => {
		// Change hardcoded urls
		map?.loadImage('https://beta.carrismetropolitana.pt/icons/shape-arrow-direction.png').then((image) => {
			map.addImage('shape-arrow-direction', image.data, { sdf: true });
		});

		map?.loadImage('https://beta.carrismetropolitana.pt/icons/cm-bus-regular.png').then((image) => {
			map.addImage('cm-bus-regular', image.data, { sdf: false });
		});
	}, [map]);

	const bounding = pathGeoJson ? bbox(pathGeoJson) : null;

	return (
		<>{
			bounding
				? (
					<div style={{ height: '200px', position: 'relative', width: '100%' }}>
						<Map
							attributionControl={false}
							id="map"
							mapStyle="https://maps.carrismetropolitana.pt/styles/default/style.json"
							style={{ height: '100%', width: '100%' }}
							initialViewState={{
								bounds: [[bounding[0], bounding[1]], [bounding[2], bounding[3]]],
								fitBoundsOptions: {
									padding: {
										bottom: 20,
										left: 20,
										right: 20,
										top: 20,
									},
								},
								zoom: 11,
							}}
						>
							{ pathGeoJson
							&& (
								<Source data={pathGeoJson} id="shape" type="geojson">
									<Layer {...shapeStyle} />
									<Layer {...shapeArrowStyle} />
								</Source>
							)}
							<Source data={stopsGeoJson} id="stops" type="geojson">
								<Layer {...stopsStyle} />
							</Source>
							<Source data={relevantVehiclesGeoJson} id="vehicles" type="geojson">
								<Layer {...vehiclesStyle} />
							</Source>
						</Map>
						<div className={styles.mapOverlay}>
							<LiveIcon />
							{nActiveVehicles != 0 ? nActiveVehicles : ''}{t('x_vehicles_active', { count: nActiveVehicles })}
						</div>
					</div>
				)
				: <div style={{ height: '200px', position: 'relative', width: '100%' }} />
		}
		</>
	);
}
