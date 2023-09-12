import styles from './LiveIcon.module.css';

export default function LiveIcon({ color }) {
  //

  //
  // A. Render components

  return (
    <div className={styles.container}>
      <div className={styles.dot} style={{ backgroundColor: color }} />
      <div className={styles.ripple} style={{ backgroundColor: color }} />
    </div>
  );

  //
}
