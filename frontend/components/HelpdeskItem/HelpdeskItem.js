'use client';

import styles from './HelpdeskItem.module.css';
import { useTranslations } from 'next-intl';
import Loader from '../Loader/Loader';
import HelpdeskItemTimetable from '../HelpdeskItemTimetable/HelpdeskItemTimetable';
import HelpdeskItemOccupation from '../HelpdeskItemOccupation/HelpdeskItemOccupation';

export default function HelpdeskItem({ helpdeskData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdeskItem');

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
        <h4 className={styles.label}>{t('occupation.label')}</h4>
        <HelpdeskItemOccupation occupationData={helpdeskData.status} />
      </div>
    </div>
  ) : (
    <Loader visible />
  );

  //
}
