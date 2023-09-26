import { OneFullColumn } from '@/components/Layouts/Layouts';
import StopsExplorer from '@/components/StopsExplorer/StopsExplorer';
import { StopsExplorerContextProvider } from '@/contexts/StopsExplorerContext';

/* * */

export async function generateMetadata({ params }) {
  //

  // A. Fetch stop data
  const stopData = await fetch(params.stop_id?.length && `https://api.carrismetropolitana.pt/stops/${params.stop_id}`).then((res) => res.json());

  // B. Render the titles
  if (params.stop_id === 'all' || !stopData.name) {
    switch (params.locale) {
      case 'pt':
        return { title: 'Todas as Paragens', description: 'Conheça as paragens e horários da Carris Metropolitana' };
      default:
      case 'en':
        return { title: 'Todas as Paragens', description: 'Conheça as paragens e horários da Carris Metropolitana' };
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

export default function Page({ params }) {
  //

  //
  // E. Render components

  return (
    <OneFullColumn
      first={
        <StopsExplorerContextProvider>
          <StopsExplorer urlStopId={params.stop_id?.length && params.stop_id} />
        </StopsExplorerContextProvider>
      }
    />
  );

  //
}
