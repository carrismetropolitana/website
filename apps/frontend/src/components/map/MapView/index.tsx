'use client';

/* * */

import { MapViewDebug } from '@/components/map/MapViewDebug';
import { MapViewToolbar } from '@/components/map/MapViewToolbar';
import { useDebugContext } from '@/contexts/Debug.context';
import { useMapOptionsContext } from '@/contexts/MapOptions.context';
import { mapDefaultConfig } from '@/settings/map.settings';
import Map, { FullscreenControl, GeolocateControl, MapRef, NavigationControl, ScaleControl, useMap } from '@vis.gl/react-maplibre';
import { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

const MAP_LOAD_ASSETS = [
	{ name: 'icon-car-crash', sdf: false, url: '/assets/map/car-crash.png' },
	{ name: 'icon-barrier-block', sdf: false, url: '/assets/map/barrier-block.png' },
	{ name: 'icon-speakerphone', sdf: false, url: '/assets/map/speakerphone.png' },
	{ name: 'icon-calendar-event', sdf: false, url: '/assets/map/calendar-event.png' },
	{ name: 'icon-tool', sdf: false, url: '/assets/map/tool.png' },
	{ name: 'icon-ambulance', sdf: false, url: '/assets/map/ambulance.png' },
	{ name: 'icon-cloud-storm', sdf: false, url: '/assets/map/cloud-storm.png' },
	{ name: 'icon-info-triangle', sdf: false, url: '/assets/map/info-triangle.png' },
	/* * */
	{ name: 'cmet-bus-delay', sdf: false, url: '/assets/map/bus-delay.png' },
	{ name: 'cmet-bus-regular', sdf: false, url: '/assets/map/bus-regular.png' },
	{ name: 'cmet-bus-cut', sdf: false, url: '/assets/map/bus-cut.png' },
	{ name: 'cmet-bus-error', sdf: false, url: '/assets/map/bus-error.png' },
	{ name: 'cmet-needle-pin', sdf: false, url: '/assets/map/needle-pin.png' },
	{ name: 'cmet-shape-direction', sdf: true, url: '/assets/map/shape-direction.png' },
	{ name: 'cmet-stop-selected', sdf: false, url: '/assets/map/stop-selected.png' },
	{ name: 'cmet-store-busy', sdf: false, url: '/assets/map/store-busy.png' },
	{ name: 'cmet-store-closed', sdf: false, url: '/assets/map/store-closed.png' },
	{ name: 'cmet-store-open', sdf: false, url: '/assets/map/store-open.png' },
];

/* * */

export type MapStyle = 'map' | 'satellite';

interface MapViewProps {
	autoZoom?: boolean
	children: React.ReactNode
	fullscreen?: boolean
	geolocate?: boolean
	id?: string
	interactiveLayerIds?: string[]
	mapObject?: MapRef
	mapStyle?: MapStyle
	navigation?: boolean
	onCenterMap?: () => void
	onClick?: (arg0) => void
	onDrag?: (arg0) => void
	onMouseEnter?: (arg0) => void // When the mouse enters the interactive layer
	onMouseLeave?: (arg0) => void // When the mouse leaves the interactive layer
	onMouseOut?: (arg0) => void // When the mouse enters the map
	onMouseOver?: (arg0) => void // When the mouse leaves the map
	onMove?: (arg0) => void
	onMoveEnd?: (arg0) => void
	onMoveStart?: (arg0) => void
	onZoom?: (arg0) => void
	primarySourceId?: string
	scale?: boolean
	scrollZoom?: boolean
	showCenterButton?: boolean
	toolbarExtras?: React.ReactNode
}

/* * */

export function MapView({ autoZoom, children, fullscreen = true, geolocate = true, id, interactiveLayerIds = [], mapStyle, navigation = true, onCenterMap, onClick, onDrag, onMouseEnter, onMouseLeave, onMouseOut, onMouseOver, onMoveEnd, onMoveStart, onZoom, scale = false, scrollZoom = true, showCenterButton = false, toolbarExtras }: MapViewProps) {
	//

	//
	// A. Setup variables

	const allMaps = useMap();

	const mapOptionsContext = useMapOptionsContext();

	const debugContext = useDebugContext();

	const [cursor, setCursor] = useState<string>('auto');

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
		if (onMouseEnter) onMouseEnter(event);
	}, []);

	const handleOnMouseLeave = useCallback((event) => {
		setCursor('auto');
		if (onMouseLeave) onMouseLeave(event);
	}, []);

	const handleOnMoveStart = useCallback((event) => {
		setCursor('grab');
		if (onMoveStart) onMoveStart(event);
	}, []);

	const handleOnMoveEnd = useCallback((event) => {
		setCursor('auto');
		if (onMoveEnd) onMoveEnd(event);
	}, []);

	//
	// D. Render components

	return (
		<div className={styles.container}>

			<MapViewToolbar
				autoZoom={autoZoom}
				className={styles.toolbar}
				onCenterMap={onCenterMap}
				showCenterButton={showCenterButton}
				toolbarExtras={toolbarExtras}
			/>

			<Map
				attributionControl={false}
				cursor={cursor}
				id={id || 'map'}
				initialViewState={mapDefaultConfig.initialViewState}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
				mapStyle={mapDefaultConfig.styles[mapStyleValue as string]}
				maxZoom={mapDefaultConfig.maxZoom}
				minZoom={mapDefaultConfig.minZoom}
				onClick={onClick}
				onDrag={onDrag}
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
				onMouseOut={onMouseOut}
				onMouseOver={onMouseOver}
				onMove={handleOnMoveStart}
				onMoveEnd={handleOnMoveEnd}
				onMoveStart={handleOnMoveStart}
				onZoom={onZoom}
				scrollZoom={scrollZoom}
				style={{ height: '100%', width: '100%' }}
			>

				{navigation && <NavigationControl />}
				{fullscreen && <FullscreenControl />}
				{geolocate && <GeolocateControl />}
				{scale && <ScaleControl />}

				<div className={styles.childrenWrapper}>
					{children}
				</div>

				{debugContext.flags.is_debug_mode && <MapViewDebug />}

			</Map>

			<div className={styles.attributionWrapper}>
				<a href="https://maplibre.org/" target="_blank">MapLibre</a>
				<a href="https://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a>
				<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
			</div>

		</div>
	);
}
