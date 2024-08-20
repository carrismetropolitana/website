/* * */

import { Stop } from '@/types/stops.types';

import styles from './styles.module.css';

/* * */

interface StopNameProps {
	longName?: string
	size?: 'lg' | 'md'
	stop?: Stop
}

/* * */

export default function Component({ longName, size = 'md', stop }: StopNameProps) {
	return (
		<div className={`${styles.name} ${styles[size]}`}>
			{stop?.name || longName || '• • •'}
		</div>
	);
}
