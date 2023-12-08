/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import { StopsExplorerContextProvider } from '@/contexts/StopsExplorerContext';
import StopsExplorer from '@/components/StopsExplorer/StopsExplorer';

/* * */

export async function generateMetadata({ params }) {
  //

  // A. Fetch stop data
  const stopData = await fetch(params.vehicle_id?.length && `https://api.carrismetropolitana.pt/vehicles/${params.vehicle_id}`).then((res) => res.json());

  // B. Render the titles
  if (params.vehicle_id === 'all' || !stopData.name) {
    switch (params.locale) {
      case 'pt':
        return { title: 'Todos os Veículos', description: 'Conheça os veículos da operação da Carris Metropolitana' };
      default:
      case 'en':
        return { title: 'Todas os Veículos', description: 'Conheça os veículos da operação da Carris Metropolitana' };
    }
  } else {
    switch (params.locale) {
      case 'pt':
        return { title: `Horários na paragem ${stopData.name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana nesta paragem.' };
      default:
      case 'en':
        return { title: `Horários na paragem ${stopData.name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana nesta paragem.' };
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
      <StopsExplorerContextProvider>
        <StopsExplorer />
      </StopsExplorerContextProvider>
    </OneFullColumn>
  );

  //
}
