import styles from './Loader.module.css';

export default function Loader({ visible, maxed, full, fixed, size = 30 }) {
  //

  if (!visible) return <div />;

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
  if (maxed) {
    return (
      <div className={styles.maxed}>
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

  return <Spinner />;

  //
}
