/* * */

import FrontendPlanner from '@/components/FrontendPlanner/FrontendPlanner'
import { OneFullColumn } from '@/components/Layouts/Layouts'

/* * */

export async function generateMetadata({ params }) {
  //

  // A. Fetch line data

  // B. Render the titles
  switch (params.locale) {
    case 'pt':
      return { description: 'Planeie as suas viagens', title: 'Planeador de viagens' };
    default:
    case 'en':
      return { description: 'Plan your trips', title: 'Travel planner' };
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
  )

  //
}
