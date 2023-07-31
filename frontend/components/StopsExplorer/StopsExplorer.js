'use client';

import styles from './StopsExplorer.module.css';
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import Pannel from '@/components/Pannel/Pannel';
import StopsExplorerToolbar from '../StopsExplorerToolbar/StopsExplorerToolbar';
import StopsExplorerMap from '../StopsExplorerMap/StopsExplorerMap';
import generateUUID from '@/services/generateUUID';
import NoDataLabel from '../NoDataLabel/NoDataLabel';
import StopsExplorerTimetable from '../StopsExplorerTimetable/StopsExplorerTimetable';

export default function StopsExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorer');

  const { stopsExplorerMap } = useMap();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');
  const [selectedStopCode, setSelectedStopCode] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');

  //
  // D. Handle actions

  const handleMapReCenter = () => {
    stopsExplorerMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = stopsExplorerMap.getCenter();
    const zoom = stopsExplorerMap.getZoom();
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom}z`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectStop = (stopCode) => {
    // Only do something if feature is set
    if (stopCode) {
      // Get all currently rendered features and mark all of them as unselected
      const stopMapFeature = allStopsMapData?.features.find((f) => f.properties?.code === stopCode);
      // Zoom and center if too far
      stopsExplorerMap.flyTo({ center: stopMapFeature?.geometry?.coordinates, duration: 5000, zoom: 16 });
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(stopMapFeature);
      // Save the current stop code
      setSelectedStopCode(stopCode);
    }
  };

  //
  // D. Transform data

  const allStopsMapData = useMemo(() => {
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    if (allStopsData) {
      for (const stop of allStopsData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [stop.lon, stop.lat],
          },
          properties: {
            mapid: `${stop.code}${generateUUID()}`,
            code: stop.code,
            name: stop.name,
            lat: stop.lat,
            lon: stop.lon,
          },
        });
      }
    }
    return geoJSON;
  }, [allStopsData]);

  //
  // E. Render components

  return (
    <Pannel title={t('title')} loading={allStopsLoading} error={allStopsError}>
      <StopsExplorerToolbar
        selectedMapStyle={selectedMapStyle}
        onSelectMapStyle={setSelectedMapStyle}
        onMapRecenter={handleMapReCenter}
        onOpenInGoogleMaps={handleOpenInGoogleMaps}
        selectedStopCode={selectedStopCode}
        onSelectStopCode={handleSelectStop}
      />

      <Divider />

      <div className={styles.mapAndTimetable}>
        <StopsExplorerMap mapData={allStopsMapData} selectedMapStyle={selectedMapStyle} selectedMapFeature={selectedMapFeature} onSelectStopCode={handleSelectStop} />
        <StopsExplorerTimetable selectedStopCode={selectedStopCode} />
      </div>
    </Pannel>
  );
}
