'use client';

/* * */

import useSWR from 'swr';
import OSMMap from '@/components/OSMMap/OSMMap';
import { useCallback, useEffect, useMemo } from 'react';
import * as turf from '@turf/turf';
import { useMap, Source, Layer, Popup, GeolocateControl } from 'react-map-gl/maplibre';
import { useDebugContext } from '@/contexts/DebugContext';
import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext';
import generateUUID from '@/services/generateUUID';

/* * */

const MAP_DEFAULT_OPTIONS = {
  speed: 4000,
  duration: 2000,
  zoom: 17,
  zoomMargin: 3,
  maxZoom: 16,
};

/* * */

export default function FrontendStopsMap() {
  //

  //
  // A. Setup variables

  const debugContext = useDebugContext();

  const { FrontendStopsMap } = useMap();
  const FrontendStopsContext = useFrontendStopsContext();

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: allVehiclesData } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { data: selectedPatternData } = useSWR(FrontendStopsContext.entities.pattern_id && `https://api.carrismetropolitana.pt/patterns/${FrontendStopsContext.entities.pattern_id}`);
  const { data: selectedShapeData } = useSWR(FrontendStopsContext.entities.shape_id && `https://api.carrismetropolitana.pt/shapes/${FrontendStopsContext.entities.shape_id}`);

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

  const selectedStopMapData = useMemo(() => {
    if (FrontendStopsContext.entities.stop) {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [FrontendStopsContext.entities.stop.lon, FrontendStopsContext.entities.stop.lat],
        },
        properties: {
          id: FrontendStopsContext.entities.stop.id,
        },
      };
    }
  }, [FrontendStopsContext.entities.stop]);

  const selectedShapeMapData = useMemo(() => {
    if (selectedPatternData && selectedShapeData) {
      return {
        ...selectedShapeData.geojson,
        properties: {
          color: selectedPatternData.color,
          text_color: selectedPatternData.text_color,
        },
      };
    }
    return null;
  }, [selectedPatternData, selectedShapeData]);

  const selectedVehicleMapData = useMemo(() => {
    if (allVehiclesData && FrontendStopsContext.entities.trip_id) {
      const selectedVehicleData = allVehiclesData.find((item) => item.trip_id && item.trip_id === FrontendStopsContext.entities.trip_id);
      if (selectedVehicleData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedVehicleData.lon, selectedVehicleData.lat],
          },
          properties: {
            id: selectedVehicleData.id,
            speed: selectedVehicleData.speed,
            timestamp: selectedVehicleData.timestamp,
            timeString: new Date(selectedVehicleData.timestamp * 1000).toLocaleString(),
            delay: Math.floor(Date.now() / 1000) - selectedVehicleData.timestamp,
            heading: selectedVehicleData.heading,
            trip_id: selectedVehicleData.trip_id,
            pattern_id: selectedVehicleData.pattern_id,
            status: selectedVehicleData.status,
          },
        };
      }
      return null;
    }
  }, [allVehiclesData, FrontendStopsContext.entities.trip_id]);

  const selectedCoordinatesMapData = useMemo(() => {
    if (FrontendStopsContext.map.selected_coordinates) {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: FrontendStopsContext.map.selected_coordinates,
        },
      };
    }
    return null;
  }, [FrontendStopsContext.map.selected_coordinates]);

  //
  // D. Handle actions

  useEffect(() => {
    if (!FrontendStopsMap) return;
    // Load direction arrows
    FrontendStopsMap.loadImage('/icons/shape-arrow-direction.png', (error, image) => {
      if (error) throw error;
      FrontendStopsMap.addImage('shape-arrow-direction', image, { sdf: true });
    });
    // Load vehicle symbol
    FrontendStopsMap.loadImage('/icons/cm-bus-regular.png', (error, image) => {
      if (error) throw error;
      FrontendStopsMap.addImage('cm-bus-regular', image, { sdf: false });
    });
    // Load vehicle symbol
    FrontendStopsMap.loadImage('/icons/cm-bus-delay.png', (error, image) => {
      if (error) throw error;
      FrontendStopsMap.addImage('cm-bus-delay', image, { sdf: false });
    });
    // Load stop selected symbol
    FrontendStopsMap.loadImage('/icons/map-stop-selected.png', (error, image) => {
      if (error) throw error;
      FrontendStopsMap.addImage('stop-selected', image, { sdf: false });
    });
    // Load pin symbol
    FrontendStopsMap.loadImage('/icons/map-pin.png', (error, image) => {
      if (error) throw error;
      FrontendStopsMap.addImage('map-pin', image, { sdf: false });
    });
  }, [FrontendStopsMap]);

  useEffect(() => {
    if (selectedStopMapData && selectedVehicleMapData) {
      // Get window width and height
      let fitBoundsPadding = 100;
      if (window.innerWidth < window.innerHeight) fitBoundsPadding = 50;
      // Fit map
      const collection = turf.featureCollection([selectedStopMapData, selectedVehicleMapData]);
      const boundingBox = turf.bbox(collection);
      FrontendStopsMap.fitBounds(boundingBox, { duration: 2000, padding: fitBoundsPadding, bearing: FrontendStopsMap.getBearing(), maxZoom: 16 });
    }
  }, [selectedStopMapData, selectedVehicleMapData, FrontendStopsMap]);

  //
  // E. Helper functions

  const moveMap = useCallback(
    (coordinates) => {
      // Get map current zoom level
      const currentZoom = FrontendStopsMap.getZoom();
      const currentZoomWithMargin = currentZoom + MAP_DEFAULT_OPTIONS.zoomMargin;
      // Check if the given coordinates are inside the currently rendered map bounds
      const currentMapBounds = FrontendStopsMap.getBounds().toArray();
      const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));
      // If the given coordinates are visible and the zoom is not too far back (plus a little margin)...
      if (isInside && currentZoomWithMargin > MAP_DEFAULT_OPTIONS.zoom) {
        // ...then simply ease to it.
        FrontendStopsMap.easeTo({ center: coordinates, zoom: currentZoom, duration: MAP_DEFAULT_OPTIONS.speed * 0.25 });
      } else {
        // If the zoom is too far, or the given coordinates are not visible, then fly to it
        FrontendStopsMap.flyTo({ center: coordinates, zoom: MAP_DEFAULT_OPTIONS.zoom, duration: MAP_DEFAULT_OPTIONS.speed });
      }
    },
    [FrontendStopsMap]
  );

  //
  // F. Handle actions

  useEffect(() => {
    // Check if map is ready
    if (FrontendStopsMap?.getSource('all-stops') === undefined) return;
    // Check if auto zoom is enabled
    if (!FrontendStopsContext.map.auto_zoom) return;
    // Check if there is a selected map feature
    if (FrontendStopsContext.map.selected_feature) return;
    // Check if there is a selected stop id
    if (!FrontendStopsContext.entities.stop?.id) return;
    // Find the corresponding map feature
    const stopMapFeature = allStopsMapData?.features.find((f) => f.properties?.id === FrontendStopsContext.entities.stop?.id);
    if (!stopMapFeature) return;
    // Center the map and save the feature to state
    moveMap(stopMapFeature.geometry?.coordinates);
    FrontendStopsContext.setSelectedFeature(stopMapFeature);
    //
  });

  useEffect(() => {
    if (FrontendStopsContext.map.selected_coordinates) {
      moveMap(FrontendStopsContext.map.selected_coordinates);
    }
  }, [moveMap, FrontendStopsContext.map.selected_coordinates]);

  const handleMapClick = (event) => {
    if (event?.features[0]?.properties?.id) {
      FrontendStopsContext.selectStop(event.features[0].properties.id);
      FrontendStopsContext.setSelectedFeature(event.features[0]);
      moveMap(event.features[0].geometry?.coordinates);
    }
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.id) {
      FrontendStopsMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.id) {
      FrontendStopsMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    // Get all currently rendered features and mark all of them as unselected
    const allRenderedFeatures = FrontendStopsMap.queryRenderedFeatures();
    allRenderedFeatures.forEach(function (f) {
      FrontendStopsMap.setFeatureState({ source: 'all-stops', id: f.id }, { selected: false });
    });
    // Then mark the selected one as selected
    if (FrontendStopsContext.map.selected_feature) {
      FrontendStopsMap.setFeatureState({ source: 'all-stops', id: FrontendStopsContext.map.selected_feature.properties.mapid }, { selected: true });
    }
  };

  //
  // G. Render components

  return (
    <OSMMap id="FrontendStopsMap" mapStyle={FrontendStopsContext.map.style} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['all-stops']}>
      <GeolocateControl />
      {selectedVehicleMapData && debugContext.isDebug && (
        <Popup closeButton={false} closeOnClick={false} latitude={selectedVehicleMapData.geometry.coordinates[1]} longitude={selectedVehicleMapData.geometry.coordinates[0]} anchor="bottom">
          <div>Vehicle ID: {selectedVehicleMapData.properties.id}</div>
          <div>Timestamp: {selectedVehicleMapData.properties.timeString}</div>
          <div>Delay: {selectedVehicleMapData.properties.delay} seconds</div>
          <div>Inferred Status: {selectedVehicleMapData.properties.status}</div>
        </Popup>
      )}
      {selectedVehicleMapData && (
        <Source id="selected-vehicle" type="geojson" data={selectedVehicleMapData} generateId={true}>
          <Layer
            id="selected-vehicle"
            type="symbol"
            source="selected-vehicle"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'cm-bus-regular',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
              'icon-offset': [0, 0],
              'icon-rotate': ['get', 'heading'],
            }}
          />
          <Layer
            id="selected-vehicle-dead"
            type="symbol"
            source="selected-vehicle"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'cm-bus-delay',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
              'icon-offset': [0, 0],
              'icon-rotate': ['get', 'heading'],
            }}
            paint={{
              'icon-opacity': ['interpolate', ['linear', 0.5], ['get', 'delay'], 20, 0, 40, 1],
            }}
          />
        </Source>
      )}
      {FrontendStopsContext.map.selected_coordinates != null && (
        <Source id="selected-coordinates" type="geojson" data={selectedCoordinatesMapData} generateId={true}>
          <Layer
            id="selected-coordinates-pin"
            type="symbol"
            source="selected-coordinates"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'bottom',
              'symbol-placement': 'point',
              'icon-image': 'map-pin',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.25, 20, 0.35],
              'icon-offset': [0, 5],
            }}
            paint={{
              'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 7, 0, 10, 1],
            }}
          />
        </Source>
      )}
      {selectedStopMapData && (
        <Source id="selected-stop" type="geojson" data={selectedStopMapData} generateId={true}>
          <Layer
            id="selected-stop"
            type="symbol"
            source="selected-stop"
            beforeId={selectedVehicleMapData && 'selected-vehicle'}
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
        </Source>
      )}
      {allStopsMapData && (
        <Source id="all-stops" type="geojson" data={allStopsMapData} generateId={false} promoteId={'mapid'}>
          <Layer
            id="all-stops"
            source="all-stops"
            beforeId={selectedStopMapData && 'selected-stop'}
            type="circle"
            paint={{
              'circle-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#ffffff', '#ffdd01'],
              'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 25, 20]],
              'circle-stroke-width': ['interpolate', ['linear', 1], ['zoom'], 9, 0.01, 26, ['case', ['boolean', ['feature-state', 'selected'], false], 8, 7]],
              'circle-stroke-color': '#000000',
              'circle-pitch-alignment': 'map',
            }}
          />
        </Source>
      )}
      {selectedShapeMapData && (
        <Source id="selected-shape" type="geojson" data={selectedShapeMapData} generateId={true}>
          <Layer
            id="selected-shape-direction"
            type="symbol"
            source="selected-shape"
            beforeId="all-stops"
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
              'icon-color': '#ffffff',
              'icon-opacity': 0.8,
            }}
          />
          <Layer
            id="selected-shape-line"
            type="line"
            source="selected-shape"
            beforeId="selected-shape-direction"
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
