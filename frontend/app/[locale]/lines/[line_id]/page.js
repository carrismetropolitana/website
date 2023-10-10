import { OneFullColumn } from '@/components/Layouts/Layouts';
import LinesExplorer from '@/components/LinesExplorer/LinesExplorer';
import { LinesExplorerContextProvider } from '@/contexts/LinesExplorerContext';

/* * */

export async function generateMetadata({ params }) {
  //

  // A. Fetch line data
  const lineData = await fetch(params.line_id?.length && `https://api.carrismetropolitana.pt/lines/${params.line_id}`).then((res) => res.json());

  // B. Render the titles
  if (params.line_id === 'all' || !lineData.name) {
    switch (params.locale) {
      case 'pt':
        return { title: 'Todas as Linhas', description: 'Conheça as linhas e horários da Carris Metropolitana' };
      default:
      case 'en':
        return { title: 'Todas as Linhas', description: 'Conheça as linhas e horários da Carris Metropolitana' };
    }
  } else {
    switch (params.locale) {
      case 'pt':
        return { title: `Horários na linha ${lineData.short_name} - ${lineData.long_name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana.' };
      default:
      case 'en':
        return { title: `Horários na linha ${lineData.short_name} - ${lineData.long_name}`, description: 'Estimativas de chegada em tempo real para os autocarros da Carris Metropolitana.' };
    }
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
      <LinesExplorerContextProvider>
        <LinesExplorer urlLineId={params.line_id?.length && params.line_id} />
      </LinesExplorerContextProvider>
    </OneFullColumn>
  );

  //
}
