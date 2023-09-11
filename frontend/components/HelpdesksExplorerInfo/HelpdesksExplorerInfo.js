'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './HelpdesksExplorerInfo.module.css';

export default function HelpdesksExplorerInfo() {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdesksExplorerInfo');

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <Image priority src="/encm.svg" alt={'duh'} width={290} height={110} />
      <p className={styles.message}>{t('message')}</p>
    </div>
  );

  //
}
