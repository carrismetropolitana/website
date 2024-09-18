/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			<Skeleton className={styles.title} />
			<Skeleton className={styles.label} />
			<Skeleton className={styles.value} />
			<Skeleton className={styles.label} />
			<Skeleton className={styles.value} />
		</div>
	);
}
