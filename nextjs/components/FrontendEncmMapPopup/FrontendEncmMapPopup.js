'use client';

/* * */

import { useTranslations } from 'next-intl'

import styles from './FrontendEncmMapPopup.module.css'

/* * */

export default function FrontendEncmMapPopup({ encmData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendEncmMapPopup');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{encmData.name}</h2>
      <a className={styles.viewInList} href={`#encm${encmData.id}`}>
        {t('view_in_list')}
      </a>
    </div>
  )

  //
}
