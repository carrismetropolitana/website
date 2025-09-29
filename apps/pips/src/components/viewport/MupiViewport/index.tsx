/* * */

import styles from './styles.module.css';

/* * */

export function MupiViewport({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}
