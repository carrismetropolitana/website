/* * */

import type { Line } from '@carrismetropolitana/api-types/network';

import styles from './styles.module.css';

/* * */

interface Props {
	align?: 'center' | 'left' | 'right'
	lineData?: Line
	longName?: string
	size?: 'lg' | 'md'
}

/* * */

export function LineName({ align = 'left', lineData, longName, size = 'md' }: Props) {
	return (
		<div className={styles.name} data-align={align} data-size={size}>
			{lineData?.long_name || longName || '• • •'}
		</div>
	);
}
