/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendPlanner from '@/components/FrontendPlanner/FrontendPlanner';

/* * */

export async function generateMetadata({ params }) {
  //

  // A. Fetch line data

  // B. Render the titles
  switch (params.locale) {
    case 'pt':
      return { title: 'Perguntas frequentes', description: 'Esclareça as dúvidas frequentes' };
    default:
    case 'en':
      return { title: 'Frequently asked questions', description: 'Clarify your frequently asked questions' };
  }

  //
}

/* * */

export default function Page({ params }) {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
        <FrontendPlanner />
    </OneFullColumn>
  );

  //
}
