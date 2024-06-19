/* * */

import styles from './LabelDateFromTo.module.css';
import { useTranslations } from 'next-intl';

/* * */

export default function LabelDateFromTo({ startDate = '', endDate = '' }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('LabelDateFromTo');

  //
  // B. Render components

  return startDate && endDate ? <p className={styles.container}>{t('default', { start_date: new Date(startDate), end_date: new Date(endDate) })}</p> : <p className={styles.dateRange}>{t('no_data')}</p>;

  //
}
