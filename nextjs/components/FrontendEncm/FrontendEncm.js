'use client';

/* * */

import styles from './FrontendEncm.module.css';
import useSWR from 'swr';
import { useState, useMemo, useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Panel from '@/components/Panel/Panel';
import FrontendEncmMap from '@/components/FrontendEncmMap/FrontendEncmMap';
import generateUUID from '@/services/generateUUID';
import FrontendEncmToolbar from '@/components/FrontendEncmToolbar/FrontendEncmToolbar';
import FrontendEncmInfo from '@/components/FrontendEncmInfo/FrontendEncmInfo';
import FrontendEncmGrid from '@/components/FrontendEncmGrid/FrontendEncmGrid';
import { useAppAnalyticsContext } from '@/contexts/AppAnalyticsContext';

/* * */

export default function FrontendEncm() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendEncm');

  const { frontendEncmMap } = useMap();

  const analyticsContext = useAppAnalyticsContext();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');

  const [selectedEncmId, setSelectedEncmId] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();

  //
  // B. Analytics

  useEffect(() => {
    analyticsContext.capture('view_encm_explorer');
  });

  //
  // C. Fetch data

  const { data: allEncmData, error: allEncmError, isLoading: allEncmLoading } = useSWR('https://api.carrismetropolitana.pt/facilities/encm', { refreshInterval: 30000 });

  //
  // D. Transform data

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
            mapid: `${encm.id}${generateUUID()}`,
            id: encm.id,
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
    if (allEncmData && selectedEncmId) {
      const selectedEncmData = allEncmData.find((item) => item.id === selectedEncmId);
      if (selectedEncmData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedEncmData.lon, selectedEncmData.lat],
          },
          properties: {
            id: selectedEncmData.id,
            name: selectedEncmData.name,
            address: selectedEncmData.address,
            postal_code: selectedEncmData.postal_code,
            locality: selectedEncmData.locality,
          },
        };
      }
      return null;
    }
  }, [allEncmData, selectedEncmId]);

  //
  // E. Handle actions

  const handleMapReCenter = () => {
    frontendEncmMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = frontendEncmMap.getCenter();
    const zoom = frontendEncmMap.getZoom();
    const zoomMargin = 2; // Compensate the difference between OSM and Google Maps
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom + zoomMargin}z`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectEncm = (encmId) => {
    // Only do something if feature is set
    if (encmId) {
      // Get all currently rendered features and mark all of them as unselected
      const encmMapFeature = allEncmMapData?.features.find((f) => f.properties?.id === encmId);
      // Set default map zoom and speed levels
      const defaultSpeed = 4000;
      const defaultZoom = 17;
      const defaultZoomMargin = 3;
      // Check if selected encm is within rendered bounds
      const renderedFeatures = frontendEncmMap.queryRenderedFeatures({ layers: ['all-encm'] });
      const isEncmCurrentlyRendered = renderedFeatures.find((item) => item.properties?.id === encmMapFeature.properties?.id);
      // Get map current zoom level
      const currentZoom = frontendEncmMap.getZoom();
      // If the encm is visible and the zoom is not too far back (plus a little margin)...
      if (isEncmCurrentlyRendered && currentZoom + defaultZoomMargin > defaultZoom) {
        // ...then simply ease to it.
        frontendEncmMap.easeTo({ center: encmMapFeature?.geometry?.coordinates, zoom: currentZoom, duration: defaultSpeed * 0.25 });
      } else {
        // If the zoom is too far, or the desired encm is not visible, then fly to it
        frontendEncmMap.flyTo({ center: encmMapFeature?.geometry?.coordinates, zoom: defaultZoom, duration: defaultSpeed });
      }
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(encmMapFeature);
      // Save the current encm id
      setSelectedEncmId(encmId);
    }
  };

  //
  // F. Render components

  return (
    <Panel type="A" title={t('title')} loading={allEncmLoading} error={allEncmError}>
      <FrontendEncmToolbar selectedMapStyle={selectedMapStyle} onSelectMapStyle={setSelectedMapStyle} onMapRecenter={handleMapReCenter} onOpenInGoogleMaps={handleOpenInGoogleMaps} selectedEncmId={selectedEncmId} onSelectEncmId={handleSelectEncm} />
      <Divider />
      <div className={styles.mapWrapper}>
        <FrontendEncmMap allEncmMapData={allEncmMapData} selectedEncmMapData={selectedEncmMapData} selectedMapStyle={selectedMapStyle} selectedMapFeature={selectedMapFeature} onSelectEncmId={handleSelectEncm} />
      </div>
      <Divider />
      <FrontendEncmInfo />
      <FrontendEncmGrid allEncmData={allEncmData} selectedEncmId={selectedEncmId} onSelectEncmId={handleSelectEncm} />
    </Panel>
  );

  //
}
