'use client';

/* * */

import Section from '@/components/layout/Section';

import LinesHeader from '../LinesHeader';
import NextBuses from '../NextBuses';
import StopMap from '../StopMap';
import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	//
	// B. Render components

	return (
		<Section childrenWrapperStyles={styles.container} withGap={false} withTopPadding={false} withChildrenPadding>
			<div>
				<LinesHeader />
				<NextBuses />
			</div>
			<div className={styles.mapWrapper}>
				<StopMap />
			</div>
		</Section>
	);

	//
}
