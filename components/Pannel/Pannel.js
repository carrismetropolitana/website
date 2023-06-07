import Loader from '../Loader/Loader';
import styles from './Pannel.module.css';

export default function Pannel({ loading, error, title, rightSection, children }) {
  //

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>{title}</h2>
      </div>
      <div className={styles.wrapper}>
        {loading && (
          <div className={styles.isLoading}>
            <Loader visible />
          </div>
        )}
        {error && (
          <div className={styles.isError}>
            <p>Ocorreu um erro</p>
          </div>
        )}
        {!loading && !error && <div className={styles.content}>{children}</div>}
      </div>
    </div>
  );
}
