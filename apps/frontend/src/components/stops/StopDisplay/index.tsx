/* * */

import type { HubStop } from '@tmlmobilidade/go-types-public-info';

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

import { StopDisplayLocation } from '../StopDisplayLocation';
import { StopDisplayName } from '../StopDisplayName';

/* * */

interface Props {
	size?: 'lg' | 'md'
	skeletonWidth?: number
	stopData?: HubStop
}

/* * */

export function StopDisplay({ size = 'md', skeletonWidth = 200, stopData }: Props) {
	return stopData
		? (
			<div className={`${styles.container} ${styles[size]}`}>
				<StopDisplayName longName={stopData.name} />
				<StopDisplayLocation localityName={stopData.locality_name} municipalityName={stopData.municipality_name} />
			</div>
		)
		: (
			<div className={styles.container}>
				<Skeleton height={24} width={skeletonWidth} />
			</div>
		);
}
