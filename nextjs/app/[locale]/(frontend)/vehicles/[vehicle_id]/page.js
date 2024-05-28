/* * */

import FrontendVehicles from '@/components/FrontendVehicles/FrontendVehicles'
import { OneFullColumn } from '@/components/Layouts/Layouts'
import { FrontendVehiclesContextProvider } from '@/contexts/FrontendVehiclesContext'

/* * */

export async function generateMetadata({ params }) {
  //

  // A. Fetch stop data
  const stopData = await fetch(params.vehicle_id?.length && `https://api.carrismetropolitana.pt/vehicles/${params.vehicle_id}`).then(res => res.json());

  // B. Render the titles
  if (params.vehicle_id === 'all' || !stopData.name) {
    switch (params.locale) {
      case 'pt':
        return { description: 'Conheça os veículos da operação da Carris Metropolitana', title: 'Todos os Veículos' };
      default:
      case 'en':
        return { description: 'Conheça os veículos da operação da Carris Metropolitana', title: 'Todas os Veículos' };
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

  //
}

/* * */

export default function Page() {
  //

  //
  // A. Render components

  return (
    <OneFullColumn>
      <FrontendVehiclesContextProvider>
        <FrontendVehicles />
      </FrontendVehiclesContextProvider>
    </OneFullColumn>
  )

  //
}
