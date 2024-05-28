'use client';

/* * */

import FrontendLinesContentSelectPattern from '@/components/FrontendLinesContentSelectPattern/FrontendLinesContentSelectPattern'
import { LineBadge } from '@/components/LineDisplay/LineDisplay'
import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext'
import { useTranslations } from 'next-intl'

import styles from './FrontendLinesContentHeader.module.css'

/* * */

export default function FrontendLinesContentHeader() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendLinesContentHeader');

  const FrontendLinesContext = useFrontendLinesContext();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <LineBadge color={FrontendLinesContext.entities.line.color} short_name={FrontendLinesContext.entities.line.short_name} size="lg" text_color={FrontendLinesContext.entities.line.text_color} />
      <p className={styles.destinationLabel}>{t('destination_label')}</p>
      <FrontendLinesContentSelectPattern />
    </div>
  )

  //
}
