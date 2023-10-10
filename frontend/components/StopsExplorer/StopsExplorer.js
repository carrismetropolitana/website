'use client';

import styles from './StopsExplorer.module.css';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
import StopsExplorerToolbar from '@/components/StopsExplorerToolbar/StopsExplorerToolbar';
import StopsExplorerMap from '@/components/StopsExplorerMap/StopsExplorerMap';
import StopsExplorerStopInfo from '@/components/StopsExplorerStopInfo/StopsExplorerStopInfo';
import StopTimetable from '@/components/StopsExplorerTimetable/StopsExplorerTimetable';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { useStopsExplorerContext } from '@/contexts/StopsExplorerContext';
import BetaIcon from '@/components/BetaIcon/BetaIcon';
import { useAnalyticsContext } from '@/contexts/AnalyticsContext';

/* * */

export default function StopsExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorer');

  const analyticsContext = useAnalyticsContext();

  const { stopsExplorerMap } = useMap();
  const stopsExplorerContext = useStopsExplorerContext();

  //
  // B. Analytics

  useEffect(() => {
    analyticsContext.capture('view_stops_explorer');
  });

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { isValidating: allVehiclesValidating } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { isValidating: stopRealtimeValidating } = useSWR(stopsExplorerContext.entities.stop?.id && `https://api.carrismetropolitana.pt/stops/${stopsExplorerContext.entities.stop.id}/realtime`, { refreshInterval: 5000 });

  //
  // C. Handle actions

  useEffect(() => {
    const matchedStopIdFromUrl = window.location.pathname.match(/\/stops\/(.+)/);
    if (matchedStopIdFromUrl && matchedStopIdFromUrl[1] !== 'all' && allStopsData && !stopsExplorerContext.entities.stop?.id && stopsExplorerMap?.getSource('all-stops') !== undefined) {
      stopsExplorerContext.selectStop(matchedStopIdFromUrl[1]);
    }
  });

  //
  // D. Render components

  return (
    <Pannel
      type="A"
      title={t('title')}
      loading={allStopsLoading}
      error={allStopsError}
      validating={allVehiclesValidating || stopRealtimeValidating}
      rightSection={
        <>
          {allVehiclesValidating && <div className={styles.validating}>V</div>}
          {stopRealtimeValidating && <div className={styles.validating}>SR</div>}
          <BetaIcon />
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
          {stopsExplorerContext.entities.stop?.id ? (
            <>
              <StopsExplorerStopInfo />
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
