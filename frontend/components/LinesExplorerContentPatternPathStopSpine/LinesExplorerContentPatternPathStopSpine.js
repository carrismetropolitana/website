/* * */

import styles from './LinesExplorerContentPatternPathStopSpine.module.css';

/* * */

export default function LinesExplorerContentPatternPathStopSpine({ style, color, text_color, isSelected }) {
  //

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
