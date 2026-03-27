'use client';
/* * */

import { TapAndRideSection1 } from '@/components/tap-and-ride/TapAndRideSection1';
import { TapAndRideSection2 } from '@/components/tap-and-ride/TapAndRideSection2';
import { TapAndRideSection3 } from '@/components/tap-and-ride/TapAndRideSection3';
import { TapAndRideSection4 } from '@/components/tap-and-ride/TapAndRideSection4';
import { TapAndRideSection5 } from '@/components/tap-and-ride/TapAndRideSection5';
import { TapAndRideSectionFaqs } from '@/components/tap-and-ride/TapAndRideSectionFaqs';

import styles from './styles.module.css';

/* * */

export function TapAndRideContent() {
	//

	//
	// A. Render components

	return (
		<>
			<div className={styles.contentRow}>
				<TapAndRideSection1 />
				<TapAndRideSection2 />
				<TapAndRideSection3 />
				<TapAndRideSection4 />
				<TapAndRideSection5 />

			</div>
			<TapAndRideSectionFaqs />
		</>
	);

	//
}
