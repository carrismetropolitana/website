'use client';

import styles from './HelpdesksExplorer.module.css';
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
import HelpdesksExplorerMap from '@/components/HelpdesksExplorerMap/HelpdesksExplorerMap';
import generateUUID from '@/services/generateUUID';
import HelpdesksExplorerToolbar from '@/components/HelpdesksExplorerToolbar/HelpdesksExplorerToolbar';
import HelpdesksExplorerInfo from '@/components/HelpdesksExplorerInfo/HelpdesksExplorerInfo';
import HelpdesksExplorerGrid from '@/components/HelpdesksExplorerGrid/HelpdesksExplorerGrid';

export default function HelpdesksExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdesksExplorer');

  const { helpdesksExplorerMap } = useMap();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');

  const [selectedHelpdeskCode, setSelectedHelpdeskCode] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();

  //
  // B. Fetch data

  const { data: allHelpdesksData, error: allHelpdesksError, isLoading: allHelpdesksLoading } = useSWR('https://api.carrismetropolitana.pt/helpdesks', { refreshInterval: 30000 });

  //
  // C. Transform data

  const allHelpdesksMapData = useMemo(() => {
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    if (allHelpdesksData) {
      for (const helpdesk of allHelpdesksData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [helpdesk.lon, helpdesk.lat],
          },
          properties: {
            mapid: `${helpdesk.code}${generateUUID()}`,
            code: helpdesk.code,
            name: helpdesk.name,
            lat: helpdesk.lat,
            lon: helpdesk.lon,
          },
        });
      }
    }
    return geoJSON;
  }, [allHelpdesksData]);

  const selectedHelpdeskMapData = useMemo(() => {
    if (allHelpdesksData && selectedHelpdeskCode) {
      const selectedHelpdeskData = allHelpdesksData.find((item) => item.code === selectedHelpdeskCode);
      if (selectedHelpdeskData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedHelpdeskData.lon, selectedHelpdeskData.lat],
          },
          properties: {
            code: selectedHelpdeskData.code,
          },
        };
      }
      return null;
    }
  }, [allHelpdesksData, selectedHelpdeskCode]);

  //
  // D. Handle actions

  const handleMapReCenter = () => {
    helpdesksExplorerMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = helpdesksExplorerMap.getCenter();
    const zoom = helpdesksExplorerMap.getZoom();
    const zoomMargin = 2; // Compensate the difference between OSM and Google Maps
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom + zoomMargin}z`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectHelpdesk = (helpdeskCode) => {
    // Only do something if feature is set
    if (helpdeskCode) {
      // Get all currently rendered features and mark all of them as unselected
      const helpdeskMapFeature = allHelpdesksMapData?.features.find((f) => f.properties?.code === helpdeskCode);
      // Set default map zoom and speed levels
      const defaultSpeed = 4000;
      const defaultZoom = 17;
      const defaultZoomMargin = 3;
      // Check if selected helpdesk is within rendered bounds
      const renderedFeatures = helpdesksExplorerMap.queryRenderedFeatures({ layers: ['all-helpdesks'] });
      const isHelpdeskCurrentlyRendered = renderedFeatures.find((item) => item.properties?.code === helpdeskMapFeature.properties?.code);
      // Get map current zoom level
      const currentZoom = helpdesksExplorerMap.getZoom();
      // If the helpdesk is visible and the zoom is not too far back (plus a little margin)...
      if (isHelpdeskCurrentlyRendered && currentZoom + defaultZoomMargin > defaultZoom) {
        // ...then simply ease to it.
        helpdesksExplorerMap.easeTo({ center: helpdeskMapFeature?.geometry?.coordinates, zoom: currentZoom, duration: defaultSpeed * 0.25 });
      } else {
        // If the zoom is too far, or the desired helpdesk is not visible, then fly to it
        helpdesksExplorerMap.flyTo({ center: helpdeskMapFeature?.geometry?.coordinates, zoom: defaultZoom, duration: defaultSpeed });
      }
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(helpdeskMapFeature);
      // Save the current helpdesk code
      setSelectedHelpdeskCode(helpdeskCode);
    }
  };

  //
  // E. Render components

  return (
    <Pannel title={t('title')} loading={allHelpdesksLoading} error={allHelpdesksError}>
      <HelpdesksExplorerToolbar
        selectedMapStyle={selectedMapStyle}
        onSelectMapStyle={setSelectedMapStyle}
        onMapRecenter={handleMapReCenter}
        onOpenInGoogleMaps={handleOpenInGoogleMaps}
        selectedHelpdeskCode={selectedHelpdeskCode}
        onSelectHelpdeskCode={handleSelectHelpdesk}
      />
      <Divider />
      <div className={styles.mapWrapper}>
        <HelpdesksExplorerMap allHelpdesksMapData={allHelpdesksMapData} selectedHelpdeskMapData={selectedHelpdeskMapData} selectedMapStyle={selectedMapStyle} selectedMapFeature={selectedMapFeature} onSelectHelpdeskCode={handleSelectHelpdesk} />
      </div>
      <Divider />
      <HelpdesksExplorerInfo />
      <HelpdesksExplorerGrid allHelpdesksData={allHelpdesksData} />
    </Pannel>
  );

  //
}
