'use client';

import useSWR from 'swr';
import { Divider } from '@mantine/core';
import styles from './LinesExplorerContent.module.css';
import { useTranslations } from 'next-intl';
import LinesExplorerToolbar from '@/components/LinesExplorerToolbar/LinesExplorerToolbar';

import LinePatternSelector from '@/components/LinePatternSelector/LinePatternSelector';
import LinePatternDateSelector from '@/components/LinesExplorerToolbarSelectDate/LinesExplorerToolbarSelectDate';
import LinePatternMap from '@/components/LinePatternMap/LinePatternMap';
import LinePatternPath from '@/components/LinePatternPath/LinePatternPath';
import LinesExplorerToolbarLineSearch from '../LinesExplorerToolbarSelectLine/LinesExplorerToolbarSelectLine';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';

/* * */

export default function LinesExplorerContent() {
  //

  //
  // A. Setup variables

  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Fetch data

  const { isLoading: allLinesLoading, error: allLinesError } = useSWR('https://api.carrismetropolitana.pt/lines');
  const { isLoading: allMunicipalitiesLoading, error: allMunicipalitiesError } = useSWR('https://api.carrismetropolitana.pt/municipalities/');

  //
  // c. Render components

  return (
    <div className={styles.container}>
      <LinePatternDateSelector />
      {/* <LinePatternSelector /> */}
      {/* <LinePatternPath /> */}
      {/* <LinePatternMap /> */}
    </div>
  );
}
