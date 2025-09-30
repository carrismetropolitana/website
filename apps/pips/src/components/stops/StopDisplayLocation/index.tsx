'use client';

/* * */

import { useLocationsContext } from '@/contexts/Locations.context';

import styles from './styles.module.css';

/* * */

interface Props {
	localityId?: string
	municipalityId?: string
	size?: 'lg' | 'md'
}

/* * */

export function StopDisplayLocation({ localityId, municipalityId, size = 'md' }: Props) {
	//

	//
	// A. Setup variables

	const locationsContext = useLocationsContext();

	//
	// B. Fetch data

	const localityData = localityId && locationsContext.actions.getLocalityById(localityId);
	const municipalityData = municipalityId && locationsContext.actions.getMunicipalityById(municipalityId);

	//
	// C. Render components

	if (localityData) {
		return (
			<p className={`${styles.location} ${styles[size]}`}>
				{localityData.display}
			</p>
		);
	}

	if (municipalityData) {
		return (
			<p className={`${styles.location} ${styles[size]}`}>
				{municipalityData.name}
			</p>
		);
	}

	return null;

	//
}
