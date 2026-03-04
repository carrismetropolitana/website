'use client';

import { PipsArrivalsTableEmpty } from '@/components/pips/display/PipsArrivalsTableEmpty';
import { PipsArrivalsTableSkeleton } from '@/components/pips/display/PipsArrivalsTableSkeleton';
import { usePipsArrivalsContext } from '@/contexts/PipsArrivals.context';
import { DateTime } from 'luxon';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

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
	const [lastRowExtraPx, setLastRowExtraPx] = useState(0);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const tableRef = useRef<HTMLTableElement | null>(null);

	const MIN_ROW_HEIGHT_PX = 68;

	useEffect(() => {
		const interval = setInterval(() => {
			setNowInSeconds(DateTime.now().toSeconds());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// Keep the rendered list in sync with the time cell formatting.
	// `PipsArrivalsTableTimeCell` stops rendering when an arrival becomes "past";
	// without this, the row can linger until the next SWR refresh.
	const visibleArrivals = useMemo(() => {
		return pipsArrivalsContext.data.merged_arrivals.filter((arrival) => {
			if (arrival.observed_arrival_unix) return false;
			const arrivalUnix = arrival.estimated_arrival_unix ?? arrival.scheduled_arrival_unix;
			return arrivalUnix >= nowInSeconds;
		});
	}, [pipsArrivalsContext.data.merged_arrivals, nowInSeconds]);

	//
	// Compute how many rows to show and their height based on container size and actual rendered warnings height
	useLayoutEffect(() => {
		const container = containerRef.current;
		const table = tableRef.current;
		if (!container || !table) return;

		const update = () => {
			const thead = table.querySelector('thead');
			const containerHeight = container.getBoundingClientRect().height;
			const headerHeight = thead ? thead.getBoundingClientRect().height : 0;
			const availableHeight = Math.max(0, containerHeight - headerHeight);

			if (availableHeight <= 0) return;
			const arrivalsCount = visibleArrivals.length;
			if (arrivalsCount === 0) return;

			const maxRowsByMinHeight = Math.max(1, Math.floor(availableHeight / MIN_ROW_HEIGHT_PX));
			const maxRowsToShow = Math.min(arrivalsCount, maxRowsByMinHeight);

			// Ensure rowsToShow is initialized and never exceeds what can fit at MIN height.
			const safeRowsToShow = Math.max(1, Math.min(rowsToShow ?? maxRowsToShow, maxRowsToShow));
			if (rowsToShow !== safeRowsToShow) {
				setRowsToShow(safeRowsToShow);
				return;
			}

			// Measure the *actual* rendered height of warnings rows for the current slice.
			const warningsHeightPx = Array.from(table.querySelectorAll(`tbody tr.${styles.warningsRow}`)).reduce(
				(acc, row) => acc + row.getBoundingClientRect().height,
				0,
			);

			const heightForBaseRowsPx = Math.max(0, availableHeight - warningsHeightPx);
			let nextRowHeightPx = Math.floor(heightForBaseRowsPx / safeRowsToShow);

			// If the computed height falls below the minimum, reduce the number of rows until it fits.
			if (nextRowHeightPx < MIN_ROW_HEIGHT_PX && safeRowsToShow > 1) {
				setRowsToShow(safeRowsToShow - 1);
				return;
			}

			nextRowHeightPx = Math.max(MIN_ROW_HEIGHT_PX, nextRowHeightPx);
			const remainderPx = Math.max(0, Math.floor(heightForBaseRowsPx - nextRowHeightPx * safeRowsToShow));

			setRowHeightPx(prev => (prev === nextRowHeightPx ? prev : nextRowHeightPx));
			setLastRowExtraPx(prev => (prev === remainderPx ? prev : remainderPx));
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
	}, [pipsArrivalsContext.data.merged_arrivals, visibleArrivals.length, rowsToShow]);

	const arrivalsToRender = useMemo(() => {
		if (!rowsToShow) return visibleArrivals;
		return visibleArrivals.slice(0, rowsToShow);
	}, [visibleArrivals, rowsToShow]);

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
					</tr>
				</thead>
				<tbody>
					{arrivalsToRender.map((arrival, index) => (
						<PipsArrivalsTableRow
							key={`${arrival.trip_id}-${arrival.stop_sequence}-${index}`}
							arrival={arrival}
							extraHeightPx={index === arrivalsToRender.length - 1 ? lastRowExtraPx : 0}
							index={index}
							isLast={index === arrivalsToRender.length - 1}
							nowInSeconds={nowInSeconds}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
