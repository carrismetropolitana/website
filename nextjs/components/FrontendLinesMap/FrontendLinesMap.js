'use client';

/* * */

import useSWR from 'swr';
import OSMMap from '@/components/OSMMap/OSMMap';
import styles from './FrontendLinesMap.module.css';
import { useCallback, useEffect, useMemo } from 'react';
import * as turf from '@turf/turf';
import { useMap, Source, Layer, Popup, GeolocateControl } from 'react-map-gl/maplibre';
import { useDebugContext } from '@/contexts/DebugContext';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import generateUUID from '@/services/generateUUID';
import CopyBadge from '@/components/CopyBadge/CopyBadge';

/* * */

const MAP_DEFAULT_OPTIONS = {
  speed: 4000,
  duration: 2000,
  zoom: 17,
  zoomMargin: 3,
  maxZoom: 16,
};

/* * */

export default function FrontendLinesMap() {
  //

  //
  // A. Setup variables

  const debugContext = useDebugContext();

  const { FrontendLinesMap } = useMap();
  const FrontendLinesContext = useFrontendLinesContext();

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: allVehiclesData } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { data: selectedShapeData } = useSWR(FrontendLinesContext.entities?.pattern?.shape_id && `https://api.carrismetropolitana.pt/shapes/${FrontendLinesContext.entities.pattern.shape_id}`);

  //
  // C. Transform data

  const allStopsMapData = useMemo(() => {
    const geoJSON = { type: 'FeatureCollection', features: [] };
    if (allStopsData) {
      for (const stop of allStopsData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [stop.lon, stop.lat] },
          properties: {
            mapid: `${stop.id}|${generateUUID()}`,
            id: stop.id,
            name: stop.name,
            lat: stop.lat,
            lon: stop.lon,
          },
        });
      }
    }
    return geoJSON;
  }, [allStopsData]);

  const patternStopsMapData = useMemo(() => {
    if (!FrontendLinesContext.entities.pattern?.path?.length) return null;
    const geoJSON = { type: 'FeatureCollection', features: [] };
    for (const patternPath of FrontendLinesContext.entities.pattern.path) {
      geoJSON.features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [patternPath.stop.lon, patternPath.stop.lat] },
        properties: {
          mapid: `${patternPath.stop.id}|${generateUUID()}`,
          id: patternPath.stop.id,
          name: patternPath.stop.name,
          lat: patternPath.stop.lat,
          lon: patternPath.stop.lon,
          stop_sequence: patternPath.stop_sequence,
          color: FrontendLinesContext.entities.pattern.color,
          text_color: FrontendLinesContext.entities.pattern.text_color,
        },
      });
    }
    return geoJSON;
  }, [FrontendLinesContext.entities.pattern]);

  const selectedStopMapData = useMemo(() => {
    if (!FrontendLinesContext.entities.pattern?.color || !FrontendLinesContext.entities.stop?.lon) return null;
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [FrontendLinesContext.entities.stop.lon, FrontendLinesContext.entities.stop.lat],
      },
      properties: {
        color: FrontendLinesContext.entities.pattern.color,
        text_color: FrontendLinesContext.entities.pattern.text_color,
      },
    };
  }, [FrontendLinesContext.entities.pattern, FrontendLinesContext.entities.stop]);

  const selectedShapeMapData = useMemo(() => {
    if (!FrontendLinesContext.entities.pattern?.color || !selectedShapeData) return null;
    return {
      ...selectedShapeData.geojson,
      properties: {
        color: FrontendLinesContext.entities.pattern.color || '#000000',
        text_color: FrontendLinesContext.entities.pattern.text_color || '#ffffff',
      },
    };
  }, [FrontendLinesContext.entities.pattern, selectedShapeData]);

  const selectedVehiclesMapData = useMemo(() => {
    if (!allVehiclesData || !FrontendLinesContext.entities.pattern?.id) return null;
    const geoJSON = { type: 'FeatureCollection', features: [] };
    const selectedVehiclesData = allVehiclesData.filter((item) => item.pattern_id === FrontendLinesContext.entities.pattern.id);
    geoJSON.features = selectedVehiclesData.map((vehicleData) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [vehicleData.lon, vehicleData.lat],
        },
        properties: {
          id: vehicleData.id,
          timestamp: vehicleData.timestamp,
          timeString: new Date(vehicleData.timestamp * 1000).toLocaleString(),
          delay: Math.floor(Date.now() / 1000) - vehicleData.timestamp,
          schedule_relationship: vehicleData.schedule_relationship,
          trip_id: vehicleData.trip_id,
          pattern_id: vehicleData.pattern_id,
          route_id: vehicleData.route_id,
          line_id: vehicleData.line_id,
          stop_id: vehicleData.stop_id,
          current_status: vehicleData.current_status,
          block_id: vehicleData.block_id,
          shift_id: vehicleData.shift_id,
          bearing: vehicleData.bearing,
          speed: vehicleData.speed,
        },
      };
    });
    return geoJSON;
  }, [allVehiclesData, FrontendLinesContext.entities.pattern?.id]);

  useEffect(() => {
    if (!FrontendLinesMap) return;
    // Load direction arrows
    FrontendLinesMap.loadImage('/icons/shape-arrow-direction.png', (error, image) => {
      if (error) throw error;
      FrontendLinesMap.addImage('shape-arrow-direction', image, { sdf: true });
    });
    // Load vehicle symbol
    FrontendLinesMap.loadImage('/icons/cm-bus-regular.png', (error, image) => {
      if (error) throw error;
      FrontendLinesMap.addImage('cm-bus-regular', image, { sdf: false });
    });
    // Load vehicle symbol
    FrontendLinesMap.loadImage('/icons/cm-bus-delay.png', (error, image) => {
      if (error) throw error;
      FrontendLinesMap.addImage('cm-bus-delay', image, { sdf: false });
    });
    // Load stop selected symbol
    FrontendLinesMap.loadImage('/icons/map-stop-selected.png', (error, image) => {
      if (error) throw error;
      FrontendLinesMap.addImage('stop-selected', image, { sdf: false });
    });
    // Load pin symbol
    FrontendLinesMap.loadImage('/icons/map-pin.png', (error, image) => {
      if (error) throw error;
      FrontendLinesMap.addImage('map-pin', image, { sdf: false });
    });
  }, [FrontendLinesMap]);

  useEffect(() => {
    if (selectedShapeMapData && FrontendLinesContext.map.auto_zoom) {
      // Get window width and height
      let fitBoundsPadding = 100;
      if (window.innerWidth < window.innerHeight) fitBoundsPadding = 50;
      // Fit map
      const collection = turf.featureCollection([selectedShapeMapData]);
      const boundingBox = turf.bbox(collection);
      FrontendLinesMap.fitBounds(boundingBox, { duration: 2000, padding: fitBoundsPadding, bearing: FrontendLinesMap.getBearing(), maxZoom: 16 });
    }
  }, [selectedShapeMapData, selectedVehiclesMapData, FrontendLinesMap, FrontendLinesContext.map.auto_zoom]);

  //
  // E. Helper functions

  const moveMap = useCallback(
    (coordinates) => {
      // Get map current zoom level
      const currentZoom = FrontendLinesMap.getZoom();
      const currentZoomWithMargin = currentZoom + MAP_DEFAULT_OPTIONS.zoomMargin;
      // Check if the given coordinates are inside the currently rendered map bounds
      const currentMapBounds = FrontendLinesMap.getBounds().toArray();
      const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));
      // If the given coordinates are visible and the zoom is not too far back (plus a little margin)...
      if (isInside && currentZoomWithMargin > MAP_DEFAULT_OPTIONS.zoom) {
        // ...then simply ease to it.
        FrontendLinesMap.easeTo({ center: coordinates, zoom: currentZoom, duration: MAP_DEFAULT_OPTIONS.speed * 0.25 });
      } else {
        // If the zoom is too far, or the given coordinates are not visible, then fly to it
        FrontendLinesMap.flyTo({ center: coordinates, zoom: MAP_DEFAULT_OPTIONS.zoom, duration: MAP_DEFAULT_OPTIONS.speed });
      }
    },
    [FrontendLinesMap]
  );

  //
  // C. Render components

  useEffect(() => {
    // Check if map is ready
    if (FrontendLinesMap && FrontendLinesMap?.getSource('all-stops') === undefined) return;
    // Check if auto zoom is enabled
    if (!FrontendLinesContext.map.auto_zoom) return;
    // Check if there is a selected map feature
    if (FrontendLinesContext.map.selected_feature) return;
    // Check if there is a selected stop id
    if (!FrontendLinesContext.entities.stop?.id) return;
    // Find the corresponding map feature
    const stopMapFeature = allStopsMapData?.features.find((f) => f.properties?.id === FrontendLinesContext.entities.stop?.id);
    if (!stopMapFeature) return;
    // Center the map and save the feature to state
    moveMap(stopMapFeature.geometry?.coordinates);
    FrontendLinesContext.setSelectedFeature(stopMapFeature);
    //
  });

  const handleMapClick = (event) => {
    if (event?.features[0]?.properties?.id) {
      const foundStopInPath = FrontendLinesContext.entities.pattern.path.find((item) => item.stop.id === event.features[0].properties.id && item.stop_sequence === event.features[0].properties.stop_sequence);
      if (foundStopInPath) {
        FrontendLinesContext.selectStop(foundStopInPath.stop, foundStopInPath.stop_sequence);
        moveMap(event.features[0].geometry?.coordinates);
      }
    }
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.id) {
      FrontendLinesMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.id) {
      FrontendLinesMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    FrontendLinesContext.disableAutoZoom();
  };

  useEffect(() => {
    if (FrontendLinesContext.entities.stop) {
      moveMap([FrontendLinesContext.entities.stop.lon, FrontendLinesContext.entities.stop.lat]);
    }
  }, [FrontendLinesContext.entities.stop, moveMap]);

  //
  // C. Render components

  return (
    <OSMMap id="FrontendLinesMap" mapStyle={FrontendLinesContext.map.style} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['pattern-stops']}>
      <GeolocateControl />
      {selectedVehiclesMapData &&
        debugContext.isDebug &&
        selectedVehiclesMapData.features.map((vehicle) => (
          <Popup className={styles.popupWrapper} key={vehicle.properties.id} closeButton={false} closeOnClick={false} latitude={vehicle.geometry.coordinates[1]} longitude={vehicle.geometry.coordinates[0]} anchor="bottom" maxWidth="none" offset={15}>
            <CopyBadge label={`Vehicle ID: ${vehicle.properties.id}`} value={vehicle.properties.id} />
            <CopyBadge label={`Timestamp: ${vehicle.properties.timeString}`} value={vehicle.properties.timeString} />
            <CopyBadge label={`Delay: ${vehicle.properties.delay} seconds`} value={vehicle.properties.delay} />
            <CopyBadge label={`Trip ID: ${vehicle.properties.trip_id}`} value={vehicle.properties.trip_id} />
            <CopyBadge label={`Status: ${vehicle.properties.current_status}: ${vehicle.properties.stop_id}`} value={vehicle.properties.current_status} />
            <CopyBadge label={`Block ID: ${vehicle.properties.block_id}`} value={vehicle.properties.block_id} />
            <CopyBadge label={`Shift ID: ${vehicle.properties.shift_id}`} value={vehicle.properties.shift_id} />
          </Popup>
        ))}
      {selectedVehiclesMapData && (
        <Source id="selected-vehicles" type="geojson" data={selectedVehiclesMapData} generateId={true}>
          <Layer
            id="selected-vehicles-delay"
            source="selected-vehicles"
            type="symbol"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'cm-bus-delay',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
              'icon-offset': [0, 0],
              'icon-rotate': ['get', 'bearing'],
            }}
            paint={{
              'icon-opacity': ['interpolate', ['linear', 0.5], ['get', 'delay'], 20, 0, 40, 1],
            }}
          />
          <Layer
            id="selected-vehicles-normal"
            beforeId="selected-vehicles-delay"
            source="selected-vehicles"
            type="symbol"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'cm-bus-regular',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
              'icon-offset': [0, 0],
              'icon-rotate': ['get', 'bearing'],
            }}
          />
        </Source>
      )}
      {selectedStopMapData && (
        <Source id="selected-stop" type="geojson" data={selectedStopMapData} generateId={true}>
          <Layer
            id="selected-stop-stick"
            beforeId={selectedVehiclesMapData && 'selected-vehicles-normal'}
            source="selected-stop"
            type="symbol"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'bottom',
              'symbol-placement': 'point',
              'icon-image': 'stop-selected',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.1, 20, 0.25],
              'icon-offset': [0, 5],
            }}
            paint={{
              'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 7, 0, 10, 1],
            }}
          />
          <Layer
            id="selected-stop-base"
            beforeId="selected-stop-stick"
            source="selected-stop"
            type="circle"
            paint={{
              'circle-color': ['get', 'text_color'],
              'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, 5, 26, 18],
              'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 5],
              'circle-stroke-color': ['get', 'color'],
              'circle-pitch-alignment': 'map',
            }}
          />
        </Source>
      )}
      {patternStopsMapData && (
        <Source id="pattern-stops" type="geojson" data={patternStopsMapData} generateId={true}>
          <Layer
            id="pattern-stops"
            beforeId={selectedStopMapData ? 'selected-stop-base' : selectedVehiclesMapData && 'selected-vehicles-normal'}
            source="pattern-stops"
            type="circle"
            paint={{
              'circle-color': ['get', 'text_color'],
              'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 15],
              'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 1, 26, 7],
              'circle-stroke-color': ['get', 'color'],
              'circle-pitch-alignment': 'map',
            }}
          />
        </Source>
      )}
      {selectedShapeMapData && (
        <Source id="selected-shape" type="geojson" data={selectedShapeMapData} generateId={true}>
          <Layer
            id="selected-shape-direction"
            beforeId={patternStopsMapData && 'pattern-stops'}
            source="selected-shape"
            type="symbol"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'line',
              'icon-image': 'shape-arrow-direction',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.1, 20, 0.2],
              'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 10, 2, 20, 30],
              'icon-offset': [0, 0],
              'icon-rotate': 90,
            }}
            paint={{
              'icon-color': ['get', 'text_color'],
              'icon-opacity': 0.8,
            }}
          />
          <Layer
            id="selected-shape-line"
            beforeId="selected-shape-direction"
            source="selected-shape"
            type="line"
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            paint={{
              'line-color': ['get', 'color'],
              'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 20, 12],
            }}
          />
        </Source>
      )}
    </OSMMap>
  );

  //
}
