import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { useLineFormContext } from '@/forms/LineForm';
import styles from './LinePatternPathSpine.module.css';

//
//
//
//

export default function LinePatternPathSpine({ style, color, text_color, isSelected }) {
  //

  //
  // A. Setup variables

  const lineForm = useLineFormContext();
  const t = useTranslations('LinePatternPathSpine');

  //
  // D. Render components

  if (style === 'start') {
    return (
      <div className={`${styles.spine} ${styles.start}`} style={{ backgroundColor: color }}>
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
      <div className={`${styles.spine} ${styles.end}`} style={{ backgroundColor: color }}>
        <div className={styles.spineIcon}>
          <div className={styles.spineIconOuter}>
            <div className={styles.spineIconInner}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.spine} style={{ backgroundColor: color }}>
      <div className={styles.spineIcon}>
        <div className={styles.spineIconOuter}>
          <div className={styles.spineIconInner}></div>
        </div>
      </div>
    </div>
  );

  //
}
