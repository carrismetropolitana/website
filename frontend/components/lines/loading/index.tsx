/* * */

import { Skeleton } from '@mantine/core';

import styles from '../styles.module.css';

/* * */

export default function Loading() {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.header}>
				<div className={styles.lineHeader}>
					<Skeleton height={24} radius={9999} width={80} />
					<Skeleton height={24} radius={8} width={24} />
				</div>
				<Skeleton height={48} radius={8} width="100%" />
			</div>

			<div className={styles.divisor} />
			<div className={styles.controls}>
				<Skeleton height={50} width="100%" />
				<div className={styles.routeSelector}>
					<div className={styles.routeExplainer}>
						<Skeleton height={14} width="210" />
					</div>
					<Skeleton height={50} width="100%" />
				</div>
			</div>
		</div>
	);
}
