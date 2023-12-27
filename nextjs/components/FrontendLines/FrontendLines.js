'use client';

/* * */

import styles from './FrontendLines.module.css';
import useSWR from 'swr';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Panel from '@/components/Panel/Panel';
import FrontendLinesToolbar from '@/components/FrontendLinesToolbar/FrontendLinesToolbar';
import FrontendLinesContent from '@/components/FrontendLinesContent/FrontendLinesContent';
import BetaIcon from '@/components/BetaIcon/BetaIcon';
import { useAppAnalyticsContext } from '@/contexts/AppAnalyticsContext';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';

/* * */

export default function FrontendLines() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendLines');

  const analyticsContext = useAppAnalyticsContext();
  const FrontendLinesContext = useFrontendLinesContext();

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
    if (matchedLineIdFromUrl && matchedLineIdFromUrl[1] !== 'all' && allLinesData && !FrontendLinesContext.entities.line?.id) {
      FrontendLinesContext.selectLine(matchedLineIdFromUrl[1]);
    }
  });

  //
  // E. Render components

  return (
    <Panel
      type="A"
      title={t('Panel_title')}
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
      <FrontendLinesToolbar />
      <FrontendLinesContent />
    </Panel>
  );

  //
}
