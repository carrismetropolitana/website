'use client';

/* * */

import styles from './FrontendPip.module.css';
import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import Panel from '@/components/Panel/Panel';
import FrontendPipIntro from '@/components/FrontendPipIntro/FrontendPipIntro';
import FrontendPipSurvey from '@/components/FrontendPipSurvey/FrontendPipSurvey';
import FrontendPipStops from '@/components/FrontendPipStops/FrontendPipStops';
import { useFrontendPipContext } from '@/contexts/FrontendPipContext';

/* * */

export default function FrontendPip() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendPip');
  const frontendPipContext = useFrontendPipContext();

  //
  // B. Fetch data

  const { error: allPipError, isLoading: allPipLoading } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/pip');

  //
  // C. Render components

  return (
    <Panel type="B" title={t('title', { pip_id: frontendPipContext.item_id })} loading={allPipLoading} error={allPipError}>
      <div className={styles.container}>
        <FrontendPipIntro />
        {!frontendPipContext.survey.selected_answer_code ? <FrontendPipSurvey /> : <FrontendPipStops />}
      </div>
    </Panel>
  );

  //
}
