'use client';

import styles from './EncmExplorerItem.module.css';
import { useTranslations } from 'next-intl';
import Loader from '@/components/Loader/Loader';
import HelpdeskItemTimetable from '@/components/EncmExplorerItemTimetable/EncmExplorerItemTimetable';
import HelpdeskItemOccupation from '@/components/EncmExplorerItemOccupation/EncmExplorerItemOccupation';
import LiveIcon from '@/components/LiveIcon/LiveIcon';

export default function EncmExplorerItem({ encmData, selectedEncmId, onSelectEncmId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('EncmExplorerItem');

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
        <a className={styles.viewInMap} onClick={handleClickViewMap} href="#encmExplorerMap">
          {t('address.view_in_map')}
        </a>
      </div>
      <div className={styles.wrapper}>
        <h4 className={styles.label}>{t('schedule.label')}</h4>
        <HelpdeskItemTimetable mon={encmData.hours_monday} tue={encmData.hours_tuesday} wed={encmData.hours_wednesday} thu={encmData.hours_thursday} fri={encmData.hours_friday} sat={encmData.hours_saturday} sun={encmData.hours_sunday} />
      </div>

      <div className={styles.occupation}>
        <h4 className={styles.label}>
          {t('occupation.label')} <LiveIcon color="#000" />
        </h4>
        <HelpdeskItemOccupation currentlyWaiting={encmData.currently_waiting} expectedWaitTime={encmData.expected_wait_time} />
      </div>
    </div>
  ) : (
    <Loader visible />
  );

  //
}
