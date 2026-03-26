'use client';
/* * */

import { TapAndRideSection1 } from '@/components/tap-and-ride/tapAndRideSection1';
import { TapAndRideSection2 } from '@/components/tap-and-ride/tapAndRideSection2';
import { TapAndRideSection3 } from '@/components/tap-and-ride/tapAndRideSection3';
import { TapAndRideSection4 } from '@/components/tap-and-ride/tapAndRideSection4';
import { TapAndRideSection5 } from '@/components/tap-and-ride/tapAndRideSection5';
import { TapAndRideSectionFaqs } from '@/components/tap-and-ride/tapAndRideSectionFaqs';

import styles from './styles.module.css';

/* * */

export function TapAndRideContent() {
	return (
		<>
			<div className={styles.contentRow}>
				<TapAndRideSection1 />
				<TapAndRideSection2 />
				<TapAndRideSection3 />
				<TapAndRideSection4 />
				<TapAndRideSection5 />
				<TapAndRideSectionFaqs />
			</div>
		</>
	);
}
