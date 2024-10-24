/* * */

import styles from './styles.module.css';

/* * */

export function AppViewport({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}
