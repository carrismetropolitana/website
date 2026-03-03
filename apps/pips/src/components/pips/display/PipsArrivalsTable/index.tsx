'use client';

import { PipsArrivalsTableEmpty } from '@/components/pips/display/PipsArrivalsTableEmpty';
import { PipsArrivalsTableSkeleton } from '@/components/pips/display/PipsArrivalsTableSkeleton';
import { usePipsArrivalsContext } from '@/contexts/PipsArrivals.context';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './styles.module.css';

import { PipsArrivalsTableRow } from './PipsArrivalsTableRow';

/* * */

export function PipsArrivalsTable() {
	//

	//
	// A. Setup variables

	const pipsArrivalsContext = usePipsArrivalsContext();
	const [nowInSeconds, setNowInSeconds] = useState(() => DateTime.now().toSeconds());
	const [rowsToShow, setRowsToShow] = useState<null | number>(null);
	const [rowHeightPx, setRowHeightPx] = useState<null | number>(null);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const tableRef = useRef<HTMLTableElement | null>(null);

	const MIN_ROW_HEIGHT_PX = 68;
	const MAX_ROW_HEIGHT_PX = 110;

	useEffect(() => {
		const interval = setInterval(() => {
			setNowInSeconds(DateTime.now().toSeconds());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	//
	// Compute how many rows to show and their height based on container size and number of arrivals
	useEffect(() => {
		const container = containerRef.current;
		const table = tableRef.current;
		if (!container || !table) return;

		const update = () => {
			const thead = table.querySelector('thead');
			const containerHeight = container.getBoundingClientRect().height;
			const headerHeight = thead ? thead.getBoundingClientRect().height : 0;
			const availableHeight = Math.max(0, containerHeight - headerHeight);

			if (availableHeight <= 0) return;

			const maxRowsByMinHeight = Math.max(1, Math.floor(availableHeight / MIN_ROW_HEIGHT_PX));
			const desiredRows = Math.min(pipsArrivalsContext.data.merged_arrivals.length, maxRowsByMinHeight);
			const computedRowHeight = Math.max(MIN_ROW_HEIGHT_PX, Math.floor(availableHeight / Math.max(1, desiredRows)));
			const clampedRowHeight = Math.min(MAX_ROW_HEIGHT_PX, computedRowHeight);

			setRowsToShow(prev => (prev === desiredRows ? prev : desiredRows));
			setRowHeightPx(prev => (prev === clampedRowHeight ? prev : clampedRowHeight));
		};

		update();
		const ro = new ResizeObserver(() => update());
		ro.observe(container);
		ro.observe(table);

		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('resize', update);
			ro.disconnect();
		};
	}, [pipsArrivalsContext.data.merged_arrivals.length]);

	const arrivalsToRender = useMemo(() => {
		if (!rowsToShow) return pipsArrivalsContext.data.merged_arrivals;
		return pipsArrivalsContext.data.merged_arrivals.slice(0, rowsToShow);
	}, [pipsArrivalsContext.data.merged_arrivals, rowsToShow]);

	//
	// C. Render loading state

	if (pipsArrivalsContext.flags.is_loading) {
		return <PipsArrivalsTableSkeleton />;
	}

	//
	// D. Render empty state

	if (pipsArrivalsContext.data.merged_arrivals.length === 0) {
		return <PipsArrivalsTableEmpty />;
	}

	//
	// E. Render components

	return (
		<div
			ref={containerRef}
			className={styles.container}
			style={rowHeightPx ? ({ ['--pips-row-height' as never]: `${rowHeightPx}px` }) : undefined}
		>
			<table ref={tableRef} className={styles.table}>
				<thead className={styles.thead}>
					<tr>
						<th className={styles.th}>Hora</th>
						<th className={styles.th}>Linha</th>
						<th className={styles.th}>Paragem</th>
						<th className={styles.th}>Avisos</th>
					</tr>
				</thead>
				<tbody>
					{arrivalsToRender.map((arrival, index) => (
						<PipsArrivalsTableRow
							key={`${arrival.trip_id}-${arrival.stop_sequence}-${index}`}
							arrival={arrival}
							index={index}
							nowInSeconds={nowInSeconds}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
