/* * */

import Loader from '../Loader/Loader';
import styles from './LineDisplay.module.css';

/* * */

export function LineBadge({ short_name, color, text_color, size = 'md' }) {
  return (
    <div className={`${styles.badge} ${styles[size]}`} style={{ backgroundColor: color, color: text_color }}>
      {short_name || '• • •'}
    </div>
  );
}

/* * */

export function LineName({ long_name }) {
  return <div className={styles.name}>{long_name || '• • •'}</div>;
}

/* * */

export default function LineDisplay({ short_name, long_name, color = '#000000', text_color = '#ffffff' }) {
  return !short_name || !long_name ? (
    <Loader size={20} visible />
  ) : (
    <div className={styles.container}>
      <LineBadge short_name={short_name} color={color} text_color={text_color} />
      <LineName long_name={long_name} />
    </div>
  );
}
