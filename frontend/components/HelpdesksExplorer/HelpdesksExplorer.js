'use client';

import styles from './HelpdesksExplorer.module.css';
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
import HelpdesksExplorerMap from '../HelpdesksExplorerMap/HelpdesksExplorerMap';
import generateUUID from '@/services/generateUUID';
import HelpdeskItem from '../HelpdeskItem/HelpdeskItem';

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

  const { data: allHelpdesksData, error: allHelpdesksError, isLoading: allHelpdesksLoading } = useSWR('https://api.carrismetropolitana.pt/helpdesks', { refreshInterval: 65000 });

  //
  // D. Handle actions

  const handleSelectHelpdesk = (helpdeskCode) => {
    // Only do something if feature is set
    if (helpdeskCode) {
      // Get all currently rendered features and mark all of them as unselected
      const stopMapFeature = allHelpdesksMapData?.features.find((f) => f.properties?.code === helpdeskCode);
      // Zoom and center if too far
      helpdesksExplorerMap.flyTo({ center: stopMapFeature?.geometry?.coordinates, duration: 5000, zoom: 16 });
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(stopMapFeature);
      // Save the current stop code
      setSelectedHelpdeskCode(helpdeskCode);
    }
  };

  //
  // D. Transform data

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

  //
  // E. Render components

  return (
    <Pannel title={t('title')} loading={allHelpdesksLoading} error={allHelpdesksError}>
      <div className={styles.mapWrapper}>
        <HelpdesksExplorerMap mapData={allHelpdesksMapData} selectedMapStyle={selectedMapStyle} selectedMapFeature={selectedMapFeature} onSelectHelpdeskCode={handleSelectHelpdesk} />
      </div>
      <Divider />
      <div className={styles.availableHelpdesk}>{allHelpdesksData && allHelpdesksData.map((helpdesk) => <HelpdeskItem key={helpdesk.code} helpdeskData={helpdesk} />)}</div>
    </Pannel>
  );
}
