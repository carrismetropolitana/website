/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export function CampaignsCardSkeleton() {
	return (
		<div className={styles.container}>
			<Skeleton className={styles.coverImage} />
			<Skeleton className={styles.title} />
		</div>
	);
}
