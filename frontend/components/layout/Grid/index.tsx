/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	className?: string
	columns?: 'a' | 'aab' | 'ab' | 'abb' | 'abc' | 'abcd'
	withGap?: boolean
}

/* * */

export function Grid({ children, className, columns = 'a', withGap }: Props) {
	return (
		<div className={`${styles.container} ${styles[columns]} ${withGap && styles.withGap} ${className}`}>
			{children}
		</div>
	);
}
