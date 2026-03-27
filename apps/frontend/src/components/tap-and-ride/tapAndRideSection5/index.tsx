'use client';
/* * */

import { TapAndRideContentSection } from '@/components/tap-and-ride/TapAndRideContentSection';

import styles from './styles.module.css';

import { tapAndRideDataSection5 } from '../_data/data';

/* * */

export function TapAndRideSection5() {
	//

	//
	// A. Render components

	return (
		<TapAndRideContentSection
			imageAlt="Tap and Ride"
			imageSrc="/assets/tap-and-ride/AF_CUT_Instrucoes_1.png"
			item={tapAndRideDataSection5}
			renderPanel={(t, item) => (
				<div>
					<p className={styles.content}>{t(item.content)}</p>
					<p className={styles.subcontent}>{t(item.subcontent)}</p>
				</div>
			)}
		/>
	);

	//
}
