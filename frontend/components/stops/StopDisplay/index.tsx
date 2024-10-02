/* * */

import type { Stop } from '@/types/stops.types';

import { formatStopLocation } from '@/utils/formatStopLocation';
import { Skeleton } from '@mantine/core';

import { StopDisplayLocation } from '../StopDisplayLocation';
import { StopDisplayName } from '../StopDisplayName';
import styles from './styles.module.css';

/* * */

interface Props {
	size?: 'lg' | 'md'
	stop?: Stop
	width?: number
}

/* * */

export function StopDisplay({ size = 'md', stop, width = 200 }: Props) {
	return stop
		? (
			<div className={`${styles.container} ${styles[size]}`}>
				<StopDisplayName stopName={stop.name} />
				<StopDisplayLocation locality={stop?.locality} municipalityName={stop?.municipality_name} />
			</div>
		)
		: (
			<div className={styles.container}>
				<Skeleton height={24} width={width} />
			</div>
		);
}
