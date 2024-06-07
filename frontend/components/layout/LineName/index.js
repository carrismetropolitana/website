/* * */

import styles from './styles.module.css';

/* * */

export default function LineName({ long_name }) {
	return <div className={styles.name}>{long_name || '• • •'}</div>;
}
