/* * */

import type { Line } from '@/types/lines.types';

import styles from './styles.module.css';

/* * */

interface LineNameProps {
	line?: Line
	longName?: string
	size?: 'lg' | 'md'
}

/* * */

export default function Component({ line, longName, size = 'md' }: LineNameProps) {
	return (
		<div className={`${styles.name} ${styles[size]}`}>
			{line?.long_name || longName || '• • •'}
		</div>
	);
}
