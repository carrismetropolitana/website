import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPathSpine.module.css';

//
//
//
//

export default function LinePatternPathSpine({ style, isSelected }) {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPathSpine');

  //
  // D. Render components

  if (style === 'start') {
    return (
      <div className={`${styles.spine} ${styles.start}`}>
        <div className={styles.spineIcon}>
          <div className={styles.spineIconOuter}>
            <div className={styles.spineIconInner}></div>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'end') {
    return (
      <div className={`${styles.spine} ${styles.end}`}>
        <div className={styles.spineIcon}>
          <div className={styles.spineIconOuter}>
            <div className={styles.spineIconInner}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.spine}>
      <div className={styles.spineIcon}>
        <div className={styles.spineIconOuter}>
          <div className={styles.spineIconInner}></div>
        </div>
      </div>
    </div>
  );

  //
}
