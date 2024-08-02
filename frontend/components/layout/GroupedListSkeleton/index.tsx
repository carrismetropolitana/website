/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface GroupedListSkeletonProps {
	groupCount: number
	itemCount: number
	itemSkeleton: React.ReactNode
}

/* * */

export default function Component({ groupCount, itemCount, itemSkeleton }: GroupedListSkeletonProps) {
	return (
		<>
			{Array.from({ length: groupCount }).map((_, groupIndex) => (
				<div key={groupIndex} className={styles.container}>
					<div className={styles.header}>
						<Skeleton className={styles.label} />
						<Skeleton className={styles.title} />
					</div>
					{Array.from({ length: itemCount }).map((_, itemIndex) => (
						<div key={itemIndex} className={styles.childrenWrapper}>
							{itemSkeleton}
						</div>
					))}
				</div>
			))}
		</>
	);
}
