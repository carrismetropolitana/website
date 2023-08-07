'use client';

import useSWR from 'swr';
import styles from './StoreItem.module.css';
import { useTranslations } from 'next-intl';
import Loader from '../Loader/Loader';
import StoreItemTimetable from '../StoreItemTimetable/StoreItemTimetable';
import StoreItemOccupation from '../StoreItemOccupation/StoreItemOccupation';

export default function StoreItem({ code }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StoreItem');

  //
  // B. Fetch data

  const { data: storeData, error: storeError, isLoading: storeLoading } = useSWR(code && `https://api.carrismetropolitana.pt/stores/${code}`, { refreshInterval: 3600 });

  console.log(storeData);

  //
  // C. Render components

  return storeData ? (
    <div className={styles.container}>
      <h2 className={styles.title}>{storeData.name}</h2>
      <div className={styles.wrapper}>
        <h4 className={styles.label}>{t('address.label')}</h4>
        <p className={styles.text}>{`${storeData.address}, ${storeData.postal_code} ${storeData.locality}`}</p>
      </div>
      <div className={styles.wrapper}>
        <h4 className={styles.label}>{t('schedule.label')}</h4>
        <StoreItemTimetable mon={storeData.hours_monday} tue={storeData.hours_tuesday} wed={storeData.hours_wednesday} thu={storeData.hours_thursday} fri={storeData.hours_friday} sat={storeData.hours_saturday} sun={storeData.hours_sunday} />
      </div>
      <div className={styles.wrapper}>
        <h4 className={styles.label}>{t('occupation.label')}</h4>
        <StoreItemOccupation occupationData={storeData.status} />
      </div>
    </div>
  ) : (
    <Loader visible />
  );

  //
}
