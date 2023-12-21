/* * */

import styles from './FrontendBrandSwitcher.module.css';

/* * */

export default function FrontendBrandSwitcher() {
  return (
    <div className={styles.container}>
      <a href="https://www.tmlmobilidade.pt" className={styles.link}>
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
      <a href="https://www.navegante.pt" className={styles.link}>
        <div className={styles.label}>navegante®</div>
        <div className={styles.indicatorWrapper}>
          <div className={styles.indicatorActive} />
        </div>
      </a>
    </div>
  );
}
