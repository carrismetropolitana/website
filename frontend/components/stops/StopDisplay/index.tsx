/* * */

import StopName from '@/components/stops/StopName';
import { Stop } from '@/types/stops.types';
import { Skeleton } from '@mantine/core';

import StopLocation from '../StopLocation';
import styles from './styles.module.css';

/* * */

interface LineDisplayProps {
	stop?: Stop
	width?: number
}

/* * */

export default function Component({ stop, width = 200 }: LineDisplayProps) {
	return stop
		? (
			<div className={styles.container}>
				<StopName longName={stop.name} />
				<StopLocation stop={stop} />
			</div>
		)
		: (
			<div className={styles.container}>
				<Skeleton height={24} width={width} />
			</div>
		);
}
