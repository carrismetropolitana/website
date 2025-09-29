'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { StopsDetailContentTimetable } from '@/components/stops/StopsDetailContentTimetable';

import styles from './styles.module.css';

/* * */

export function StopsDetailContent({ stopName }) {
	return (
		<Section>
			<div className={styles.container}>
				<div className={styles.stopName}>{stopName}</div>
				<StopsDetailContentTimetable />
			</div>
		</Section>
	);
}
