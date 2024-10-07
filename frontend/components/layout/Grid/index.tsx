/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	columns?: 'a' | 'aab' | 'ab' | 'abb' | 'abc' | 'abcd'
	withGap?: boolean
}

/* * */

export function Grid({ children, columns = 'a', withGap }: Props) {
	return (
		<div className={`${styles.container} ${styles[columns]} ${withGap && styles.withGap}`}>
			{children}
		</div>
	);
}
