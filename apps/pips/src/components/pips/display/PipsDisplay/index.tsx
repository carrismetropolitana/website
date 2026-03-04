/* * */

'use client';

/* * */

import { PipsArrivalsTable } from '@/components/pips/display/PipsArrivalsTable';
import { PipsArrivalsContextProvider } from '@/contexts/PipsArrivals.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';

import styles from './styles.module.css';

import { PipsHeader } from '../PipsHeader';

/* * */

export function PipsDisplay() {
	const stopsPipContext = useStopsPipContext();
	const scale = stopsPipContext.display.scale;

	return (
		<div className={styles.root}>
			<div
				className={styles.scaled}
				style={{
					height: `${100 / scale}vh`,
					transform: `scale(${scale})`,
					transformOrigin: 'top left',
					width: `${100 / scale}%`,
				}}
			>
				<div className={styles.content}>
					<PipsHeader />
					<PipsArrivalsContextProvider>
						<div className={styles.tableViewport}>
							<PipsArrivalsTable />
						</div>
					</PipsArrivalsContextProvider>
				</div>
			</div>
		</div>
	);
}
