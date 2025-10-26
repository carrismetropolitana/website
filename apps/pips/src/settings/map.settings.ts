/* * */

/**
 * The default values for the map.
 */

export const mapDefaultValues = Object.freeze({
	bearing: 0,
	duration: 1800,
	latitude: 38.7,
	longitude: -9.0,
	picth: 0,
	speed: 4000,
	zoom: 12,
	zoom_margin: 3,
	zoom_max: 20,
	zoom_min: 5,
});

/* * */

/**
 * The available styles for the map.
 */

export const mapDefaultStyles = Object.freeze({
	map: 'https://maps.carrismetropolitana.pt/styles/default/style.json',
	satellite: {
		glyphs: '{fontstack}/{range}.pbf',
		layers: [
			{
				id: 'simple-tiles',
				source: 'raster-tiles',
				type: 'raster',
			},
		],
		maxZoom: 18,
		minZoom: 5,
		sources: {
			'raster-tiles': {
				attribution: 'Esri, Maxar, Earthstar Geographics, and the GIS User Community',
				tiles: ['https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
				tileSize: 256,
				type: 'raster',
			},
		},
		version: 8,
	},
});

/* * */

/**
 * The configuration object for the map.
 */

export const mapDefaultConfig = Object.freeze({
	center: [mapDefaultValues.longitude, mapDefaultValues.latitude],
	initialViewState: {
		bearing: mapDefaultValues.bearing,
		latitude: mapDefaultValues.latitude,
		longitude: mapDefaultValues.longitude,
		pitch: mapDefaultValues.picth,
		zoom: mapDefaultValues.zoom,
	},
	maxZoom: mapDefaultValues.zoom_max,
	minZoom: mapDefaultValues.zoom_min,
	styles: {
		default: mapDefaultStyles.map,
		map: mapDefaultStyles.map,
		satellite: mapDefaultStyles.satellite,
	},
	viewport: {
		bearing: mapDefaultValues.bearing,
		center: [mapDefaultValues.longitude, mapDefaultValues.latitude],
		pitch: mapDefaultValues.picth,
		zoom: mapDefaultValues.zoom,
	},
});
