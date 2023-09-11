'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import { useEffect } from 'react';
import { useMap, Source, Layer } from 'react-map-gl/maplibre';

export default function HelpdesksExplorerMap({ allHelpdesksMapData, selectedHelpdeskMapData, selectedMapStyle, selectedMapFeature, onSelectHelpdeskCode }) {
  //

  //
  // A. Setup variables

  const { helpdesksExplorerMap } = useMap();

  //
  // C. Handle actions

  useEffect(() => {
    if (!helpdesksExplorerMap) return;
    // Load stop idle symbol
    helpdesksExplorerMap.loadImage('/stop-idle.png', (error, image) => {
      if (error) throw error;
      helpdesksExplorerMap.addImage('helpdesk-idle', image, { sdf: false });
    });
    // Load helpdesk selected symbol
    helpdesksExplorerMap.loadImage('/stop-selected.png', (error, image) => {
      if (error) throw error;
      helpdesksExplorerMap.addImage('helpdesk-selected', image, { sdf: false });
    });
  }, [helpdesksExplorerMap]);

  //
  // C. Handle actions

  const handleMapClick = (event) => {
    if (event?.features[0]) {
      onSelectHelpdeskCode(event.features[0].properties.code);
    }
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.code) {
      helpdesksExplorerMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.code) {
      helpdesksExplorerMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    if (selectedMapFeature) {
      // Get all currently rendered features and mark all of them as unselected
      const allRenderedFeatures = helpdesksExplorerMap.queryRenderedFeatures();
      allRenderedFeatures.forEach(function (f) {
        helpdesksExplorerMap.setFeatureState({ source: 'all-helpdesks', id: f.id }, { selected: false });
      });
      // Then mark the selected one as selected
      helpdesksExplorerMap.setFeatureState({ source: 'all-helpdesks', id: selectedMapFeature.properties.mapid }, { selected: true });
    }
  };

  //
  // G. Render components

  return (
    <OSMMap id="helpdesksExplorerMap" mapStyle={selectedMapStyle} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['all-helpdesks']}>
      {selectedHelpdeskMapData && (
        <Source id="selected-helpdesk" type="geojson" data={selectedHelpdeskMapData} generateId={true}>
          <Layer
            id="selected-helpdesk"
            type="symbol"
            source="selected-helpdesk"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'helpdesk-selected',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0.05, 20, 0.5],
              'icon-offset': [0, 0],
            }}
            paint={{
              'icon-opacity': ['interpolate', ['linear', 0.5], ['zoom'], 10, 0, 11, 1],
            }}
          />
        </Source>
      )}
      {allHelpdesksMapData && (
        <Source id="all-helpdesks" type="geojson" data={allHelpdesksMapData} generateId={false} promoteId={'mapid'}>
          <Layer
            id="all-helpdesks"
            type="symbol"
            source="all-helpdesks"
            beforeId={selectedHelpdeskMapData && 'selected-helpdesk'}
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'helpdesk-idle',
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
