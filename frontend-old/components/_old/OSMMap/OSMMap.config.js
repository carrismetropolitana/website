// DEFAULTS FOR OSM MAP

// Locations
const defaultLat = 38.7;
const defaultLon = -9.0;

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
			tileSize: 256,
			tiles: ['https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
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
