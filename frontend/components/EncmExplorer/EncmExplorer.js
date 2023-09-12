'use client';

import styles from './EncmExplorer.module.css';
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
import EncmExplorerMap from '@/components/EncmExplorerMap/EncmExplorerMap';
import generateUUID from '@/services/generateUUID';
import EncmExplorerToolbar from '@/components/EncmExplorerToolbar/EncmExplorerToolbar';
import EncmExplorerInfo from '@/components/EncmExplorerInfo/EncmExplorerInfo';
import EncmExplorerGrid from '@/components/EncmExplorerGrid/EncmExplorerGrid';

export default function EncmExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('EncmExplorer');

  const { encmExplorerMap } = useMap();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');

  const [selectedEncmCode, setSelectedEncmCode] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();

  //
  // B. Fetch data

  const { data: allEncmData, error: allEncmError, isLoading: allEncmLoading } = useSWR('https://api.carrismetropolitana.pt/facilities/encm', { refreshInterval: 30000 });

  //
  // C. Transform data

  const allEncmMapData = useMemo(() => {
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    if (allEncmData) {
      for (const encm of allEncmData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [encm.lon, encm.lat],
          },
          properties: {
            mapid: `${encm.code}${generateUUID()}`,
            code: encm.code,
            name: encm.name,
            lat: encm.lat,
            lon: encm.lon,
          },
        });
      }
    }
    return geoJSON;
  }, [allEncmData]);

  const selectedEncmMapData = useMemo(() => {
    if (allEncmData && selectedEncmCode) {
      const selectedEncmData = allEncmData.find((item) => item.code === selectedEncmCode);
      if (selectedEncmData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedEncmData.lon, selectedEncmData.lat],
          },
          properties: {
            code: selectedEncmData.code,
            name: selectedEncmData.name,
            address: selectedEncmData.address,
            postal_code: selectedEncmData.postal_code,
            locality: selectedEncmData.locality,
          },
        };
      }
      return null;
    }
  }, [allEncmData, selectedEncmCode]);

  //
  // D. Handle actions

  const handleMapReCenter = () => {
    encmExplorerMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = encmExplorerMap.getCenter();
    const zoom = encmExplorerMap.getZoom();
    const zoomMargin = 2; // Compensate the difference between OSM and Google Maps
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom + zoomMargin}z`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectEncm = (encmCode) => {
    // Only do something if feature is set
    if (encmCode) {
      // Get all currently rendered features and mark all of them as unselected
      const encmMapFeature = allEncmMapData?.features.find((f) => f.properties?.code === encmCode);
      // Set default map zoom and speed levels
      const defaultSpeed = 4000;
      const defaultZoom = 17;
      const defaultZoomMargin = 3;
      // Check if selected encm is within rendered bounds
      const renderedFeatures = encmExplorerMap.queryRenderedFeatures({ layers: ['all-encm'] });
      const isEncmCurrentlyRendered = renderedFeatures.find((item) => item.properties?.code === encmMapFeature.properties?.code);
      // Get map current zoom level
      const currentZoom = encmExplorerMap.getZoom();
      // If the encm is visible and the zoom is not too far back (plus a little margin)...
      if (isEncmCurrentlyRendered && currentZoom + defaultZoomMargin > defaultZoom) {
        // ...then simply ease to it.
        encmExplorerMap.easeTo({ center: encmMapFeature?.geometry?.coordinates, zoom: currentZoom, duration: defaultSpeed * 0.25 });
      } else {
        // If the zoom is too far, or the desired encm is not visible, then fly to it
        encmExplorerMap.flyTo({ center: encmMapFeature?.geometry?.coordinates, zoom: defaultZoom, duration: defaultSpeed });
      }
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(encmMapFeature);
      // Save the current encm code
      setSelectedEncmCode(encmCode);
    }
  };

  //
  // E. Render components

  return (
    <Pannel title={t('title')} loading={allEncmLoading} error={allEncmError}>
      <EncmExplorerToolbar
        selectedMapStyle={selectedMapStyle}
        onSelectMapStyle={setSelectedMapStyle}
        onMapRecenter={handleMapReCenter}
        onOpenInGoogleMaps={handleOpenInGoogleMaps}
        selectedEncmCode={selectedEncmCode}
        onSelectEncmCode={handleSelectEncm}
      />
      <Divider />
      <div className={styles.mapWrapper}>
        <EncmExplorerMap allEncmMapData={allEncmMapData} selectedEncmMapData={selectedEncmMapData} selectedMapStyle={selectedMapStyle} selectedMapFeature={selectedMapFeature} onSelectEncmCode={handleSelectEncm} />
      </div>
      <Divider />
      <EncmExplorerInfo />
      <EncmExplorerGrid allEncmData={allEncmData} selectedEncmCode={selectedEncmCode} onSelectEncmCode={handleSelectEncm} />
    </Pannel>
  );

  //
}
