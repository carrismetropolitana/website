/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendDemand from '@/components/FrontendDemand/FrontendDemand';

/* * */

export async function generateMetadata({ params }) {
  switch (params.locale) {
    case 'pt':
      return { title: 'Dados Importantes', description: 'Descubra a verdadeira dimensão da Carris Metropolitana.' };
    default:
    case 'en':
      return { title: 'Dados Importantes', description: 'Descubra a verdadeira dimensão da Carris Metropolitana.' };
  }
}

/* * */

export default function Page() {
  return (
    <OneFullColumn>
      <FrontendDemand />
    </OneFullColumn>
  );
}
