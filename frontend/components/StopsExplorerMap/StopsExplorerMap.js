'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import { useMap, Source, Layer } from 'react-map-gl/maplibre';

export default function StopsExplorerMap({ allStopsMapData, selectedShapeMapData, selectedMapStyle, selectedMapFeature, onSelectStopCode }) {
  //

  //
  // A. Setup variables

  const { stopsExplorerMap } = useMap();

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
      {selectedShapeMapData && (
        <Source id="selected-shape" type="geojson" data={selectedShapeMapData} generateId={true}>
          <Layer id="selected-shape" type="line" source="selected-shape" layout={{ 'line-join': 'round', 'line-cap': 'round' }} paint={{ 'line-color': selectedShapeMapData.properties.color, 'line-width': 4 }} />
        </Source>
      )}
    </OSMMap>
  );
}
