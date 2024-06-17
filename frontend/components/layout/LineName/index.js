/* * */

import styles from './styles.module.css';

/* * */

export default function Component({ long_name }) {
	return <div className={styles.name}>{long_name || '• • •'}</div>;
}
