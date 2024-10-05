'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { StopsDetailContentMap } from '@/components/stops/StopsDetailContentMap';
import { StopsDetailContentTimetable } from '@/components/stops/StopsDetailContentTimetable';
import { StopsDetailContentTimetableHeader } from '@/components/stops/StopsDetailContentTimetableHeader';

import styles from './styles.module.css';

/* * */

export function StopsDetailContent() {
	return (
		<Section childrenWrapperStyles={styles.container} withGap={false} withTopPadding={false}>
			<div className={styles.listWrapper}>
				<StopsDetailContentTimetableHeader />
				<StopsDetailContentTimetable />
			</div>
			<div className={styles.mapWrapper}>
				<StopsDetailContentMap />
			</div>
		</Section>
	);
}
