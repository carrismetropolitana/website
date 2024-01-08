/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import { FrontendAlertsContextProvider } from '@/contexts/FrontendAlertsContext';
import FrontendAlerts from '@/components/FrontendAlerts/FrontendAlerts';

/* * */

export async function generateMetadata({ params }) {
  switch (params.locale) {
    case 'pt':
      return { title: 'Alertas de Serviço', description: 'Fique a par das alterações de serviço da Carris Metropolitana' };
    default:
    case 'en':
      return { title: 'Alertas de Serviço', description: 'Fique a par das alterações de serviço da Carris Metropolitana' };
  }
}

/* * */

export default function Page() {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <FrontendAlertsContextProvider>
        <FrontendAlerts />
      </FrontendAlertsContextProvider>
    </OneFullColumn>
  );

  //
}
