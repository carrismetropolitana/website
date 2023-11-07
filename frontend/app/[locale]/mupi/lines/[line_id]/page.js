/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import LinesExplorer from '@/components/LinesExplorer/LinesExplorer';
import { LinesExplorerContextProvider } from '@/contexts/LinesExplorerContext';

/* * */

export default function Page({ params }) {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <LinesExplorerContextProvider>
        <p>MUPI VERSION</p>
        <LinesExplorer />
      </LinesExplorerContextProvider>
    </OneFullColumn>
  );

  //
}
