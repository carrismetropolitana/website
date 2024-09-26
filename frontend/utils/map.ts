/* * */

import { MAP_DEFAULT_OPTIONS } from '@/settings/map.settings';
import * as turf from '@turf/turf';

/* * */

export const moveMap = (mapObject, coordinates) => {
	// Get map current zoom level
	const currentZoom = mapObject.getZoom();
	const currentZoomWithMargin = currentZoom + MAP_DEFAULT_OPTIONS.zoomMargin;
	// Check if the given coordinates are inside the currently rendered map bounds
	const currentMapBounds: [[number, number], [number, number]] = mapObject.getBounds().toArray();
	console.log(currentMapBounds);
	const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));
	// If the given coordinates are visible and the zoom is not too far back (plus a little margin)...
	if (isInside && currentZoomWithMargin > MAP_DEFAULT_OPTIONS.zoom) {
		// ...then simply ease to it.
		mapObject.easeTo({ center: coordinates, duration: MAP_DEFAULT_OPTIONS.speed * 0.25, zoom: currentZoom });
	}
	else {
		// If the zoom is too far, or the given coordinates are not visible, then fly to it
		mapObject.flyTo({ center: coordinates, duration: MAP_DEFAULT_OPTIONS.speed, zoom: MAP_DEFAULT_OPTIONS.zoom });
	}
};
