/* * */

import FrontendAlerts from '@/components/FrontendAlerts/FrontendAlerts'
import { OneFullColumn } from '@/components/Layouts/Layouts'

/* * */

export async function generateMetadata({ params }) {
  switch (params.locale) {
    case 'pt':
      return { description: 'Fique a par das alterações de serviço da Carris Metropolitana', title: 'Alertas de Serviço' };
    default:
    case 'en':
      return { description: 'Stay informed about service changes from Carris Metropolitana', title: 'Service Alerts' };
  }
}

/* * */

export default function Page({}) {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <FrontendAlerts />
    </OneFullColumn>
  )

  //
}
