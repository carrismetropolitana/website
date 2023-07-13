import styles from './Text.module.css';

export default function Text({ type = 'default', children }) {
  return <p className={`${styles.text} ${styles[type]}`}>{children}</p>;
}
