'use client';

import { PipsArrivalsTable } from '@/components/pips/display/PipsArrivalsTable';
import { PipsArrivalsContextProvider } from '@/contexts/PipsArrivals.context';

import styles from '../PipsDisplay/styles.module.css';

export function PipsArrivalsPanel() {
	return (
		<PipsArrivalsContextProvider>
			<div className={styles.tableViewport}>
				<PipsArrivalsTable />
			</div>
		</PipsArrivalsContextProvider>
	);
}
