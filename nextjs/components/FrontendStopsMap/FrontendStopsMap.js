'use client';

/* * */

import useSWR from 'swr';
import OSMMap from '@/components/OSMMap/OSMMap';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as turf from '@turf/turf';
import { useMap, Source, Layer, Popup, GeolocateControl } from 'react-map-gl/maplibre';
import { useDebugContext } from '@/contexts/DebugContext';
import { useFrontendStopsContext } from '@/contexts/FrontendStopsContext';
import generateUUID from '@/services/generateUUID';
import CopyBadge from '@/components/CopyBadge/CopyBadge';
import styles from './FrontendStopsMap.module.css';

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

  const { frontendStopsMap } = useMap();
  const frontendStopsContext = useFrontendStopsContext();

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: allVehiclesData } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { data: selectedPatternData } = useSWR(frontendStopsContext.entities.pattern_id && `https://api.carrismetropolitana.pt/patterns/${frontendStopsContext.entities.pattern_id}`);
  const { data: selectedShapeData } = useSWR(frontendStopsContext.entities.shape_id && `https://api.carrismetropolitana.pt/shapes/${frontendStopsContext.entities.shape_id}`);
  const { data: dummyShapeData } = useSWR(`https://api.carrismetropolitana.pt/shapes/p2_3708_0_1`);

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
    if (frontendStopsContext.entities.stop) {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [frontendStopsContext.entities.stop.lon, frontendStopsContext.entities.stop.lat],
        },
        properties: {
          id: frontendStopsContext.entities.stop.id,
        },
      };
    }
  }, [frontendStopsContext.entities.stop]);

  const selectedShapeMapData = useMemo(() => {
    if (!dummyShapeData) return null;
    return {
      ...dummyShapeData.geojson,
      properties: {
        color: '000000',
        text_color: '000000',
      },
    };
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
  }, [dummyShapeData, selectedPatternData, selectedShapeData]);

  const selectedVehicleMapData = useMemo(() => {
    if (allVehiclesData /*&& frontendStopsContext.entities.trip_id*/) {
      const selectedVehicleData = frontendStopsContext.entities.vehicle; // allVehiclesData.find((item) => item.trip_id && item.trip_id === frontendStopsContext.entities.trip_id);
      if (selectedVehicleData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedVehicleData.lon, selectedVehicleData.lat],
          },
          properties: {
            id: selectedVehicleData.id,
            timestamp: selectedVehicleData.timestamp,
            timeString: new Date(selectedVehicleData.timestamp * 1000).toLocaleString(),
            delay: Math.floor(Date.now() / 1000) - selectedVehicleData.timestamp,
            schedule_relationship: selectedVehicleData.schedule_relationship,
            trip_id: selectedVehicleData.trip_id,
            pattern_id: selectedVehicleData.pattern_id,
            route_id: selectedVehicleData.route_id,
            line_id: selectedVehicleData.line_id,
            stop_id: selectedVehicleData.stop_id,
            current_status: selectedVehicleData.current_status,
            block_id: selectedVehicleData.block_id,
            shift_id: selectedVehicleData.shift_id,
            bearing: selectedVehicleData.bearing,
            speed: selectedVehicleData.speed,
          },
        };
      }
      return null;
    }
  }, [allVehiclesData, frontendStopsContext]);

  const selectedCoordinatesMapData = useMemo(() => {
    if (frontendStopsContext.map.selected_coordinates) {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: frontendStopsContext.map.selected_coordinates,
        },
      };
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
    });
    // Load vehicle symbol
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/cm-bus-regular.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('cm-bus-regular', image, { sdf: false });
    });
    // Load vehicle symbol
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/cm-bus-delay.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('cm-bus-delay', image, { sdf: false });
    });
    // Load stop selected symbol
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/map-stop-selected.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('stop-selected', image, { sdf: false });
    });
    // Load pin symbol
    frontendStopsMap.loadImage('https://beta.carrismetropolitana.pt/icons/map-pin.png', (error, image) => {
      if (error) throw error;
      frontendStopsMap.addImage('map-pin', image, { sdf: false });
    });
  }, [frontendStopsMap]);

  useEffect(() => {
    if (selectedStopMapData && selectedVehicleMapData) {
      // Get window width and height
      let fitBoundsPadding = 100;
      if (window.innerWidth < window.innerHeight) fitBoundsPadding = 50;
      // Fit map
      const collection = turf.featureCollection([selectedStopMapData, selectedVehicleMapData]);
      const boundingBox = turf.bbox(collection);
      frontendStopsMap.fitBounds(boundingBox, { duration: 2000, padding: fitBoundsPadding, bearing: frontendStopsMap.getBearing(), maxZoom: 16 });
    }
  }, [selectedStopMapData, selectedVehicleMapData, frontendStopsMap]);

  //
  //
  //
  //
  //
  //
  //
  //
  //

  const pointLayer = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf',
    },
  };

  const [currentVehiclePoint, setCurrentVehiclePoint] = useState(null);

  function pointOnCircle({ iteration }) {
    //
    // console.log('iteration', iteration);

    if (iteration > 1) return turf.point([frontendStopsContext.entities.vehicle.lon, frontendStopsContext.entities.vehicle.lat]);

    if (!selectedShapeMapData || !frontendStopsContext.entities.vehicle || !frontendStopsContext.entities.vehicle_prev) return;

    const line = turf.lineString(selectedShapeMapData);

    const start = turf.point([frontendStopsContext.entities.vehicle_prev.lon, frontendStopsContext.entities.vehicle_prev.lat]);
    const stop = turf.point([frontendStopsContext.entities.vehicle.lon, frontendStopsContext.entities.vehicle.lat]);

    const sliced = turf.lineSlice(start.geometry.coordinates, stop.geometry.coordinates, line.geometry.coordinates);
    const totalLength = turf.length(sliced, { units: 'kilometers' });

    // console.log('totalLength', totalLength);

    const newVehiclePoint = turf.along(sliced, totalLength * iteration, { units: 'kilometers' });

    return newVehiclePoint;

    //
  }

  const currentIt = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // const animation = window.requestAnimationFrame(() => setCurrentVehiclePoint(pointOnCircle({ iteration: currentIt.current + 0.1 })));
      setCurrentVehiclePoint(pointOnCircle({ iteration: currentIt.current + 0.01 }));
      currentIt.current = currentIt.current + 0.01;
    }, 50); // in milliseconds
    return () => clearInterval(intervalId);

    // return () => window.cancelAnimationFrame(animation);
  });

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

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
        frontendStopsMap.easeTo({ center: coordinates, zoom: currentZoom, duration: MAP_DEFAULT_OPTIONS.speed * 0.25 });
      } else {
        // If the zoom is too far, or the given coordinates are not visible, then fly to it
        frontendStopsMap.flyTo({ center: coordinates, zoom: MAP_DEFAULT_OPTIONS.zoom, duration: MAP_DEFAULT_OPTIONS.speed });
      }
    },
    [frontendStopsMap]
  );

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
    const stopMapFeature = allStopsMapData?.features.find((f) => f.properties?.id === frontendStopsContext.entities.stop?.id);
    if (!stopMapFeature) return;
    // Center the map and save the feature to state
    moveMap(stopMapFeature.geometry?.coordinates);
    frontendStopsContext.setSelectedFeature(stopMapFeature);
    //
  });

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
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.id) {
      frontendStopsMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.id) {
      frontendStopsMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    // Get all currently rendered features and mark all of them as unselected
    const allRenderedFeatures = frontendStopsMap.queryRenderedFeatures();
    allRenderedFeatures.forEach(function (f) {
      frontendStopsMap.setFeatureState({ source: 'all-stops', id: f.id }, { selected: false });
    });
    // Then mark the selected one as selected
    if (frontendStopsContext.map.selected_feature) {
      frontendStopsMap.setFeatureState({ source: 'all-stops', id: frontendStopsContext.map.selected_feature.properties.mapid }, { selected: true });
    }
  };

  //
  // G. Render components

  return (
    <OSMMap id="frontendStopsMap" mapStyle={frontendStopsContext.map.style} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['all-stops']}>
      <GeolocateControl />
      {currentVehiclePoint && (
        <Source type="geojson" data={currentVehiclePoint}>
          <Layer {...pointLayer} />
        </Source>
      )}
      {selectedVehicleMapData && debugContext.isDebug && (
        <Popup className={styles.popupWrapper} closeButton={false} closeOnClick={false} latitude={selectedVehicleMapData.geometry.coordinates[1]} longitude={selectedVehicleMapData.geometry.coordinates[0]} anchor="bottom" maxWidth="none">
          <CopyBadge label={`Vehicle ID: ${selectedVehicleMapData.properties.id}`} value={selectedVehicleMapData.properties.id} />
          <CopyBadge label={`Timestamp: ${selectedVehicleMapData.properties.timeString}`} value={selectedVehicleMapData.properties.timeString} />
          <CopyBadge label={`Delay: ${selectedVehicleMapData.properties.delay} seconds`} value={selectedVehicleMapData.properties.delay} />
          <CopyBadge label={`Trip ID: ${selectedVehicleMapData.properties.trip_id}`} value={selectedVehicleMapData.properties.trip_id} />
          <CopyBadge label={`Status: ${selectedVehicleMapData.properties.current_status}: ${selectedVehicleMapData.properties.stop_id}`} value={selectedVehicleMapData.properties.current_status} />
          <CopyBadge label={`Block ID: ${selectedVehicleMapData.properties.block_id}`} value={selectedVehicleMapData.properties.block_id} />
          <CopyBadge label={`Shift ID: ${selectedVehicleMapData.properties.shift_id}`} value={selectedVehicleMapData.properties.shift_id} />
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
              'icon-rotate': ['get', 'bearing'],
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
              'icon-rotate': ['get', 'bearing'],
            }}
            paint={{
              'icon-opacity': ['interpolate', ['linear', 0.5], ['get', 'delay'], 20, 0, 40, 1],
            }}
          />
        </Source>
      )}
      {frontendStopsContext.map.selected_coordinates != null && (
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
