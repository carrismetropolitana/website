/* * */

import { Sparkline } from '@mantine/charts';
import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<div className={styles.container}>
			<div className={styles.skeletonWrapper}>
				<Skeleton className={styles.primaryValue} />
				<Skeleton className={styles.primaryLabel} />
				<Skeleton className={styles.secondaryValue} />
				<Skeleton className={styles.secondaryLabel} />
			</div>
			<div className={styles.graphWrapper}>
				<Sparkline
					color="gray"
					curveType="natural"
					data={[8, 9, 10, 8, 10, 12]}
					fillOpacity={1}
					h={75}
				/>
			</div>
		</div>
	);
}
