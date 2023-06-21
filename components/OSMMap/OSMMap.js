import styles from './OSMMap.module.css';
import osmMapDefaults from './OSMMap.config';
import Map, { NavigationControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function OSMMap({ id, mapStyle, scrollZoom = true, onClick = () => {}, onMouseEnter = () => {}, onMouseLeave = () => {}, onMove = () => {}, onMoveStart = () => {}, onMoveEnd = () => {}, interactiveLayerIds = [], children }) {
  return (
    <div className={styles.container}>
      <Map
        id={`${id}Map`}
        mapLib={maplibregl}
        initialViewState={osmMapDefaults.initialViewState}
        minZoom={osmMapDefaults.minZoom}
        maxZoom={osmMapDefaults.maxZoom}
        scrollZoom={scrollZoom}
        mapStyle={osmMapDefaults.styles[mapStyle] || osmMapDefaults.styles.default}
        // style={{ width: width || '100%', height: height || '100%' }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMove={onMove}
        onMoveStart={onMoveStart}
        onMoveEnd={onMoveEnd}
        interactive={interactiveLayerIds ? true : false}
        interactiveLayerIds={interactiveLayerIds}
      >
        <NavigationControl />
        {children}
      </Map>
    </div>
  );
}
