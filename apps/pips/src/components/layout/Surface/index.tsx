/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	forceOverflow?: boolean
	fullHeight?: boolean
	variant?: 'alerts' | 'brand2' | 'brand' | 'debug' | 'default' | 'muted' | 'persistent' | 'standout' | 'success' | 'warning'
}

/* * */

export function Surface({ children, forceOverflow, fullHeight, variant = 'default' }: Props) {
	//

	if (variant === 'standout') {
		return (
			<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow} ${fullHeight && styles.fullHeight}`}>
				<div className={styles.inner}>
					{children}
				</div>
			</div>
		);
	}

	if (variant === 'alerts') {
		return (
			<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow} ${fullHeight && styles.fullHeight}`}>
				{children}
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow} ${fullHeight && styles.fullHeight}`}>
			{children}
		</div>
	);

	//
}
