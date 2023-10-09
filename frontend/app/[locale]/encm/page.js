'use client';

import { OneFullColumn } from '@/components/Layouts/Layouts';
import EncmExplorer from '@/components/EncmExplorer/EncmExplorer';
import { useEffect } from 'react';
import { useAnalyticsContext } from '@/contexts/AnalyticsContext';

export default function Page() {
  //

  const analyticsContext = useAnalyticsContext();

  //
  // A. Render components

  useEffect(() => {
    analyticsContext.capture('test');
  });

  //
  // A. Render components

  return <OneFullColumn first={<EncmExplorer />} />;
}
