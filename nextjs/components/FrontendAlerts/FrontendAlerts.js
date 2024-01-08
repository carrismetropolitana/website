'use client';

/* * */

import { useTranslations } from 'next-intl';
import Panel from '@/components/Panel/Panel';
// import FrontendAlertsSummary from '@/components/FrontendAlertsSummary/FrontendAlertsSummary';

/* * */

export default function FrontendAlerts() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendAlerts');

  //
  // B. Render components

  return (
    <Panel title={t('Panel_title')}>
      {/* <FrontendAlertsSummary /> */}
      {/* <FrontendLinesContent /> */}
    </Panel>
  );

  //
}
