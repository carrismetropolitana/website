/* * */

import styles from './NoDataLabel.module.css';
import { useTranslations } from 'next-intl';

/* * */

export default function NoDataLabel({ fill, text }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('NoDataLabel');

  //
  // B. Render components

  return <div className={`${styles.container} ${fill && styles.fill}`}>{text || t('title')}</div>;

  //
}
