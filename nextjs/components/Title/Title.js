/* * */

import styles from './Title.module.css';

/* * */

export default function Title({ level = 'h1', text = 'ddsf' }) {
  switch (level) {
    case 'h1':
      return <h1 className={styles.title}>{text}</h1>;
    case 'h2':
      return <h2 className={styles.title}>{text}</h2>;
    case 'h3':
      return <h3 className={styles.title}>{text}</h3>;
    case 'h4':
      return <h4 className={styles.title}>{text}</h4>;
    case 'h5':
      return <h5 className={styles.title}>{text}</h5>;
    case 'h6':
      return <h6 className={styles.title}>{text}</h6>;
  }
}
