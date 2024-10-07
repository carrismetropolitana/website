/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	forceOverflow?: boolean
	variant?: 'brand' | 'default' | 'muted' | 'standout'
}

/* * */

export function Surface({ children, forceOverflow, variant = 'default' }: Props) {
	//

	if (variant === 'standout') {
		return (
			<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow}`}>
				<div className={styles.inner}>
					{children}
				</div>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow}`}>
			{children}
		</div>
	);

	//
}
