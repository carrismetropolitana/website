'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContent.module.css';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import LinesExplorerContentHeader from '../LinesExplorerContentHeader/LinesExplorerContentHeader';

/* * */

export default function LinesExplorerContent() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContent');

  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Render components

  return (
    linesExplorerContext?.entities?.line?.id && (
      <div className={styles.container}>
        <LinesExplorerContentHeader />
        {/* <LinePatternPath /> */}
        {/* <LinePatternMap /> */}
      </div>
    )
  );

  //
}
