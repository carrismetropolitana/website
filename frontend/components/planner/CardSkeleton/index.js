/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			<Skeleton className={styles.coverImage} />
			<Skeleton className={styles.titleOne} />
			<Skeleton className={styles.descriptionOne} />
			<Skeleton className={styles.descriptionTwo} />
		</div>
	);
}
