/* * */

import mapSettings from '@/settings/map.settings';
import maplibregl from 'maplibre-gl';
import { useEffect } from 'react';
import Map, { MapRef, useMap } from 'react-map-gl/maplibre';

import styles from './styles.module.css';

/* * */

const MAP_LOAD_ASSETS = [
	{ name: 'cm-bus-regular', sdf: false, url: '/icons/map/cm-bus-regular.png' },
	{ name: 'shape-arrow-direction', sdf: true, url: '/icons/map/shape-arrow-direction.png' },
	{ name: 'cm-store-open', sdf: false, url: '/icons/map/cm-store-open.png' },
	{ name: 'cm-store-busy', sdf: false, url: '/icons/map/cm-store-busy.png' },
	{ name: 'cm-store-closed', sdf: false, url: '/icons/map/cm-store-closed.png' },
];

/* * */

interface Props {
	children: React.ReactNode
	fullscreen?: boolean
	id?: string
	interactiveLayerIds?: string[]
	mapObject?: MapRef
	mapStyle?: string
	navigation?: boolean
	onClick?: (arg0) => void
	onMouseEnter?: (arg0) => void
	onMouseLeave?: (arg0) => void
	onMove?: (arg0) => void
	onMoveEnd?: (arg0) => void
	onMoveStart?: (arg0) => void
	scale?: boolean
	scrollZoom?: boolean
}

/* * */

export default function Component({ children,
	fullscreen = true,
	id,
	interactiveLayerIds = [],
	mapStyle = 'default',
	navigation = true,
	onClick,
	onMouseEnter,
	onMouseLeave,
	onMove,
	onMoveEnd,
	onMoveStart,
	scale = true,
	scrollZoom = true }: Props) {
	//

	//
	// A. Setup variables

	// const t = useTranslations('common.Map');
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
	// C. Render components

	return (
		<div className={styles.container}>
			<Map
				attributionControl={false}
				id={id}
				initialViewState={mapSettings.initialViewState}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
				mapLib={maplibregl}
				mapStyle={mapSettings.styles[mapStyle] || mapSettings.styles.default}
				maxZoom={mapSettings.styles[mapStyle].maxZoom || mapSettings.maxZoom}
				minZoom={mapSettings.styles[mapStyle].minZoom || mapSettings.minZoom}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onMove={onMove}
				onMoveEnd={onMoveEnd}
				onMoveStart={onMoveStart}
				scrollZoom={scrollZoom}
				style={{ height: '100%', width: '100%' }}
				// style={{
				// 	height: '100%',
				// 	maxHeight: '100%',
				// 	minHeight: '100%',
				// 	width: '100%',
				// }}
			>
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
