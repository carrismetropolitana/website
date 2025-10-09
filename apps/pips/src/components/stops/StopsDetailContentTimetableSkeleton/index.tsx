/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export function StopsDetailContentTimetableSkeleton() {
	return (
		<div className={styles.container}>
			{Array.from({ length: 15 }).map((_, index) => (
				<Skeleton key={index} className={styles.row} />
			))}
		</div>
	);
}
