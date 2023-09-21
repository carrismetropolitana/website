'use client';

import styles from './StopsExplorerTimetableDividerLine.module.css';

export default function StopsExplorerTimetableDividerLine() {
  //

  //
  // A. Setup variables

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  //
  // B. Render components

  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.line}></div>
      <div className={styles.time}>
        {currentHours}
        <span>:</span>
        {currentMinutes}
      </div>
    </div>
  );
}
