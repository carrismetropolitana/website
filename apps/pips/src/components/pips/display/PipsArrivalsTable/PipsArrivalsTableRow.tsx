/* * */

'use client';

/* * */

import type { MergedArrival } from '@/contexts/PipsArrivals.context';
import type { ArrivalStatus } from '@/types/stops.types';

import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesContext } from '@/contexts/Lines.context';

import styles from './styles.module.css';

import { PipsArrivalsTableTimeCell } from './PipsArrivalsTableTimeCell';

/* * */

interface Props {
	arrival: MergedArrival
	index: number
	nowInSeconds: number
}

/* * */

export function PipsArrivalsTableRow({ arrival, index, nowInSeconds }: Props) {
	const linesContext = useLinesContext();

	const lineData = linesContext.actions.getLineDataById(arrival.line_id);
	const arrivalUnix = arrival.estimated_arrival_unix ?? arrival.scheduled_arrival_unix;
	const status: ArrivalStatus = arrival.estimated_arrival_unix !== null ? 'realtime' : 'scheduled';

	return (
		<tr className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
			<td className={styles.td}>
				<div className={styles.timeCell}>
					<PipsArrivalsTableTimeCell
						arrivalUnix={arrivalUnix}
						nowInSeconds={nowInSeconds}
						status={status}
					/>
				</div>
			</td>
			<td className={styles.td}>
				<div className={styles.lineCell}>
					{lineData && <LineDisplay color={lineData.color} longName={arrival.headsign} shortName={lineData.short_name} size="lg" textColor={lineData.text_color} />}
				</div>
			</td>
			<td className={styles.td}>
				<div className={styles.stopCell}>
					<div className={styles.stopName}>{arrival.stop_long_name}</div>
				</div>
			</td>
			<td className={styles.td}>
				<div className={styles.warningsCell}>
					{arrival.warnings.length > 0 && (
						<div className={styles.warnings}>
							{arrival.warnings.map((warning, idx) => (
								<div key={idx} className={styles.warning}>
									⚠ {warning}
								</div>
							))}
						</div>
					)}
				</div>
			</td>
		</tr>
	);
}
