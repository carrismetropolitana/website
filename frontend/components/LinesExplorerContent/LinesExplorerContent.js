'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContent.module.css';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import LinesExplorerContentHeader from '@/components/LinesExplorerContentHeader/LinesExplorerContentHeader';
import LinesExplorerContentPatternPath from '@/components/LinesExplorerContentPatternPath/LinesExplorerContentPatternPath';
import LinesExplorerContentPatternMap from '@/components/LinesExplorerContentPatternMap/LinesExplorerContentPatternMap';
import NoDataLabel from '../NoDataLabel/NoDataLabel';

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
        <div className={styles.toolbar}>
          <LinesExplorerContentHeader />
        </div>
        <div className={styles.map}>{linesExplorerContext.entities.pattern?.shape_id && <LinesExplorerContentPatternMap />}</div>
        <div className={styles.sidebar}>
          {linesExplorerContext.entities.pattern?.id ? (
            <>
              <LinesExplorerContentHeader />
              <LinesExplorerContentPatternPath />
            </>
          ) : (
            <NoDataLabel text={t('no_selection')} />
          )}
        </div>
      </div>
    )
  );

  //
}
