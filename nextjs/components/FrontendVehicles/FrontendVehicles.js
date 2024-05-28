'use client';

/* * */

import FrontendVehiclesSummary from '@/components/FrontendVehiclesSummary/FrontendVehiclesSummary'
import Panel from '@/components/Panel/Panel'
import { useTranslations } from 'next-intl'

/* * */

export default function FrontendVehicles() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendVehicles');

  //
  // B. Render components

  return (
    <Panel title={t('Panel_title')} type="B">
      <FrontendVehiclesSummary />
    </Panel>
  )

  //
}
