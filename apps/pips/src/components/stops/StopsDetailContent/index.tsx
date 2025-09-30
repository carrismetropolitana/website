'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { StopsDetailContentTimetable } from '@/components/stops/StopsDetailContentTimetable';
import classNames from 'classnames/bind';

import styles from './styles.module.css';

/* * */

const cx = classNames.bind(styles);

/* * */

export function StopsDetailContent({ size = 'md', stopName }) {
	return (
		<Section>
			<div className={styles.container}>
				<div className={cx({ lg: size === 'lg', md: size === 'md', stopName: true })}>{stopName}</div>
				<StopsDetailContentTimetable size={size} />
			</div>
		</Section>
	);
}
