/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendStops from '@/components/FrontendStops/FrontendStops';
import { FrontendStopsContextProvider } from '@/contexts/FrontendStopsContext';

/* * */

export default function Page() {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <FrontendStopsContextProvider>
        <p>MUPI VERSION</p>
        <FrontendStops />
      </FrontendStopsContextProvider>
    </OneFullColumn>
  );

  //
}
