/* * */

import styles from './styles.module.css';

/* * */

export default function Component({ isSelected = false, src }) {
	return (
		<div className={`${styles.container} ${isSelected ? styles.isSelected : ''}`}>
			<div className={styles.blur} />
			<div className={styles.overlay} />
			<img src={src} />
		</div>
	);
}
