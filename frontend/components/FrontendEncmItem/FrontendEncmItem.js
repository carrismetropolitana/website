'use client';

import { useTranslations } from 'next-intl';
import styles from './FrontendEncmItem.module.css';
import Loader from '@/components/Loader/Loader';
import FrontendEncmItemTimetable from '@/components/FrontendEncmItemTimetable/FrontendEncmItemTimetable';
import FrontendEncmItemOccupation from '@/components/FrontendEncmItemOccupation/FrontendEncmItemOccupation';

export default function FrontendEncmItem({ encmData, selectedEncmId, onSelectEncmId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendEncmItem');

  //
  // B. Handle actions

  const handleClickViewMap = () => {
    onSelectEncmId(encmData.id);
  };

  //
  // C. Render components

  return encmData ? (
    <div id={`encm${encmData.id}`} className={`${styles.container} ${selectedEncmId === encmData.id && styles.selected}`}>
      <h3 className={styles.title}>{encmData.name}</h3>
      <div className={styles.wrapper}>
        <h4 className={styles.label}>{t('address.label')}</h4>
        <p className={styles.text}>{`${encmData.address}, ${encmData.postal_code} ${encmData.locality}`}</p>
        <a className={styles.viewInMap} onClick={handleClickViewMap} href="#FrontendEncmMap">
          {t('address.view_in_map')}
        </a>
      </div>

      <FrontendEncmItemTimetable isOpen={encmData.is_open} mon={encmData.hours_monday} tue={encmData.hours_tuesday} wed={encmData.hours_wednesday} thu={encmData.hours_thursday} fri={encmData.hours_friday} sat={encmData.hours_saturday} sun={encmData.hours_sunday} />

      <FrontendEncmItemOccupation currentlyWaiting={encmData.currently_waiting} expectedWaitTime={encmData.expected_wait_time} activeCounters={encmData.active_counters} />
    </div>
  ) : (
    <Loader visible />
  );

  //
}
