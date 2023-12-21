'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendLinesContent.module.css';
import { useDebugContext } from '@/contexts/DebugContext';
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import FrontendLinesContentHeader from '@/components/FrontendLinesContentHeader/FrontendLinesContentHeader';
import FrontendLinesContentPatternPath from '@/components/FrontendLinesContentPatternPath/FrontendLinesContentPatternPath';
import FrontendLinesMap from '@/components/FrontendLinesMap/FrontendLinesMap';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import FrontendLinesContentDebug from '@/components/FrontendLinesContentDebug/FrontendLinesContentDebug';

/* * */

export default function FrontendLinesContent() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendLinesContent');

  const debugContext = useDebugContext();
  const FrontendLinesContext = useFrontendLinesContext();

  //
  // B. Render components

  return (
    <div className={`${styles.container} ${!FrontendLinesContext?.entities?.line?.id && styles.isHidden}`}>
      <div className={styles.map}>
        <FrontendLinesMap />
      </div>
      <div className={styles.sidebar}>
        {FrontendLinesContext?.entities?.line?.id ? (
          <>
            <FrontendLinesContentHeader />
            {FrontendLinesContext.entities.pattern?.id && debugContext.isDebug && <FrontendLinesContentDebug />}
            {FrontendLinesContext.entities.pattern?.id ? <FrontendLinesContentPatternPath /> : <NoDataLabel text={t('no_selection')} />}
          </>
        ) : (
          <NoDataLabel text={t('no_selection')} />
        )}
      </div>
    </div>
  );

  //
}
