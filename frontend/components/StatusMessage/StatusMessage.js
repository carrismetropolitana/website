'use client';

/* * */

import styles from './StatusMessage.module.css';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconChevronDown, IconChevronLeft } from '@tabler/icons-react';

/* * */

export default function StatusMessage() {
  //

  //
  // A. Setup variables

  const t = useTranslations('StatusMessage');
  const [isVisible, setIsVisible] = useState(true);

  //
  // B. Render components

  const handleSetIsVisible = () => {
    setIsVisible((prev) => !prev);
  };

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.headerWrapper} onClick={handleSetIsVisible}>
          <h3 className={styles.title}>{t('title')}</h3>
          <ActionIcon variant="subtle" color="rgba(0, 0, 0, 1)" size="lg">
            {isVisible ? <IconChevronDown size={20} /> : <IconChevronLeft size={20} />}
          </ActionIcon>
        </div>
        {isVisible && (
          <div className={styles.contentWrapper}>
            <p className={styles.explanation}>{t('explanation')}</p>
            <p className={styles.solution}>{t('solution')}</p>
          </div>
        )}
      </div>
    </div>
  );

  //
}
