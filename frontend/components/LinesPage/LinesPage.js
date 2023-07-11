'use client';

import useSWR from 'swr';
import { LineFormProvider, useLineForm, LineFormOptions } from '@/forms/LineForm';
import { Divider } from '@mantine/core';
import styles from './LinesPage.module.css';
import Pannel from '../Pannel/Pannel';
import { useTranslations } from 'next-intl';
import LineSelector from '../LineSelector/LineSelector';
import LinePatternSelector from '../LinePatternSelector/LinePatternSelector';
import LinePatternDateSelector from '../LinePatternDateSelector/LinePatternDateSelector';
import LinePatternMap from '../LinePatternMap/LinePatternMap';
import LinePatternPath from '../LinePatternPath/LinePatternPath';

export default function LinesPage() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesPage');

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
          <LineSelector />
          {lineForm.values.line_code && (
            <div className={styles.container}>
              <Divider />
              <LinePatternDateSelector />
              <LinePatternSelector />
              {lineForm.values.pattern_code && <LinePatternPath />}
              {lineForm.values.pattern_code && <LinePatternMap />}
            </div>
          )}
        </form>
      </LineFormProvider>
    </Pannel>
  );
}
