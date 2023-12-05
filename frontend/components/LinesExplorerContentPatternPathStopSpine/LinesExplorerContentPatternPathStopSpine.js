/* * */

import styles from './LinesExplorerContentPatternPathStopSpine.module.css';

/* * */

export default function LinesExplorerContentPatternPathStopSpine({ style = 'regular', color, text_color, isSelected }) {
  //

  //
  // A. Render components

  if (style === 'start') {
    return (
      <div className={`${styles.spine} ${styles.start} ${isSelected && styles.isSelected}`} style={{ backgroundColor: color }}>
        <div className={styles.spineIcon}>
          <div className={styles.spineIconOuter}>
            <div className={styles.spineIconInner} style={{ borderColor: text_color }} />
          </div>
        </div>
      </div>
    );
  }

  if (style === 'end') {
    return (
      <div className={`${styles.spine} ${styles.end} ${isSelected && styles.isSelected}`} style={{ backgroundColor: color }}>
        <div className={styles.spineIcon}>
          <div className={styles.spineIconOuter}>
            <div className={styles.spineIconInner} style={{ borderColor: text_color }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.spine} ${isSelected && styles.isSelected}`} style={{ backgroundColor: color }}>
      <div className={styles.spineIcon}>
        <div className={styles.spineIconOuter}>
          <div className={styles.spineIconInner} style={{ borderColor: text_color }} />
        </div>
      </div>
    </div>
  );

  //
}
