/* * */

import FrontendEncm from '@/components/FrontendEncm/FrontendEncm'
import { OneFullColumn } from '@/components/Layouts/Layouts'

/* * */

export async function generateMetadata({ params }) {
  switch (params.locale) {
    case 'pt':
      return { description: 'Tempos de atendimento estimados para todos os Espaços navegante® Carris Metropolitana.', title: 'Espaços navegante® Carris Metropolitana' };
    default:
    case 'en':
      return { description: 'Tempos de atendimento estimados para todos os Espaços navegante® Carris Metropolitana.', title: 'Espaços navegante® Carris Metropolitana' };
  }
}

/* * */

export default function Page() {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <FrontendEncm />
    </OneFullColumn>
  )
}
