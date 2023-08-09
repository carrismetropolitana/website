'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import { useMap, Source, Layer } from 'react-map-gl/maplibre';

export default function HelpdesksExplorerMap({ mapData, selectedMapStyle, selectedMapFeature, onSelectHelpdeskCode }) {
  //

  //
  // A. Setup variables

  const { helpdeskExplorerMap } = useMap();

  //
  // E. Handle actions

  const handleMapClick = (event) => {
    if (event?.features[0]) {
      onSelectHelpdeskCode(event.features[0].properties.code);
    }
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.code) {
      helpdeskExplorerMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.code) {
      helpdeskExplorerMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    if (selectedMapFeature) {
      // Get all currently rendered features and mark all of them as unselected
      const allRenderedFeatures = helpdeskExplorerMap.queryRenderedFeatures();
      allRenderedFeatures.forEach(function (f) {
        helpdeskExplorerMap.setFeatureState({ source: 'all-helpdesks', id: f.id }, { selected: false });
      });
      // Then mark the selected one as selected
      helpdeskExplorerMap.setFeatureState({ source: 'all-helpdesks', id: selectedMapFeature.properties.mapid }, { selected: true });
    }
  };

  //
  // G. Render components

  return (
    <OSMMap id="helpdeskExplorerMap" mapStyle={selectedMapStyle} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['all-helpdesks']}>
      <Source id="all-helpdesks" type="geojson" data={mapData} generateId={false} promoteId={'mapid'}>
        <Layer
          id="all-helpdesks"
          type="circle"
          source="all-helpdesks"
          paint={{
            'circle-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#EE4B2B', '#ffdd01'],
            'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 20, 10]],
            'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 0.35, 26, 5],
            'circle-stroke-color': '#000000',
          }}
        />
      </Source>
    </OSMMap>
  );
}
