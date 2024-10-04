'use client';

/* * */

import Section from '@/components/layout/Section';
import { StopsDetailContentTimetable } from '@/components/stops/StopsDetailContentTimetable';
import { StopsDetailContentTimetableHeader } from '@/components/stops/StopsDetailContentTimetableHeader';

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
				<StopsDetailContentTimetableHeader />
				<StopsDetailContentTimetable />
			</div>
			<div className={styles.mapWrapper}>
				<StopMap />
			</div>
		</Section>
	);

	//
}
