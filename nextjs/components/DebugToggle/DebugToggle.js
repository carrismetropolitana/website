'use client';

import { useDebugContext } from '@/contexts/DebugContext'
import { useTranslations } from 'next-intl'

import styles from './DebugToggle.module.css'

/* * */

export default function DebugToggle() {
  //

  //
  // A. Setup variables

  const t = useTranslations('DebugToggle');

  const debugContext = useDebugContext();

  // B. Render Components

  return (
    <div className={styles.toggle} onClick={debugContext.toggleIsDebug}>
      {debugContext.isDebug ? t('enabled') : t('disabled')}
    </div>
  )

  //
}
