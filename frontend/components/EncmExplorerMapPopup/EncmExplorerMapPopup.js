'use client';

import styles from './EncmExplorerMapPopup.module.css';
import { useTranslations } from 'next-intl';

export default function EncmExplorerMapPopup({ encmData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('EncmExplorerMapPopup');

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{encmData.name}</h2>
      <a className={styles.viewInList} href={`#encm${encmData.code}`}>
        {t('view_in_list')}
      </a>
    </div>
  );

  //
}
