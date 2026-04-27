'use client';

/* * */

import { formatStopLocation } from '@/utils/formatStopLocation';

import styles from './styles.module.css';

/* * */

interface Props {
	localityName?: string
	municipalityName?: string
	size?: 'lg' | 'md'
}

/* * */

export function StopDisplayLocation({ localityName, municipalityName, size = 'md' }: Props) {
	//

	return (
		<p className={`${styles.location} ${styles[size]}`}>
			{formatStopLocation(localityName, municipalityName)}
		</p>
	);

	//
}
