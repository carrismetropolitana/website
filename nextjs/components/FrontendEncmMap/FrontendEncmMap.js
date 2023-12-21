'use client';

import OSMMap from '@/components/OSMMap/OSMMap';
import { useEffect } from 'react';
import { useMap, Source, Layer, Popup } from 'react-map-gl/maplibre';
import FrontendEncmMapPopup from '@/components/FrontendEncmMapPopup/FrontendEncmMapPopup';

export default function FrontendEncmMap({ allEncmMapData, selectedEncmMapData, selectedMapStyle, selectedMapFeature, onSelectEncmId }) {
  //

  //
  // A. Setup variables

  const { FrontendEncmMap } = useMap();

  //
  // C. Handle actions

  useEffect(() => {
    if (!FrontendEncmMap) return;
    // Load stop idle symbol
    FrontendEncmMap.loadImage('/icons/map-encm-idle.png', (error, image) => {
      if (error) throw error;
      FrontendEncmMap.addImage('encm-idle', image, { sdf: false });
    });
  }, [FrontendEncmMap]);

  //
  // C. Handle actions

  const handleMapClick = (event) => {
    if (event?.features[0]) {
      onSelectEncmId(event.features[0].properties.id);
    }
  };

  const handlePopupClose = () => {
    onSelectEncmId();
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.id) {
      FrontendEncmMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.id) {
      FrontendEncmMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    if (selectedMapFeature) {
      // Get all currently rendered features and mark all of them as unselected
      const allRenderedFeatures = FrontendEncmMap.queryRenderedFeatures();
      allRenderedFeatures.forEach(function (f) {
        FrontendEncmMap.setFeatureState({ source: 'all-encm', id: f.id }, { selected: false });
      });
      // Then mark the selected one as selected
      FrontendEncmMap.setFeatureState({ source: 'all-encm', id: selectedMapFeature.properties.mapid }, { selected: true });
    }
  };

  //
  // G. Render components

  return (
    <OSMMap id="FrontendEncmMap" mapStyle={selectedMapStyle} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['all-encm']}>
      {selectedEncmMapData && (
        <Popup onClose={handlePopupClose} closeButton={false} closeOnClick={false} latitude={selectedEncmMapData.geometry.coordinates[1]} longitude={selectedEncmMapData.geometry.coordinates[0]} anchor="bottom">
          <FrontendEncmMapPopup encmData={selectedEncmMapData.properties} onSelectEncmId={onSelectEncmId} />
        </Popup>
      )}
      {allEncmMapData && (
        <Source id="all-encm" type="geojson" data={allEncmMapData} generateId={false} promoteId={'mapid'}>
          <Layer
            id="all-encm"
            type="symbol"
            source="all-encm"
            layout={{
              'icon-allow-overlap': true,
              'icon-ignore-placement': true,
              'icon-anchor': 'center',
              'symbol-placement': 'point',
              'icon-rotation-alignment': 'map',
              'icon-image': 'encm-idle',
              'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 5, 0.1, 20, 0.25],
              'icon-offset': [0, 0],
            }}
          />
        </Source>
      )}
    </OSMMap>
  );
}
