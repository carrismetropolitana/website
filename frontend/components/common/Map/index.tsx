/* * */

import MapResizeHandle from '@/components/common/MapResizeHandle';
import { useMapOptionsContext } from '@/contexts/MapOptions.context';
import maplibregl from 'maplibre-gl';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import Map, { MapRef } from 'react-map-gl/maplibre';

import styles from './styles.module.css';

/* * */

const MAP_LOAD_ASSETS = [
	{ name: 'cm-bus-regular', sdf: false, url: 'https://beta.carrismetropolitana.pt/icons/cm-bus-regular.png' },
	{ name: 'shape-arrow-direction', sdf: true, url: 'https://beta.carrismetropolitana.pt/icons/shape-arrow-direction.png' },
];

/* * */

interface Props {
	children: React.ReactNode
	mapObject: MapRef | undefined
}

/* * */

export default function Component({ children, mapObject }: Props) {
	//

	//
	// A. Setup variables

	// const t = useTranslations('common.Map');
	const mapOptionsContext = useMapOptionsContext();

	//
	// B. Transform data

	useEffect(() => {
		if (!mapObject) return;
		for (const mapLoadAsset of MAP_LOAD_ASSETS) {
			mapObject.loadImage(mapLoadAsset.url).then((image) => {
				mapObject.addImage(mapLoadAsset.name, image.data, { sdf: mapLoadAsset.sdf });
			});
		}
	}, [mapObject]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<Map
				attributionControl={false}
				id="linesSingleMap"
				mapLib={maplibregl}
				mapStyle="https://maps.carrismetropolitana.pt/styles/default/style.json"
				style={{ height: '100%', maxHeight: mapOptionsContext.data.viewport_height, minHeight: mapOptionsContext.data.viewport_height, width: '100%' }}
				initialViewState={{
					bearing: 0,
					latitude: 38.7,
					longitude: -9.0,
					pitch: 0,
					zoom: 11,
				}}
			>
				{children}
			</Map>
			<div className={styles.attributionWrapper}>
				<a href="https://maplibre.org/" target="_blank">MapLibre</a>
				<a href="https://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a>
				<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
			</div>
			<MapResizeHandle />
		</div>
	);
}
