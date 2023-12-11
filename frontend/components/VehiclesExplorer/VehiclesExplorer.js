'use client';

/* * */

import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
import VehiclesExplorerSummary from '@/components/VehiclesExplorerSummary/VehiclesExplorerSummary';

/* * */

export default function VehiclesExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('VehiclesExplorer');

  //
  // B. Render components

  return (
    <Pannel type="B" title={t('pannel_title')}>
      <VehiclesExplorerSummary />
      {/* <LinesExplorerContent /> */}
    </Pannel>
  );

  //
}
