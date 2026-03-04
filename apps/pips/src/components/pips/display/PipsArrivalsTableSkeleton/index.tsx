/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export function PipsArrivalsTableSkeleton() {
	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead className={styles.thead}>
					<tr>
						<th className={styles.th}>Hora</th>
						<th className={styles.th}>Linha</th>
						<th className={styles.th}>Paragem</th>
						<th className={styles.th}>Avisos</th>
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 10 }).map((_, index) => (
						<tr
							key={index}
							className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
						>
							<td className={`${styles.td} ${styles.timeCell}`}>
								<Skeleton height={24} width={60} />
							</td>
							<td className={`${styles.td} ${styles.lineCell}`}>
								<Skeleton height={32} width={80} />
							</td>
							<td className={`${styles.td} ${styles.stopCell}`}>
								<Skeleton height={20} mb={4} width="80%" />
								<Skeleton height={16} width="60%" />
							</td>
							<td className={`${styles.td} ${styles.warningsCell}`}>
								{index % 3 === 0 && <Skeleton height={28} width="90%" />}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
