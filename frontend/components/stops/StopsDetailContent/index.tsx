'use client';

/* * */

import Section from '@/components/layout/Section';
import { StopsDetailContentList } from '@/components/stops/StopsDetailContentList';
import { StopsDetailContentListHeader } from '@/components/stops/StopsDetailContentListHeader';

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
				<StopsDetailContentList />
			</div>
			<div className={styles.mapWrapper}>
				<StopMap />
			</div>
		</Section>
	);

	//
}
