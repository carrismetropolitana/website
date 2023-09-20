import styles from './AppTopBar.module.css';

export default function AppTopBar() {
  return (
    <div className={styles.container}>
      <a href="//www.tmlmobilidade.pt/" className={styles.link}>
        <div className={styles.label}>TML</div>
        <div className={styles.indicatorWrapper}>
          <div className={styles.indicatorActive} />
        </div>
      </a>
      <div className={`${styles.link} ${styles.active}`}>
        <div className={styles.label}>Carris Metropolitana</div>
        <div className={styles.indicatorWrapper}>
          <div className={styles.indicatorActive} />
        </div>
      </div>
      <a href="//www.navegante.pt/" className={styles.link}>
        <div className={styles.label}>navegante®</div>
        <div className={styles.indicatorWrapper}>
          <div className={styles.indicatorActive} />
        </div>
      </a>
    </div>
  );
}
