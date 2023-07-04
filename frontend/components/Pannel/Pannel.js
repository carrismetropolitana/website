import Loader from '../Loader/Loader';
import styles from './Pannel.module.css';

export default function Pannel({ loading, error, icon, title, rightSection, children }) {
  //

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeftSection}>
          {icon && <div className={styles.headerIcon}>{icon}</div>}
          {title && <h2 className={styles.headerTitle}>{title}</h2>}
        </div>
        <div className={styles.headerRightSection}></div>
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
