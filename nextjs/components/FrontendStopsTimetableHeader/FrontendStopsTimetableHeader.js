'use client';

import { useTranslations } from 'next-intl';
import styles from './FrontendStopsTimetableHeader.module.css';

export default function FrontendStopsTimetableHeader() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendStopsTimetableHeader');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.column}>{t('line')}</div>
      <div className={styles.column}>{t('headsign')}</div>
      <div className={styles.column}>{t('estimate')}</div>
    </div>
  );
}
