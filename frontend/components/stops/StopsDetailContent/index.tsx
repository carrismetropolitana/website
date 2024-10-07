'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { StopsDetailContentMap } from '@/components/stops/StopsDetailContentMap';
import { StopsDetailContentTimetable } from '@/components/stops/StopsDetailContentTimetable';
import { StopsDetailContentTimetableHeader } from '@/components/stops/StopsDetailContentTimetableHeader';

import styles from './styles.module.css';

/* * */

export function StopsDetailContent() {
	return (
		<Surface>
			<Section>
				<div className={styles.container}>
					<div className={styles.listWrapper}>
						<StopsDetailContentTimetableHeader />
						<StopsDetailContentTimetable />
					</div>
					<div className={styles.mapWrapper}>
						<StopsDetailContentMap />
					</div>
				</div>
			</Section>
		</Surface>
	);
}
