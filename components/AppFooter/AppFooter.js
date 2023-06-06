import styles from './AppFooter.module.css';

export default function AppFooter({ children }) {
  return <div className={styles.container}>{children}</div>;
}
