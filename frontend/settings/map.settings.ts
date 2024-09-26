/* * */

export const defaults = Object.freeze({

	bearing: 0,

	latitude: 38.7,
	longitude: -9.0,

	picth: 0,

	zoom: 9.5,
	zoom_max: 20,
	zoom_min: 5,

	//
});

// Bearing, Pitch and Zoom
const defaultBearing = 0;
const defaultPicth = 0;
const defaultZoom = 9.5;

// Min and Max Zoom
const minZoom = 5;
const maxZoom = 20;

//
// MAP STYLES

const styleMap = 'https://maps.carrismetropolitana.pt/styles/default/style.json';

const styleSatellite = {
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
};

//
// EXPORT SINGLE OBJECT

const config = {
	center: [defaultLon, defaultLat],
	initialViewState: { bearing: defaultBearing, latitude: defaultLat, longitude: defaultLon, pitch: defaultPicth, zoom: defaultZoom },
	maxZoom: maxZoom,
	minZoom: minZoom,
	styles: { default: styleMap, map: styleMap, satellite: styleSatellite },
	viewport: { bearing: defaultBearing, center: [defaultLon, defaultLat], pitch: defaultPicth, zoom: defaultZoom },
};

export default config;

export const MAP_DEFAULT_OPTIONS = {
	duration: 2000,
	maxZoom: 16,
	speed: 4000,
	zoom: 17,
	zoomMargin: 3,
};
