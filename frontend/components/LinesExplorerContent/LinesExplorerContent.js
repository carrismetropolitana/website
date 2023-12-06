'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContent.module.css';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import LinesExplorerContentHeader from '@/components/LinesExplorerContentHeader/LinesExplorerContentHeader';
import LinesExplorerContentPatternPath from '@/components/LinesExplorerContentPatternPath/LinesExplorerContentPatternPath';
import LinesExplorerMap from '@/components/LinesExplorerMap/LinesExplorerMap';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';

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
    <div className={`${styles.container} ${!linesExplorerContext?.entities?.line?.id && styles.isHidden}`}>
      <div className={styles.map}>
        <LinesExplorerMap />
      </div>
      <div className={styles.sidebar}>
        {linesExplorerContext?.entities?.line?.id ? (
          <>
            <LinesExplorerContentHeader />
            {linesExplorerContext.entities.pattern?.id ? <LinesExplorerContentPatternPath /> : <NoDataLabel text={t('no_selection')} />}
          </>
        ) : (
          <NoDataLabel text={t('no_selection')} />
        )}
      </div>
    </div>
  );

  //
}
