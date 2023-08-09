'use client';

import { useTranslations } from 'next-intl';
import styles from './HelpdeskItemOccupation.module.css';
import { useEffect, useState } from 'react';

export default function HelpdeskItemOccupation({ occupationData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdeskItemOccupation');

  const [parsedOccupation, setParsedOccupation] = useState([]);

  //
  // B. Transform data

  useEffect(() => {
    setParsedOccupation(occupationData || []);
  }, [occupationData]);

  //
  // C. Render components

  return parsedOccupation.map((item) => (
    <div key={item.category_code} className={styles.container}>
      <div className={styles.badge}>{item.category_code}</div>
      <p className={styles.label}>{t(`categories.${item.category_code}.label`)}</p>
      <p className={styles.occupation}>{t('waiting', { value: item.currently_waiting })}</p>
    </div>
  ));

  //
}
