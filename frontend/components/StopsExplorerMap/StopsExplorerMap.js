'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import { useEffect } from 'react';
import { useMap, Source, Layer } from 'react-map-gl/maplibre';

export default function StopsExplorerMap({ allStopsMapData, selectedShapeMapData, selectedVehicleMapData, selectedMapStyle, selectedMapFeature, onSelectStopCode }) {
  //

  //
  // A. Setup variables

  const { stopsExplorerMap } = useMap();

  //
  // C. Handle actions

  useEffect(() => {
    if (!stopsExplorerMap) return;
    stopsExplorerMap.loadImage('/shape-arrow-direction.png', (error, image) => {
      if (error) throw error;
      stopsExplorerMap.addImage('shape-arrow-direction', image, { sdf: true });
    });
  }, [stopsExplorerMap]);

  //
  // C. Handle actions

  const handleMapClick = (event) => {
    if (event?.features[0]) {
      onSelectStopCode(event.features[0].properties.code);
    }
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.code) {
      stopsExplorerMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.code) {
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
      {allStopsMapData && (
        <Source id="all-stops" type="geojson" data={allStopsMapData} generateId={false} promoteId={'mapid'}>
          <Layer
            id="all-stops"
            type="circle"
            source="all-stops"
            paint={{
              'circle-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#EE4B2B', '#ffdd01'],
              'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 20, 10]],
              'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 0.35, 26, 5],
              'circle-stroke-color': '#000000',
            }}
          />
        </Source>
      )}
      {selectedVehicleMapData && (
        <Source id="selected-vehicle" type="geojson" data={selectedVehicleMapData} generateId={true}>
          <Layer
            id="selected-vehicle"
            type="circle"
            source="selected-vehicle"
            paint={{
              'circle-color': '#0000FF',
              'circle-radius': 10,
              'circle-stroke-width': 5,
              'circle-stroke-color': '#000000',
            }}
          />
        </Source>
      )}
      {selectedShapeMapData && (
        <Source id="selected-shape" type="geojson" data={selectedShapeMapData} generateId={true}>
          <Layer
            id="selected-shape"
            type="line"
            source="selected-shape"
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            paint={{
              'line-color': selectedShapeMapData.properties.color,
              'line-width': ['interpolate', ['linear'], ['zoom'], 10, 4, 20, 12],
            }}
          />
          <Layer
            id="selected-shape-direction"
            type="symbol"
            source="selected-shape"
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
        </Source>
      )}
    </OSMMap>
  );
}
