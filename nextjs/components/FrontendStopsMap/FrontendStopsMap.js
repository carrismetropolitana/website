'use client';

/* * */

import CopyBadge from '@/components/CopyBadge/CopyBadge'
import OSMMap from '@/components/OSMMap/OSMMap'
import { useDebugContext } from '@/contexts/DebugContext'
import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext'
import generateUUID from '@/services/generateUUID'
import * as turf from '@turf/turf'
import { useCallback, useEffect, useMemo } from 'react'
import { GeolocateControl, Layer, Popup, Source, useMap } from 'react-map-gl/maplibre'
import useSWR from 'swr'

import styles from './FrontendStopsMap.module.css'

/* * */

const MAP_DEFAULT_OPTIONS = {
  duration: 2000,
  maxZoom: 16,
  speed: 4000,
  zoom: 17,
  zoomMargin: 3,
};

/* * */

export default function FrontendStopsMap() {
  //

  //
  // A. Setup variables

  const debugContext = useDebugContext();

  const { frontendStopsMap } = useMap();
  const frontendStopsContext = useFrontendStopsContext();

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: allVehiclesData } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { data: selectedPatternData } = useSWR(frontendStopsContext.entities.pattern_id && `https://api.carrismetropolitana.pt/patterns/${frontendStopsContext.entities.pattern_id}`);
  const { data: selectedShapeData } = useSWR(frontendStopsContext.entities.shape_id && `https://api.carrismetropolitana.pt/shapes/${frontendStopsContext.entities.shape_id}`);

  //
  // C. Transform data

  const allStopsMapData = useMemo(() => {
    const geoJSON = { features: [], type: 'FeatureCollection' };
    if (allStopsData) {
      for (const stop of allStopsData) {
        let currentStatus;
        switch (stop.operational_status) {
          default:
          case 'active':
          case 'voided':
            currentStatus = stop.operational_status;
            break;
          case 'seasonal':
          case 'provisional':
            if (!stop.lines.length) currentStatus = 'inactive';
            else currentStatus = 'active';
            break;
        }
        geoJSON.features.push({
          geometry: { coordinates: [stop.lon, stop.lat], type: 'Point' },
          properties: {
            current_status: currentStatus,
            id: stop.id,
            lat: stop.lat,
            lon: stop.lon,
            mapid: `${stop.id}|${generateUUID()}`,
            name: stop.name,
          },
          type: 'Feature',
        });
      }
    }
    return geoJSON;
  }, [allStopsData]);

  const selectedStopMapData = useMemo(() => {
    if (frontendStopsContext.entities.stop) {
      return {
        geometry: {
          coordinates: [frontendStopsContext.entities.stop.lon, frontendStopsContext.entities.stop.lat],
          type: 'Point',
        },
        properties: {
          id: frontendStopsContext.entities.stop.id,
        },
        type: 'Feature',
      }
    }
  }, [frontendStopsContext.entities.stop]);

  const selectedShapeMapData = useMemo(() => {
    if (selectedPatternData && selectedShapeData) {
      return {
        ...selectedShapeData.geojson,
        properties: {
          color: selectedPatternData.color,
          text_color: selectedPatternData.text_color,
        },
      }
    }
    return null;
  }, [selectedPatternData, selectedShapeData]);

  const selectedVehicleMapData = useMemo(() => {
    if (allVehiclesData && frontendStopsContext.entities.trip_id) {
      const selectedVehicleData = allVehiclesData.find(item => item.trip_id && item.trip_id === frontendStopsContext.entities.trip_id);
      if (selectedVehicleData) {
        return {
          geometry: {
            coordinates: [selectedVehicleData.lon, selectedVehicleData.lat],
            type: 'Point',
          },
          properties: {
            bearing: selectedVehicleData.bearing,
            block_id: selectedVehicleData.block_id,
            current_status: selectedVehicleData.current_status,
            delay: Math.floor(Date.now() / 1000) - selectedVehicleData.timestamp,
            id: selectedVehicleData.id,
            line_id: selectedVehicleData.line_id,
            pattern_id: selectedVehicleData.pattern_id,
            route_id: selectedVehicleData.route_id,
            schedule_relationship: selectedVehicleData.schedule_relationship,
            shift_id: selectedVehicleData.shift_id,
            speed: selectedVehicleData.speed,
            stop_id: selectedVehicleData.stop_id,
            timeString: new Date(selectedVehicleData.timestamp * 1000).toLocaleString(),
            timestamp: selectedVehicleData.timestamp,
            trip_id: selectedVehicleData.trip_id,
          },
          type: 'Feature',
        }
      }
      return null;
    }
  }, [allVehiclesData, frontendStopsContext.entities.trip_id]);

  const selectedCoordinatesMapData = useMemo(() => {
    if (frontendStopsContext.map.selected_coordinates) {
      return {
        geometry: {
          coordinates: frontendStopsContext.map.selected_coordinates,
          type: 'Point',
        },
        type: 'Feature',
      }
    }
    return null;
  }, [frontendStopsContext.map.selected_coordinates]);

  //
  // D. Handle actions

  useEffect(() => {
    if (!frontendStopsMap) return;
    // Load direction arrows
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/shape-arrow-direction.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('shape-arrow-direction', image, { sdf: true });
    })
    // Load vehicle symbol
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/cm-bus-regular.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('cm-bus-regular', image, { sdf: false });
    })
    // Load vehicle symbol
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/cm-bus-delay.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('cm-bus-delay', image, { sdf: false });
    })
    // Load stop selected symbol
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/map-stop-selected.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('stop-selected', image, { sdf: false });
    })
    // Load pin symbol
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/map-pin.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('map-pin', image, { sdf: false });
    })
  }, [frontendStopsMap]);

  useEffect(() => {
    if (selectedStopMapData && selectedVehicleMapData) {
      // Get window width and height
      let fitBoundsPadding = 100;
      if (window.innerWidth < window.innerHeight) fitBoundsPadding = 50;
      // Fit map
      const collection = turf.featureCollection([selectedStopMapData, selectedVehicleMapData]);
      const boundingBox = turf.bbox(collection);
      frontendStopsMap.fitBounds(boundingBox, { bearing: frontendStopsMap.getBearing(), duration: 2000, maxZoom: 16, padding: fitBoundsPadding });
    }
  }, [selectedStopMapData, selectedVehicleMapData, frontendStopsMap]);

  //
  // E. Helper functions

  const moveMap = useCallback(
    (coordinates) => {
      // Get map current zoom level
      const currentZoom = frontendStopsMap.getZoom();
      const currentZoomWithMargin = currentZoom + MAP_DEFAULT_OPTIONS.zoomMargin;
      // Check if the given coordinates are inside the currently rendered map bounds
      const currentMapBounds = frontendStopsMap.getBounds().toArray();
      const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));
      // If the given coordinates are visible and the zoom is not too far back (plus a little margin)...
      if (isInside && currentZoomWithMargin > MAP_DEFAULT_OPTIONS.zoom) {
        // ...then simply ease to it.
        frontendStopsMap.easeTo({ center: coordinates, duration: MAP_DEFAULT_OPTIONS.speed * 0.25, zoom: currentZoom });
      }
 else {
        // If the zoom is too far, or the given coordinates are not visible, then fly to it
        frontendStopsMap.flyTo({ center: coordinates, duration: MAP_DEFAULT_OPTIONS.speed, zoom: MAP_DEFAULT_OPTIONS.zoom });
      }
    },
    [frontendStopsMap],
  )

  //
  // F. Handle actions

  useEffect(() => {
    // Check if map is ready
    if (frontendStopsMap?.getSource('all-stops') === undefined) return;
    // Check if auto zoom is enabled
    if (!frontendStopsContext.map.auto_zoom) return;
    // Check if there is a selected map feature
    if (frontendStopsContext.map.selected_feature) return;
    // Check if there is a selected stop id
    if (!frontendStopsContext.entities.stop?.id) return;
    // Find the corresponding map feature
    const stopMapFeature = allStopsMapData?.features.find(f => f.properties?.id === frontendStopsContext.entities.stop?.id);
    if (!stopMapFeature) return;
    // Center the map and save the feature to state
    moveMap(stopMapFeature.geometry?.coordinates);
    frontendStopsContext.setSelectedFeature(stopMapFeature);
    //
  })

  useEffect(() => {
    if (frontendStopsContext.map.selected_coordinates) {
      moveMap(frontendStopsContext.map.selected_coordinates);
    }
  }, [moveMap, frontendStopsContext.map.selected_coordinates]);

  const handleMapClick = (event) => {
    if (event?.features[0]?.properties?.id) {
      frontendStopsContext.selectStop(event.features[0].properties.id);
      frontendStopsContext.setSelectedFeature(event.features[0]);
      moveMap(event.features[0].geometry?.coordinates);
    }
  }

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.id) {
      frontendStopsMap.getCanvas().style.cursor = 'pointer';
    }
  }

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.id) {
      frontendStopsMap.getCanvas().style.cursor = 'default';
    }
  }

  const handleMapMove = () => {
    // Get all currently rendered features and mark all of them as unselected
    const allRenderedFeatures = frontendStopsMap.queryRenderedFeatures();
    allRenderedFeatures.forEach(function (f) {
      frontendStopsMap.setFeatureState({ id: f.id, source: 'all-stops' }, { selected: false });
    })
    // Then mark the selected one as selected
    if (frontendStopsContext.map.selected_feature) {
      frontendStopsMap.setFeatureState({ id: frontendStopsContext.map.selected_feature.properties.mapid, source: 'all-stops' }, { selected: true });
    }
  }

  //
  // G. Render components

  return (
    <OSMMap id="frontendStopsMap" interactiveLayerIds={['all-stops']} mapStyle={frontendStopsContext.map.style} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove}>
      <GeolocateControl />
      {selectedVehicleMapData && debugContext.isDebug &&
				<Popup anchor="bottom" className={styles.popupWrapper} closeButton={false} closeOnClick={false} latitude={selectedVehicleMapData.geometry.coordinates[1]} longitude={selectedVehicleMapData.geometry.coordinates[0]} maxWidth="none">
  <CopyBadge label={`Vehicle ID: ${selectedVehicleMapData.properties.id}`} value={selectedVehicleMapData.properties.id} />
  <CopyBadge label={`Timestamp: ${selectedVehicleMapData.properties.timeString}`} value={selectedVehicleMapData.properties.timeString} />
  <CopyBadge label={`Delay: ${selectedVehicleMapData.properties.delay} seconds`} value={selectedVehicleMapData.properties.delay} />
  <CopyBadge label={`Trip ID: ${selectedVehicleMapData.properties.trip_id}`} value={selectedVehicleMapData.properties.trip_id} />
  <CopyBadge label={`Status: ${selectedVehicleMapData.properties.current_status}: ${selectedVehicleMapData.properties.stop_id}`} value={selectedVehicleMapData.properties.current_status} />
  <CopyBadge label={`Block ID: ${selectedVehicleMapData.properties.block_id}`} value={selectedVehicleMapData.properties.block_id} />
  <CopyBadge label={`Shift ID: ${selectedVehicleMapData.properties.shift_id}`} value={selectedVehicleMapData.properties.shift_id} />
       </Popup>}
      {selectedVehicleMapData &&
				<Source data={selectedVehicleMapData} generateId={true} id="selected-vehicle" type="geojson">
  <Layer
    id="selected-vehicle"
    layout={{
						  'icon-allow-overlap': true,
						  'icon-anchor': 'center',
						  'icon-ignore-placement': true,
						  'icon-image': 'cm-bus-regular',
						  'icon-offset': [0, 0],
						  'icon-rotate': ['get', 'bearing'],
						  'icon-rotation-alignment': 'map',
						  'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
						  'symbol-placement': 'point',
    }}
    source="selected-vehicle"
    type="symbol"
  />
  <Layer
    id="selected-vehicle-dead"
    layout={{
						  'icon-allow-overlap': true,
						  'icon-anchor': 'center',
						  'icon-ignore-placement': true,
						  'icon-image': 'cm-bus-delay',
						  'icon-offset': [0, 0],
						  'icon-rotate': ['get', 'bearing'],
						  'icon-rotation-alignment': 'map',
						  'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
						  'symbol-placement': 'point',
    }}
    paint={{
						  'icon-opacity': ['interpolate', ['linear', 0.5], ['get', 'delay'], 20, 0, 40, 1],
    }}
    source="selected-vehicle"
    type="symbol"
  />
       </Source>}
      {frontendStopsContext.map.selected_coordinates != null &&
				<Source data={selectedCoordinatesMapData} generateId={true} id="selected-coordinates" type="geojson">
  <Layer
    id="selected-coordinates-pin"
    layout={{
						  'icon-allow-overlap': true,
						  'icon-anchor': 'bottom',
						  'icon-ignore-placement': true,
						  'icon-image': 'map-pin',
						  'icon-offset': [0, 5],
						  'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.25, 20, 0.35],
						  'symbol-placement': 'point',
    }}
    paint={{
						  'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 7, 0, 10, 1],
    }}
    source="selected-coordinates"
    type="symbol"
  />
       </Source>}
      {selectedStopMapData &&
				<Source data={selectedStopMapData} generateId={true} id="selected-stop" type="geojson">
  <Layer
    beforeId={selectedVehicleMapData && 'selected-vehicle'}
    id="selected-stop"
    layout={{
						  'icon-allow-overlap': true,
						  'icon-anchor': 'bottom',
						  'icon-ignore-placement': true,
						  'icon-image': 'stop-selected',
						  'icon-offset': [0, 5],
						  'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.1, 20, 0.25],
						  'symbol-placement': 'point',
    }}
    paint={{
						  'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 7, 0, 10, 1],
    }}
    source="selected-stop"
    type="symbol"
  />
       </Source>}
      {allStopsMapData &&
				<Source data={allStopsMapData} generateId={false} id="all-stops" promoteId="mapid" type="geojson">
  <Layer
    beforeId={selectedStopMapData && 'selected-stop'}
    id="all-stops"
    paint={{
						  'circle-color':
								['match',
								  ['get', 'current_status'],
								  'inactive',
								  '#e6e6e6',
								  '#ffdd01'],
						  'circle-pitch-alignment': 'map',
						  'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 25, 20]],
						  'circle-stroke-color':
								['match',
								  ['get', 'current_status'],
								  'inactive',
								  '#969696',
								  'voided',
								  '#cc5533',
								  '#000000'],
						  'circle-stroke-width': ['interpolate', ['linear', 1], ['zoom'], 9, 0.01, 26, ['case', ['boolean', ['feature-state', 'selected'], false], 8, 7]],
    }}
    source="all-stops"
    type="circle"
  />
       </Source>}
      {selectedShapeMapData &&
				<Source data={selectedShapeMapData} generateId={true} id="selected-shape" type="geojson">
  <Layer
    beforeId="all-stops"
    id="selected-shape-direction"
    layout={{
						  'icon-allow-overlap': true,
						  'icon-anchor': 'center',
						  'icon-ignore-placement': true,
						  'icon-image': 'shape-arrow-direction',
						  'icon-offset': [0, 0],
						  'icon-rotate': 90,
						  'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.1, 20, 0.2],
						  'symbol-placement': 'line',
						  'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 10, 2, 20, 30],
    }}
    paint={{
						  'icon-color': '#ffffff',
						  'icon-opacity': 0.8,
    }}
    source="selected-shape"
    type="symbol"
  />
  <Layer
    beforeId="selected-shape-direction"
    id="selected-shape-line"
    layout={{
						  'line-cap': 'round',
						  'line-join': 'round',
    }}
    paint={{
						  'line-color': ['get', 'color'],
						  'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 20, 12],
    }}
    source="selected-shape"
    type="line"
  />
       </Source>}
    </OSMMap>
  )

  //
}
