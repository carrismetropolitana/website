'use client';

/* * */

import { useTranslations } from 'next-intl';
import Panel from '@/components/Panel/Panel';
import FrontendVehiclesSummary from '@/components/FrontendVehiclesSummary/FrontendVehiclesSummary';

/* * */

export default function FrontendVehicles() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendVehicles');

  //
  // B. Render components

  return (
    <Panel type="B" title={t('Panel_title')}>
      <FrontendVehiclesSummary />
      {/* <FrontendLinesContent /> */}
    </Panel>
  );

  //
}
