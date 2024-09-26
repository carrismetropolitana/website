'use client';

/* * */

import mapSettings from '@/settings/map.settings';
import { IconsMap } from '@/utils/assets';
import maplibregl from 'maplibre-gl';
import { useCallback, useEffect, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, MapRef, NavigationControl, ScaleControl, useMap } from 'react-map-gl/maplibre';

import MapToolBar from '../MapToolbar';
import styles from './styles.module.css';

/* * */

const MAP_LOAD_ASSETS = [
	{ name: 'cm-bus-regular', sdf: false, url: IconsMap.MAP_CM_BUS_REGULAR },
	{ name: 'shape-arrow-direction', sdf: true, url: IconsMap.MAP_SHAPE_ARROW_DIRECTION },
	{ name: 'cm-store-open', sdf: false, url: IconsMap.MAP_CM_STORE_OPEN },
	{ name: 'cm-store-busy', sdf: false, url: IconsMap.MAP_CM_STORE_BUSY },
	{ name: 'cm-store-closed', sdf: false, url: IconsMap.MAP_CM_STORE_CLOSED },
];

/* * */

interface Props {
	children: React.ReactNode
	fullscreen?: boolean
	geolocate?: boolean
	id?: string
	interactiveLayerIds?: string[]
	mapObject?: MapRef
	mapStyle?: 'default' | 'map' | 'satellite'
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
}

/* * */

export default function Component({
	children,
	fullscreen = true,
	geolocate = true,
	id,
	interactiveLayerIds = [],
	mapStyle = 'default',
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
}: Props) {
	//
	// A. Setup variables
	const [cursor, setCursor] = useState<string>('auto');
	const allMaps = useMap();

	//
	// B. Transform data

	useEffect(() => {
		if (!id || !allMaps || !allMaps[id]) return;
		const mapObject = allMaps[id];
		console.log(mapObject);
		for (const mapLoadAsset of MAP_LOAD_ASSETS) {
			mapObject.loadImage(mapLoadAsset.url).then((image) => {
				mapObject.addImage(mapLoadAsset.name, image.data, { sdf: mapLoadAsset.sdf });
				console.log('here', mapLoadAsset.name);
			});
		}
	}, [allMaps, id]);

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
			<MapToolBar className={styles.toolbar} />
			<Map
				attributionControl={false}
				cursor={cursor}
				id={id || 'map'}
				initialViewState={mapSettings.initialViewState}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
				mapLib={maplibregl}
				mapStyle={mapSettings.styles[mapStyle as string] || mapSettings.styles.default}
				maxZoom={mapSettings.styles[mapStyle as string].maxZoom || mapSettings.maxZoom}
				minZoom={mapSettings.styles[mapStyle as string].minZoom || mapSettings.minZoom}
				onClick={onClick}
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
				onMouseOut={onMouseOut}
				onMouseOver={onMouseOver}
				onMove={handleOnMoveStart}
				onMoveEnd={handleOnMoveEnd}
				onMoveStart={handleOnMoveStart}
				scrollZoom={scrollZoom}
				style={{ height: '100%', position: 'relative', width: '100%' }}
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
