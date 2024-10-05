/* * */

import { formatStopLocation } from '@/utils/formatStopLocation';

import styles from './styles.module.css';

/* * */

interface Props {
	locality?: string
	municipalityName?: string
	size?: 'lg' | 'md'
}

/* * */

export function StopDisplayLocation({ locality, municipalityName, size = 'md' }: Props) {
	//

	//
	// A. Setup variables

	const formattedStopLocation = formatStopLocation(locality, municipalityName);

	//
	// B. Render components

	return formattedStopLocation && (
		<p className={`${styles.location} ${styles[size]}`}>
			{formattedStopLocation}
		</p>
	);

	//
}
