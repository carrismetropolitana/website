'use client';

import styles from './HelpdesksExplorerItem.module.css';
import { useTranslations } from 'next-intl';
import Loader from '@/components/Loader/Loader';
import HelpdeskItemTimetable from '@/components/HelpdesksExplorerItemTimetable/HelpdesksExplorerItemTimetable';
import HelpdeskItemOccupation from '@/components/HelpdesksExplorerItemOccupation/HelpdesksExplorerItemOccupation';
import LiveIcon from '@/components/LiveIcon/LiveIcon';

export default function HelpdesksExplorerItem({ helpdeskData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdesksExplorerItem');

  //
  // C. Render components

  return helpdeskData ? (
    <div className={styles.container}>
      <h2 className={styles.title}>{helpdeskData.name}</h2>
      <div className={styles.wrapper}>
        <h4 className={styles.label}>{t('address.label')}</h4>
        <p className={styles.text}>{`${helpdeskData.address}, ${helpdeskData.postal_code} ${helpdeskData.locality}`}</p>
      </div>
      <div className={styles.wrapper}>
        <h4 className={styles.label}>{t('schedule.label')}</h4>
        <HelpdeskItemTimetable
          mon={helpdeskData.hours_monday}
          tue={helpdeskData.hours_tuesday}
          wed={helpdeskData.hours_wednesday}
          thu={helpdeskData.hours_thursday}
          fri={helpdeskData.hours_friday}
          sat={helpdeskData.hours_saturday}
          sun={helpdeskData.hours_sunday}
        />
      </div>
      <div className={styles.wrapper}>
        <h4 className={styles.label}>
          {t('occupation.label')} <LiveIcon />
        </h4>
        <HelpdeskItemOccupation currentlyWaiting={helpdeskData.currently_waiting} expectedWaitTime={helpdeskData.expected_wait_time} />
      </div>
    </div>
  ) : (
    <Loader visible />
  );

  //
}
