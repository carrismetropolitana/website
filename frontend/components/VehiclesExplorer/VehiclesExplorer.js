'use client';

/* * */

import useSWR from 'swr';
import Pannel from '@/components/Pannel/Pannel';
import { useTranslations } from 'next-intl';
import LinesExplorerToolbar from '@/components/LinesExplorerToolbar/LinesExplorerToolbar';
import LinesExplorerContent from '@/components/LinesExplorerContent/LinesExplorerContent';
import BetaIcon from '../BetaIcon/BetaIcon';

/* * */

export default function VehiclesExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('VehiclesExplorer');

  //
  // B. Fetch data

  const { isLoading: allLinesLoading, error: allLinesError } = useSWR('https://api.carrismetropolitana.pt/lines');
  const { isLoading: allMunicipalitiesLoading, error: allMunicipalitiesError } = useSWR('https://api.carrismetropolitana.pt/municipalities/');

  //
  // c. Render components

  return (
    <Pannel type="B" title={t('pannel_title')} loading={allLinesLoading || allMunicipalitiesLoading} error={allLinesError || allMunicipalitiesError} rightSection={<BetaIcon />}>
      {/* <LinesExplorerToolbar /> */}
      {/* <LinesExplorerContent /> */}
    </Pannel>
  );

  //
}
