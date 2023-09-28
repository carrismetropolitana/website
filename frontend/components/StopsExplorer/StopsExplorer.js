'use client';

import styles from './StopsExplorer.module.css';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
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
  const stopsExplorerContext = useStopsExplorerContext();

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { isValidating: allVehiclesValidating } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { isValidating: stopRealtimeValidating } = useSWR(stopsExplorerContext.entities.stop_id && `https://api.carrismetropolitana.pt/stops/${stopsExplorerContext.entities.stop_id}/realtime`, { refreshInterval: 5000 });

  //
  // C. Handle actions

  useEffect(() => {
    if (stopsExplorerContext.entities.stop_id && allStopsData) {
      const foundStop = allStopsData.find((item) => item.id === stopsExplorerContext.entities.stop_id);
      if (foundStop) {
        const newUrl = `/stops/${stopsExplorerContext.entities.stop_id}`;
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
        document.title = foundStop.name;
      }
    }
  }, [allStopsData, stopsExplorerContext.entities.stop_id]);

  useEffect(() => {
    if (urlStopId && urlStopId !== 'all' && allStopsData && !stopsExplorerContext.entities.stop_id && stopsExplorerMap?.getSource('all-stops') !== undefined) {
      const foundStop = allStopsData.find((item) => item.id === urlStopId);
      if (foundStop) stopsExplorerContext.updateEntities({ stop_id: urlStopId }, true);
    }
  });

  //
  // D. Render components

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
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <StopsExplorerToolbar />
        </div>
        <div className={styles.map}>
          <StopsExplorerMap />
        </div>
        <div className={styles.sidebar}>
          {stopsExplorerContext.entities.stop_id ? (
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
