/* * */

import styles from './StatusMessage.module.css';
import { useTranslations } from 'next-intl';

/* * */

export default function StatusMessage() {
  //

  //
  // A. Setup variables

  const isVisible = true;
  const t = useTranslations('StatusMessage');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('title')}</h3>
      <p className={styles.explanation}>{t('explanation')}</p>
      <p className={styles.solution}>{t('solution')}</p>
    </div>
  );

  //
}
