'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContent.module.css';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import LinesExplorerContentHeader from '@/components/LinesExplorerContentHeader/LinesExplorerContentHeader';
import LinesExplorerContentPatternPath from '@/components/LinesExplorerContentPatternPath/LinesExplorerContentPatternPath';
import LinesExplorerContentPatternMap from '@/components/LinesExplorerContentPatternMap/LinesExplorerContentPatternMap';

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
        {linesExplorerContext.entities.pattern?.shape_id && <LinesExplorerContentPatternMap />}
        {linesExplorerContext.entities.pattern?.id && <LinesExplorerContentPatternPath />}
      </div>
    )
  );

  //
}
