/* * */

import { mapDefaultValues } from '@/settings/map.settings';
import * as turf from '@turf/turf';

/* * */

/**
 *
 * @param mapObject THe map that should be manipulated
 * @param coordinates The destination coordinates to move the map to
 * @param options Optional settings to customize the movement
 */

export const moveMap = (mapObject, coordinates, options = {}) => {
	//
	// Check if the map object is valid
	if (!mapObject) return;

	if (options) {
		console.log(options);
	}

	//
	// Get map current zoom level

	const currentZoom = mapObject.getZoom();
	const currentZoomWithMargin = currentZoom + mapDefaultValues.zoom_margin;

	//
	// Check if the given coordinates are inside the currently rendered map bounds

	const currentMapBounds: [[number, number], [number, number]] = mapObject.getBounds().toArray();
	console.log(currentMapBounds);
	const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));

	//
	// If the given coordinates are visible and the zoom is not too far back (plus a little margin)...

	if (isInside && currentZoomWithMargin > mapDefaultValues.zoom) {
		// ...then simply ease to it.
		mapObject.easeTo({ center: coordinates, duration: mapDefaultValues.speed * 0.25, zoom: currentZoom });
	}
	else {
		// If the zoom is too far, or the given coordinates are not visible, then fly to it
		mapObject.flyTo({ center: coordinates, duration: mapDefaultValues.speed, zoom: mapDefaultValues.zoom });
	}

	//
};
