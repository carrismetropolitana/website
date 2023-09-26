'use client';

import styles from './StopsExplorer.module.css';
import useSWR from 'swr';
import { useState, useEffect, useCallback } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import Pannel from '@/components/Pannel/Pannel';
import StopsExplorerToolbar from '@/components/StopsExplorerToolbar/StopsExplorerToolbar';
import StopsExplorerMap from '@/components/StopsExplorerMap/StopsExplorerMap';
import StopInfo from '@/components/StopInfo/StopInfo';
import StopTimetable from '@/components/StopsExplorerTimetable/StopsExplorerTimetable';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { useStopsExplorerContext } from '@/contexts/StopsExplorerContext';

/* * */

export default function StopsExplorer({ urlStopId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorer');
  const { stopsExplorerMap } = useMap();
  const [selectedMapStyle, setSelectedMapStyle] = useState('map');
  const stopsExplorerContext = useStopsExplorerContext();

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { isValidating: allVehiclesValidating } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { isValidating: stopRealtimeValidating } = useSWR(stopsExplorerContext.values.selected_stop_id && `https://api.carrismetropolitana.pt/stops/${stopsExplorerContext.values.selected_stop_id}/realtime`, { refreshInterval: 5000 });

  //
  // D. Handle actions

  const handleMapReCenter = () => {
    stopsExplorerMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = stopsExplorerMap.getCenter();
    const zoom = stopsExplorerMap.getZoom();
    const zoomMargin = 2; // Compensate the difference between OSM and Google Maps
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom + zoomMargin}z`, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (stopsExplorerContext.values.selected_stop_id && allStopsData) {
      const foundStop = allStopsData.find((item) => item.id === stopsExplorerContext.values.selected_stop_id);
      if (foundStop) {
        const newUrl = `/stops/${stopsExplorerContext.values.selected_stop_id}`;
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
        document.title = foundStop.name;
      }
    }
  }, [allStopsData, stopsExplorerContext.values.selected_stop_id]);

  useEffect(() => {
    if (urlStopId && urlStopId !== 'all' && !stopsExplorerContext.values.selected_stop_id && stopsExplorerMap?.getSource('all-stops') !== undefined) {
      stopsExplorerContext.selectStop(urlStopId);
    }
  });

  //
  // E. Render components

  return (
    <Pannel
      title={t('title')}
      loading={allStopsLoading}
      error={allStopsError}
      validating={allVehiclesValidating || stopRealtimeValidating}
      rightSection={
        <>
          {allVehiclesValidating && <div className={styles.validating}>V</div>}
          {stopRealtimeValidating && <div className={styles.validating}>SR</div>}
          <div className={styles.betaIcon}>BETA</div>
        </>
      }
    >
      <StopsExplorerToolbar selectedMapStyle={selectedMapStyle} onSelectMapStyle={setSelectedMapStyle} onMapRecenter={handleMapReCenter} onOpenInGoogleMaps={handleOpenInGoogleMaps} />
      <Divider />
      <div className={styles.container}>
        <StopsExplorerMap selectedMapStyle={selectedMapStyle} />
        <div className={styles.sidebar}>
          {stopsExplorerContext.values.selected_stop_id ? (
            <>
              <StopInfo />
              <Divider />
              <StopTimetable />
            </>
          ) : (
            <NoDataLabel text={t('no_selection')} />
          )}
        </div>
      </div>
    </Pannel>
  );

  //
}
