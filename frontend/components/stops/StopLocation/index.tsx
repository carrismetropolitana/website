/* * */

import type { Line } from '@/types/lines.types';

import { Stop } from '@/types/stops.types';

import styles from './styles.module.css';

/* * */

interface LineNameProps {
	size?: 'lg' | 'md'
	stop: Stop
}

/* * */

export default function Component({ size = 'md', stop }: LineNameProps) {
	const locationNames = [stop.district_name, stop.municipality_name, stop.locality];
	const location = locationNames.filter((name, index, array) => name && name !== array[index - 1]).join(', ');

	return (
		<div className={`${styles.name} ${styles[size]}`}>
			{location || '• • •'}
		</div>
	);
}
