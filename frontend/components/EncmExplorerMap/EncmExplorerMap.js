'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import { useEffect } from 'react';
import { useMap, Source, Layer } from 'react-map-gl/maplibre';

export default function EncmExplorerMap({ allEncmMapData, selectedHelpdeskMapData, selectedMapStyle, selectedMapFeature, onSelectHelpdeskCode }) {
  //

  //
  // A. Setup variables

  const { encmExplorerMap } = useMap();

  //
  // C. Handle actions

  useEffect(() => {
    if (!encmExplorerMap) return;
    // Load stop idle symbol
    encmExplorerMap.loadImage('/stop-idle.png', (error, image) => {
      if (error) throw error;
      encmExplorerMap.addImage('encm-idle', image, { sdf: false });
    });
    // Load encm selected symbol
    encmExplorerMap.loadImage('/stop-selected.png', (error, image) => {
      if (error) throw error;
      encmExplorerMap.addImage('encm-selected', image, { sdf: false });
    });
  }, [encmExplorerMap]);

  //
  // C. Handle actions

  const handleMapClick = (event) => {
    if (event?.features[0]) {
      onSelectHelpdeskCode(event.features[0].properties.code);
    }
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.code) {
      encmExplorerMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.code) {
      encmExplorerMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    if (selectedMapFeature) {
      // Get all currently rendered features and mark all of them as unselected
      const allRenderedFeatures = encmExplorerMap.queryRenderedFeatures();
      allRenderedFeatures.forEach(function (f) {
        encmExplorerMap.setFeatureState({ source: 'all-encm', id: f.id }, { selected: false });
      });
      // Then mark the selected one as selected
      encmExplorerMap.setFeatureState({ source: 'all-encm', id: selectedMapFeature.properties.mapid }, { selected: true });
    }
  };

  //
  // G. Render components

  return (
    <OSMMap id="encmExplorerMap" mapStyle={selectedMapStyle} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['all-encm']}>
      {selectedHelpdeskMapData && (
        <Source id="selected-encm" type="geojson" data={selectedHelpdeskMapData} generateId={true}>
          <Layer
            id="selected-encm"
            type="symbol"
            source="selected-encm"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'encm-selected',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.5],
              'icon-offset': [0, 0],
            }}
            paint={{
              'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0, 11, 1],
            }}
          />
        </Source>
      )}
      {allEncmMapData && (
        <Source id="all-encm" type="geojson" data={allEncmMapData} generateId={false} promoteId={'mapid'}>
          <Layer
            id="all-encm"
            type="symbol"
            source="all-encm"
            beforeId={selectedHelpdeskMapData && 'selected-encm'}
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'encm-idle',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.25],
              'icon-offset': [0, 0],
            }}
            paint={{
              'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.5, 11, 1],
            }}
          />
        </Source>
      )}
    </OSMMap>
  );
}
