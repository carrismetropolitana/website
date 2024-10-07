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
	return (
		<div className={`${styles.container} ${styles[variant]} ${forceOverflow && styles.forceOverflow}`}>
			{children}
		</div>
	);
}
