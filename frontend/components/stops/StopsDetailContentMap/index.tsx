'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { MapViewStyleStops, MapViewStyleStopsInteractiveLayerId } from '@/components/map/MapViewStyleStops';
import { useStopsContext } from '@/contexts/Stops.context';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { moveMap } from '@/utils/map.utils';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';

/* * */

export function StopsDetailContentMap() {
	//

	//
	// A. Setup variables

	const { stopsMap } = useMap();

	const stopsContext = useStopsContext();
	const stopsDetailContext = useStopsDetailContext();

	const allStopsGeoJson = useMemo(() => {
		return stopsContext.actions.getAllStopsGeoJsonFC();
	}, [stopsContext.data.raw]);

	const selectedStopGeoJson = useMemo(() => {
		return stopsContext.actions.getStopByIdGeoJsonFC(stopsDetailContext.data.active_stop_id);
	}, [stopsDetailContext.data.stop]);

	//
	// B. Transform Data

	useEffect(() => {
		if (!stopsDetailContext.data.stop || !stopsMap) return;
		const coordinates = [stopsDetailContext.data.stop.lon, stopsDetailContext.data.stop.lat];
		if (coordinates.some(isNaN)) return;
		moveMap(stopsMap, coordinates);
	}, [stopsDetailContext.data.stop, stopsMap]);

	//
	// C. Handle Actions

	function handleLayerClick(event) {
		if (!stopsMap) return;
		const features = stopsMap.queryRenderedFeatures(event.point);
		if (!features.length) return;
		stopsDetailContext.actions.setActiveStopId(features[0].properties.id);
	}

	//
	// E. Render Components

	return (
		<MapView
			id="stopsMap"
			interactiveLayerIds={[MapViewStyleStopsInteractiveLayerId]}
			onClick={handleLayerClick}
		>
			<MapViewStyleStops
				allStopsGeoJsonData={allStopsGeoJson}
				selectedStopGeoJsonData={selectedStopGeoJson}
			/>
		</MapView>
	);

	//
}
