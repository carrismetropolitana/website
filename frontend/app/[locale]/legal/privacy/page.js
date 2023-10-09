'use client';

import { OneFullColumn } from '@/components/Layouts/Layouts';
import { useEffect } from 'react';
import { useAnalyticsContext } from '@/contexts/AnalyticsContext';
import LegalExplorer from '@/components/LegalExplorer/LegalExplorer';

export default function Page() {
  //

  //
  // A. Render components

  return <OneFullColumn first={<LegalExplorer />} />;
}
