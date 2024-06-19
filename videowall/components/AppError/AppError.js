'use client';

/* * */

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { IconTrafficCone } from '@tabler/icons-react';
import styles from './AppError.module.css';

/* * */

export default function AppError() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppError');

  const [reloadInSeconds, setReloadInSeconds] = useState(500000000);

  //
  // B. Transform data

  useEffect(() => {
    const interval = setInterval(() => {
      if (reloadInSeconds === 1) window.location.reload();
      else setReloadInSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [reloadInSeconds]);

  //
  // C. Handle actions

  const handleGoToHomepage = () => {
    window.location = '/';
  };

  //
  // D. Render Components

  return (
    <div className={styles.container}>
      <IconTrafficCone size={75} className={styles.icon} />
      <h1 className={styles.title}>{t('title')}</h1>
      <h2 className={styles.subtitle}>{t('subtitle')}</h2>
      <p className={styles.retryMessage}>{t('retry', { value: reloadInSeconds })}</p>
      <a onClick={handleGoToHomepage}>{t('goto_home')}</a>
    </div>
  );

  //
}
