'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContentHeader.module.css';
import { LineBadge } from '@/components/LineDisplay/LineDisplay';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import LinesExplorerContentSelectPattern from '@/components/LinesExplorerContentSelectPattern/LinesExplorerContentSelectPattern';

/* * */

export default function LinesExplorerContentHeader() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContentHeader');

  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <LineBadge short_name={linesExplorerContext.entities.line.short_name} color={linesExplorerContext.entities.line.color} text_color={linesExplorerContext.entities.line.text_color} size="lg" />
      <p className={styles.destinationLabel}>{t('destination_label')}</p>
      <LinesExplorerContentSelectPattern />
    </div>
  );

  //
}
