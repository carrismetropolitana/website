/* * */

import styles from './style.module.css';

/* * */

interface Props {
	className?: string
	color?: string
}

/* * */

export function LiveIcon({ className, color = 'var(--color-realtime-100)' }: Props) {
	return (
		<div className={`${styles.container} ${!!className && className}`}>
			<div className={styles.ripple} style={{ backgroundColor: color }} />
			<div className={styles.dot} style={{ backgroundColor: color }} />
		</div>
	);
}
