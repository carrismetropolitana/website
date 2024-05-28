import styles from './MapToolbar.module.css';

export default function MapToolbar({ children, error, loading, rightSection, title }) {
  //

  return <div className={styles.container}>{children}</div>;
}
