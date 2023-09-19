'use client';

import { OneFullColumn } from '@/components/Layouts/Layouts';
import StopsExplorer from '@/components/StopsExplorer/StopsExplorer';

export default function Page({ params }) {
  //

  //
  // E. Render components

  return <OneFullColumn first={<StopsExplorer urlStopId={params.stop_id[0]} />} />;

  //
}
