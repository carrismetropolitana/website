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
	version: 8,
	minZoom: 5,
	maxZoom: 18,
	sources: {
		'raster-tiles': {
			type: 'raster',
			tiles: ['https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
			tileSize: 256,
			attribution: 'Esri, Maxar, Earthstar Geographics, and the GIS User Community',
		},
	},
	layers: [
		{
			id: 'simple-tiles',
			type: 'raster',
			source: 'raster-tiles',
		},
	],
};

//
// EXPORT SINGLE OBJECT

const config = {
	center: [defaultLon, defaultLat],
	initialViewState: { longitude: defaultLon, latitude: defaultLat, bearing: defaultBearing, pitch: defaultPicth, zoom: defaultZoom },
	viewport: { center: [defaultLon, defaultLat], bearing: defaultBearing, pitch: defaultPicth, zoom: defaultZoom },
	styles: { default: styleMap, map: styleMap, satellite: styleSatellite },
	minZoom: minZoom,
	maxZoom: maxZoom,
};

export default config;