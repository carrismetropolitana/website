import styles from './FrontendWrapper.module.css';

export default function FrontendWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
