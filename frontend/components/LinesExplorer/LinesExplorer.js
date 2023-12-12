'use client';

/* * */

import styles from './LinesExplorer.module.css';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
import LinesExplorerToolbar from '@/components/LinesExplorerToolbar/LinesExplorerToolbar';
import LinesExplorerContent from '@/components/LinesExplorerContent/LinesExplorerContent';
import BetaIcon from '@/components/BetaIcon/BetaIcon';
import { useAnalyticsContext } from '@/contexts/AnalyticsContext';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';

/* * */

export default function LinesExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorer');

  const analyticsContext = useAnalyticsContext();
  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Analytics

  useEffect(() => {
    analyticsContext.capture('view_lines_explorer');
  });

  //
  // C. Fetch data

  const { data: allLinesData, isLoading: allLinesLoading, error: allLinesError } = useSWR('https://api.carrismetropolitana.pt/lines');
  const { isLoading: allMunicipalitiesLoading, error: allMunicipalitiesError } = useSWR('https://api.carrismetropolitana.pt/municipalities/');
  const { isValidating: allVehiclesValidating } = useSWR('https://api.carrismetropolitana.pt/vehicles');

  //
  // D. Handle actions

  useEffect(() => {
    const matchedLineIdFromUrl = window.location.pathname.match(/\/lines\/(.+)/);
    if (matchedLineIdFromUrl && matchedLineIdFromUrl[1] !== 'all' && allLinesData && !linesExplorerContext.entities.line?.id) {
      linesExplorerContext.selectLine(matchedLineIdFromUrl[1]);
    }
  });

  //
  // E. Render components

  return (
    <Pannel
      type="A"
      title={t('pannel_title')}
      loading={allLinesLoading || allMunicipalitiesLoading}
      error={allLinesError || allMunicipalitiesError}
      validating={allVehiclesValidating}
      rightSection={
        <>
          {allVehiclesValidating && <div className={styles.validating}>V</div>}
          <BetaIcon />
        </>
      }
    >
      <LinesExplorerToolbar />
      <LinesExplorerContent />
    </Pannel>
  );

  //
}
