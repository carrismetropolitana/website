'use client';

/* * */

import Section from '@/components/layout/Section';
import { StopsDetailContentListHeader } from '@/components/stops/StopsDetailContentListHeader';

import NextBuses from '../NextBuses';
import StopMap from '../StopMap';
import styles from './styles.module.css';

/* * */

export function StopsDetailContent() {
	//

	//
	// A. Setup variables

	//
	// B. Render components

	return (
		<Section childrenWrapperStyles={styles.container} withGap={false} withTopPadding={false}>
			<div className={styles.listWrapper}>
				<StopsDetailContentListHeader />
				<NextBuses />
			</div>
			<div className={styles.mapWrapper}>
				<StopMap />
			</div>
		</Section>
	);

	//
}
