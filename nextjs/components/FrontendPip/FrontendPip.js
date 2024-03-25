'use client';

/* * */

import styles from './FrontendPip.module.css';
import useSWR from 'swr';
import { useState, useMemo, useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Panel from '@/components/Panel/Panel';
// import FrontendPipMap from '@/components/FrontendPipMap/FrontendPipMap';
import generateUUID from '@/services/generateUUID';
// import FrontendPipToolbar from '@/components/FrontendPipToolbar/FrontendPipToolbar';
// import FrontendPipInfo from '@/components/FrontendPipInfo/FrontendPipInfo';
// import FrontendPipGrid from '@/components/FrontendPipGrid/FrontendPipGrid';
import { useAppAnalyticsContext } from '@/contexts/AppAnalyticsContext';
import FrontendPipIntro from '@/components/FrontendPipIntro/FrontendPipIntro';
import FrontendPipSurvey from '@/components/FrontendPipSurvey/FrontendPipSurvey';
import FrontendPipStops from '../FrontendPipStops/FrontendPipStops';
import { useFrontendPipContext } from '@/contexts/FrontendPipContext';

/* * */

export default function FrontendPip() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendPip');

  const { frontendPipMap } = useMap();

  const analyticsContext = useAppAnalyticsContext();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');

  const [selectedPipId, setSelectedPipId] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();

  const frontendPipContext = useFrontendPipContext();

  //
  // B. Analytics

  useEffect(() => {
    analyticsContext.capture('view_pip_explorer');
  });

  //
  // C. Fetch data

  const { data: allPipData, error: allPipError, isLoading: allPipLoading } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/pip');

  //
  // D. Transform data

  const allPipMapData = useMemo(() => {
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    if (allPipData) {
      for (const pip of allPipData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [pip.lon, pip.lat],
          },
          properties: {
            mapid: `${pip.id}${generateUUID()}`,
            id: pip.id,
            name: pip.name,
            lat: pip.lat,
            lon: pip.lon,
          },
        });
      }
    }
    return geoJSON;
  }, [allPipData]);

  const selectedPipMapData = useMemo(() => {
    if (allPipData && selectedPipId) {
      const selectedPipData = allPipData.find((item) => item.id === selectedPipId);
      if (selectedPipData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedPipData.lon, selectedPipData.lat],
          },
          properties: {
            id: selectedPipData.id,
            name: selectedPipData.name,
            address: selectedPipData.address,
            postal_code: selectedPipData.postal_code,
            locality: selectedPipData.locality,
          },
        };
      }
      return null;
    }
  }, [allPipData, selectedPipId]);

  //
  // E. Handle actions

  const handleMapReCenter = () => {
    frontendPipMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = frontendPipMap.getCenter();
    const zoom = frontendPipMap.getZoom();
    const zoomMargin = 2; // Compensate the difference between OSM and Google Maps
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom + zoomMargin}z`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectPip = (pipId) => {
    // Only do something if feature is set
    if (pipId) {
      // Get all currently rendered features and mark all of them as unselected
      const pipMapFeature = allPipMapData?.features.find((f) => f.properties?.id === pipId);
      // Set default map zoom and speed levels
      const defaultSpeed = 4000;
      const defaultZoom = 17;
      const defaultZoomMargin = 3;
      // Check if selected pip is within rendered bounds
      const renderedFeatures = frontendPipMap.queryRenderedFeatures({ layers: ['all-pip'] });
      const isPipCurrentlyRendered = renderedFeatures.find((item) => item.properties?.id === pipMapFeature.properties?.id);
      // Get map current zoom level
      const currentZoom = frontendPipMap.getZoom();
      // If the pip is visible and the zoom is not too far back (plus a little margin)...
      if (isPipCurrentlyRendered && currentZoom + defaultZoomMargin > defaultZoom) {
        // ...then simply ease to it.
        frontendPipMap.easeTo({ center: pipMapFeature?.geometry?.coordinates, zoom: currentZoom, duration: defaultSpeed * 0.25 });
      } else {
        // If the zoom is too far, or the desired pip is not visible, then fly to it
        frontendPipMap.flyTo({ center: pipMapFeature?.geometry?.coordinates, zoom: defaultZoom, duration: defaultSpeed });
      }
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(pipMapFeature);
      // Save the current pip id
      setSelectedPipId(pipId);
    }
  };

  //
  // F. Render components

  return (
    <Panel type="B" title={t('title', { pip_id: frontendPipContext.item_id })} loading={allPipLoading} error={allPipError}>
      <div className={styles.container}>
        <FrontendPipIntro />
        <FrontendPipSurvey />
        <FrontendPipStops />
      </div>
    </Panel>
  );

  //
}
