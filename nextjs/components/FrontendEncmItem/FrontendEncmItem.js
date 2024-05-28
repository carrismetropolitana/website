'use client';

/* * */

import FrontendEncmItemOccupation from '@/components/FrontendEncmItemOccupation/FrontendEncmItemOccupation'
import FrontendEncmItemTimetable from '@/components/FrontendEncmItemTimetable/FrontendEncmItemTimetable'
import Loader from '@/components/Loader/Loader'
import { useTranslations } from 'next-intl'

import styles from './FrontendEncmItem.module.css'

/* * */

export default function FrontendEncmItem({ encmData, onSelectEncmId, selectedEncmId }) {
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

  return encmData ?
		<div className={`${styles.container} ${selectedEncmId === encmData.id && styles.selected}`} id={`encm${encmData.id}`}>
  <h3 className={styles.title}>{encmData.name}</h3>
  <div className={styles.wrapper}>
    <h4 className={styles.label}>{t('address.label')}</h4>
    <p className={styles.text}>{`${encmData.address}, ${encmData.postal_code} ${encmData.locality}`}</p>
    <a className={styles.viewInMap} href="#FrontendEncmMap" onClick={handleClickViewMap}>
      {t('address.view_in_map')}
    </a>
  </div>

  <FrontendEncmItemTimetable fri={encmData.hours_friday} isOpen={encmData.is_open} mon={encmData.hours_monday} sat={encmData.hours_saturday} sun={encmData.hours_sunday} thu={encmData.hours_thursday} tue={encmData.hours_tuesday} wed={encmData.hours_wednesday} />

  {encmData.is_open && <FrontendEncmItemOccupation activeCounters={encmData.active_counters} currentlyWaiting={encmData.currently_waiting} expectedWaitTime={encmData.expected_wait_time} />}
    </div> :
		<Loader visible />;

  //
}
