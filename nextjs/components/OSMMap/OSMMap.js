import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Map, { FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl/maplibre';

import osmMapDefaults from './OSMMap.config';
import styles from './OSMMap.module.css';

export default function OSMMap({
	children,
	fullscreen = true,
	id,
	interactiveLayerIds = [],
	mapStyle,
	navigation = true,
	onClick = () => null,
	onMouseEnter = () => null,
	onMouseLeave = () => null,
	onMove = () => null,
	onMoveEnd = () => null,
	onMoveStart = () => null,
	scale = true,
	scrollZoom = true,
}) {
	return (
		<div className={styles.container}>
			<Map
				id={id}
				initialViewState={osmMapDefaults.initialViewState}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
				mapLib={maplibregl}
				mapStyle={osmMapDefaults.styles[mapStyle] || osmMapDefaults.styles.default}
				maxZoom={osmMapDefaults.styles[mapStyle].maxZoom || osmMapDefaults.maxZoom}
				minZoom={osmMapDefaults.styles[mapStyle].minZoom || osmMapDefaults.minZoom}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onMove={onMove}
				onMoveEnd={onMoveEnd}
				onMoveStart={onMoveStart}
				scrollZoom={scrollZoom}
				style={{ height: '100%', width: '100%' }}
			>
				{navigation && <NavigationControl />}
				{fullscreen && <FullscreenControl />}
				{scale && <ScaleControl maxWidth={100} unit="metric" />}
				{children}
			</Map>
		</div>
	);
}
