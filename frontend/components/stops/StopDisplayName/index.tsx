/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	size?: 'lg' | 'md'
	stopName?: string
}

/* * */

export function StopDisplayName({ size = 'md', stopName }: Props) {
	return stopName && (
		<span className={`${styles.name} ${styles[size]}`}>
			{stopName}
		</span>
	);
}
