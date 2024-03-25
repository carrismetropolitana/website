/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendPip from '@/components/FrontendPip/FrontendPip';
import { FrontendPipContextProvider } from '@/contexts/FrontendPipContext';

/* * */

export default function Page() {
  return (
    <OneFullColumn>
      <FrontendPipContextProvider>
        <FrontendPip />
      </FrontendPipContextProvider>
    </OneFullColumn>
  );
}
