'use client';

/* * */

import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
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
    <Pannel type="B" title={t('pannel_title')}>
      <FrontendVehiclesSummary />
      {/* <FrontendLinesContent /> */}
    </Pannel>
  );

  //
}
