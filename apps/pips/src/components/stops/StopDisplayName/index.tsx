/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	longName?: string
	size?: 'lg' | 'md'
}

/* * */

export function StopDisplayName({ longName, size = 'md' }: Props) {
	return longName && (
		<span className={`${styles.name} ${styles[size]}`}>
			{longName}
		</span>
	);
}
