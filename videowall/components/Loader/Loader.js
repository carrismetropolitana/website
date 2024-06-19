/* * */

import styles from './Loader.module.css';

/* * */

export default function Loader({ visible = false, full = false, fill = false, fixed = false, size = 30 }) {
  //

  if (!visible) return;

  // Setup spinner
  const Spinner = () => <div className={styles.spinner} style={{ width: size, height: size, borderWidth: size / 7 }} />;

  // If
  if (full) {
    return (
      <div className={styles.full}>
        <Spinner />
      </div>
    );
  }

  // If
  if (fixed) {
    return (
      <div className={styles.fixed}>
        <Spinner />
      </div>
    );
  }

  // If
  if (fill) {
    return (
      <div className={styles.fill}>
        <Spinner />
      </div>
    );
  }

  return <Spinner />;

  //
}
