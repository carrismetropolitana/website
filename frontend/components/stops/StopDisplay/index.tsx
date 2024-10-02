/* * */

import type { Stop } from '@/types/stops.types';

import { formatStopLocation } from '@/utils/formatStopLocation';
import { Skeleton } from '@mantine/core';

import { StopDisplayLocation } from '../StopDisplayLocation';
import { StopDisplayName } from '../StopDisplayName';
import styles from './styles.module.css';

/* * */

interface Props {
	locality?: string
	municipalityName?: string
	size?: 'lg' | 'md'
	stop?: Stop
	stopName?: string
	width?: number
}

/* * */

export function StopDisplay({ locality, municipalityName, size = 'md', stop, width = 200 }: Props) {
	//

	//
	// A. Setup variables

	const formattedStopLocation = formatStopLocation(stop?.locality || locality, stop?.municipality_name || municipalityName);

	//
	// B. Render components

	return stop
		? (
			<div className={`${styles.container} ${styles[size]}`}>
				<StopDisplayName stopName={stop.name} />
				<StopDisplayLocation />
				{formattedStopLocation && (
					<p className={styles.location}>
						{formattedStopLocation}
					</p>
				)}
			</div>
		)
		: (
			<div className={styles.container}>
				<Skeleton height={24} width={width} />
			</div>
		);

	//
}
