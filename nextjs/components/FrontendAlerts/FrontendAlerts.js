/* * */

import FrontendAlertsSummary from '@/components/FrontendAlertsSummary/FrontendAlertsSummary'
import Panel from '@/components/Panel/Panel'
import { getTranslations } from 'next-intl/server'

/* * */

export default async function FrontendAlert() {
  //

  //
  // A. Setup variables

  const t = await getTranslations('FrontendAlerts');

  //
  // B. Fetch data

  const [alerts, lines, municipalities] = await Promise.all([
    fetch('https://api.carrismetropolitana.pt/alerts').then(res => res.json()),
    fetch('https://api.carrismetropolitana.pt/lines').then(res => res.json()),
    fetch('https://api.carrismetropolitana.pt/municipalities').then(res => res.json()),
  ]);

  let municipalityDict = Object.fromEntries(municipalities.map(municipality => [municipality.id, municipality]));
  //
  // C. Render components

  return (
    <Panel title={t('Panel_title')}>
      {/* <FrontendLinesContent /> */}
      <FrontendAlertsSummary alerts={alerts} lines={lines} municipalities={municipalityDict} />
    </Panel>
  )

  //
}
