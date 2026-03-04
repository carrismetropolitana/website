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
	const rowsToShowRef = useRef<null | number>(null);
	const scheduleFitRef = useRef<(() => void) | null>(null);
	const rafIdRef = useRef<null | number>(null);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const tableRef = useRef<HTMLTableElement | null>(null);

	const MIN_ROW_HEIGHT_PX = 68;
	const SHRINK_OVERFLOW_PX = 2;
	const GROW_SPARE_EXTRA_PX = 12;
	const MIN_ADJUST_INTERVAL_MS = 250;
	const lastAdjustAtRef = useRef(0);
	const lastRevalidateAtRef = useRef(0);
	const prevVisibleCountRef = useRef<number>(0);
	const REVALIDATE_COOLDOWN_MS = 4000;

	useEffect(() => {
		rowsToShowRef.current = rowsToShow;
	}, [rowsToShow]);

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
	// Compute how many rows to show based on available space.
	// We measure the rendered tbody height so the layout stays responsive (no text clipping)
	// even when fonts/warnings make rows taller than the minimum.
	useLayoutEffect(() => {
		const container = containerRef.current;
		const table = tableRef.current;
		if (!container || !table) return;

		const computeFit = () => {
			const thead = table.querySelector('thead');
			const tbody = table.querySelector('tbody');
			if (!tbody) return;

			// Use layout measurements (not affected by CSS transforms).
			// In vertical mode the whole canvas is rotated, and `getBoundingClientRect()`
			// swaps axes which breaks the available height calculation.
			const containerHeight = container.clientHeight;
			const headerHeight = thead ? (thead as HTMLElement).offsetHeight : 0;
			const availableHeight = Math.max(0, containerHeight - headerHeight);
			if (availableHeight <= 0) return;

			const arrivalsCount = visibleArrivals.length;
			if (arrivalsCount === 0) return;

			const maxRowsByMinHeight = Math.max(1, Math.floor(availableHeight / MIN_ROW_HEIGHT_PX));
			const clampedTarget = Math.min(arrivalsCount, maxRowsByMinHeight);

			const currentRows = rowsToShowRef.current;
			if (currentRows === null) {
				setRowsToShow(clampedTarget);
				return;
			}

			// Clamp when arrivals shrink.
			if (currentRows > arrivalsCount) {
				setRowsToShow(arrivalsCount);
				return;
			}
			if (currentRows < 1) {
				setRowsToShow(1);
				return;
			}

			const tbodyHeight = (tbody as HTMLElement).offsetHeight;
			const nowMs = performance.now();
			const canGrow = (nowMs - lastAdjustAtRef.current) >= MIN_ADJUST_INTERVAL_MS;
			const overflowPx = tbodyHeight - availableHeight;
			const sparePx = availableHeight - tbodyHeight;

			// If it overflows even a little, reduce rows until it fits (avoid visual cropping).
			if (overflowPx > SHRINK_OVERFLOW_PX) {
				if (currentRows > 1) {
					lastAdjustAtRef.current = nowMs;
					setRowsToShow(currentRows - 1);
				}
				return;
			}

			// Only grow when there is clearly enough spare space to avoid oscillation.
			if (canGrow && currentRows < clampedTarget && sparePx >= (MIN_ROW_HEIGHT_PX + GROW_SPARE_EXTRA_PX)) {
				lastAdjustAtRef.current = nowMs;
				setRowsToShow(currentRows + 1);
			}
		};

		const scheduleFit = () => {
			if (rafIdRef.current !== null) return;
			rafIdRef.current = window.requestAnimationFrame(() => {
				rafIdRef.current = null;
				computeFit();
			});
		};

		scheduleFitRef.current = scheduleFit;

		scheduleFit();
		const ro = new ResizeObserver(() => scheduleFit());
		ro.observe(container);
		ro.observe(table);

		window.addEventListener('resize', scheduleFit);
		return () => {
			window.removeEventListener('resize', scheduleFit);
			ro.disconnect();
			if (rafIdRef.current !== null) {
				window.cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
			scheduleFitRef.current = null;
		};
	}, [visibleArrivals.length]);

	useEffect(() => {
		const prevCount = prevVisibleCountRef.current;
		const currentCount = visibleArrivals.length;
		prevVisibleCountRef.current = currentCount;

		// If arrivals just dropped off (e.g. "A chegar" → gone) and we now have fewer
		// items than the number of rows that fit, revalidate immediately so the next
		// arrivals come in without waiting for the 10s SWR refresh.
		if (rowsToShow === null) return;
		if (currentCount >= rowsToShow) return;
		if (currentCount >= prevCount) return;

		const nowMs = performance.now();
		if ((nowMs - lastRevalidateAtRef.current) < REVALIDATE_COOLDOWN_MS) return;
		lastRevalidateAtRef.current = nowMs;
		pipsArrivalsContext.actions.revalidate();
	}, [pipsArrivalsContext.actions, rowsToShow, visibleArrivals.length]);

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
							index={index}
							nowInSeconds={nowInSeconds}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
