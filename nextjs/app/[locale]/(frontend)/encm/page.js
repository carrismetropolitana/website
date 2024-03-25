/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendEncm from '@/components/FrontendEncm/FrontendEncm';

/* * */

export async function generateMetadata({ params }) {
  switch (params.locale) {
    case 'pt':
      return { title: 'Espaços navegante® Carris Metropolitana', description: 'Tempos de atendimento estimados para todos os Espaços navegante® Carris Metropolitana.' };
    default:
    case 'en':
      return { title: 'Espaços navegante® Carris Metropolitana', description: 'Tempos de atendimento estimados para todos os Espaços navegante® Carris Metropolitana.' };
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
  );
}
