'use client';

import styles from './StoresExplorer.module.css';
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import Pannel from '@/components/Pannel/Pannel';
import StoresExplorerToolbar from '../StoresExplorerToolbar/StoresExplorerToolbar';
import StoresExplorerMap from '../StoresExplorerMap/StoresExplorerMap';
import generateUUID from '@/services/generateUUID';
import NoDataLabel from '../NoDataLabel/NoDataLabel';
import StoreItem from '../StoreItem/StoreItem';
// import StoresExplorerTimetable from '../StoresExplorerTimetable/StoresExplorerTimetable';

export default function StoresExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('StoresExplorer');

  const { storesExplorerMap } = useMap();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');
  const [selectedStoreCode, setSelectedStoreCode] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();

  //
  // B. Fetch data

  const { data: allStoresData, error: allStoresError, isLoading: allStoresLoading } = useSWR('https://api.carrismetropolitana.pt/stores');

  //
  // D. Handle actions

  const handleSelectStore = (storeCode) => {
    // Only do something if feature is set
    if (storeCode) {
      // Get all currently rendered features and mark all of them as unselected
      const stopMapFeature = allStoresMapData?.features.find((f) => f.properties?.code === storeCode);
      // Zoom and center if too far
      StoresExplorerMap.flyTo({ center: stopMapFeature?.geometry?.coordinates, duration: 5000, zoom: 16 });
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(stopMapFeature);
      // Save the current stop code
      setSelectedStoreCode(storeCode);
    }
  };

  //
  // D. Transform data

  const allStoresMapData = useMemo(() => {
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    if (allStoresData) {
      for (const store of allStoresData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [store.lon, store.lat],
          },
          properties: {
            mapid: `${store.code}${generateUUID()}`,
            code: store.code,
            name: store.name,
            lat: store.lat,
            lon: store.lon,
          },
        });
      }
    }
    return geoJSON;
  }, [allStoresData]);

  //
  // E. Render components

  return (
    <Pannel title={t('title')} loading={allStoresLoading} error={allStoresError}>
      <div className={styles.mapWrapper}>
        <StoresExplorerMap mapData={allStoresMapData} selectedMapStyle={selectedMapStyle} selectedMapFeature={selectedMapFeature} onSelectStoreCode={handleSelectStore} />
      </div>
      <Divider />
      <div className={styles.availableStores}>{allStoresData && allStoresData.map((store) => <StoreItem key={store.code} code={store.code} />)}</div>
    </Pannel>
  );
}
