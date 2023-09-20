'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import { useContext, useEffect } from 'react';
import * as turf from '@turf/turf';
import { useMap, Source, Layer, Popup, GeolocateControl } from 'react-map-gl/maplibre';
import { DebugContext } from '@/contexts/DebugContext';

export default function StopsExplorerMap({ allStopsMapData, selectedStopMapData, selectedShapeMapData, selectedVehicleMapData, selectedMapStyle, selectedMapFeature, onSelectStopId }) {
  //

  //
  // A. Setup variables

  const debugContext = useContext(DebugContext);

  const { stopsExplorerMap } = useMap();

  //
  // C. Handle actions

  useEffect(() => {
    if (!stopsExplorerMap) return;
    // Load direction arrows
    stopsExplorerMap.loadImage('/icons/shape-arrow-direction.png', (error, image) => {
      if (error) throw error;
      stopsExplorerMap.addImage('shape-arrow-direction', image, { sdf: true });
    });
    // Load vehicle symbol
    stopsExplorerMap.loadImage('/icons/bus.png', (error, image) => {
      if (error) throw error;
      stopsExplorerMap.addImage('bus', image, { sdf: false });
    });
    // Load stop selected symbol
    stopsExplorerMap.loadImage('/icons/map-stop-selected.png', (error, image) => {
      if (error) throw error;
      stopsExplorerMap.addImage('stop-selected', image, { sdf: false });
    });
  }, [stopsExplorerMap]);

  useEffect(() => {
    // Fit map
    if (selectedStopMapData && selectedVehicleMapData) {
      const collection = turf.featureCollection([selectedStopMapData, selectedVehicleMapData]);
      const boundingBox = turf.bbox(collection);
      stopsExplorerMap.fitBounds(boundingBox, { duration: 2000, padding: 100, bearing: stopsExplorerMap.getBearing(), maxZoom: 16 });
    }
  }, [selectedStopMapData, selectedVehicleMapData, stopsExplorerMap]);

  //
  // C. Handle actions

  const handleMapClick = (event) => {
    if (event?.features[0]) {
      onSelectStopId(event.features[0].properties.id);
    }
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.id) {
      stopsExplorerMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.id) {
      stopsExplorerMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    if (selectedMapFeature) {
      // Get all currently rendered features and mark all of them as unselected
      const allRenderedFeatures = stopsExplorerMap.queryRenderedFeatures();
      allRenderedFeatures.forEach(function (f) {
        stopsExplorerMap.setFeatureState({ source: 'all-stops', id: f.id }, { selected: false });
      });
      // Then mark the selected one as selected
      stopsExplorerMap.setFeatureState({ source: 'all-stops', id: selectedMapFeature.properties.mapid }, { selected: true });
    }
  };

  //
  // G. Render components

  return (
    <OSMMap id="stopsExplorerMap" mapStyle={selectedMapStyle} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['all-stops']}>
      <GeolocateControl />
      {selectedVehicleMapData && debugContext.isDebug && (
        <Popup closeButton={false} closeOnClick={false} latitude={selectedVehicleMapData.geometry.coordinates[1]} longitude={selectedVehicleMapData.geometry.coordinates[0]} anchor="bottom">
          <div>{selectedVehicleMapData.properties.id}</div>
          <div>{selectedVehicleMapData.properties.timeString}</div>
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
              'icon-image': 'bus',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.15],
              'icon-offset': [0, 0],
              'icon-rotate': selectedVehicleMapData.properties.heading || 0,
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
              'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 15, 10]],
              'circle-stroke-width': ['interpolate', ['linear', 1], ['zoom'], 9, 0.01, 26, 6],
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
              'line-color': selectedShapeMapData.properties.color,
              'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 20, 12],
            }}
          />
        </Source>
      )}
    </OSMMap>
  );
}
