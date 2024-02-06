'use client';

/* * */

import { useTranslations } from 'next-intl';
import Panel from '@/components/Panel/Panel';
import FrontendDemandDateLineStop from '@/components/FrontendDemandDateLineStop/FrontendDemandDateLineStop';
import { FrontendDemandDateLineStopContextProvider } from '@/contexts/FrontendDemandDateLineStopContext';

/* * */

export default function FrontendDemand() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendDemand');

  //
  // B. Render components

  return (
    <Panel type="B" title={t('panel_title')}>
      <FrontendDemandDateLineStopContextProvider>
        {/* <FrontendDemandSummary /> */}
        <FrontendDemandDateLineStop />
      </FrontendDemandDateLineStopContextProvider>
    </Panel>
  );

  //
}
