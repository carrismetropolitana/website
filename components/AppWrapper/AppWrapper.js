import styles from './AppWrapper.module.css';

export default function AppWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
