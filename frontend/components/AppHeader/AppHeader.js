import styles from './AppHeader.module.css';

export default function AppHeader({ children }) {
  return <div className={styles.container}>{children}</div>;
}
