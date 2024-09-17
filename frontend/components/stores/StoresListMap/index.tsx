'use client';

/* * */

import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

import Map from '@/components/common/Map';
import { useStoresListContext } from '@/contexts/StoresList.context';
import * as turf from '@turf/turf';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import { Layer, Source, useMap } from 'react-map-gl/maplibre';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const { storesListMap } = useMap();
	const storesListContext = useStoresListContext();
	const t = useTranslations('stores.StoresListMap');

	//
	// B. Transform data

	const allStoresFeatureCollection: FeatureCollection<Geometry, GeoJsonProperties> | null = useMemo(() => {
		if (!storesListContext.data.raw.length) return null;
		const formattedFeatures: Feature<Geometry, GeoJsonProperties>[] = storesListContext.data.raw.map((storeItem) => {
			const expectedWaitTimeInMinutes = Math.round(storeItem.expected_wait_time / 60);
			const textValue = storeItem.current_status !== 'closed' ? t('expected_wait_time', { count: expectedWaitTimeInMinutes }) : '';
			return {
				geometry: {
					coordinates: [storeItem.lon, storeItem.lat],
					type: 'Point',
				},
				properties: {
					current_status: storeItem.current_status,
					store_id: storeItem.id,
					text_value: textValue,
				},
				type: 'Feature',
			};
		});
		return {
			features: formattedFeatures || [],
			type: 'FeatureCollection',
		};
	}, [storesListContext.data.raw, t]);

	useEffect(() => {
		if (!allStoresFeatureCollection || !storesListMap) return;
		const boundingBox = turf.bbox(allStoresFeatureCollection);
		storesListMap.fitBounds([
			[boundingBox[2], boundingBox[3]],
			[boundingBox[0], boundingBox[1]],
		]);
	}, [allStoresFeatureCollection, storesListMap]);

	//
	// C. Handle actions

	const handleMapClick = (event) => {
		if (event?.features[0]) {
			console.log(event.features[0].properties);
			storesListContext.actions.updateSelectedStore(event.features[0].properties.store_id);
		}
	};

	//
	// D. Render component

	return (
		<Map id="storesListMap" interactiveLayerIds={['stores-base']} onClick={handleMapClick}>
			{allStoresFeatureCollection && (
				<Source data={allStoresFeatureCollection} id="stores" type="geojson">
					<Layer
						id="stores-base"
						source="stores"
						type="symbol"
						layout={{
							'icon-allow-overlap': true,
							'icon-anchor': 'bottom',
							'icon-ignore-placement': true,
							'icon-image': [
								'match', ['get', 'current_status'],
								'open', 'cm-store-open',
								'busy', 'cm-store-busy',
								'closed', 'cm-store-closed',
								'#000000',
							],
							'icon-size': 0.45,
							'symbol-placement': 'point',
						}}
						paint={{
							'icon-opacity': [
								'interpolate', ['linear'], ['zoom'],
								10, [
									'match', ['get', 'current_status'],
									'closed', 0.5,
									1,
								],
								11, 1,
							],
						}}
					/>
					<Layer
						id="stores-text"
						source="stores"
						type="symbol"
						layout={{
							'symbol-placement': 'point',
							'text-anchor': 'bottom-left',
							'text-field': ['get', 'text_value'],
							'text-offset': [-0.7, -2.3],
							'text-size': 14,
						}}
						paint={{
							'text-color': [
								'match', ['get', 'current_status'],
								'open', '#3CB43C', // Green
								'busy', '#F09600', // Orange
								'closed', '#9696A0', // Gray
								'#000000',
							],
						}}
					/>
				</Source>
			)}
		</Map>
	);

	//
}
