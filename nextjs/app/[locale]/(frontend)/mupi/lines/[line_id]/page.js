/* * */

import FrontendLines from '@/components/FrontendLines/FrontendLines'
import { OneFullColumn } from '@/components/Layouts/Layouts'
import { FrontendLinesContextProvider } from '@/contexts/FrontendLinesContext'

/* * */

export default function Page({ params }) {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <FrontendLinesContextProvider>
        <p>MUPI VERSION</p>
        <FrontendLines />
      </FrontendLinesContextProvider>
    </OneFullColumn>
  )

  //
}
