/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import StopsExplorer from '@/components/StopsExplorer/StopsExplorer';
import { StopsExplorerContextProvider } from '@/contexts/StopsExplorerContext';

/* * */

export default function Page() {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <StopsExplorerContextProvider>
        <p>MUPI VERSION</p>
        <StopsExplorer />
      </StopsExplorerContextProvider>
    </OneFullColumn>
  );

  //
}
