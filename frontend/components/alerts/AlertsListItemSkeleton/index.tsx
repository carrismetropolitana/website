/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			<Skeleton className={styles.icon} />
			<Skeleton className={styles.title} />
		</div>
	);
}
