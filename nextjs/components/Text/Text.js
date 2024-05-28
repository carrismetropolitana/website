import styles from './Text.module.css';

export default function Text({ children, type = 'default' }) {
  return <p className={`${styles.text} ${styles[type]}`}>{children}</p>;
}
