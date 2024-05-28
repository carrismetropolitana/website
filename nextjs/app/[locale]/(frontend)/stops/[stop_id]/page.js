/* * */

import FrontendStops from '@/components/FrontendStops/FrontendStops'
import { OneFullColumn } from '@/components/Layouts/Layouts'
import { FrontendStopsContextProvider } from '@/contexts/FrontendStopsContext'

/* * */

export async function generateMetadata({ params }) {
  //

  try {
    // A. Fetch stop data
    const stopData = await fetch(params.stop_id?.length && `https://api.carrismetropolitana.pt/stops/${params.stop_id}`).then(res => res.json());

    // B. Render the titles
    if (params.stop_id === 'all' || !stopData.name) {
      switch (params.locale) {
        case 'pt':
          return { description: 'Conheça as paragens e horários da Carris Metropolitana', title: 'Todas as Paragens' };
        default:
        case 'en':
          return { description: 'Conheça as paragens e horários da Carris Metropolitana', title: 'Todas as Paragens' };
      }
    } else {
      switch (params.locale) {
        case 'pt':
          return { description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana nesta paragem.', title: `Horários na paragem ${stopData.name}` };
        default:
        case 'en':
          return { description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana nesta paragem.', title: `Horários na paragem ${stopData.name}` };
      }
    }
  } catch (error) {
    return { description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana nesta paragem.', title: `Horários na paragem ${stopData.name}` };
  }

  //
}

/* * */

export default function Page() {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <FrontendStopsContextProvider>
        <FrontendStops />
      </FrontendStopsContextProvider>
    </OneFullColumn>
  )

  //
}
