/* * */

import Loader from '@/components/common/Loader';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ _id, locality = '', municipalityName = '', name }) {
	//

	//
	// A. Transform data

	const localityMunicipalityNameFormatted = useMemo(() => {
		if (!locality || !municipalityName) {
			return locality || municipalityName;
		}
		if (locality === municipalityName) {
			return locality;
		}
		return `${locality}, ${municipalityName}`;
	}, [locality, municipalityName]);

	//
	// B. Render components

	return !name
		? <Loader size={20} visible />
		: (
			<div className={styles.container}>
				<p className={styles.name}>{name}</p>
				<div className={styles.additionalInfo}>
					<p className={styles.localityMunicipalityName}>{localityMunicipalityNameFormatted}</p>
					<p className={styles.stopId}>{`#${_id}`}</p>
				</div>
			</div>
		);

	//
}
