import Loader from '../Loader/Loader';
import styles from './Block.module.css';

export default function Block({ loading, error, title, rightSection, children }) {
  //

  const OnLoading = () => (
    <div className={styles.isLoading}>
      <Loader visible />
    </div>
  );

  const OnError = () => (
    <div className={styles.isError}>
      <p>Ocorreu um erro</p>
    </div>
  );

  const OnData = () => <div className={styles.content}>{children}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>{title}</h2>
      </div>
      <div className={styles.wrapper}>
        {loading && <OnLoading />}
        {error && <OnError />}
        {!loading && !error && <OnData />}
      </div>
    </div>
  );
}
