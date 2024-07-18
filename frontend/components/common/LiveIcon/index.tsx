import styles from './style.module.css';

export default function Component({ color = 'var(--color-realtime-100)' }) {
	//

	//
	// A. Render components

	return (
		<div className={styles.container}>
			<div className={styles.dot} style={{ backgroundColor: color }} />
			<div className={styles.ripple} style={{ backgroundColor: color }} />
		</div>
	);

	//
}
