/* * */

import { useTranslations } from 'next-intl';
import styles from './BigNumber.module.css';

/* * */

export default function BigNumber({ label = '', value = -1, level = 1, type = 'normal', direction = 'row' }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('BigNumber');

  //
  // B. Render components

  return (
    <div className={`${styles.container} ${styles[`level_${level}`]} ${styles[`type_${type}`]} ${styles[`direction_${direction}`]}`}>
      <p className={styles.value}>{t('value', { value: value })}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );

  //
}
