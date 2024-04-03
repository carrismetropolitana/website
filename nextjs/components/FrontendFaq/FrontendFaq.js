import Panel from "../Panel/Panel";

export default async function FrontendFaq({}){

  let t = await getTranslations('FrontendFaq');
  return (
    <Panel title={t('Panel_title')}>
    asd
    </Panel>
  )
}