'use client';

/* * */

import { MapViewToolbar } from '@/components/map/MapViewToolbar';
import { useMapOptionsContext } from '@/contexts/MapOptions.context';
import { IconsMap } from '@/settings/assets.settings';
import { mapDefaultConfig } from '@/settings/map.settings';
import maplibregl from 'maplibre-gl';
import { useCallback, useEffect, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, MapRef, NavigationControl, ScaleControl, useMap } from 'react-map-gl/maplibre';

import styles from './styles.module.css';

/* * */

const MAP_LOAD_ASSETS = [
	{ name: 'cmet-bus-delay', sdf: false, url: IconsMap.bus_delay },
	{ name: 'cmet-bus-regular', sdf: false, url: IconsMap.bus_regular },
	{ name: 'cmet-bus-error', sdf: false, url: IconsMap.bus_error },
	{ name: 'cmet-pin', sdf: false, url: IconsMap.pin },
	{ name: 'cmet-shape-direction', sdf: true, url: IconsMap.shape_direction },
	{ name: 'cmet-stop-selected', sdf: false, url: IconsMap.stop_selected },
	{ name: 'cmet-store-busy', sdf: false, url: IconsMap.store_busy },
	{ name: 'cmet-store-closed', sdf: false, url: IconsMap.store_closed },
	{ name: 'cmet-store-open', sdf: false, url: IconsMap.store_open },
];

/* * */

export type MapStyle = 'map' | 'satellite';

interface Props {
	centerLayer?: string
	children: React.ReactNode
	fullscreen?: boolean
	geolocate?: boolean
	id?: string
	interactiveLayerIds?: string[]
	mapObject?: MapRef
	mapStyle?: MapStyle
	navigation?: boolean
	onClick?: (arg0) => void
	onMouseEnter?: (arg0) => void // When the mouse enters the interactive layer
	onMouseLeave?: (arg0) => void // When the mouse leaves the interactive layer
	onMouseOut?: (arg0) => void // When the mouse enters the map
	onMouseOver?: (arg0) => void // When the mouse leaves the map
	onMove?: (arg0) => void
	onMoveEnd?: (arg0) => void
	onMoveStart?: (arg0) => void
	scale?: boolean
	scrollZoom?: boolean
	toolbar?: boolean
}

/* * */

export function MapView({
	centerLayer,
	children,
	fullscreen = true,
	geolocate = true,
	id,
	interactiveLayerIds = [],
	mapStyle,
	navigation = true,
	onClick,
	onMouseEnter,
	onMouseLeave,
	onMouseOut,
	onMouseOver,
	onMoveEnd,
	onMoveStart,
	scale = false,
	scrollZoom = true,
	toolbar = true,
}: Props) {
	//
	// A. Setup variables
	const [cursor, setCursor] = useState<string>('auto');
	const allMaps = useMap();
	const mapOptionsContext = useMapOptionsContext();

	//
	// B. Transform data

	useEffect(() => {
		if (!id || !allMaps || !allMaps[id]) return;
		const mapObject = allMaps[id];
		mapOptionsContext.actions.setMap(mapObject);
		for (const mapLoadAsset of MAP_LOAD_ASSETS) {
			mapObject.loadImage(mapLoadAsset.url).then((image) => {
				mapObject.addImage(mapLoadAsset.name, image.data, { sdf: mapLoadAsset.sdf });
			});
		}
	}, [allMaps, id]);

	const mapStyleValue = mapStyle ?? mapOptionsContext.data.style;

	//
	// C. Handle actions
	const handleOnMouseEnter = useCallback((event) => {
		setCursor('pointer');

		if (onMouseEnter) {
			onMouseEnter(event);
		}
	}, []);

	const handleOnMouseLeave = useCallback((event) => {
		setCursor('auto');

		if (onMouseLeave) {
			onMouseLeave(event);
		}
	}, []);

	const handleOnMoveStart = useCallback((event) => {
		setCursor('grab');

		if (onMoveStart) {
			onMoveStart(event);
		}
	}, []);

	const handleOnMoveEnd = useCallback((event) => {
		setCursor('auto');

		if (onMoveEnd) {
			onMoveEnd(event);
		}
	}, []);

	//
	// C. Render components
	return (
		<div className={styles.container}>
			{toolbar && <MapViewToolbar centerLayer={centerLayer} className={styles.toolbar} />}
			<Map
				attributionControl={false}
				cursor={cursor}
				id={id || 'map'}
				initialViewState={mapDefaultConfig.initialViewState}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
				mapLib={maplibregl}
				mapStyle={mapDefaultConfig.styles[mapStyleValue as string]}
				maxZoom={mapDefaultConfig.maxZoom}
				minZoom={mapDefaultConfig.minZoom}
				onClick={onClick}
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
				onMouseOut={onMouseOut}
				onMouseOver={onMouseOver}
				onMove={handleOnMoveStart}
				onMoveEnd={handleOnMoveEnd}
				onMoveStart={handleOnMoveStart}
				scrollZoom={scrollZoom}
				style={{ height: '100%', minHeight: '80vh', position: 'relative', width: '100%' }}
			>
				{navigation && <NavigationControl />}
				{fullscreen && <FullscreenControl />}
				{geolocate && <GeolocateControl />}
				{scale && <ScaleControl />}
				<div className={styles.childrenWrapper}>
					{children}
				</div>
			</Map>
			<div className={styles.attributionWrapper}>
				<a href="https://maplibre.org/" target="_blank">MapLibre</a>
				<a href="https://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a>
				<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
			</div>
		</div>
	);
}