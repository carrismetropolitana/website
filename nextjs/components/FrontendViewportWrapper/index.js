/* * */

import styles from './styles.module.css';

/* * */

export default function Component({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}
