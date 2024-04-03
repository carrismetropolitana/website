import styles from './OSMMap.module.css';
import osmMapDefaults from './OSMMap.config';
import Map, { NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function OSMMap({
	children,
	id,
	mapStyle,
	onClick = () => {},
	onMouseEnter = () => {},
	onMouseLeave = () => {},
	onMove = () => {},
	onMoveStart = () => {},
	onMoveEnd = () => {},
	interactiveLayerIds = [],
	scrollZoom = true,
	navigation = true,
	fullscreen = true,
	scale = true,
}) {
	return (
		<div className={styles.container}>
			<Map
				id={id}
				mapLib={maplibregl}
				initialViewState={osmMapDefaults.initialViewState}
				minZoom={osmMapDefaults.styles[mapStyle].minZoom || osmMapDefaults.minZoom}
				maxZoom={osmMapDefaults.styles[mapStyle].maxZoom || osmMapDefaults.maxZoom}
				scrollZoom={scrollZoom}
				mapStyle={osmMapDefaults.styles[mapStyle] || osmMapDefaults.styles.default}
				style={{ width: '100%', height: '100%' }}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onMove={onMove}
				onMoveStart={onMoveStart}
				onMoveEnd={onMoveEnd}
				interactive={interactiveLayerIds ? true : false}
				interactiveLayerIds={interactiveLayerIds}
			>
				{navigation && <NavigationControl />}
				{fullscreen && <FullscreenControl />}
				{scale && <ScaleControl maxWidth={100} unit='metric' />}
				{children}
			</Map>
		</div>
	);
}