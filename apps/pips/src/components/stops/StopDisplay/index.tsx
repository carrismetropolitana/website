/* * */

import type { Stop } from '@carrismetropolitana/api-types/network';

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

import { StopDisplayLocation } from '../StopDisplayLocation';
import { StopDisplayName } from '../StopDisplayName';

/* * */

interface Props {
	size?: 'lg' | 'md'
	skeletonWidth?: number
	stopData?: Stop
}

/* * */

export function StopDisplay({ size = 'md', skeletonWidth = 200, stopData }: Props) {
	return stopData
		? (
			<div className={`${styles.container} ${styles[size]}`}>
				<StopDisplayName longName={stopData.long_name} />
				<StopDisplayLocation localityId={stopData.locality_id} municipalityId={stopData.municipality_id} />
			</div>
		)
		: (
			<div className={styles.container}>
				<Skeleton height={24} width={skeletonWidth} />
			</div>
		);
}
