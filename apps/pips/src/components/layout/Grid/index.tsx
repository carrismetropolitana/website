/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	columns?: 'a' | 'aab' | 'ab' | 'abb' | 'abc' | 'abcd'
	hAlign?: 'center' | 'end' | 'start'
	vAlign?: 'center' | 'end' | 'start'
	withGap?: boolean
}

/* * */

export function Grid({ children, columns = 'a', hAlign = 'start', vAlign = 'start', withGap }: Props) {
	return (
		<div className={`${styles.container} ${styles[columns]} ${styles[`hAlign${hAlign}`]} ${styles[`vAlign${vAlign}`]} ${withGap && styles.withGap}`}>
			{children}
		</div>
	);
}
