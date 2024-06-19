'use client';

/* * */

import styles from './LabelDateRelative.module.css';
import { useTranslations, useFormatter, useNow } from 'next-intl';

/* * */

export default function LabelDateRelative({ date = '' }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('LabelDateRelative');

  const dateFormatter = useFormatter();
  const now = useNow({ updateInterval: 1000 });

  //
  // B. Render components

  if (!date) return <></>;

  return <p className={styles.container}>{t('default', { diff: dateFormatter.relativeTime(date, now) })}</p>;

  //
}
