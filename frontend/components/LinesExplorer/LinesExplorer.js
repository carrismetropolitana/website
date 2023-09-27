'use client';

import useSWR from 'swr';
import { LineFormProvider, useLineForm, LineFormOptions } from '@/forms/LineForm';
import { Divider } from '@mantine/core';
import styles from './LinesExplorer.module.css';
import Pannel from '@/components/Pannel/Pannel';
import { useTranslations } from 'next-intl';
import LinesExplorerToolbar from '@/components/LinesExplorerToolbar/LinesExplorerToolbar';

import LinePatternSelector from '@/components/LinePatternSelector/LinePatternSelector';
import LinePatternDateSelector from '@/components/LinePatternDateSelector/LinePatternDateSelector';
import LinePatternMap from '@/components/LinePatternMap/LinePatternMap';
import LinePatternPath from '@/components/LinePatternPath/LinePatternPath';
import LinesExplorerToolbarLineSearch from '../LinesExplorerToolbarLineSearch/LinesExplorerToolbarLineSearch';

/* * */

export default function LinesExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorer');

  //
  // B. Fetch data

  const { isLoading: allLinesLoading, error: allLinesError } = useSWR('https://api.carrismetropolitana.pt/lines');
  const { isLoading: allMunicipalitiesLoading, error: allMunicipalitiesError } = useSWR('https://api.carrismetropolitana.pt/municipalities/');

  //
  // B. Fetch data

  const lineForm = useLineForm(LineFormOptions);

  //
  // c. Render components

  return (
    <Pannel title={t('pannel_title')} loading={allLinesLoading || allMunicipalitiesLoading} error={allLinesError || allMunicipalitiesError}>
      <LineFormProvider form={lineForm}>
        <form>
          <LinesExplorerToolbarLineSearch />
          {lineForm.values.line_id && (
            <div className={styles.container}>
              <Divider />
              <LinePatternDateSelector />
              <LinePatternSelector />
              {lineForm.values.pattern_id && <LinePatternPath />}
              {lineForm.values.pattern_id && <LinePatternMap />}
            </div>
          )}
        </form>
      </LineFormProvider>
    </Pannel>
  );
}
