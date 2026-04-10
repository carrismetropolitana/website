'use client';
/* * */

import { TapAndRideContentSection } from '@/components/tap-and-ride/TapAndRideContentSection';

import styles from './styles.module.css';

import { tapAndRideDataSection4 } from '../_data/data';

/* * */

export function TapAndRideSection4() {
	//

	//
	// A. Render components

	return (
		<TapAndRideContentSection
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/AF_CUT_Fiscalizacao.png"
			item={tapAndRideDataSection4}
			renderPanel={(t, item) => (
				<p className={styles.content}>{t(item.content)}</p>
			)}
		/>
	);

	//
}
