'use client';

/* * */

import FrontendEncmMapPopup from '@/components/FrontendEncmMapPopup/FrontendEncmMapPopup'
import OSMMap from '@/components/OSMMap/OSMMap'
import { useEffect } from 'react'
import { Layer, Popup, Source, useMap } from 'react-map-gl/maplibre'

/* * */

export default function FrontendEncmMap({ allEncmMapData, onSelectEncmId, selectedEncmMapData, selectedMapFeature, selectedMapStyle }) {
  //

  //
  // A. Setup variables

  const { frontendEncmMap } = useMap();

  //
  // B. Transform data

  useEffect(() => {
    if (!frontendEncmMap) return;
    // Load stop open symbol
    frontendEncmMap.loadImage('/icons/map-encm-open.png', (error, image) => {
      if (error) throw error;
      frontendEncmMap.addImage('encm-open', image, { sdf: false });
    })
  }, [frontendEncmMap]);

  //
  // C. Handle actions

  const handleMapClick = (event) => {
    if (event?.features[0]) {
      onSelectEncmId(event.features[0].properties.id);
    }
  }

  const handlePopupClose = () => {
    onSelectEncmId();
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.id) {
      frontendEncmMap.getCanvas().style.cursor = 'pointer';
    }
  }

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.id) {
      frontendEncmMap.getCanvas().style.cursor = 'default';
    }
  }

  const handleMapMove = () => {
    if (selectedMapFeature) {
      // Get all currently rendered features and mark all of them as unselected
      const allRenderedFeatures = frontendEncmMap.queryRenderedFeatures();
      allRenderedFeatures.forEach(function (f) {
        frontendEncmMap.setFeatureState({ id: f.id, source: 'all-encm' }, { selected: false });
      })
      // Then mark the selected one as selected
      frontendEncmMap.setFeatureState({ id: selectedMapFeature.properties.mapid, source: 'all-encm' }, { selected: true });
    }
  }

  //
  // D. Render components

  return (
    <OSMMap id="frontendEncmMap" interactiveLayerIds={['all-encm']} mapStyle={selectedMapStyle} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove}>
      {selectedEncmMapData &&
				<Popup anchor="bottom" closeButton={false} closeOnClick={false} latitude={selectedEncmMapData.geometry.coordinates[1]} longitude={selectedEncmMapData.geometry.coordinates[0]} onClose={handlePopupClose}>
  <FrontendEncmMapPopup encmData={selectedEncmMapData.properties} onSelectEncmId={onSelectEncmId} />
       </Popup>}
      {allEncmMapData &&
				<Source data={allEncmMapData} generateId={false} id="all-encm" promoteId="mapid" type="geojson">
  <Layer
    id="all-encm"
    layout={{
						  'icon-allow-overlap': true,
						  'icon-anchor': 'center',
						  'icon-ignore-placement': true,
						  'icon-image': 'encm-open',
						  'icon-offset': [0, 0],
						  'icon-rotation-alignment': 'map',
						  'icon-size': ['interpolate', ['linear', 0.5], ['zoom'], 5, 0.1, 20, 0.25],
						  'symbol-placement': 'point',
    }}
    source="all-encm"
    type="symbol"
  />
       </Source>}
    </OSMMap>
  )

  //
}
