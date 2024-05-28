'use client';

/* * */

import FrontendPipIntro from '@/components/FrontendPipIntro/FrontendPipIntro'
import FrontendPipStops from '@/components/FrontendPipStops/FrontendPipStops'
import FrontendPipSurvey from '@/components/FrontendPipSurvey/FrontendPipSurvey'
import Panel from '@/components/Panel/Panel'
import { useFrontendPipContext } from '@/contexts/FrontendPipContext'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'

import styles from './FrontendPip.module.css'

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
    <Panel error={allPipError} loading={allPipLoading} title={t('title', { pip_id: frontendPipContext.item_id })} type="B">
      <div className={styles.container}>
        <FrontendPipIntro />
        {!frontendPipContext.survey.selected_answer_code ? <FrontendPipSurvey /> : <FrontendPipStops />}
      </div>
    </Panel>
  )

  //
}
